import { useState } from "react";
import { emptyItem, Item } from "@/types/itemTypes";
import "./equipment.css";

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

export default function equipment() {

    const [inventory, setInventory] = useState(itemList);
    const [inventoryDivs, setInventoryDivs] = useState(makeInventoryRows(inventory));

    function makeInventoryRows(inventoryList: Item[]) {
        return (
            <div className="inventoryTable">
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
    <div className="equipment">
        <div className="inventory">
            <div className="startPack">
                <div className="startHead"> Inventory: </div>
                <select className="startChoice" defaultValue="Choose a Starting Pack">
                    <option value="Choose a Starting Pack">Choose a Starting Pack</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div className="currency">
                <div className="currencyHead">
                    Currencies
                </div>
                <div className="currencyTotal"><div className="text-[36px]">1,234c</div></div>
                <div className="currencyDenom1"><div className="text-[28px]">1p</div> </div>
                <div className="currencyDenom2"><div className="text-[28px]">2g</div> </div>
                <div className="currencyDenom3"><div className="text-[28px]">3s</div> </div>
                <div className="currencyDenom4"><div className="text-[28px]">4c</div> </div>
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
            <div className="innerwear">
                <div className="innerHead">Innerwear</div>
                <select className="innerChoice" defaultValue="Choose a Starting Pack">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <div className="innerDesc">Description of chosen innerwear</div>
            </div>
            <div className="outerwear">
                <div className="outerHead">Outerwear</div>
                <select className="outerChoice" defaultValue="Choose a Starting Pack">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <div className="outerDesc">Description of chosen outerwear</div>
            </div>
            <div className="tableHead">
                <div className="tableName">
                    Item Name
                </div>
                <div className="tableQTY">
                    QTY
                </div>
                <div className="tableType">
                    Item Type
                </div>
                <div className="tableDesc">
                    Description
                </div>

            </div>
            {inventoryRows}
        </div>
        <div className="proficiencies">
            <div className="prof1">
                <div className="weaponHead">Proficiency 1</div>
                <select className="weaponType" defaultValue="Choose a Weapon Type">
                    <option value="1">Choose a Weapon Type</option>
                    <option value="3">Light</option>
                    <option value="2">Medium</option>
                    <option value="4">Heavy</option>
                </select>
                <select className="weaponSelect" defaultValue="Choose a Weapon">
                    <option value="1">Dagger</option>
                    <option value="2">Katana</option>
                    <option value="3">Great Axe</option>
                    <option value="4">Longbow</option>
                    <option value="5">Tower Shield</option>
                </select>
                <div className="weaponAttackName">Slash</div>
                <div className="weaponAttackCost">2 Actions</div>
                <div className="weaponAttackRange">2m</div>
                <div className="weaponAttackEffect">2d8 + Fitness Slash</div>
                <div className="weaponPropertyName">Balanced</div>
                <div className="weaponPropertyCost">FA</div>
                <div className="weaponPropertyEffect">This weapon's attacks are not interrupted by the evade reaction.</div>
                <div className="weaponSpecial">Special Properties: None</div>
            </div>
            <div className="prof2">
                <div className="weaponHead">Proficiency 2</div>
                <select className="weaponType" defaultValue="Choose a Weapon Type">
                    <option value="1">Choose a Weapon Type</option>
                    <option value="3">Light</option>
                    <option value="2">Medium</option>
                    <option value="4">Heavy</option>
                </select>
                <select className="weaponSelect" defaultValue="Choose a Weapon">
                    <option value="1">Dagger</option>
                    <option value="2">Katana</option>
                    <option value="3">Great Axe</option>
                    <option value="4">Longbow</option>
                    <option value="5">Tower Shield</option>
                </select>
                <div className="weaponAttackName">Slash</div>
                <div className="weaponAttackCost">2 Actions</div>
                <div className="weaponAttackRange">2m</div>
                <div className="weaponAttackEffect">2d8 + Fitness Slash</div>
                <div className="weaponPropertyName">Balanced</div>
                <div className="weaponPropertyCost">FA</div>
                <div className="weaponPropertyEffect">This weapon's attacks are not interrupted by the evade reaction.</div>
                <div className="weaponSpecial">Special Properties: None</div>
            </div>
            <div className="prof3">
                <div className="weaponHead">Proficiency 2</div>
                <select className="weaponType" defaultValue="Choose a Weapon Type">
                    <option value="1">Choose a Weapon Type</option>
                    <option value="3">Light</option>
                    <option value="2">Medium</option>
                    <option value="4">Heavy</option>
                </select>
                <select className="weaponSelect" defaultValue="Choose a Weapon">
                    <option value="1">Dagger</option>
                    <option value="2">Katana</option>
                    <option value="3">Great Axe</option>
                    <option value="4">Longbow</option>
                    <option value="5">Tower Shield</option>
                </select>
                <div className="weaponAttackName">Slash</div>
                <div className="weaponAttackCost">2 Actions</div>
                <div className="weaponAttackRange">2m</div>
                <div className="weaponAttackEffect">2d8 + Fitness Slash</div>
                <div className="weaponPropertyName">Balanced</div>
                <div className="weaponPropertyCost">FA</div>
                <div className="weaponPropertyEffect">This weapon's attacks are not interrupted by the evade reaction.</div>
                <div className="weaponSpecial">Special Properties: None</div>
            </div>
        </div>
        <div className="search">
            <div>
                Item Search
            </div>
        </div>
    </div>
)
}