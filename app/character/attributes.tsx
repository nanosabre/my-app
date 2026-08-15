import { CalculatedState, Character, emptyCalculatedState, emptyLimitedState } from "@/types/characterTypes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Plus, Minus } from "lucide-react";
import "./attributes.css";
import { Attribute, Talent } from "@/types/talentTypes";
import { useGetAttributeList } from "@/hooks/useGetAttributeList";
import useCalculateState, { applyLimitedEffects } from "@/hooks/useCalculateState";
import { Effect } from "@/types/stateTypes";
import { useModifyEffect } from "@/hooks/operations/effectOperations";

const maxLevel = 8;

export default function attributes(character: Character, setCharacterData: Function, currentTab: string, setCalcState: Function) {
    //master list
    const [attributeList, setAttributeList] = useState<Attribute[]>([]);
    //lists of possible attributes for each talent
    const [attribute1List, setAttribute1List] = useState<Attribute[]>([]);
    const [attribute2List, setAttribute2List] = useState<Attribute[]>([]);
    //the fully calculated state of the character
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    //display only bonuses
    const [ancestryBonuses, setAncestryBonuses] = useState({ ...emptyLimitedState });
    const [keyBonuses, setkeyBonuses] = useState({ ...emptyLimitedState });
    //remaining points for point buy
    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense + character.attributeLevel);

    //gets attribute data from API
    useEffect(() => {
        useGetAttributeList().then(data => {
            setAttributeList(data.data.data.getAttributeList);
        })
    }, [])

    //any time this tab is currently selected, and there is a change to the active effects, recalculate the state and bonuses
    useEffect(() => {
        if (currentTab === "attributes") {
            setCalculatedState(useCalculateState(character));
            let limitedEffects = character.state.activeEffects.filter(ae => ae.description === "Ancestry");
            if (limitedEffects.length > 0)
                setAncestryBonuses(applyLimitedEffects(limitedEffects))
            limitedEffects = character.state.activeEffects.filter(ae => ae.description === "Keystone")
            if (limitedEffects.length > 0)
                setkeyBonuses(applyLimitedEffects(limitedEffects));
        }
    }, [currentTab, character.state.activeEffects])

    //anytime the tab's calculated state changes, update the master state.  needs to be removed
    useEffect(() => setCalcState(calculatedState), [calculatedState]);

    //when the talent changes, update the attribute select lists
    useEffect(() => {
        setAttribute1List(attributeList.filter(a => a.talentName === character.talent1.name) || [])
    }, [character.talent1])

    useEffect(() => {
        setAttribute2List(attributeList.filter(a => a.talentName === character.talent2.name) || [])
    }, [character.talent2])

    function activateKeystone(talent: Talent) {
        //if this talent has an associated keystone, then fin the keystone effect
        if (!character.state.activeEffects.find(e => e.name.includes(talent.name + " Keystone"))) {
            let effect = character.state.inactiveEffects.find(e => e.name.includes(talent.name + " Keystone"))
            //if the effect is found, add it to the list.
            if (effect)
                setCharacterData((prev: any) => ({
                    ...prev,
                    state: useModifyEffect(character.state, true, effect)
                }))
        }
    }

    function deactivateKeystone(talent: Talent) {
        //if this talent has an associated keystone effect, find the effect
        if (!character.state.inactiveEffects.find(e => e.name.includes(talent.name + " Keystone"))) {
            let effect = character.state.activeEffects.find(e => e.name.includes(talent.name + " Keystone"))
            // if the effect is found, remove it
            if (effect)
                setCharacterData((prev: any) => ({
                    ...prev,
                    state: useModifyEffect(character.state, false, effect)
                }))
        }
    }

    //when attribute is selected, add it to the respective list, then check for keystones
    function addAttribute(talent: boolean, attribute: Attribute) {
        if (!talent) {
            setCharacterData((prev: any) => ({
                ...prev,
                attributes1: character.attributes1?.concat(attribute)
            }))
            if (character.attributes1.length + 1 >= 2) activateKeystone(character.talent1);
        }
        else {
            setCharacterData((prev: any) => ({
                ...prev,
                attributes2: character.attributes2?.concat(attribute)
            }))
            if (character.attributes2.length + 1 >= 2) activateKeystone(character.talent2);
        }
    }
    //when attribute is selected, remove it from the respective list, then check for keystones
    function removeAttribute(talent: boolean, attribute: Attribute) {
        if (!talent) {
            setCharacterData((prev: any) => ({
                ...prev,
                attributes1: character.attributes1.filter(a => a.name != attribute.name)
            }))
            if (character.attributes1.length - 1 < 2) deactivateKeystone(character.talent1);
        }
        else {
            setCharacterData((prev: any) => ({
                ...prev,
                attributes2: character.attributes2.filter(a => a.name != attribute.name)
            }))
            if (character.attributes2.length - 1 < 2) deactivateKeystone(character.talent2);
        }
    }

    function setCharacterLevel(e: number) {
        //if the new level is less than the number of attributes selects, then reset both attribute lists
        if (e < character.attributes1.length + character.attributes2.length) {
            setCharacterData((prev: any) => ({
                ...prev,
                attributes1: [],
                attributes2: []
            }))
        }
        //set the level here.
        setCharacterData((prev: any) => ({
            ...prev,
            attributeLevel: e
        }))
    }
    //whenever a skill is changed via point buy. value is negative if reducing  
    const handleSkillChange = (e: string, value: number) => {
        //get current value of associated skill
        let skill = character[e];
        //type of check to remove warnings
        if (typeof skill == "number") {
            setCharacterData((prev: any) => ({
                ...prev,
                [e]: skill + value
            }))
        }
    }

    return (
        <div className="attributes">
            <div className="talent1name">
                {character.talent1.name}
            </div>
            <div className="level">
                <div className="levelName">
                    Level
                </div>
                <div className="levelSelect">
                    <select defaultValue={character?.attributeLevel?.toString()} onChange={(e) => { setCharacterLevel(Number(e.currentTarget.value)) }}>
                        {/*creates an array of the same size as the max level, the uses a map function and index to generate the level select options.*/ }
                        {[...Array(maxLevel+1)].map((x,i)=><option key={i} value={i} className="text-[32px]">{i}</option>)}
                    </select>
                </div>
            </div>
            <div className="talent2name">
                {character.talent2.name}
            </div>
            <div className="talent1attributes">
                {attribute1List.map((attribute: Attribute) => (
                    <div className="attributeContainer" key={attribute.name}>
                        {!(character.attributes1?.filter(a => attribute.name === a.name).length > 0) ? ((((character.attributes1.length + character.attributes2.length < character.attributeLevel) && (character.attributes1.length - character.attributes2.length < 2)) ? (
                            <div className="attributeNotSelected" onClick={() => { addAttribute(false, attribute) }}>
                                {attribute.name} <br /> {attribute.description1}
                            </div>) : (
                            <div className="attributeDisallowed">
                                {attribute.name} <br /> {attribute.description1}
                            </div>
                        ))
                        ) : (<div className="attributeSelected" onClick={() => { removeAttribute(false, attribute) }}>
                            {attribute.name} <br /> {attribute.description1}
                        </div>)}
                    </div>
                ))}
            </div>
            <div className="talent1stones">
                <div className={(character.attributes1.length < 2) ? ("keystone") : ("keystoneActive")}>
                    <u>{character.talent1.name} Keystone</u> <br /> {character.talent1.keystone}
                </div>
                <div className={(character.attributes1.length < 4) ? ("capstone") : ("capstoneActive")}>
                    <u>{character.talent1.name} Capstone</u> <br /> {character.talent1.capstone}
                </div>
            </div>
            <div className="talent2attributes">
                {attribute2List.map((attribute: Attribute) => (
                    <div className="attributeContainer" key={attribute.name}>
                        {!(character.attributes2?.filter(a => attribute.name === a.name).length > 0) ? ((((character.attributes1.length + character.attributes2.length < character.attributeLevel) && (character.attributes2.length - character.attributes1.length < 2)) ? (
                            <div className="attributeNotSelected" onClick={() => { addAttribute(true, attribute) }}>
                                {attribute.name} <br /> {attribute.description1}
                            </div>) : (
                            <div className="attributeDisallowed">
                                {attribute.name} <br /> {attribute.description1}
                            </div>
                        ))
                        ) : (<div className="attributeSelected" onClick={() => { removeAttribute(true, attribute) }}>
                            {attribute.name} <br /> {attribute.description1}
                        </div>)}
                    </div>
                ))}
            </div>
            <div className="talent2stones">
                <div className={(character.attributes2.length < 2) ? ("keystone") : ("keystoneActive")}>
                    <u> {character.talent2.name} Keystone</u> <br /> {character.talent2.keystone}
                </div>
                <div className={(character.attributes2.length < 4) ? ("capstone") : ("capstoneActive")}>
                    <u>{character.talent2.name} Capstone</u> <br /> {character.talent2.capstone}
                </div>
            </div>
            <div className="skillsTitle">
                Remaining Skill Points: {points}
            </div>
            <div className="fitness">
                Fitness
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={() => { handleSkillChange("baseFitness", -1) }} disabled={character.baseFitness == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFitness}</div>
                    <Button size="icon" onClick={() => { handleSkillChange("baseFitness", 1) }} disabled={(character.baseFitness == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {ancestryBonuses.fitness}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {keyBonuses.fitness}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{calculatedState.fitness}</div>

            </div>
            <div className="focus">
                Focus
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={() => { handleSkillChange("baseFocus", -1) }} disabled={character.baseFocus == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFocus}</div>
                    <Button size="icon" onClick={() => { handleSkillChange("baseFocus", 1) }} disabled={(character.baseFocus == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {ancestryBonuses.focus}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {keyBonuses.focus}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{calculatedState.focus}</div>
            </div>
            <div className="precision">
                Precision
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={() => { handleSkillChange("basePrecision", -1) }} disabled={character.basePrecision == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.basePrecision}</div>
                    <Button size="icon" onClick={() => { handleSkillChange("basePrecision", 1) }} disabled={(character.basePrecision == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {ancestryBonuses.precision}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {keyBonuses.precision}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{calculatedState.precision}</div>
            </div>
            <div className="sense">
                Sense
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={() => { handleSkillChange("baseSense", -1) }} disabled={character.baseSense == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseSense}</div>
                    <Button size="icon" onClick={() => { handleSkillChange("baseSense", 1) }} disabled={(character.baseSense == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="w-full border-1 border-black text-[20px]"> Ancestry: {ancestryBonuses.sense}</div>
                +
                <div className="w-full border-1 border-black text-[20px]">Keystones: {keyBonuses.sense}</div>
                =
                <div className="w-full border-1 border-black text-[20px]">Total: +{calculatedState.sense}</div>
            </div>



            <div className="skills1">
                <div className="w-full border-1 border-black text-[30px] text-left">Awareness: +{calculatedState.awareness}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Celerity: +{calculatedState.celerity}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Dexterity: +{calculatedState.dexterity}</div>
            </div>
            <div className="skills2">
                <div className="w-full border-1 border-black text-[30px] text-left">Evasion: +{calculatedState.evasion}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Subtlety: +{calculatedState.subtlety}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Tenacity: +{calculatedState.tenacity}</div>
            </div>
            <div className="skills3">
                <div className="w-full border-1 border-black text-[30px] text-left">Max Mana: {calculatedState.manaMax}</div>
                <div className="w-full border-1 border-black text-[30px] text-left">Spell Capacity: {calculatedState.spellCapacity}</div>
            </div>
            <div className="skills4">
                <div className="w-full border-1 border-black text-[30px] text-left">Wound Tolerance: {calculatedState.woundsMax}</div>
            </div>
        </div>
    )
}

function parseEffects(ancestryEffects: Effect[]) {
    throw new Error("Function not implemented.");
}
