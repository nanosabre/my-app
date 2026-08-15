import { Spell, SpellDAO } from "@/types/spellTypes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import "./spells.css";
import { CalculatedState, Character } from "@/types/characterTypes";
import { useGetFilteredSpells } from "@/hooks/useGetFilteredSpells";

//constant values.  may need to be removed to enums file.
const maxDomainSpells = 3;
const maxKeystoneSpells = 1;
const maxCapstoneSpells = 1;
//the running count for each special spell type
var spellCounts = {
    domain: 0,
    keystone1: 0,
    keystone2: 0,
    capstone1: 0,
    capstone2: 0
}

export default function spells(character: Character, currentTab: string, calculatedState: CalculatedState, setCharacterSpells : Function) {
    //filters for the filter display
    const [allFilters, setAllFilters] = useState<string[]>([]);
    //currently active filters
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    //spells the character actually has
    const [currentSpellList, setCurrentSpellList] = useState<SpellDAO[]>([]);
    //spells the character can have
    const [availableSpellList, setAvailableSpellList] = useState<Spell[]>([]);

    //table elements for the above lists
    const [availableSpellsTable, setAvailableSpellsTable] = useState(buildAvailableSpellTable([]));
    const [activeCurrentSpellsTable, setActiveCurrentDisplayTable] = useState(buildCurrentSpellTable());

    //map of each filter and if it is active or not.
    const [filterChecks, setFilterChecks] = useState(new Map());


    //get data from API, but only when on the spells tab
    useEffect(() => {
        if (currentTab === "spells")
            useGetFilteredSpells(buildFilterList()).then(data => {
                setAvailableSpellList(data.data.data.getFilteredSpells);
            })
    }, [character, currentTab])

    //whenever the available spell list is refreshed, filter out any spells the character can no longer have
    useEffect(() => {
        //filters out any spell that doesn't have a source included in the filter list.
        setCurrentSpellList((prev:any)=>[...prev].filter(sd=>allFilters.findIndex(f=>f===sd.spell.source)!=-1))
    }, [availableSpellList])

    useEffect(() => {
        updateAvailableSpellTable();
        updateCurrentSpellTable();
    }, [currentSpellList])

    function buildFilterList() {
        let result: string[] = []
        if (character.talent1.caster) {
            character.attributes1.forEach(a => result.push(a.name + " Spell"))
            result.push(character.talent1.name + " Spell")
            if (character.attributes1.length >= 2)
                result.push(character.talent1.name + " Keystone")
            if (character.attributes1.length == 4)
                result.push(character.talent1.name + " Capstone")
        }
        if (character.talent2.caster) {
            character.attributes2.forEach(a => result.push(a.name + " Spell"))
            result.push(character.talent2.name + " Spell")
            if (character.attributes2.length >= 2)
                result.push(character.talent2.name + " Keystone")
            if (character.attributes2.length == 4)
                result.push(character.talent2.name + " Capstone")
        }
        setAllFilters(result);
        setActiveFilters(result);
        return result;
    }

    function validSpell(spell: Spell) {
        let spellSource = spell.source;
        if (currentSpellList.find(sd => sd.spell.name === spell.name)) {
            return (false);
        }
        if (spellSource.includes("Domain")) {
            return (maxDomainSpells > spellCounts.domain);
        }
        else if (spellSource === character.talent1.name + " Keystone") {
            return (maxKeystoneSpells > spellCounts.keystone1);
        }
        else if (spellSource === character.talent2.name + " Keystone") {
            return (maxKeystoneSpells > spellCounts.keystone2);
        }
        else if (spellSource === character.talent1.name + " Capstone") {
            return (maxCapstoneSpells > spellCounts.capstone1);
        }
        else if (spellSource === character.talent2.name + " Capstone") {
            return (maxCapstoneSpells > spellCounts.capstone2);
        }
        else {
            return (calculatedState.spellCapacity > currentSpellList.filter(s=>![" Capstone", " Keystone", "Domain"].some(t=>s.spell.source.includes(t))).length);
        }
    }

    function buildAvailableSpellTable(spellList:Spell[]) {
        return (
            <div className="availableTable">
                {spellList.map((spell: Spell) => (
                    <div key={spell.name} className={(validSpell(spell)) ? ("cell") : ("disabledCell")}>
                        <div onClick={() => { addSpell(spell) }} className={(validSpell(spell)) ? ("w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]") : ("w-[30px] bg-[#cccccc] hover:bg-[#cc0000]")}>
                            +
                        </div>
                        <Accordion>
                            <AccordionItem>
                                <AccordionTrigger>
                                    <div className="cellContentName">{spell.name}</div>
                                    <div className="cellContentMedium">{spell.manaCost} Mana</div>
                                    <div className="cellContentMedium">{spell.actionCost}</div>
                                    <div className="cellContentShort">{spell.range}</div>
                                    <div className="cellContentLong">{spell.spellType}</div>
                                    <div className="cellContentLong">{spell.source}</div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="cellDescription">
                                        {spell.description}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        {(activeFilters.length == 0) ? ("No Filters Selected") : ("")}
                    </div>
                ))}
            </div>)
    }

    function buildCurrentSpellTable() {
        return (
            <div className="currentTable">
                {currentSpellList.map((spelld: SpellDAO) => (
                    <div className="cell" key={spelld.spell.name}>
                        <div onClick={() => { removeSpell(spelld) }} className="w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]">
                            -
                        </div>
                        <Accordion>
                            <AccordionItem>
                                <AccordionTrigger>
                                    <div className="cellContentName" >{spelld.spell.name}</div>
                                    <div className="cellContentMedium">{spelld.spell.manaCost} Mana</div>
                                    <div className="cellContentMedium">{spelld.spell.actionCost}</div>
                                    <div className="cellContentShort">{spelld.spell.range}</div>
                                    <div className="cellContentLong">{spelld.spell.spellType}</div>
                                    <div className="cellContentLong">{spelld.spell.source}</div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="cellDescription">
                                        {spelld.spell.description}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                ))}
            </div>)
    }

    //TODO on save check all inventory and spell items and make sure characterId is correct (might be done in back end?)
    function addSpell(spell: Spell) {
        if (currentSpellList.find(s => s.spell.name === spell.name) == undefined && (validSpell(spell))) {
            let temp = [...currentSpellList];
            let spelld: SpellDAO = { spellCharacter: { id: null, characterId: character.id || "", spellId: spell.id }, spell: spell }
            temp.push(spelld);
            setCurrentSpellList(temp);
            setCharacterSpells(temp);
            if (spelld.spell.source.includes("Domain")) {
                spellCounts.domain += 1
            }
            else if (spelld.spell.source === character.talent1.name + " Keystone") {
                spellCounts.keystone1 += 1
            }
            else if (spelld.spell.source === character.talent1.name + " Capstone") {
                spellCounts.capstone1 += 1
            }
            else if (spelld.spell.source === character.talent2.name + " Keystone") {
                spellCounts.keystone2 += 1
            }
            else if (spelld.spell.source === character.talent2.name + " Capstone") {
                spellCounts.capstone2 += 1
            }
        }
    }

    function removeSpell(spelld: SpellDAO) {
        let temp = currentSpellList.filter(s => s.spell.name != spelld.spell.name)
        setCurrentSpellList(temp);
        setCharacterSpells(temp);
        if (spelld.spell.source.includes("Domain")) {
            spellCounts.domain -= 1
        }
        else if (spelld.spell.source === character.talent1.name + " Keystone") {
            spellCounts.keystone1 -= 1
        }
        else if (spelld.spell.source === character.talent1.name + " Capstone") {
            spellCounts.capstone1 -= 1
        }
        else if (spelld.spell.source === character.talent2.name + " Keystone") {
            spellCounts.keystone2 -= 1
        }
        else if (spelld.spell.source === character.talent2.name + " Capstone") {
            spellCounts.capstone2 -= 1
        }
    }

    function filterAvailableSpells(e: boolean, filter: string) {
        if (activeFilters.length == allFilters.length) {
            console.log(filterChecks);
            let temp = [filter]
            setActiveFilters(temp);

            let tempMap = new Map(filterChecks);
            [...tempMap.keys()].forEach(key => { tempMap.set(key, true) });
            tempMap.set(filter, false);
            setFilterChecks(tempMap);
        }
        else if (e) {
            if (activeFilters.indexOf(filter) == -1) {
                let temp = [...activeFilters];
                temp.push(filter);
                setActiveFilters(temp);

                let tempMap = new Map(filterChecks);
                tempMap.set(filter, !e);
                setFilterChecks(tempMap);
            }
        }
        else {
            let index = activeFilters.indexOf(filter);
            if (index != -1) {
                let temp = [...activeFilters];
                temp.splice(index, 1);
                setActiveFilters(temp);

                let tempMap = new Map(filterChecks);
                tempMap.set(filter, !e);
                setFilterChecks(tempMap);
            }
        }

    }

    useEffect(() => { updateAvailableSpellTable() }, [activeFilters]);
    useEffect(() => {
        let checks = new Map();
        allFilters.forEach(filter => checks.set(filter, false));
        setFilterChecks(checks);
    }, [allFilters])

    function buildFilterButtons() {
        let temps = [];
        for (let i = 0; i < allFilters.length; i++) {
            let fil = allFilters[i];
            let temp = (
                <Toggle key={fil} variant="outline" onPressedChange={(pressed) => (filterAvailableSpells(!pressed, fil))} pressed={filterChecks.get(fil)} className="bg-[#aaaaaa] text-[28px] cursor-pointer">
                    {fil}
                </Toggle>
            )
            temps.push(temp);
        }
        return temps;
    }

    function updateCurrentSpellTable() {
        setActiveCurrentDisplayTable(buildCurrentSpellTable());
    }

    function updateAvailableSpellTable() {
        let filteredSpells: Spell[] = [];
        for (let i = 0; i < availableSpellList.length; i++) {
            if (activeFilters.includes(availableSpellList[i].source)) {
                filteredSpells.push(availableSpellList[i]);
            }
        } 
        //setActiveAvailableSpells(filteredSpells);
        setAvailableSpellsTable(buildAvailableSpellTable(filteredSpells));
    }

    function resetFilters() {
        setActiveFilters(allFilters);
        let tempMap = new Map(filterChecks);
        [...tempMap.keys()].forEach(key => { tempMap.set(key, false) });
        setFilterChecks(tempMap);
    }

    return (
        <div className="spells">
            <div className="currentHeader">
                Chosen Spells
            </div>
            {activeCurrentSpellsTable}
            <div className="info1">
                Domain Spells : ({spellCounts.domain}/{maxDomainSpells}) <br />
                Class Spells: ({currentSpellList.length - spellCounts.domain - spellCounts.keystone1 - spellCounts.keystone2 - spellCounts.capstone1 - spellCounts.capstone2}/{calculatedState.spellCapacity}) <br />
                Keystone Spells: ({spellCounts.keystone1 + spellCounts.keystone2}/{(character.talent1.caster ? maxKeystoneSpells : 0) + (character.talent2.caster ? maxKeystoneSpells : 0)}) <br />
                Capstone Spells: ({spellCounts.capstone1 + spellCounts.capstone2}/{(character.talent1.caster ? maxCapstoneSpells : 0) + (character.talent2.caster ? maxCapstoneSpells : 0)})

            </div>
            <div className="info2">
                Long Description
            </div>
            <div className="filter">
                Filters:
                <div className="showAll" onClick={() => (resetFilters())}>
                    All
                </div>
                {buildFilterButtons()}
            </div>
            {availableSpellsTable}
            <div className="free">
                Free
            </div>
        </div>
    )
}