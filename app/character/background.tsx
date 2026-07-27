import { useState } from "react";
import { Character } from "@/types/characterTypes";
import "./background.css";

//temp variables
const ancestries = ["Honi","Hyvani","Machina","Meliades","Merrow","Nagani","Phalaena","Ullik","Human","Orc","Elf","Dwarf","Halfling","Pixie"];
const backgrounds = ["Velari Truth-Seeker", "Mahoken Institute Affiliate", "Jennite Follower", "Bolnean Citizen","Nagen-Tei", "Saile Trader","Fionn Shaman","Wanderer"];
const ancVariants = ["Variant 1", "Variant 2", "Variant 3"];
const backVariants = ["Variant 1", "Variant 2", "Variant 3"];
const descy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ex ante. Phasellus ut sapien ac ipsum euismod hendrerit. Vestibulum congue interdum magna, ac aliquet odio posuere in. Integer pretium rhoncus faucibus. In porttitor bibendum neque scelerisque faucibus. Aliquam vitae blandit lorem. Vivamus dictum mollis nisi, sit amet tincidunt nunc congue et. Ut luctus rutrum nibh, non rhoncus nunc molestie in. Integer aliquet dictum mi nec fermentum. Pellentesque sit amet volutpat sem, a sagittis orci. Donec bibendum magna quis ex porta, eu eleifend diam auctor. Integer aliquam ac libero sit amet aliquam. Donec in nisl molestie, semper leo cursus, vestibulum diam. In porttitor enim ut faucibus efficitur. Vestibulum iaculis venenatis lorem, quis sodales ipsum mollis id. ";

export default function background(character:Character,setCharacterData:Function) {

    const [ancestrySelection, setAncestrySelection] = useState(false);
    const [backgroundSelection, setBackgroundSelection] = useState(false);
    const [ancestryVariant, setAncestryVariant] = useState("");
    const [backgroundVariant, setBackgroundVariant] = useState("");
    const [ancVariantList, setAncVariantList] = useState(buildAncestryVariants(ancVariants));
    const [backVariantList, setBackVariantList] = useState(buildBackgroundVariants(backVariants));
    const [characterName, setCharacterName] = useState("");

    function buildAncestryVariants(variants:string[]) {
        return <select defaultValue={variants[0]} onChange={(e)=>(setAncestryVariant(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: string)=>(
                <option value = {variant} key={variant}>
                    {variant}
                </option>
            ))}
        </select>
    }

    function buildBackgroundVariants(variants:string[]) {
        return <select defaultValue={variants[0]} onChange={(e)=>(setBackgroundVariant(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: string)=>(
                <option value = {variant} key={variant}>
                    {variant}
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
    const ancestryChoice = (ancestry:string) => {
        //ancVariants will be chosen with ancestry choice
        setAncestrySelection(true);
        setAncVariantList(buildAncestryVariants(ancVariants));
        setAncestryVariant(ancVariants[0]);
        if (character.ancestryName != ancestry) {
            setCharacterData((prev: any) => ({
            ...prev,
            ancestryName: ancestry
            }))
        }
    }
    const backgroundChoice = (background:string) => {
        //backVariants will be chosen with background choice
        setBackgroundSelection(true);
        setBackVariantList(buildBackgroundVariants(backVariants));
        setBackgroundVariant(backVariants[0]);
        if (character.backgroundName != background) {
            setCharacterData((prev: any) => ({
            ...prev,
            backgroundName: background
            }))
        }
    }

    function buildAncestryList(ancestries:string[]) {
        return <div>{ancestries.map((ancestry: string) => (
            <div className="cell" key={ancestry} onClick={()=>{ancestryChoice(ancestry)}}>
                <div className="cellName">
                    {ancestry}
                </div>
                <div className="cellDescription">
                    Ancestry description text
                </div>
                <div className="cellImage">

                </div>                
            </div>
        ))}</div>
    }

    function buildBackgroundList(backgrounds:string[]) {
        return <div>{backgrounds.map((background: string) => (
            <div className="cell" key={background} onClick={()=>{backgroundChoice(background)}}>
                <div className="cellName">
                    {background}
                </div>
                <div className="cellDescription">
                    Background description text
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
                    {character.ancestryName}
                </div>
                <div className="variants">
                    {ancVariantList}
                </div>
                Traits: {ancestryVariant}
                <div className="description">
                    {descy} {descy}
                </div>
            </div>
        ): (<div>
                Choose an Ancestry
                <div className="scrollList">
                    {buildAncestryList(ancestries)}
                </div>
            </div>)}
        </div>
        
        <div className="flex flex-col faction">
            {backgroundSelection ? (
            <div>
                Background
                <div onClick={()=>{ backgroundReturn()}} className="return">
                    {character.backgroundName}
                </div>
                <div className="variants">
                    {backVariantList}
                </div>
                Traits: {backgroundVariant}
                <div className="description">
                    Lorem Ipsum
                </div>
            </div>
        ): (<div>
                Choose a Background
                <div className="scrollList">
                    {buildBackgroundList(backgrounds)}
                </div>
            </div>
            )}
    </div>
    </div>
)
}