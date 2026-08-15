import "./skills.css";
import { CalculatedState, Character, emptyCalculatedState, emptyLimitedState } from "@/types/characterTypes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Plus, Minus } from "lucide-react";
import { Attribute, Talent } from "@/types/talentTypes";
import { useGetAttributeList } from "@/hooks/useGetAttributeList";
import useCalculateState, { applyLimitedEffects } from "@/hooks/useCalculateState";
import { Effect } from "@/types/stateTypes";
import { useModifyEffect } from "@/hooks/operations/effectOperations";

export default function skills(character: Character, setCharacterData: Function, currentTab: string, setCalcState: Function) {
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [ancestryBonuses, setAncestryBonuses] = useState({ ...emptyLimitedState });
    const [keyBonuses, setkeyBonuses] = useState({ ...emptyLimitedState });

    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense - (-character.attributeLevel));
    const increaseSkill = (e: any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
                ...prev,
                [e]: name + 1
            }))
        }
    }

    const decreaseSkill = (e: any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
                ...prev,
                [e]: name - 1
            }))
        }
    }

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
    }, [currentTab, character])


    return (
        <div>
            <div className="skillsTitle">
                Remaining Skill Points: {points}
            </div>
            <div className="fitness">
                Fitness
                <ButtonGroup className="w-full">
                    <Button size="icon" onClick={() => { decreaseSkill("baseFitness") }} disabled={character.baseFitness == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFitness}</div>
                    <Button size="icon" onClick={() => { increaseSkill("baseFitness") }} disabled={(character.baseFitness == 6) || (points <= 0)}><Plus /></Button>
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
                    <Button size="icon" onClick={() => { decreaseSkill("baseFocus") }} disabled={character.baseFocus == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseFocus}</div>
                    <Button size="icon" onClick={() => { increaseSkill("baseFocus") }} disabled={(character.baseFocus == 6) || (points <= 0)}><Plus /></Button>
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
                    <Button size="icon" onClick={() => { decreaseSkill("basePrecision") }} disabled={character.basePrecision == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.basePrecision}</div>
                    <Button size="icon" onClick={() => { increaseSkill("basePrecision") }} disabled={(character.basePrecision == 6) || (points <= 0)}><Plus /></Button>
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
                    <Button size="icon" onClick={() => { decreaseSkill("baseSense") }} disabled={character.baseSense == 0}><Minus /></Button>
                    <div className="w-full border-1 border-black text-[20px]">{character?.baseSense}</div>
                    <Button size="icon" onClick={() => { increaseSkill("baseSense") }} disabled={(character.baseSense == 6) || (points <= 0)}><Plus /></Button>
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