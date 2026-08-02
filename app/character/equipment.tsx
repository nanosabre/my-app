import { ChangeEvent, useEffect, useState } from "react";
import { emptyInventory, emptyItem, emptyPack, Inventory, InventoryDAO, Item, Pack } from "@/types/itemTypes";
import "./equipment.css";
import { useGetEquipmentScreen } from "@/hooks/useGetEquipmentScreen";
import { Character } from "@/types/characterTypes";

const displayFilters = ["Supplies", "Currency"]

export default function equipment(character: Character) {

    const [inventory, setInventory] = useState<InventoryDAO[]>([]);
    const [inventoryDivs, setInventoryDivs] = useState(makeInventoryRows());
    const [packsList, setPacksList] = useState<Pack[]>([]);
    const [itemsList, setItemsList] = useState<Item[]>([]);

    useEffect(() => {
        useGetEquipmentScreen("").then(data => {
            let equipmentScreen = data.data.data.getEquipmentScreen;
            let result: InventoryDAO[] = []
            equipmentScreen.inventory.forEach((inv:Inventory)=>
                result.push({inventory: inv, item: equipmentScreen.items.find((item:Item)=>item.id===inv.itemId)})
            )
            setInventory(result);
            setPacksList(equipmentScreen.packs);
            setItemsList(equipmentScreen.items);
        })
    }, [])

    useEffect(()=>addPack(packsList.find(p=>p.background===character.background.parentTrait.name)?.name|| ""),[character.background])

    function makeInventoryRows() {
        return (
            <div className="inventoryTable">
                {inventory.filter(i=>!displayFilters.includes(i.item.itemType)).map((item: InventoryDAO) => (
                    <div className="tableRow" key={item.item.name}>
                        <div className="tableName">{item.item.name}</div>
                        <div className="tableQTY">{item.inventory.quantity}</div>
                        <div className="tableType">{item.item.itemType}</div>
                        <div className="tableDesc">{item.item.description}</div>
                    </div>
                ))}
            </div>
        )
    }

    function addPack(packName:String){
        let result: InventoryDAO[] = [];
        let pack = packsList.find(p=>p.name===packName) || emptyPack; 
        let items = pack.items?.split("|").length >0 ? pack.items.split("|") : [];
        for(let j = 0;j<items.length-1;j+=2){
            result.push(makeInventoryItem(items[j], Number(items[j+1])));
        }
        result.push(makeEquipInventoryItem(pack.outerwear,1, true));
        result.push(makeEquipInventoryItem(pack.innerwear,1, true));
        result.push(makeInventoryItem("Healing Salve", pack.salves));
        result.push(makeInventoryItem("Food (kg)", pack.rations));
        result.push(makeInventoryItem("Water (kg)", pack.rations));
        result.push(makeInventoryItem("Gold", Math.floor(pack.currency/100 % 100)));
        result.push(makeInventoryItem("Silver", Math.floor(pack.currency/10 % 10)));
        result.push(makeInventoryItem("Copper", Math.floor(pack.currency % 10)));

        let reagents = pack.reagents.split("|");
        let materials = pack.materials.split("|");
        result.push(makeInventoryItem("Ordinary Reagent", Number(reagents[2])));
        result.push(makeInventoryItem("Uncommon Reagent", Number(reagents[1])));
        result.push(makeInventoryItem("Rare Reagent", Number(reagents[0])));
        result.push(makeInventoryItem("Ordinary Crafting Material", Number(materials[2])));
        result.push(makeInventoryItem("Uncommon Crafting Material", Number(materials[1])));
        result.push(makeInventoryItem("Rare Crafting Material", Number(materials[0])));

        setInventory(result);
    }

    function makeInventoryItem(itemName: string, quantity: number){
        return makeEquipInventoryItem(itemName, quantity, false);
    }

    function makeEquipInventoryItem(itemName: string, quantity: number, equipped: boolean){
        let item = itemsList.find(i=>i.name===itemName);
        return {inventory:{
                ...emptyInventory, 
                characterId: character.id, 
                itemId: item?.id || "",
                quantity: quantity,
                equipped: equipped
            },
            item: {...(item || emptyItem)}
        }
    }

    function makePackSelecor() {
        return (
        <select className="startChoice" defaultValue={packsList.find(p=>p.background===character.background.parentTrait.name)?.name|| ""} onChange={e=>addPack(e.currentTarget.value)}>
            {packsList.map(pack=>(
                <option key={pack.name} value={pack.name}>{pack.name}</option>
            ))}
        </select>
        )
    }

    function updateOutfit(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>, inner: boolean){
        let temp = inventory.filter(i=>!(i.item.itemType===(inner?"Innerwear":"Outerwear")&& i.inventory.equipped));
        temp.push(makeEquipInventoryItem(e.currentTarget.value, 1, true));
        setInventory(temp);
    }

    return (
        <div className="equipment">
            <div className="inventory">
                <div className="startPack">
                    <div className="startHead"> Inventory: </div>
                    {makePackSelecor()}
                </div>
                <div className="currency">
                    <div className="currencyHead">
                        Currencies
                    </div>
                    <div className="currencyTotal">Total<br /><div className="text-[36px]">{(inventory.find(i=>i.item.name==="Gold")?.inventory.quantity || 0)*100 + (inventory.find(i=>i.item.name==="Silver")?.inventory.quantity || 0)*10 + (inventory.find(i=>i.item.name==="Copper")?.inventory.quantity || 0)}</div></div>
                    <div className="currencyDenom1">Platinum<br /><div className="text-[28px]">1</div> </div>
                    <div className="currencyDenom2">Gold<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Gold")?.inventory.quantity || 0}</div> </div>
                    <div className="currencyDenom3">Silver<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Silver")?.inventory.quantity || 0}</div> </div>
                    <div className="currencyDenom4">Copper<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Copper")?.inventory.quantity || 0}</div> </div>
                </div>
                <div className="supplies">
                    <div className="suppliesHead">
                        Supplies
                    </div>
                    <div className="suppliesFood">Food<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Food (kg)")?.inventory.quantity || 0} days</div></div>
                    <div className="suppliesWater">Water<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Water (kg)")?.inventory.quantity || 0} days</div></div>
                    <div className="suppliesSalves">Salves<br /><div className="text-[28px]">{inventory.find(i=>i.item.name==="Healing Salve")?.inventory.quantity || 0} Salves</div></div>
                </div>
                <div className="reagents">
                    <div className="reagentsHead">
                        Reagents
                    </div>
                    <div className="reagentsOrdinary">Ordinary<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Ordinary Reagent")?.inventory.quantity || 0}</div></div>
                    <div className="reagentsUncommon">Uncommon<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Uncommon Reagent")?.inventory.quantity || 0}</div> </div>
                    <div className="reagentsRare">Rare<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Rare Reagent")?.inventory.quantity || 0}</div></div>
                    <div className="reagentsLegendary">Legendary<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Legendary Reagent")?.inventory.quantity || 0}</div> </div>
                </div>
                <div className="materials">
                    <div className="materialsHead">
                        Materials
                    </div>
                    <div className="materialsOrdinary">Ordinary<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Ordinary Crafting Material")?.inventory.quantity || 0}</div></div>
                    <div className="materialsUncommon">Uncommon<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Uncommon Crafting Material")?.inventory.quantity || 0}</div> </div>
                    <div className="materialsRare">Rare<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Rare Crafting Material")?.inventory.quantity || 0}</div></div>
                    <div className="materialsLegendary">Legendary<br /><div className="text-[24px]">{inventory.find(i=>i.item.name==="Legendary Crafting Material")?.inventory.quantity || 0}</div> </div>
                </div>
                <div className="innerwear">
                    <div className="innerHead">Innerwear</div>
                    <select className="innerChoice" onChange={e=>updateOutfit(e,true)} value={inventory.find(i=>i.item.itemType==="Innerwear"&&i.inventory.equipped===true)?.item.name || "Choose a Starting Pack"}>
                        {itemsList.filter(i=>i.itemType==="Innerwear").map(item=>(
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <div className="innerDesc">{inventory.find(i=>i.item.itemType==="Innerwear"&&i.inventory.equipped===true)?.item.description || "Choose an innerwear"}</div>
                </div>
                <div className="outerwear">
                    <div className="outerHead">Outerwear</div>
                    <select className="outerChoice" onChange={e=>updateOutfit(e,false)} value={inventory.find(i=>i.item.itemType==="Outerwear"&&i.inventory.equipped===true)?.item.name || "Choose a Starting Pack"}>
                        {itemsList.filter(i=>i.itemType==="Outerwear").map(item=>(
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <div className="outerDesc">{inventory.find(i=>i.item.itemType==="Outerwear"&&i.inventory.equipped===true)?.item.description || "Choose an outerwear"}</div>
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
                {makeInventoryRows()}
            </div>
            <div className="proficiencies">
                <div className="prof1">
                    Proficiency 1 <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="prof2">
                    Proficiency 2 <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="prof3">
                    Proficiency 3 <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <br />
                    <select className="" defaultValue="Choose a Starting Pack">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
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