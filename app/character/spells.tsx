import { emptySpell, Spell } from "@/types/spellTypes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import "./spells.css";


const maxDomainSpells = 3;
const maxKeystoneSpells = 1;
const maxCapstoneSpells = 1;
const maxSpells = 12;
var currentDomainSpellCount = 0;
var currentKeystoneSpellCount = 0;
var currentCapstoneSpellCount = 0;



function generateSpellList() {
    var spells = [];
    for (let i = 0; i < 50; i++) {
        spells.push({...emptySpell});
        spells[i].name = i.toString() + " Spell Name";
        spells[i].manaCost = Math.round(i/10);
        spells[i].actionCost = Math.round(i/15).toString() + " Actions";
        spells[i].range = Math.round(i/3).toString() + "m";
        spells[i].description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ex ante. Phasellus ut sapien ac ipsum euismod hendrerit. Vestibulum congue interdum magna, ac aliquet odio posuere in. Integer pretium rhoncus faucibus. In porttitor bibendum neque scelerisque faucibus. Aliquam vitae blandit lorem. Vivamus dictum mollis nisi, sit amet tincidunt nunc congue et. Ut luctus rutrum nibh, non rhoncus nunc molestie in. Integer aliquet dictum mi nec fermentum.";
        if (i % 3 == 0) {
            spells[i].spellType = "Projection";
        }
        else if (i % 3 == 1) {
            spells[i].spellType = "Hex";
        }
        else if (i % 3 == 2) {
            spells[i].spellType = "Enchantment";
        }
        if (i % 4 == 0) {
            spells[i].source = "Domain";
        }
        else if (i % 4 == 1) {
            spells[i].source = "Covenant";
        }
        else if (i % 4 == 2) {
            spells[i].source = "Covenant Keystone";
        }
        else if (i % 4 == 3) {
            spells[i].source = "Covenant Capstone";
        }
    }
    return spells;
}

const filterList = ["Domain", "Covenant", "Covenant Keystone", "Covenant Capstone"];

function generateToggleStates(filterList:string[]) {
    let states : boolean[] = [];
    for (let i = 0; i < filterList.length; i++) {
        states.push(false);
    }
    return states;
}

const toggleList : boolean[] = generateToggleStates(filterList);

export default function spells() {
    const [allFilters, setAllFitlers] = useState(filterList);
    const [activeFilters, setActiveFilters] = useState(filterList);

    const [currentSpellList, setCurrentSpellList] = useState<Spell[]>([]);
    const [availableSpellList, setAvailableSpellList] = useState(generateSpellList());

    const [availableSpellsTable, setAvailableSpellsTable] = useState(buildAvailableSpellTable(generateSpellList()));
    const [activeCurrentSpellsTable, setActiveCurrentDisplayTable] = useState(buildCurrentSpellTable(currentSpellList));
    
    const [filterChecks, setFilterChecks] = useState(new Map());



    function validSpell(spell:Spell) {
        let spellSource = spell.source;
        if (currentSpellList.includes(spell)) {
            return (false);
        }
        if (spellSource == "Domain") {
            return (maxDomainSpells > currentDomainSpellCount);
        }
        else if (spellSource == "Covenant Keystone") {
            return (maxKeystoneSpells > currentKeystoneSpellCount);
        }
        else if (spellSource == "Covenant Capstone") {
            return (maxCapstoneSpells > currentCapstoneSpellCount);
        }
        else {
            return (maxSpells > currentSpellList.length);
        }
    }

    function buildAvailableSpellTable(spellList: Spell[]) {
        return (
        <div className="availableTable">
            {spellList.map((spell: Spell) => (
                <div key={spell.name} className={(validSpell(spell)) ? ("cell") : ("disabledCell")}>
                    <div onClick={()=>{addSpell(spell)}} className={(validSpell(spell)) ? ("w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]") : ("w-[30px] bg-[#cccccc] hover:bg-[#cc0000]")}>
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
                    {(activeFilters.length == 0) ? ("No Filters Selected"):("")}
                </div>
                ))}
        </div>)
    }

    function buildCurrentSpellTable(spellList: Spell[]) {
        return (
        <div className="currentTable">
            {spellList.map((spell: Spell) => (
                <div className="cell" key={spell.name}>
                    <div onClick={()=>{removeSpell(spell)}} className="w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]">
                        -
                    </div>
                    <Accordion>
                        <AccordionItem>
                            <AccordionTrigger>
                                <div className="cellContentName" >{spell.name}</div>
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

    function addSpell(spell:Spell) {
        if ((currentSpellList.indexOf(spell) == -1) && (validSpell(spell))) {
            let temp = currentSpellList;
            temp.push(spell);
            setCurrentSpellList(temp);
            if (spell.source == "Domain") {
                currentDomainSpellCount += 1;
            }
            else if (spell.source == "Covenant Keystone") {
                currentKeystoneSpellCount += 1;
            }
            else if (spell.source == "Covenant Capstone") {
                currentCapstoneSpellCount += 1;
            }
            updateCurrentSpellTable();
            updateAvailableSpellTable();
        }
    }

    function removeSpell(spell:Spell) {
        let index = currentSpellList.indexOf(spell);
        if ( index != -1) {
            let temp = currentSpellList;
            temp.splice(index, 1);
            setCurrentSpellList(temp);
            if (spell.source == "Domain") {
                currentDomainSpellCount -= 1;
            }
            else if (spell.source == "Covenant Keystone") {
                currentKeystoneSpellCount -= 1;
            }
            else if (spell.source == "Covenant Capstone") {
                currentCapstoneSpellCount -= 1;
            }
            updateCurrentSpellTable();
            updateAvailableSpellTable();
        }
    }

    function filterAvailableSpells(e:boolean, filter:string) {
        if (activeFilters.length == allFilters.length) {
            let temp = [filter]
            setActiveFilters(temp);

            let tempMap = new Map(filterChecks);
            [...tempMap.keys()].forEach(key=>{tempMap.set(key, true)});
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

    useEffect(() => {updateAvailableSpellTable()},[activeFilters]);
    useEffect(() => {
        let checks = new Map();
        allFilters.forEach(filter=>checks.set(filter, false));
        setFilterChecks(checks);
    }, [])

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
        setActiveCurrentDisplayTable(buildCurrentSpellTable(currentSpellList));
    }

    function updateAvailableSpellTable() {
        let filteredSpells : Spell[] = [];
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
        [...tempMap.keys()].forEach(key=>{tempMap.set(key, false)});
        setFilterChecks(tempMap);
    }

    return (
    <div className="spells">
        <div className="currentHeader">
            Chosen Spells
        </div>
        {activeCurrentSpellsTable}
        <div className="info1">
            Domain Spells : ({currentDomainSpellCount}/{maxDomainSpells}) <br/>
            Class Spells: ({currentSpellList.length-currentDomainSpellCount-currentKeystoneSpellCount-currentCapstoneSpellCount}/{maxSpells-maxDomainSpells-maxKeystoneSpells-maxCapstoneSpells}) <br/>
            Keystone Spells: ({currentKeystoneSpellCount}/{maxKeystoneSpells}) <br/>
            Capstone Spells: ({currentCapstoneSpellCount}/{maxCapstoneSpells})

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