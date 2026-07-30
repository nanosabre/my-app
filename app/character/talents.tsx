import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import "./talents.css";
import { Talent } from "@/types/talentTypes";
import { useGetTalentScreen } from "@/hooks/useGetTalentScreen";
import { Effect } from "@/types/stateTypes";
import { useModifyEffect } from "@/hooks/operations/effectOperations";

export default function talents(character:Character,setCharacterData:Function) {
    const [talentSelection, setTalentSelection] = useState(true);
    const [readySelection, setReadySelection] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [talentList, setTalentList] = useState<Talent[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([]);

    useEffect(()=>{
        useGetTalentScreen().then((data)=>{
            setTalentList(data.data.data.getTalentScreen.talents);
            setEffectList(data.data.data.getTalentScreen.effects);
        })
    },[])

    const setTalent = (e:Talent)=> {
        let effects = effectList.filter(e=>e.name.includes(e.name));
        let state = character.state;
        if (e.name == character.talent1.name) {
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent1.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent1.name));
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: 0,
            talent1: "",
            state: {...state}
            }))
            setTalentSelection(true);
        }
        else if (e.name == character.talent2.name) {
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent2.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent2.name));
            setCharacterData((prev: any) => ({
            ...prev,
            attribute2: 0,
            talent2: "",
            state: {...state}
            }))
            setReadySelection(false);
        }
        else if (talentSelection) {
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent1: e,
            state: {...state}
            }))
            setTalentSelection(false);
        }
        else if (!readySelection) {
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent2: e,
            state: {...state}
            }))
            setReadySelection(true);
        }

    }

    function buildTalentCards() {
        return(<div className="talentChoices">
            {talentList.map((talent:Talent)=>(
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
                    ): (<div className="cardBack">
                            <div className="cardBackName">
                                {talent.name}
                            </div>
                            <div className="cardDesc">
                                {talent.description}
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
        ): (
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