import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import "./background.css";
import { useGetBackgroundScreen } from "@/hooks/useGetBackgroundScreen";
import { Ancestry, Background, Trait } from "@/types/stateTypes";

//temp variables
const ancestries = ["Honi","Hyvani","Machina","Meliades","Merrow","Nagani","Phalaena","Ullik","Human","Orc","Elf","Dwarf","Halfling","Pixie"];
const backgrounds = ["Velari Truth-Seeker", "Mahoken Institute Affiliate", "Jennite Follower", "Bolnean Citizen","Nagen-Tei", "Saile Trader","Fionn Shaman","Wanderer"];
const ancVariants = ["Variant 1", "Variant 2", "Variant 3"];
const backVariants = ["Variant 1", "Variant 2", "Variant 3"];
const descy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ex ante. Phasellus ut sapien ac ipsum euismod hendrerit. Vestibulum congue interdum magna, ac aliquet odio posuere in. Integer pretium rhoncus faucibus. In porttitor bibendum neque scelerisque faucibus. Aliquam vitae blandit lorem. Vivamus dictum mollis nisi, sit amet tincidunt nunc congue et. Ut luctus rutrum nibh, non rhoncus nunc molestie in. Integer aliquet dictum mi nec fermentum. Pellentesque sit amet volutpat sem, a sagittis orci. Donec bibendum magna quis ex porta, eu eleifend diam auctor. Integer aliquam ac libero sit amet aliquam. Donec in nisl molestie, semper leo cursus, vestibulum diam. In porttitor enim ut faucibus efficitur. Vestibulum iaculis venenatis lorem, quis sodales ipsum mollis id. ";

export default function background(character:Character,setCharacterData:Function) {

    const [ancestrySelection, setAncestrySelection] = useState(false);
    const [backgroundSelection, setBackgroundSelection] = useState(false);
    const [ancVariantList, setAncVariantList] = useState(<div></div>);
    const [backVariantList, setBackVariantList] = useState(<div></div>);
    const [characterName, setCharacterName] = useState("");
    const [ancestryList, setAncestryList] = useState<Ancestry[]>([]);
    const [backgroundList, setBackgroundList] = useState<Background[]>([]);
    const [traitsList, setTraitsList] = useState<Trait[]>([]);
    const [ancestryParentList, setAncestryParentList] = useState<Ancestry[]>([]);
    const [backgroundParentList, setBackgroundParentList] = useState<Background[]>([]);
    

    useEffect(()=>{
        useGetBackgroundScreen("").then(data=>{
            let response = data.data.data.getBackgroundScreen;
            setAncestryList(response.ancestries);
            setBackgroundList(response.backgrounds);
            setTraitsList(response.traits);
            let parentList = response.ancestries.filter((value: Ancestry, index: Number, self:Ancestry[])=>self.findIndex(a=>a.parent===value.parent)===index);
            setAncestryParentList(parentList);
            parentList = response.backgrounds.filter((value: Background, index: Number, self:Background[])=>self.findIndex(a=>a.parentTrait===value.parentTrait)===index);
            setBackgroundParentList(parentList);
        })
    },[])

    function saveAncestrytoCharacter(e:string){
        let value = ancestryList.find(a=>a.name===e);
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                ancestry: buildAncestryInner(value)
            }))
    }

    function saveBackgroundtoCharacter(e:string){
        let value = backgroundList.find(b=>b.name===e);
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                background: buildBackgroundInner(value)
            }))
    }

    function buildAncestryInner(ancestry: Ancestry){
        return{
            ...ancestry,
            trait1: findTraitByName(ancestry.trait1),
            trait2: findTraitByName(ancestry.trait2),
        }
    }

    function buildBackgroundInner(background: Background){
        return{
            ...background,
            parentTrait: findTraitByName(background.parentTrait),
            childTrait: findTraitByName(background.childTrait),
        }
    }

    function findTraitByName(name:string){
        return traitsList.find(t=>t.name===name);
    }

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

    const ancestryReturn = ()=> {
        setAncestrySelection(false);
    }
    const backgroundReturn = ()=> {
        setBackgroundSelection(false);
    }
    const ancestryChoice = (ancestry:Ancestry) => {
        //ancVariants will be chosen with ancestry choice
        setAncestrySelection(true);
        setAncVariantList(buildAncestryVariants(ancestry.parent));
        if (character.ancestry?.parent != ancestry.parent) {
            setCharacterData((prev: any) => ({
            ...prev,
            ancestry: buildAncestryInner(ancestry)
            }))
        }
    }
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
            <input className="nameBox" type="text" placeholder="Character Name" value={characterName} onChange={(e)=>(setCharacterName(e.currentTarget.value))}/>
            <div className="image">
                
            </div>
        </div>
        
        <div className="ancestry">
            {ancestrySelection ? (
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
        ): (<div>
                Choose an Ancestry
                <div className="scrollList">
                    {buildAncestryList()}
                </div>
            </div>)}
        </div>
        
        <div className="flex flex-col faction">
            {backgroundSelection ? (
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