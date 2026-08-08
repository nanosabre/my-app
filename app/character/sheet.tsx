import { useState } from "react";
import { emptyItem, Item } from "@/types/itemTypes";
import "./sheet.css";

const healthPotion = {...emptyItem};
healthPotion.name = "Health Potion";
healthPotion.itemType = "Potion";
healthPotion.description = "Target creature restores 4d4 hit points.";
const torch = {...emptyItem};
torch.name = "Torch";
torch.itemType = "Equipment";
torch.description = "Equipment used to provide illumination for up to 15m when lit.";
const rope = {...emptyItem};
rope.name = "Rope";
rope.itemType = "Equipment";
rope.description = "Woven hemp that can be used to climb, secure an object, or restrain a creature. DC 15 Dexterity to escape.";
const grapplingHook = {...emptyItem};
grapplingHook.name = "Grappling Hook";
grapplingHook.itemType = "Tool";
grapplingHook.description = "A tool used to climb up to 8m.";
const arrow1 = {...emptyItem};
arrow1.name = "arrow1";
arrow1.itemType = "ammunition";
arrow1.description = "Ammunition for a bow or crossbow";
const arrow2 = {...arrow1};
arrow2.name = "arrow2"
const arrow3 = {...arrow1};
arrow3.name = "arrow3"
const arrow4 = {...arrow1};
arrow4.name = "arrow4"
const arrow5 = {...arrow1};
arrow5.name = "arrow5"

const itemList = [healthPotion, torch, rope, grapplingHook, arrow1, arrow2, arrow3, arrow4, arrow5];


export default function sheet() {

    const [inventory, setInventory] = useState(itemList);
    const [inventoryDivs, setInventoryDivs] = useState(makeInventoryRows(inventory));

    function makeInventoryRows(inventoryList: Item[]) {
        return (
            <div className="itemTable">
                {inventoryList.map((item: Item) => (
                    <div className="tableRow" key={item.name}>
                        <div className="tableName">{item.name}</div>
                        <div className="tableQTY">5</div>
                        <div className="tableType">{item.itemType}</div>
                        <div className="tableDesc">{item.description}</div>
                    </div>
                ))}
            </div>
        )
    }

    const inventoryRows = makeInventoryRows(itemList);
    
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
            <div className="spellTable">
                spell table
            </div>
        </div>
    </div>
)
}