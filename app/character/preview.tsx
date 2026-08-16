import { useEffect, useState } from "react";
import { emptyItem, InventoryDAO, Item, getInventoryItemQTY, emptyInventory, emptyInventoryDAO, unarmedInventoryDAO } from "@/types/itemTypes";
import "./preview.css";
import { CalculatedState, Character } from "@/types/characterTypes";
import { SpellDAO } from "@/types/spellTypes";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { proficiencyTypes } from "@/types/Enums";

const displayFilters = ["Supplies", "Currency"];

export default function preveiw(character : Character, characterState : CalculatedState ,characterInventory : InventoryDAO[], characterSpells : SpellDAO[]) {
    const [expandInventory, setExpandInventory] = useState(false);
    const [equippedItem1, setEquippedItem1] = useState(getEquippedWeapon()[0]);
    const [equippedItem2, setEquippedItem2] = useState((getEquippedWeapon()[1] || unarmedInventoryDAO));

    useEffect(()=>{
        setEquippedItem1(getEquippedWeapon()[0]);
        setEquippedItem2((getEquippedWeapon()[1] || unarmedInventoryDAO));
    },[characterInventory]);

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
        let items = inventoryDAOs.filter((e)=>proficiencyTypes.some((f)=>e.item.itemType.includes(f)));
        if (items.length == 0) {
            return [unarmedInventoryDAO];
        }
        else return items;
    }

    function getEquippedInnerwear() {
        let inventoryDAOs = characterInventory.filter(i=>(i.item.itemType=="Innerwear"));
        let items = inventoryDAOs.filter(i=>i.inventory.equipped==true);
        if (items.length == 0) {
            return emptyInventoryDAO;
        }
        else return items[0];
    }

    function getEquippedOuterwear() {
        let inventoryDAOs = characterInventory.filter(i=>(i.item.itemType=="Outerwear"));
        let items = inventoryDAOs.filter(i=>i.inventory.equipped==true);
        if (items.length == 0) {
            return emptyInventoryDAO;
        }
        else return items[0];
    }

    const inventoryRows = makeInventoryRows();

    return (
    <div className="preview">
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
                        <div className="reagentsUncommon">{getInventoryItemQTY(characterInventory, "Uncommon Reagent")} U</div>
                        <div className="reagentsRare">{getInventoryItemQTY(characterInventory, "Rare Reagent")} R</div>
                        <div className="reagentsLegendary">{getInventoryItemQTY(characterInventory, "Legendary Reagent")} L</div>
                    </div>
                    <div className="materials">
                        <div className="materialsHead">
                            Materials
                        </div>
                        <div className="materialsOrdinary">{getInventoryItemQTY(characterInventory, "Ordinary Crafting Material")} O</div>
                        <div className="materialsUncommon">{getInventoryItemQTY(characterInventory, "Uncommon Crafting Material")} U</div>
                        <div className="materialsRare">{getInventoryItemQTY(characterInventory, "Rare Crafting Material")} R</div>
                        <div className="materialsLegendary">{getInventoryItemQTY(characterInventory, "Legendary Crafting Material")} L</div>
                    </div>
                    <div className="equip1">
                        <div className="weaponName">{equippedItem1?.item.name || "None Equipped"}</div>
                        <div className="weaponAttackName">{equippedItem1?.item.attack.name || "Attack"}</div>
                        <div className="weaponAttackCost">{(equippedItem1?.item.attack.action + " Action") || "None"}</div>
                        <div className="weaponAttackRange">{equippedItem1?.item.attack.range || "None"}</div>
                        <div className="weaponAttackEffect">{(equippedItem1?.item.attack.damage + " " + equippedItem1?.item.attack.damageType) || "None"}</div>
                        <div className="weaponPropertyName">{equippedItem1?.item.special.name || "None"}</div>
                        <div className="weaponPropertyCost">{(equippedItem1?.item.special.action  || "F") + "A"}</div>
                        <div className="weaponPropertyEffect">{equippedItem1?.item.special.description || "None"}</div>
                        <div className="weaponSpecial">{equippedItem1?.item.properties || "None"}</div>
                    </div>
                    <div className="equip2">
                        <div className="weaponName">{equippedItem2?.item.name || "None Equipped"}</div>
                        <div className="weaponAttackName">{equippedItem2?.item.attack.name || "None"}</div>
                        <div className="weaponAttackCost">{(equippedItem2?.item.attack.action + " Action") || "None"}</div>
                        <div className="weaponAttackRange">{equippedItem2?.item.attack.range || "None"}</div>
                        <div className="weaponAttackEffect">{(equippedItem2?.item.attack.damage + " " + equippedItem1?.item.attack.damageType) || "None"}</div>
                        <div className="weaponPropertyName">{equippedItem2?.item.special.name || "None"}</div>
                        <div className="weaponPropertyCost">{(equippedItem2?.item.special.action  || "F") + "A"}</div>
                        <div className="weaponPropertyEffect">{equippedItem2?.item.special.description || "None"}</div>
                        <div className="weaponSpecial">{equippedItem2?.item.properties || "None"}</div>
                    </div>
                    <div className="innerwear">
                        <div className="innerName">{getEquippedInnerwear()?.item.name || "No Innerwear Equipped"}</div>
                        <div className="innerDesc">{getEquippedInnerwear()?.item.description || "-"}</div>
                    </div>
                    <div className="outerwear">
                        <div className="outerName">{getEquippedOuterwear()?.item.name || "No Outerwear Equipped"}</div>
                        <div className="outerDesc">{getEquippedOuterwear()?.item.description || "-"}</div>
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
                    Type
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
                Armor <br/> 
                Current: {characterState.armor} <br/>
                Max: {characterState.armorMax} <br/>
                Min: {characterState.armorMin}
            </div>
            <div className="mainPicture">
                Picture
            </div>
            <div className="mainHealthMana">
                Health Current: {characterState.hitPoints} <br/>
                Health Max: {characterState.hitPointsMax} <br/>
                Mana Current: {characterState.manaPoints} <br/>
                Mana Max: {characterState.manaMax}
            </div>
            <div className="mainSkills">
                Skills <br/>
                Awareness: {characterState.awareness} <br/>
                Celerity: {characterState.celerity} <br/>
                Dexterity: {characterState.dexterity} <br/>
                Evasion: {characterState.evasion} <br/>
                Subtlety: {characterState.subtlety} <br/>
                Tenacity: {characterState.tenacity}
            </div>
            <div className="mainConditions">
                Conditions: <br/>
                Max Wounds: {characterState.woundsMax}
            </div>
            <div className="mainFitness">
                Fitness: {characterState.fitness}
            </div>
            <div className="mainFocus">
                Focus: {characterState.focus}
            </div>
            <div className="mainPrecision">
                Precision: {characterState.precision}
            </div>
            <div className="mainSense">
                Sense: {characterState.sense}
            </div>
            <div className="mainTalent1">
                {character.talent1.name} <br/>
                {character.attributes1[0]?.name || ""} <br/>
                {character.attributes1[1]?.name || ""} <br/>
                {character.attributes1[2]?.name || ""} <br/>
                {character.attributes1[3]?.name || ""}

            </div>
            <div className="mainTalent2">
                {character.talent2.name} <br/>
                {character.attributes2[0]?.name || ""} <br/>
                {character.attributes2[1]?.name || ""} <br/>
                {character.attributes2[2]?.name || ""} <br/>
                {character.attributes2[3]?.name || ""}
            </div>
        </div>
        <div className="spellPanel">
            <div className="spellTitle">
                Spells and Abilities
            </div>
            <div className="spellInfo1">
                Spells Capacity: {characterState.spellCapacity}
            </div>
            <div className="spellInfo2">
                Spells Learned: {characterSpells.length}
            </div>
            <div className="spellFilter">
                spell filter
            </div>
            {buildCurrentSpellTable()}
        </div>
    </div>
)
}