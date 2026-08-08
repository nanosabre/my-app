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

export default function attributes(character: Character, setCharacterData: Function, currentTab: string) {
    const [attrib1Counter, setattrib1Counter] = useState(0);
    const [attrib2Counter, setattrib2Counter] = useState(0);
    const [attributeList, setAttrubuteList] = useState<Attribute[]>([]);
    const [attribute1List, setAttrubute1List] = useState<Attribute[]>([]);
    const [attribute2List, setAttrubute2List] = useState<Attribute[]>([]);
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [ancestryBonuses, setAncestryBonuses] = useState({ ...emptyLimitedState });
    const [keyBonuses, setkeyBonuses] = useState({ ...emptyLimitedState });

    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense - (-character.attributeLevel));

    useEffect(() => {
        useGetAttributeList().then(data => {
            setAttrubuteList(data.data.data.getAttributeList);
        })
    }, [])

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

    useEffect(() => {
        setAttrubute1List(attributeList.filter(a => a.talentName === character.talent1.name))
        setAttrubute2List(attributeList.filter(a => a.talentName === character.talent2.name))
    }, [character.talent1, character.talent2])

    function activateKeystone(talent: Talent) {
        if (!character.state.activeEffects.find(e => e.name.includes(talent.name + " Keystone"))) {
            let effect = character.state.inactiveEffects.find(e => e.name.includes(talent.name + " Keystone"))
            if (effect)
                setCharacterData((prev: any) => ({
                    ...prev,
                    state: useModifyEffect(character.state, true, effect)
                }))
        }
    }

        function deactivateKeystone(talent: Talent) {
            console.log("touchee");
            if (!character.state.inactiveEffects.find(e => e.name.includes(talent.name + " Keystone"))) {
                let effect = character.state.activeEffects.find(e => e.name.includes(talent.name + " Keystone"))
                if (effect)
                    setCharacterData((prev: any) => ({
                        ...prev,
                        state: useModifyEffect(character.state, false, effect)
                    }))
            }
        }

        //todo skill value recalculation on ancestry+talent change

        function addAttribute(talent: boolean, attribute: Attribute) {
            if (!talent) {
                setCharacterData((prev: any) => ({
                    ...prev,
                    attributes1: character.attributes1?.concat(attribute)
                }))
                setattrib1Counter(attrib1Counter + 1);
                if (character.attributes1.length + 1 >= 2) activateKeystone(character.talent1);
            }
            else {
                setCharacterData((prev: any) => ({
                    ...prev,
                    attributes2: character.attributes2?.concat(attribute)
                }))
                setattrib2Counter(attrib2Counter + 1);
                if (character.attributes2.length + 1 >= 2) activateKeystone(character.talent2);
            }
        }

        function removeAttribute(talent: boolean, attribute: Attribute) {
            if (!talent) {
                setCharacterData((prev: any) => ({
                    ...prev,
                    attributes1: character.attributes1.filter(a => a.name != attribute.name)
                }))
                if (character.attributes1.length - 1 < 2) deactivateKeystone(character.talent1);
                setattrib1Counter(attrib1Counter - 1);
            }
            else {
                setCharacterData((prev: any) => ({
                    ...prev,
                    attributes2: character.attributes2.filter(a => a.name != attribute.name)
                }))
                if (character.attributes2.length - 1 < 2) deactivateKeystone(character.talent2);
                setattrib2Counter(attrib2Counter - 1);
            }
        }

        function setCharacterLevel(e: number) {
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
                    {character.talent2.name}
                </div>
                <div className="talent1attributes">
                    {attribute1List.map((attribute: Attribute) => (
                        <div className="attributeContainer" key={attribute.name}>
                            {!(character.attributes1?.filter(a => attribute.name === a.name).length > 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
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
                    <div className={(attrib1Counter < 2) ? ("keystone") : ("keystoneActive")}>
                        <u>{character.talent1.name} Keystone</u> <br /> {character.talent1.keystone}
                    </div>
                    <div className={(attrib1Counter < 4) ? ("capstone") : ("capstoneActive")}>
                        <u>{character.talent1.name} Capstone</u> <br /> {character.talent1.capstone}
                    </div>
                </div>
                <div className="talent2attributes">
                    {attribute2List.map((attribute: Attribute) => (
                        <div className="attributeContainer" key={attribute.name}>
                            {!character.attributes2?.includes(attribute) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
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
                    <div className={(attrib2Counter < 2) ? ("keystone") : ("keystoneActive")}>
                        <u> {character.talent2.name} Keystone</u> <br /> {character.talent2.keystone}
                    </div>
                    <div className={(attrib2Counter < 4) ? ("capstone") : ("capstoneActive")}>
                        <u>{character.talent2.name} Capstone</u> <br /> {character.talent2.capstone}
                    </div>
                </div>
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

    function parseEffects(ancestryEffects: Effect[]) {
        throw new Error("Function not implemented.");
    }
