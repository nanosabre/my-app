import { useState } from "react";
import { emptyItem, InventoryDAO, Item } from "@/types/itemTypes";
import "./sheet.css";
import { Character } from "@/types/characterTypes";
import { SpellDAO } from "@/types/spellTypes";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const displayFilters = ["Supplies", "Currency"];

export default function sheet(character : Character, characterInventory : InventoryDAO[], characterSpells : SpellDAO[]) {

    function makeInventoryRows() {
        return (
            <div className="itemTable">
                {characterInventory.filter(i=>!displayFilters.includes(i.item.itemType)).map((item: InventoryDAO) => (
                    <div className="itemTableRow" key={item.item.name}>
                        <div className="itemTableName">{item.item.name}</div>
                        <div className="itemTableQTY">{item.inventory.quantity}</div>
                        <div className="itemTableType">{item.item.itemType}</div>
                        <div className="itemTableDesc">{item.item.description}</div>
                    </div>
                ))}
            </div>
        )
    }

    function buildCurrentSpellTable() {
        return (
            <div className="spellTable">
                {characterSpells.map((spelld: SpellDAO) => (
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
                    </div>

                ))}
            </div>)
    }


    const inventoryRows = makeInventoryRows();
    
    return (
    <div className="sheet">
        <div className="invPanel">
            <div className="invTitle">
                Inventory
            </div>
            <div className="currencies">
                <div className="currencyHead">
                    Currencies
                </div>
                <div className="currencyTotal"><div className="text-[28px]">1,234c</div></div>
                <div className="currencyDenom1"><div className="text-[24px]">1p</div> </div>
                <div className="currencyDenom2"><div className="text-[24px]">2g</div> </div>
                <div className="currencyDenom3"><div className="text-[24px]">3s</div> </div>
                <div className="currencyDenom4"><div className="text-[24px]">4c</div> </div>
            </div>
            <div className="supplies">
                <div className="suppliesHead">
                    Supplies
                </div>
                <div className="suppliesFood"><div className="text-[28px]">1 Food</div></div>
                <div className="suppliesWater"><div className="text-[28px]">1 Water</div></div>
                <div className="suppliesSalves"><div className="text-[28px]">3 Salves</div></div>
            </div>
            <div className="reagents">
                <div className="reagentsHead">
                    Reagents
                </div>
                <div className="reagentsOrdinary"><div className="text-[24px]">16 (o)</div></div>
                <div className="reagentsUncommon"><div className="text-[24px]">7 (u)</div> </div>
                <div className="reagentsRare"><div className="text-[24px]">3 (r)</div></div>
                <div className="reagentsLegendary"><div className="text-[24px]">1 (L)</div> </div>
            </div>
            <div className="materials">
                <div className="materialsHead">
                    Materials
                </div>
                <div className="materialsOrdinary"><div className="text-[24px]">16 (o)</div></div>
                <div className="materialsUncommon"><div className="text-[24px]">7 (u)</div> </div>
                <div className="materialsRare"><div className="text-[24px]">3 (r)</div></div>
                <div className="materialsLegendary"><div className="text-[24px]">1 (L)</div> </div>
            </div>
            <div className="equip1">
                <div className="weaponName">Longsword</div>
                <div className="weaponAttackName">Slash</div>
                <div className="weaponAttackCost">2 Actions</div>
                <div className="weaponAttackRange">2m</div>
                <div className="weaponAttackEffect">2d8 + Fitness Slash</div>
                <div className="weaponPropertyName">Balanced</div>
                <div className="weaponPropertyCost">FA</div>
                <div className="weaponPropertyEffect">This weapon's attacks are not interrupted by the evade reaction.</div>
                <div className="weaponSpecial">Special Properties: None</div>
            </div>
            <div className="equip2">
                <div className="weaponName">Katana</div>
                <div className="weaponAttackName">Slash</div>
                <div className="weaponAttackCost">2 Actions</div>
                <div className="weaponAttackRange">2m</div>
                <div className="weaponAttackEffect">2d8 + Fitness Slash</div>
                <div className="weaponPropertyName">Balanced</div>
                <div className="weaponPropertyCost">FA</div>
                <div className="weaponPropertyEffect">This weapon's attacks are not interrupted by the evade reaction.</div>
                <div className="weaponSpecial">Special Properties: None</div>
            </div>
            <div className="innerwear">
                <div className="innerName">Light Clothing</div>
                <div className="innerDesc">+1 Evasion while not wearing armor</div>
            </div>
            <div className="outerwear">
                <div className="outerName">Cloak</div>
                <div className="outerDesc">Increase stealth skill rolls by +3, and you may conceal light and medium weapons</div>
            </div>
            <div className="itemFilter">
                <div className="itemTableName">
                    Item Name
                </div>
                <div className="itemTableQTY">
                    QTY
                </div>
                <div className="itemTableType">
                    Item Type
                </div>
                <div className="itemTableDesc">
                    Description
                </div>
            </div>
            {inventoryRows}
        </div>
        <div className="mainPanel">
            <div  className="mainName">
                Name
            </div>
            <div className="mainArmor">
                Armor
            </div>
            <div className="mainPicture">
                Picture
            </div>
            <div className="mainHealthMana">
                Health Mana
            </div>
            <div className="mainSkills">
                Skills
            </div>
            <div className="mainConditions">
                Conditions
            </div>
            <div className="mainFitness">
                Fitness
            </div>
            <div className="mainFocus">
                Focus
            </div>
            <div className="mainPrecision">
                Precision
            </div>
            <div className="mainSense">
                Sense
            </div>
            <div className="mainTalent1">
                Talent 1
            </div>
            <div className="mainTalent2">
                Talent 2
            </div>
        </div>
        <div className="spellPanel">
            <div className="spellTitle">
                Spells and Abilities
            </div>
            <div className="spellInfo1">
                spell info 1
            </div>
            <div className="spellInfo2">
                spell info 2
            </div>
            <div className="spellFilter">
                spell filter
            </div>
            {buildCurrentSpellTable()}
        </div>
    </div>
)
}