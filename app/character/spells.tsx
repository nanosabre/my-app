import { emptySpell, Spell } from "@/types/spellTypes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import "./spells.css";


const max0spells = 3;
const max1spells = 1;
const maxSpells = 6;
var current0spells = 0;
var current1spells = 0;




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

    const [availableSpellsTable, setAvailableSpellsTable] = useState(spellsMapper(generateSpellList()));
    const [activeCurrentSpellsTable, setActiveCurrentDisplayTable] = useState(currentSpellsMapper(currentSpellList));
    
    const [filterChecks, setFilterChecks] = useState(new Map());



    function validSpell(spell:Spell) {
        let spellSource = spell.source;
        if (currentSpellList.includes(spell)) {
            return (false);
        }
        if (spellSource == "Domain") {
            return (max0spells > current0spells);
        }
        else if (spellSource == "Covenant Keystone") {
            return (max1spells > current1spells);
        }
        else {
            return (maxSpells > currentSpellList.length);
        }
    }

    function spellsMapper(spellList: Spell[]) {
        return (
        <div className="availableTable">{
            spellList.map((spell: Spell) => (
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

    function currentSpellsMapper(spellList: Spell[]) {
        return (
        <div className="currentTable">{
            spellList.map((spell: Spell) => (
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
                current0spells += 1;
            }
            else if (spell.source == "Covenant Keystone") {
                current1spells += 1;
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
                current0spells -= 1;
            }
            else if (spell.source == "Covenant Keystone") {
                current1spells -= 1;
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

    function availableFilterDivs() {
        let temps = [];
        for (let i = 0; i < allFilters.length; i++) {
            let fil = allFilters[i];
            let temp = (
                <Toggle key={fil} variant="outline" onPressedChange={(pressed) => (filterAvailableSpells(!pressed, fil))} pressed={filterChecks.get(fil)} className="bg-[#aaaaaa] text-[28px]">
                    {fil}
                </Toggle>
            )
            temps.push(temp);
        }
        return temps;
    }

    function updateCurrentSpellTable() {
        setActiveCurrentDisplayTable(currentSpellsMapper(currentSpellList));
    }

    function updateAvailableSpellTable() {
        let filteredSpells : Spell[] = [];
        for (let i = 0; i < availableSpellList.length; i++) {
            if (activeFilters.includes(availableSpellList[i].source)) {
                filteredSpells.push(availableSpellList[i]);
            }
        }
        //setActiveAvailableSpells(filteredSpells);
        setAvailableSpellsTable(spellsMapper(filteredSpells));
    }

    function resetFilters() {
        setActiveFilters(allFilters);
        let tempMap = new Map(filterChecks);
        [...tempMap.keys()].forEach(key=>{tempMap.set(key, false)});
        setFilterChecks(tempMap);
    }

    return (
    <div className="spells">
        <div className="selectedList">
            Selected Spells Table
            {activeCurrentSpellsTable}
        </div>
        <div className="info justify-self-center justify-text-center">
            Current Spell Number: {current0spells} / {current1spells} / {currentSpellList.length} 
        </div>
        <div className="filter">
            Filters: 
            <div className="showAll" onClick={() => (resetFilters())}>
                    All
            </div>
            {availableFilterDivs()}
        </div>
        {availableSpellsTable}
        <div className="free">
            Free
        </div>
    </div>
)
}