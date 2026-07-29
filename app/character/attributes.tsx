import { Character } from "@/types/characterTypes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Plus, Minus } from "lucide-react";
import "./attributes.css";
import { Attribute } from "@/types/talentTypes";
import { useGetAttributeList } from "@/hooks/useGetAttributeList";

export default function attributes(character:Character,setCharacterData:Function) {
    const [attrib1Counter, setattrib1Counter] = useState(0);
    const [attrib2Counter, setattrib2Counter] = useState(0);
    const [attributeList, setAttrubuteList] = useState<Attribute[]>([]);
    const [attribute1List, setAttrubute1List] = useState<Attribute[]>([]);
    const [attribute2List, setAttrubute2List] = useState<Attribute[]>([]);
    

    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense - (-character.attributeLevel));


    useEffect(()=>{
        useGetAttributeList().then(data=>{
            setAttrubuteList(data.data.data.getAttributeList);
        })
    },[])

    useEffect(()=>{
        setAttrubute1List(attributeList.filter(a=>a.talentName===character.talent1.name))
        setAttrubute2List(attributeList.filter(a=>a.talentName===character.talent2.name))
    },[character.talent1, character.talent2])

    useEffect(()=>{console.log(character.attributes1)},[character])

    //todo skill value recalculation on ancestry+talent change

    function addAttribute(talent:boolean, attribute:Attribute) {
        if (!talent){
            setCharacterData((prev: any) => ({
            ...prev,
            attributes1: character.attributes1?.concat(attribute)
            }))
            setattrib1Counter(attrib1Counter+1);
        }
        else {
            setCharacterData((prev: any) => ({
            ...prev,
            attributes2: character.attributes2?.concat(attribute)
            }))
            setattrib2Counter(attrib2Counter+1);
        }
    }

    function removeAttribute(talent:boolean, attribute:Attribute) {
        if (!talent){
            setCharacterData((prev: any) => ({
            ...prev,
            attributes1: character.attributes1.filter(a=>a.name!=attribute.name)
            }))
            setattrib1Counter(attrib1Counter-1);
        }
        else {
            setCharacterData((prev: any) => ({
            ...prev,
            attributes2: character.attributes2.filter(a=>a.name!=attribute.name)
            }))
            setattrib2Counter(attrib2Counter-1);
        }
    }
    
    function setCharacterLevel(e:number) {
        if (e < attrib1Counter + attrib2Counter) {
            setattrib1Counter(0);
            setattrib2Counter(0);
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: 0,
            attribute2: 0
        }))
        }
        setCharacterData((prev: any) => ({
        ...prev,
        attributeLevel: e
        }))
    }

    const increaseSkill = (e:any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
            ...prev,
            [e]: name + 1
        }))}
    }

    const decreaseSkill = (e:any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
            ...prev,
            [e]: name - 1
        }))}
    }

    return (
        <div className="attributes">
            <div className="talent1name">
                { character.talent1.name }
            </div>
            <div className="level">
                <div className="levelName">
                    Level
                </div>
                <div className="levelSelect">
                    <select defaultValue={character?.attributeLevel?.toString()} onChange={(e)=>{setCharacterLevel(Number(e.currentTarget.value))}}>
                        <option value="0" className="text-[32px]">0</option>
                        <option value="1" className="text-[32px]">1</option>
                        <option value="2" className="text-[32px]">2</option>
                        <option value="3" className="text-[32px]">3</option>
                        <option value="4" className="text-[32px]">4</option>
                        <option value="5" className="text-[32px]">5</option>
                        <option value="6" className="text-[32px]">6</option>
                        <option value="7" className="text-[32px]">7</option>
                        <option value="8" className="text-[32px]">8</option>
                    </select>
                </div>
            </div>
            <div className="talent2name">
                { character.talent2.name }
            </div>
            <div className="talent1attributes">
                {attribute1List.map((attribute: Attribute)=>(
                <div key={attribute.name}>
                    {!(character.attributes1?.filter(a=>attribute.name===a.name).length>0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(false,attribute)}}>
                            {attribute.name} <br/> {attribute.description1}
                        </div>): (
                        <div className="attributeDisallowed">
                            {attribute.name} <br/> {attribute.description1}
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(false,attribute)}}>
                            {attribute.name} <br/> {attribute.description1}
                    </div>)}
                </div>
                ))}
            </div>
            <div className="talent1stones">
                <div className={(attrib1Counter < 2) ? ("keystone"): ("keystoneActive")}>
                    <u>{character.talent1.name} Keystone</u> <br/> {character.talent1.keystone}
                </div>
                <div className={(attrib1Counter < 4) ? ("capstone"): ("capstoneActive")}>
                    <u>{character.talent1.name} Capstone</u> <br/> {character.talent1.capstone}
                </div>
            </div>
            <div className="talent2attributes">
                {attribute2List.map((attribute: Attribute)=>(
                <div key={attribute.name}>
                    { !character.attributes2?.includes(attribute) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(true,attribute)}}>
                            {attribute.name} <br/> {attribute.description1}
                        </div>): (
                        <div className="attributeDisallowed">
                            {attribute.name} <br/> {attribute.description1}
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(true,attribute)}}>
                        {attribute.name} <br/> {attribute.description1}
                    </div>)}
                </div>
                ))}
            </div>
            <div className="talent2stones">
                <div className={(attrib2Counter < 2) ? ("keystone"): ("keystoneActive")}>
                    <u> {character.talent2.name} Keystone</u> <br/> {character.talent2.keystone}
                </div>
                <div className={(attrib2Counter < 4) ? ("capstone"): ("capstoneActive")}>
                    <u>{character.talent2.name} Capstone</u> <br/> {character.talent2.capstone}
                </div>
            </div>
            <div className="skillsTitle">
                Remaining Skill Points: {points}
            </div>
            <div className="fitness">
                Fitness
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={()=>{decreaseSkill("baseFitness")}} disabled={character.baseFitness == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFitness}</div>
                    <Button size="icon" onClick={()=>{increaseSkill("baseFitness")}} disabled={(character.baseFitness == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {character?.baseFitness}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {character?.baseFitness}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{character?.baseFitness}</div>
                
            </div>
            <div className="focus">
                Focus
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={()=>{decreaseSkill("baseFocus")}} disabled={character.baseFocus == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFocus}</div>
                    <Button size="icon" onClick={()=>{increaseSkill("baseFocus")}} disabled={(character.baseFocus == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {character?.baseFocus}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {character?.baseFocus}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{character?.baseFocus}</div>
            </div>
            <div className="precision">
                Precision
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={()=>{decreaseSkill("basePrecision")}} disabled={character.basePrecision == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.basePrecision}</div>
                    <Button size="icon" onClick={()=>{increaseSkill("basePrecision")}} disabled={(character.basePrecision == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {character?.basePrecision}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {character?.basePrecision}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{character?.basePrecision}</div>
            </div>
            <div className="sense">
                Sense
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={()=>{decreaseSkill("baseSense")}} disabled={character.baseSense == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseSense}</div>
                    <Button size="icon" onClick={()=>{increaseSkill("baseSense")}} disabled={(character.baseSense == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {character?.baseSense}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {character?.baseSense}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{character?.baseSense}</div>
            </div>
        
            

            <div className="skills1">
                <div className="w-full border-1 border-black text-[30px] text-left">Awareness: +{Math.round((character.baseSense + character.baseFocus)/2)}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Celerity: +{Math.round((character.basePrecision + character.baseFocus)/2)}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Dexterity: +{Math.round((character.basePrecision + character.baseFitness)/2)}</div>
            </div>
            <div className="skills2">
                <div className="w-full border-1 border-black text-[30px] text-left">Evasion: +{Math.round((character.baseSense + character.baseFitness)/2)}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Subtlety: +{Math.round((character.basePrecision + character.baseSense)/2)}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Tenacity: +{Math.round((character.baseFitness + character.baseFocus)/2)}</div>
            </div>
            <div className="skills3">
                <div className="w-full border-1 border-black text-[30px] text-left">Max Mana: {3 + character.attributeLevel + 2*character.baseFocus}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Spell Capacity: {2 + character.attributeLevel + character.baseFocus}</div>
            </div>
            <div className="skills4">
                <div className="w-full border-1 border-black text-[30px] text-left">Wound Tolerance: {4 + Math.round((character.baseFitness + character.baseFocus)/2)}</div>
            </div>
        </div>
)
}