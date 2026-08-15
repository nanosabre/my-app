import { useState } from "react";
import { emptyItem, InventoryDAO, Item, getInventoryItemQTY, emptyInventory, emptyInventoryDAO } from "@/types/itemTypes";
import "./sheet.css";
import { Character } from "@/types/characterTypes";
import { SpellDAO } from "@/types/spellTypes";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { proficiencyTypes } from "@/types/Enums";

const displayFilters = ["Supplies", "Currency"];

export default function sheet(character : Character, characterInventory : InventoryDAO[], characterSpells : SpellDAO[]) {
    const [expandInventory, setExpandInventory] = useState(false);

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


    function getEquippedWeapon() {
        let inventoryDAOs = characterInventory.filter(i=>i.inventory.equipped==true);
        let items = [];
        for (let i = 0; i < inventoryDAOs.length; i++) {
            
        }
    }

    function getEquppedWear() {

    }

    const inventoryRows = makeInventoryRows();
    
    return (
    <div className="sheet">
        <div className="invPanel">
            <div className="invTitle">
                Inventory
            </div>

            {expandInventory ? (
                <div className="inventoryCollapsible">
                    <div className="expandInventory" onClick={()=>setExpandInventory(false)}>  vv Contract vv </div>
                </div>
                 ): (
                <div className="inventoryCollapsible">
                    <div className="currencies">
                    <div className="currencyHead">
                        Currencies
                    </div>
                        <div className="currencyTotal">{getInventoryItemQTY(characterInventory, "Platinum")*1000+getInventoryItemQTY(characterInventory, "Gold")*100+getInventoryItemQTY(characterInventory, "Silver")*10+getInventoryItemQTY(characterInventory, "Copper")}c</div>
                        <div className="currencyDenom1">{getInventoryItemQTY(characterInventory, "Platinum")}p</div>
                        <div className="currencyDenom2">{getInventoryItemQTY(characterInventory, "Gold")}g</div>
                        <div className="currencyDenom3">{getInventoryItemQTY(characterInventory, "Silver")}s</div>
                        <div className="currencyDenom4">{getInventoryItemQTY(characterInventory, "Coppper")}c</div>
                    </div>
                    <div className="supplies">
                        <div className="suppliesHead">
                            Supplies
                        </div>
                        <div className="suppliesFood">{getInventoryItemQTY(characterInventory, "Food (kg)")} Food</div>
                        <div className="suppliesWater">{getInventoryItemQTY(characterInventory, "Water (kg)")} Water</div>
                        <div className="suppliesSalves">{getInventoryItemQTY(characterInventory, "Healing Salve")} Salves</div>
                    </div>
                    <div className="reagents">
                        <div className="reagentsHead">
                            Reagents
                        </div>
                        <div className="reagentsOrdinary">{getInventoryItemQTY(characterInventory, "Ordinary Reagent")} O</div>
                        <div className="reagentsUncommon">{getInventoryItemQTY(characterInventory, "Uncommon Reagent Reagent")} U</div>
                        <div className="reagentsRare">{getInventoryItemQTY(characterInventory, "Rare Reagent")} R</div>
                        <div className="reagentsLegendary">{getInventoryItemQTY(characterInventory, "Legendary Reagent")} L</div>
                    </div>
                    <div className="materials">
                        <div className="materialsHead">
                            Materials
                        </div>
                        <div className="materialsOrdinary">{getInventoryItemQTY(characterInventory, "Ordinary Materials")} O</div>
                        <div className="materialsUncommon">{getInventoryItemQTY(characterInventory, "Uncommon Material")} U</div>
                        <div className="materialsRare">{getInventoryItemQTY(characterInventory, "Rare Material")} R</div>
                        <div className="materialsLegendary">{getInventoryItemQTY(characterInventory, "Legendary Material")} L</div>
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
                    <div className="expandInventory" onClick={()=>setExpandInventory(true)}> ^^ Expand ^^ </div>
                </div>)
            }
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
                    <div className="text-[20px] text-center">Description</div>
                </div>
            </div>
            {inventoryRows}
        </div>
        <div className="mainPanel">
            <div  className="mainName">
                Name <br/> {character.name}
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