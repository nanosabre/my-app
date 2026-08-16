import { CalculatedState, Character, emptyCalculatedState, emptyLimitedState } from "@/types/characterTypes";
import { useEffect, useState } from "react";
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

    //gets attribute data from API
    useEffect(() => {
        useGetAttributeList().then(data => {
            setAttributeList(data.data.data.getAttributeList);
        })
    }, [])

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
        </div>
    )
}

function parseEffects(ancestryEffects: Effect[]) {
    throw new Error("Function not implemented.");
}
