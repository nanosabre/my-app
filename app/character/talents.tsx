import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import "./talents.css";
import { Talent } from "@/types/talentTypes";
import { useGetTalentScreen } from "@/hooks/useGetTalentScreen";
import { Effect } from "@/types/stateTypes";
import { useModifyEffect } from "@/hooks/operations/effectOperations";
import { DamageTypes } from "@/types/Enums";

export default function talents(character:Character,setCharacterData:Function) {
    //switch flipped on first talent select
    const [talentSelection, setTalentSelection] = useState(true);
    const [readySelection, setReadySelection] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [talentList, setTalentList] = useState<Talent[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([]);

    useEffect(()=>{
        useGetTalentScreen().then((data)=>{
            setTalentList(data.data.data.getTalentScreen.talents.sort((a: Talent, b: Talent) => a.caster === b.caster ? 0 : a.caster? -1 : 1));
            setEffectList(data.data.data.getTalentScreen.effects);
        })
    },[])

    const setTalent = (e:Talent)=> {
        let effects = effectList.filter(e=>e.name.includes(e.name));
        let state = character.state;
        //if removing talent 1
        if (e.name == character.talent1.name) {
            //remove the associated effects
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent1.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent1.name));
            //update the characterData
            setCharacterData((prev: any) => ({
            ...prev,
            attributes1: [],
            talent1: "",
            state: {...state}
            }))
            //set talent1 indicator
            setTalentSelection(true);
        }
        //if removing talent 2
        else if (e.name == character.talent2.name) {
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent2.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent2.name));
            //update the characterData
            setCharacterData((prev: any) => ({
            ...prev,
            attributes2: [],
            talent2: "",
            state: {...state}
            }))
            //set talent 2 indicator
            setReadySelection(false);
        }
        //if adding first talent
        else if (talentSelection) {
            //add any associated effects.
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent1: e,
            state: {...state}
            }))
            //set talent 1 indicator
            setTalentSelection(false);
        }
        else if (!readySelection) {
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent2: e,
            state: {...state}
            }))
            //set talent 2 indicator
            setReadySelection(true);
        }

    }

    function buildDamageTypeSelector(damageType: string){
        return (
            DamageTypes.filter(d=>d.type===damageType).map(d=>(
                <option key={d.name} value={d.name}>{d.name}</option>
            ))
        )
    }

    function handleChangeDamageType(value: string, talent: string){
        if(talent==="Covenant")
            setCharacterData((prev: Character)=>({...prev, patronDamageType: value}))
        else
            setCharacterData((prev: Character)=>({...prev, elementalDamageType: value}));
    }

    function buildTalentCards() {
        return(<div className="talentChoices">
            {talentList.map((talent:Talent)=>( //selector view
                <button key={talent.name} className={((!talentSelection)&&(readySelection)) ? ("disabledTalentCard"): ("talentCard")} onClick={()=>{ setTalent(talent)}}>
                    {!((character.talent1.name === talent.name)||(character.talent2.name === talent.name)) ? (
                        <div className="cardGrid">
                            <div className="talentName">
                                {talent.name}
                            </div>
                            <div className="talentIcon">
                                Icon
                            </div>
                            <div className="talentType">
                                {talent.caster ? "Spellcaster" : "Blademaster"}
                            </div>
                            <div className="talentRole">
                                {talent.role}
                            </div>
                            <div className="talentCompl">
                                { talent.complexity}
                            </div>
                            <div className="talentSplash">
                                Splash
                            </div>
                        </div>
                    ): /* selected version */ (<div className="cardBack"> 
                            <div className="cardBackName">
                                {talent.name}
                            </div>
                            <div className="cardDesc">
                                {talent.description}
                            </div>
                            <div className="cardDamageType">
                                {["Covenant", "Elemental"].includes(talent.name) &&
                                <div className="damage Selector">
                                    <input className="" type="text" placeholder="Medium Name" disabled={talent.name!="Elemental"}></input>
                                    <select 
                                        onChange={ e=> handleChangeDamageType(e.currentTarget.value, talent.name)} 
                                        defaultValue={talent.name==="Covenant"? character.patronDamageType: character.elementDamageType}>
                                            {buildDamageTypeSelector(talent.name==="Covenant"? "Soul": "Elemental")}
                                    </select>
                                </div>}
                            </div>
                    </div>)}
                </button>
            ))}
        </div>)
    }

    return (
    <div className="talents">
        <div className="header">
            Choose two Talents ({Number(!talentSelection) + Number(readySelection)}/2)
        </div>
        { !showSelected ? (
            <div>
                {buildTalentCards()}
                <div className="view" onClick={()=>{ setShowSelected(true)}}>
                    View Details
                </div>
            </div>
        ): ( //details view
        <div className="selected">
            <div className="viewTalent1">
                <div className="selectedName">
                    { character.talent1.name }
                </div>
                <div className="selectedType">
                    {character.talent1.caster ? "Spellcaster" : "Blademaster"}
                </div>
                <div className="selectedFlavor">
                    {character.talent1.description}
                </div>
                <div className="selectedRoles">
                    {character.talent1.role}
                </div>
                <div className="selectedComplexity">
                    Complexity: {character.talent1.complexity}
                </div>
                <div className="selectedSkills">
                    Preferred Skills: {character.talent1.prioritySkills}
                </div>
                <div className="selectedBonus">
                    Bonuses: <br/> +{character.talent1.hpBonus} Hit Point Maximum{character.talent1.caster && " | +3 Mana Bonus"}
                </div>
                <div className="selectedAbility">
                    Abilities: <br/> {character.talent1.ability1}
                </div>
                <div className="selectedAtts">
                    Attributes:
                </div>
                {/*TODO*/}
                <div className="selectedAttributes"> 
                    <div className="att1">
                        <u>Cleric</u> <br/> Guidance | Cure Wounds | Revive | Silence | Dissuade
                    </div>
                    <div className="att2">
                        <u>Paladin</u> <br/> Soul Armor | Taunting Presence | Forify Mind | Rebuke | Resiliance
                    </div>
                    <div className="att3">
                        <u>Warlock</u> <br/> Light/Extinguish | Hallow/Desecrate | Essence Transfer | Weaken Soul | Drain
                    </div>
                    <div className="att4">
                        <u>Justiciar</u> <br/> Holy Weapon | Summon Creature | Divine Warning | Zealotry | Persecute
                    </div>
                </div>
            </div>
            <div className="viewTalent2">
                <div className="selectedName">
                    { character.talent2.name }
                </div>
                <div className="selectedType">
                    {character.talent2.caster ? "Spellcaster" : "Blademaster"}               
                    </div>
                <div className="selectedFlavor">
                    {character.talent2.description}
                </div>
                <div className="selectedRoles">
                    {character.talent2.role}
                </div>
                <div className="selectedComplexity">
                    Complexity: {character.talent2.complexity}
                </div>
                <div className="selectedSkills">
                    Preferred Skills: {character.talent2.prioritySkills}
                </div>
                <div className="selectedBonus">
                    Bonuses: <br/> +{character.talent2.hpBonus} Hit Point Maximum{character.talent2.caster && " | +3 Mana Bonus"}
                </div>
                <div className="selectedAbility">
                    Abilities: <br/> {character.talent2.ability1}
                </div>
                <div className="selectedAtts">
                    Attributes:
                </div>
                <div className="selectedAttributes"> 
                    <div className="att1">
                        <u>Interceptor</u> <br/> Interceptor
                    </div>
                    <div className="att2">
                        <u>Provoker</u> <br/> Provoker
                    </div>
                    <div className="att3">
                        <u>Tactician</u> <br/> Tactician
                    </div>
                    <div className="att4">
                        <u>Deflector</u> <br/> Deflector
                    </div>
                </div>
            </div>
            <div className="returnTalent" onClick={()=>{setShowSelected(false)}}>
                Return
            </div>
        </div>)}
    </div>
)
}