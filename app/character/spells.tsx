import { Spell, SpellDAO } from "@/types/spellTypes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import "./spells.css";
import { CalculatedState, Character } from "@/types/characterTypes";
import { useGetFilteredSpells } from "@/hooks/useGetFilteredSpells";
import { Talent, Attribute } from "@/types/talentTypes";

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

    //when the current spell list changes, rebuild the tables
    useEffect(() => {
        updateAvailableSpellTable();
        updateCurrentSpellTable();
    }, [currentSpellList])

    //build the list of filter strings that get sent to the backend API
    function buildFilterList() {
        let result: string[] = []
        createTalentFilterList(character.talent1, character.attributes1, result);
        createTalentFilterList(character.talent2, character.attributes2, result);
        setAllFilters(result);
        setActiveFilters(result);
        return result;
    }

    //for a given talent, add all applicable spell filter strings to the list
    function createTalentFilterList(talent: Talent, attributes: Attribute[], result: string[]){
        if (talent.caster) {
            attributes.forEach(a => result.push(a.name + " Spell"))
            result.push(talent.name + " Spell")
            if (attributes.length >= 2)
                result.push(talent.name + " Keystone")
            if (attributes.length == 4)
                result.push(talent.name + " Capstone")
        }
    }

    //returns true if a spell meets all conditions to be selected from the available spell list 
    //non-valid spells will be disabled in the available spell table
    function validSpell(spell: Spell) {
        let spellSource = spell.source;
        //cannot already be selected
        if (currentSpellList.find(sd => sd.spell.name === spell.name)) {
            return (false);
        }
        //cannot add more spells than the maximum available (for it's type)
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

    //builds the selectable spell table
    function buildAvailableSpellTable(spellList:Spell[]) {
        return (
            <div className="availableTable">
                {(activeFilters.length == 0) ? ("No Filters Selected") : spellList.map((spell: Spell) => (
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
                    </div>
                ))}
            </div>)
    }

    //builds the current spell table.
    function buildCurrentSpellTable() {
        return (
            <div className="currentTable">
                {currentSpellList.map((spelld: SpellDAO) => (
                    <div className="cell" key={spelld.spell.name}>
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
                        <div onClick={() => { removeSpell(spelld) }} className="w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]">
                            -
                        </div>
                    </div>

                ))}
            </div>)
    }

    function addSpell(spell: Spell) {
        //if the spell does not already exist in the currentSpellList and is a valid spell, then...
        if (currentSpellList.find(s => s.spell.name === spell.name) == undefined && (validSpell(spell))) {
            let temp = [...currentSpellList];
            //create a new spellDAO object
            let spelld: SpellDAO = { spellCharacter: { id: null, characterId: character.id || "", spellId: spell.id }, spell: spell }
            temp.push(spelld);
            setCurrentSpellList(temp);
            setCharacterSpells(temp);
            //update relevant count
            updateSpellCounts(spelld.spell.source, true);
        }
    }


    function removeSpell(spelld: SpellDAO) {
        //remove the spell from the list
        let temp = currentSpellList.filter(s => s.spell.name != spelld.spell.name)
        setCurrentSpellList(temp);
        setCharacterSpells(temp);
        //update relevant count
        updateSpellCounts(spelld.spell.source, false);
        
    }

    function updateSpellCounts(source:string, direction: boolean) {
        let q = direction ? 1 : -1
        if (source.includes("Domain")) {
            spellCounts.domain += q
        }
        else if (source === character.talent1.name + " Keystone") {
            spellCounts.keystone1 += q
        }
        else if (source === character.talent1.name + " Capstone") {
            spellCounts.capstone1 += q
        }
        else if (source === character.talent2.name + " Keystone") {
            spellCounts.keystone2 += q
        }
        else if (source === character.talent2.name + " Capstone") {
            spellCounts.capstone2 += q
        }
    }

    //applies filter 
    function filterAvailableSpells(e: boolean, filter: string) {
        //if all filters are active, clicking one of the filters deactivates all others
        if (activeFilters.length == allFilters.length) {
            console.log(filterChecks);
            let temp = [filter]
            setActiveFilters(temp);

            let tempMap = new Map(filterChecks);
            [...tempMap.keys()].forEach(key => { tempMap.set(key, true) });
            tempMap.set(filter, false);
            setFilterChecks(tempMap);
        }
        //activate a filter
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
        //deactivate
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

    //when the filters change, rebuild the table
    useEffect(() => { updateAvailableSpellTable() }, [activeFilters]);
    //when the filters update, update the associated map
    useEffect(() => {
        let checks = new Map();
        allFilters.forEach(filter => checks.set(filter, false));
        setFilterChecks(checks);
    }, [allFilters])

    //create the buttons for each filter
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

    //updates the spell tables
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
        setAvailableSpellsTable(buildAvailableSpellTable(filteredSpells));
    }

    //see tin
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
                Class Spells: ({currentSpellList.length - spellCounts.domain - spellCounts.keystone1 - spellCounts.keystone2 - spellCounts.capstone1 - spellCounts.capstone2}/{calculatedState.spellCapacity})
            </div>
            <div className="info2">
                Keystone Spells: ({spellCounts.keystone1 + spellCounts.keystone2}/{(character.talent1.caster ? maxKeystoneSpells : 0) + (character.talent2.caster ? maxKeystoneSpells : 0)}) <br />
                Capstone Spells: ({spellCounts.capstone1 + spellCounts.capstone2}/{(character.talent1.caster ? maxCapstoneSpells : 0) + (character.talent2.caster ? maxCapstoneSpells : 0)})
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