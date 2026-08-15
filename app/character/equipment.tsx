import { ChangeEvent, useEffect, useState } from "react";
import { emptyInventory, emptyInventoryDAO, emptyItem, emptyPack, Inventory, InventoryDAO, Item, Pack, getInventoryItemQTY } from "@/types/itemTypes";
import "./equipment.css";
import { useGetEquipmentScreen } from "@/hooks/useGetEquipmentScreen";
import { Character } from "@/types/characterTypes";
import { ammoQuantity, proficiencyTypes, weaponQuantity } from "@/types/Enums";

const displayFilters = ["Supplies", "Currency"];

export default function equipment(character: Character, setCharacter: Function, inventory: InventoryDAO[], setInventory : Function) {
    //master lists
    const [packsList, setPacksList] = useState<Pack[]>([]);
    const [itemsList, setItemsList] = useState<Item[]>([]);
    //item types selected for proficiencies
    const [typeSelect, setTypeSelect] = useState<string[]>(["","",""]);
    //the weapon card data for proficiencies, display only
    const [profData, setProfData] = useState<Item[]>([emptyItem, emptyItem, emptyItem]);

    //API call for screen data.
    useEffect(() => {
        useGetEquipmentScreen("").then(data => {
            let equipmentScreen = data.data.data.getEquipmentScreen;
            let result: InventoryDAO[] = []
            //pairs character inventory entries with associated Item details
            equipmentScreen.inventory.forEach((inv:Inventory)=>
                result.push({inventory: inv, item: equipmentScreen.items.find((item:Item)=>item.id===inv.itemId)})
            )
            setInventory(result);
            setPacksList(equipmentScreen.packs);
            setItemsList(equipmentScreen.items);
            let tempTypes: string[] = [];
            character.proficiencies.forEach(prof=>tempTypes.push(prof));
            setTypeSelect(tempTypes);
        })
    }, [])
    //when the character background changes, update the pack data to an associated pack
    useEffect(()=>addPack(packsList.find(p=>p.background===character.background.parentTrait.name)?.name|| ""),[character.background])
    //when the proficiencies are updated, update the associated item data for display
    useEffect(()=>{
        setProfData(()=>{
        let result: Item[] = []; 
        character.proficiencies.forEach((p)=>result.push(itemsList.find(i=>i.name===p)||emptyItem));
        return result;
    })},[character.proficiencies])

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

    //on pack select, clear the inventory (except weapons) then add pack items
    function addPack(packName:String){
        let result: InventoryDAO[] = inventory.filter(i=>proficiencyTypes.some(pt=>i.item.itemType.includes(pt)));
        let pack = packsList.find(p=>p.name===packName) || emptyPack; 
        //process non-standard items from the string
        let items = pack.items?.split("|").length >0 ? pack.items.split("|") : [];
        for(let j = 0;j<items.length-1;j+=2){
            result.push(makeEquipInventoryItem(items[j], Number(items[j+1])));
        }
        //process in standard items
        result.push(makeEquipInventoryItem(pack.outerwear,1, true));
        result.push(makeEquipInventoryItem(pack.innerwear,1, true));
        result.push(makeEquipInventoryItem("Healing Salve", pack.salves));
        result.push(makeEquipInventoryItem("Food (kg)", pack.rations));
        result.push(makeEquipInventoryItem("Water (kg)", pack.rations));
        result.push(makeEquipInventoryItem("Gold", Math.floor(pack.currency/100 % 100)));
        result.push(makeEquipInventoryItem("Silver", Math.floor(pack.currency/10 % 10)));
        result.push(makeEquipInventoryItem("Copper", Math.floor(pack.currency % 10)));

        //process reagents and materials from string.  rarity goes high->low
        let reagents = pack.reagents.split("|");
        let materials = pack.materials.split("|");
        result.push(makeEquipInventoryItem("Ordinary Reagent", Number(reagents[2])));
        result.push(makeEquipInventoryItem("Uncommon Reagent", Number(reagents[1])));
        result.push(makeEquipInventoryItem("Rare Reagent", Number(reagents[0])));
        result.push(makeEquipInventoryItem("Ordinary Crafting Material", Number(materials[2])));
        result.push(makeEquipInventoryItem("Uncommon Crafting Material", Number(materials[1])));
        result.push(makeEquipInventoryItem("Rare Crafting Material", Number(materials[0])));

        setInventory(result);
    }

    //creates an inventoryDAO item from arguments.  emptyInventory is preloaded with default values
    function makeEquipInventoryItem(itemName: string, quantity: number, equipped: boolean = false){
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

    function makePackSelector() {
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

    //when a proficiency is changed...
    function handleProfItemChange(order: number, name: string){
        let results: InventoryDAO[] = [...inventory]
        let item = itemsList.find(i=>i.name===name) || emptyItem;
        results = modifyProficiencyItems(item, results, order===0, true);

        //remove old proficiencies using same method as above
        let prevProf = character.proficiencies[order];
        //if there was a previous Proficiency.  else dont bother.
        if(prevProf != "") {
            let prevItem = results.find(i=>i.item.name===prevProf) || emptyInventoryDAO;
            results = modifyProficiencyItems(prevItem.item, results, false, false);
        }
        setCharacter((prev: Character)=>{let temp = [...prev.proficiencies]; temp[order]= name; return {...prev, proficiencies: temp};})
        setInventory([...results]);
    }

    function modifyProficiencyItems(item: Item, results: InventoryDAO[], equip = false,  add: boolean ){
        //set quantity based on weaponQuantity map, default to 1
        let quantity = weaponQuantity.get(item?.subtype) || 1;
        //invert quantity if we are removing
        quantity = add ? quantity : -quantity
        results = modifyInventoryItem(item.name, results, quantity, equip);
        //add any ammos associated, based on ammoQuantity map
        ammoQuantity.forEach((v, k)=>{if(item.properties?.includes(k)) results = modifyInventoryItem(k, results, add ? v : -v)});
        return results
    }

    //add, delete, or modify the quantity of an inventory item
    function modifyInventoryItem(name: string, results: InventoryDAO[], quantity: number = 1, equipped = false ){
        let item = results.find(i=>i.item.name===name);
        //if item exists...
        if(item){
            //case 1: if new quantity is 0 or less, delete it
            if(item.inventory.quantity + quantity <= 0) {
                return results.filter(i=>i!=item);
            } else {
            //case 2: else modify quantity
                let index = results.indexOf(item);
                results[index].inventory.quantity += quantity;
            }
        //case 3: else add new item
        } else if (quantity > 0) {
            results.push(makeEquipInventoryItem(name, quantity, equipped));
        }
        return results
    }
    
    //when the proficiency type changes, also set the proficiency to the default value
    function handleProfTypeChange(order: number, name: string){
        setTypeSelect(prev=>{prev[order]=name; return [...prev]})
        let defaultItem = itemsList.find(i=>i.itemType.includes(name) && !character.proficiencies.toSpliced(order, 1).includes(i.name)) || emptyItem;
        handleProfItemChange(order, defaultItem.name);
    }

    function makeProfTypeSelectors(order: number){
        return(
            <select className="weaponType" defaultValue={typeSelect[order]} onChange={e=>handleProfTypeChange(order, e.currentTarget.value)}>
                <option value="Choose a Weapon Type">Choose a Weapon Type</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Heavy">Heavy</option>
                <option value="Spellcasting">Spellcasting Tool</option>
                <option value="Shield">Shield</option>
                <option value="Ranged">Ranged</option>
            </select>
        )
    }

    return (
        <div className="equipment">
            <div className="inventory">
                <div className="startPack">
                    <div className="startHead"> Inventory: </div>
                    {makePackSelector()}
                </div>
                {/*painstakingly display every quantity*/}
                <div className="currency">
                    <div className="currencyHead">
                        Currencies
                    </div>
                    <div className="currencyTotal">{getInventoryItemQTY(inventory, "Platinum")*1000+getInventoryItemQTY(inventory, "Gold")*100+getInventoryItemQTY(inventory, "Silver")*10+getInventoryItemQTY(inventory, "Copper")}c</div>
                    <div className="currencyDenom1">{getInventoryItemQTY(inventory, "Platinum")}p</div>
                    <div className="currencyDenom2">{getInventoryItemQTY(inventory, "Gold")}g</div>
                    <div className="currencyDenom3">{getInventoryItemQTY(inventory, "Silver")}s</div>
                    <div className="currencyDenom4">{getInventoryItemQTY(inventory, "Coppper")}c</div>
                </div>
                <div className="supplies">
                    <div className="suppliesHead">
                        Supplies
                    </div>
                        <div className="suppliesFood">{getInventoryItemQTY(inventory, "Food (kg)")} Food</div>
                        <div className="suppliesWater">{getInventoryItemQTY(inventory, "Water (kg)")} Water</div>
                        <div className="suppliesSalves">{getInventoryItemQTY(inventory, "Healing Salve")} Salves</div>
                </div>
                <div className="reagents">
                    <div className="reagentsHead">
                        Reagents
                    </div>
                        <div className="reagentsOrdinary">{getInventoryItemQTY(inventory, "Ordinary Reagent")} O</div>
                        <div className="reagentsUncommon">{getInventoryItemQTY(inventory, "Uncommon Reagent Reagent")} U</div>
                        <div className="reagentsRare">{getInventoryItemQTY(inventory, "Rare Reagent")} R</div>
                        <div className="reagentsLegendary">{getInventoryItemQTY(inventory, "Legendary Reagent")} L</div>
                </div>
                <div className="materials">
                    <div className="materialsHead">
                        Materials
                    </div>
                        <div className="materialsOrdinary">{getInventoryItemQTY(inventory, "Ordinary Materials")} O</div>
                        <div className="materialsUncommon">{getInventoryItemQTY(inventory, "Uncommon Material")} U</div>
                        <div className="materialsRare">{getInventoryItemQTY(inventory, "Rare Material")} R</div>
                        <div className="materialsLegendary">{getInventoryItemQTY(inventory, "Legendary Material")} L</div>
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
                    <div className="weaponHead">Proficiency 1</div>
                    {makeProfTypeSelectors(0)}
                    <select className="weaponSelect" defaultValue={character.proficiencies[0]} onChange={e=>handleProfItemChange(0,e.currentTarget.value)}>
                        {/*if a proficiency type is selected, build the select list to only include items of the type, and dont include any other weapons selected by other proficiencies */}
                        {typeSelect[0]!="" && itemsList.filter(i=>i.itemType.includes(typeSelect[0]) && !character.proficiencies?.toSpliced(0,1).includes(i.name)).map(item=>(
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <div className="weaponAttackName">{profData[0]?.attack?.name || ""}</div>
                    <div className="weaponAttackCost">{profData[0]?.attack?.action || ""} Actions</div>
                    <div className="weaponAttackRange">{profData[0]?.attack?.range || ""}m</div>
                    <div className="weaponAttackEffect">{profData[0]?.attack?.damage || ""} {profData[0]?.attack?.damageType  || ""}</div>
                    <div className="weaponPropertyName">{profData[0]?.special?.name || ""}</div>
                    <div className="weaponPropertyCost">{profData[0]?.special?.action > 0 ? profData[0].special.action : "FA" }</div>
                    <div className="weaponPropertyEffect">{profData[0]?.special?.description || ""}</div>
                    <div className="weaponSpecial">Special Properties: { profData[0]?.properties ? profData[0]?.properties: "None"}</div>
                </div>
                <div className="prof2">
                    <div className="weaponHead">Proficiency 2</div>
                    {makeProfTypeSelectors(1)}
                    <select className="weaponSelect" defaultValue={character.proficiencies[1]} onChange={e=>handleProfItemChange(1,e.currentTarget.value)}>
                        {typeSelect[1]!="" && itemsList.filter(i=>i.itemType.includes(typeSelect[1])&& !character.proficiencies.toSpliced(1,1).includes(i.name)).map(item=>(
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <div className="weaponAttackName">{profData[1]?.attack?.name || ""}</div>
                    <div className="weaponAttackCost">{profData[1]?.attack?.action || ""} Actions</div>
                    <div className="weaponAttackRange">{profData[1]?.attack?.range || ""}m</div>
                    <div className="weaponAttackEffect">{profData[1]?.attack?.damage || ""} {profData[1]?.attack?.damageType  || ""}</div>
                    <div className="weaponPropertyName">{profData[1]?.special?.name || ""}</div>
                    <div className="weaponPropertyCost">{profData[1]?.special?.action > 0 ? profData[1].special.action : "FA" }</div>
                    <div className="weaponPropertyEffect">{profData[1]?.special?.description || ""}</div>
                    <div className="weaponSpecial">Special Properties: { profData[1]?.properties ? profData[1]?.properties: "None"}</div>
                </div>
                <div className="prof3">
                    <div className="weaponHead">Proficiency 3</div>
                    {makeProfTypeSelectors(2)}
                    <select className="weaponSelect" defaultValue={character.proficiencies[2]} onChange={e=>handleProfItemChange(2,e.currentTarget.value)}>
                        {typeSelect[2]!="" && itemsList.filter(i=>i.itemType.includes(typeSelect[2])&& !character.proficiencies.toSpliced(2,1).includes(i.name)).map(item=>(
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <div className="weaponAttackName">{profData[2]?.attack?.name || ""}</div>
                    <div className="weaponAttackCost">{profData[2]?.attack?.action || ""} Actions</div>
                    <div className="weaponAttackRange">{profData[2]?.attack?.range || ""}m</div>
                    <div className="weaponAttackEffect">{profData[2]?.attack?.damage || ""} {profData[2]?.attack?.damageType  || ""}</div>
                    <div className="weaponPropertyName">{profData[2]?.special?.name || ""}</div>
                    <div className="weaponPropertyCost">{profData[2]?.special?.action > 0 ? profData[2].special.action : "FA" }</div>
                    <div className="weaponPropertyEffect">{profData[2]?.special?.description || ""}</div>
                    <div className="weaponSpecial">Special Properties: { profData[2]?.properties ? profData[2]?.properties: "None"}</div>
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