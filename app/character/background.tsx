import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import "./background.css";
import { useGetBackgroundScreen } from "@/hooks/useGetBackgroundScreen";
import { Ancestry, Background, Effect, Trait } from "@/types/stateTypes";
import { useModifyEffect } from "@/hooks/operations/effectOperations";

export default function background(character:Character,setCharacterData:Function) {

    
    //ancestries and backgrounds are divided between "parent" categories.  specific children can be selected after the parent is selected
    const [ancestryParentList, setAncestryParentList] = useState<Ancestry[]>([]);
    const [backgroundParentList, setBackgroundParentList] = useState<Background[]>([]);
    //switches that flip to show either the parent list or child menu
    const [ancestrySelection, setAncestrySelection] = useState(false);
    const [backgroundSelection, setBackgroundSelection] = useState(false);
    //list of children that belong to the current parent. referred to as "variants" in the UI
    const [ancVariantList, setAncVariantList] = useState(<div></div>);
    const [backVariantList, setBackVariantList] = useState(<div></div>);
    //master lists, should not be changed except by the API call.
    const [ancestryList, setAncestryList] = useState<Ancestry[]>([]);
    const [backgroundList, setBackgroundList] = useState<Background[]>([]);
    const [traitsList, setTraitsList] = useState<Trait[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([])
    

    //gets all data from backend for screen
    useEffect(()=>{
        useGetBackgroundScreen("").then(data=>{
            let response = data.data.data.getBackgroundScreen;
            //list of the children
            setAncestryList(response.ancestries);
            setBackgroundList(response.backgrounds);
            setTraitsList(response.traits);
            setEffectList(response.effects);
            //filters the child list down to 1 entry per parent for display.  This may need to be changed to allow for generic descriptions
            let parentList = response.ancestries.filter((value: Ancestry, index: Number, self:Ancestry[])=>self.findIndex(a=>a.parent===value.parent)===index);
            setAncestryParentList(parentList);
            parentList = response.backgrounds.filter((value: Background, index: Number, self:Background[])=>self.findIndex(a=>a.parentTrait===value.parentTrait)===index);
            setBackgroundParentList(parentList);
        })
    },[])

    //step 3 of 3, save variant/child selection to character data
    function saveAncestrytoCharacter(e:string){
        let value = ancestryList.find(a=>a.name===e);
        //get new effects from master list
        let effects = effectList.filter(e=>e.name===value?.trait1 || e.name===value?.trait2);
        //add new effects to state
        let state = effects.length > 0 ? useModifyEffect(character.state, true, ...effects) : character.state;
        //remove old effects from state
        state.activeEffects = state.activeEffects.filter(ae=>ae.name!=character.ancestry.trait1.name || ae.name!=character.ancestry.trait2.name);
        state.inactiveEffects = state.inactiveEffects.filter(ie=>ie.name!=character.ancestry.trait1.name || ie.name!=character.ancestry.trait2.name);
        //save to character
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                ancestry: buildAncestryInner(value),
                state: {...state}
            }))
    }
    
    //step 3/3
    function saveBackgroundtoCharacter(e:string){
        let value = backgroundList.find(b=>b.name===e);
        //no effects needed for background,  just add.
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                background: buildBackgroundInner(value)
            }))
    }

    //builder functions that allow for the traits to be stored directly in the character data.  allows for easy access
    function buildAncestryInner(ancestry: Ancestry){
        return{
            ...ancestry,
            trait1: findTraitByName(ancestry.trait1),
            trait2: findTraitByName(ancestry.trait2),
        }
    }
    //builder function
    function buildBackgroundInner(background: Background){
        return{
            ...background,
            parentTrait: findTraitByName(background.parentTrait),
            childTrait: findTraitByName(background.childTrait),
        }
    }

    //see tin
    function findTraitByName(name:string){
        return traitsList.find(t=>t.name===name);
    }

    //step 2.5 of 3, build the select element for the child menu
    function buildAncestryVariants(parent:string) {
        let variants = ancestryList?.filter(a=>a.parent===parent);
        return <select defaultValue={character.ancestry?.name} onChange={(e)=>(saveAncestrytoCharacter(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: Ancestry)=>(
                <option value = {variant.name} key={variant.name}>
                    {variant.name}
                </option>
            ))}
        </select>
    }
    
    //step 2.5/3
    function buildBackgroundVariants(parentTrait: string) {
        let variants = backgroundList.filter(b=>b.parentTrait===parentTrait)
        return <select defaultValue={character.background?.name} onChange={(e)=>(saveBackgroundtoCharacter(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: Background)=>(
                <option value = {variant.name} key={variant.name}>
                    {variant.name}
                </option>
            ))}
        </select>
    }

    //resets back to parent list view.
    const ancestryReturn = ()=> {
        setAncestrySelection(false);
    }
    const backgroundReturn = ()=> {
        setBackgroundSelection(false);
    }

    //step 2 of 3: parent selection has been made
    const ancestryChoice = (ancestry:Ancestry) => {
        //flip switch to set child menu view
        setAncestrySelection(true);
        setAncVariantList(buildAncestryVariants(ancestry.parent));
        //if the Parent selection has changed, set the default child as the variant
        if (character.ancestry?.parent != ancestry.parent) {
            saveAncestrytoCharacter(ancestry.name);
        }
    }
    
    //step 2/3
    const backgroundChoice = (background:Background) => {
        //backVariants will be chosen with background choice
        setBackgroundSelection(true);
        setBackVariantList(buildBackgroundVariants(background.parentTrait));
        if (character.background?.parentTrait.name != background.parentTrait) {
            setCharacterData((prev: any) => ({
            ...prev,
            background: buildBackgroundInner(background)
            }))
        }
    }

    //Step 1 of 3: build the initial display lists 
    function buildAncestryList() {
        return <div>{ancestryParentList.map((ancestry: Ancestry) => (
            <div className="cell" key={ancestry.parent} onClick={()=>{ancestryChoice(ancestry)}}>
                <div className="cellName">
                    {ancestry.parent}
                </div>
                <div className="cellDescription">
                    {ancestry.description}
                </div>
                <div className="cellImage">

                </div>                
            </div>
        ))}</div>
    }
    //step 1/3
    function buildBackgroundList() {
        return <div>{backgroundParentList.map((background: Background) => (
            <div className="cell" key={background.parentTrait} onClick={()=>{backgroundChoice(background)}}>
                <div className="cellName">
                    {background.parentTrait}
                </div>
                <div className="cellDescription">
                    {background.description}
                </div>
                <div className="cellImage">

                </div>
            </div>
        ))}</div>
    }

    return (
    <div className="background">
        <div className="name">
            <input className="nameBox" type="text" placeholder="Character Name" value={character.name} onChange={(e)=>(setCharacterData((prev:Character)=>({...prev, name: e.target.value})))}/>
            <div className="image">
                
            </div>
        </div>
        
        <div className="ancestry">
            {ancestrySelection ? (
                //child view
            <div>
                Ancestry
                <div onClick={()=>{ ancestryReturn()}} className="return">
                    {character.ancestry?.parent}
                </div>
                <div className="variants">
                    {ancVariantList}
                </div>
                Traits: {character.ancestry?.trait1?.name + ", " + character.ancestry?.trait2?.name}
                <div className="description">
                    {character.ancestry?.description}
                </div>
            </div>
            //parent view
        ): (<div>
                Choose an Ancestry
                <div className="scrollList">
                    {buildAncestryList()}
                </div>
            </div>)}
        </div>
        
        <div className="flex flex-col faction">
            {backgroundSelection ? (
                //child view
            <div>
                Background
                <div onClick={()=>{ backgroundReturn()}} className="return">
                    {character.background?.parentTrait.name}
                </div>
                <div className="variants">
                    {backVariantList}
                </div>
                Traits: {character.background?.childTrait?.name}
                <div className="description">
                    {character.background?.description}
                </div>
            </div>
            //parent view
        ): (<div>
                Choose a Background
                <div className="scrollList">
                    {buildBackgroundList()}
                </div>
            </div>
            )}
    </div>
    </div>
)
}