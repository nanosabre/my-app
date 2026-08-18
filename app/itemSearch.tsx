import "./itemSearch.css";
import { InventoryDAO, Inventory, Item, emptyItem } from "@/types/itemTypes";
import { useGetItemListByType } from "@/hooks/useGetItemListByType";
import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";


const filterList = ["Ammunition", "Consumable", "Currency", "Deployable", "Magic Item", "Poison", "Potion", "Shield", "Spellcasting Tool", "Supplies", "Tool", "Weapon", "wear"];

export default function itemSearch(character : Character, inventory : InventoryDAO[], setInventory : Function) {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [searchFilter, setSearchFilter] = useState<string>(filterList[0]);
    const [popup, setPopup] = useState<boolean>(false);
    const [readyItem, setReadyItem] = useState<Item>();
    const [readyQuantity, setReadyQuantity] = useState<number>(1);

    useEffect(()=>{
    useGetItemListByType(searchFilter).then((result)=>{
        setItemList(result.data.data.getItemListByType);
    })
    },[searchFilter])
    


    function itemSearchPopup(item: Item) {
        setReadyItem(item);
        setPopup(true);
    }

    function sendItemtoInventory() {
        let currentInv : InventoryDAO[] = [];
        if (inventory.length > 0){
            currentInv = inventory;}
        let newInventory : Inventory = {
            id: null,
            characterId: character.id || null,
            itemId: readyItem?.id || "",
            equipped: false,
            quantity: readyQuantity
        };
        let newInventoryDAO : InventoryDAO = {
            inventory: newInventory,
            item: readyItem || emptyItem
        }
        currentInv.push(newInventoryDAO);
        setInventory(currentInv);
        setPopup(false);
        setReadyQuantity(1);
    }

    function buildSearchTable(itemList : Item[]) {
        return (
            <div className="searchTable">
                {itemList.map(item=>(
                    <div key={item.name} className="tableRow">
                        <Accordion>
                            <AccordionItem className="flex-col">
                                <AccordionTrigger className="flex-1">
                                    <div className="tableSubRow">
                                        <div className="tableName">{item.name}</div>
                                        <div className="tableType">{item.itemType}</div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="tableDesc">{item.description}</div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="tableAdd" onClick={()=>itemSearchPopup(item)}>
                            Add Item
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    function buildSearchFilterList() {
        return (
            <div className="searchFilter">
                <select onClick={(e)=>setSearchFilter(e.currentTarget.value)} defaultValue={filterList[0]}>
                    {filterList.map(filter=>(
                        <option key={filter} value={filter}>{filter}</option>
                    ))}
                </select>
            </div>
        )
    }



    return (
    <div className="itemSearch">
        <div hidden={!popup} className="searchPopup">
            <div className="popupInterface">
                Pop-up! <br/>
                <input value={readyQuantity} onChange={(e)=>setReadyQuantity(Number(e.target.value) || 1)}/>
                <button onClick={()=>sendItemtoInventory()}>Add Item!</button>
                <button onClick={()=>(setPopup(false))}>Cancel!</button>
            </div>
        </div>
        <div className="searchTitle">
            Item Search
        </div>
        {buildSearchFilterList()}
        <div className="searchTableHead">
            Table Header
        </div>
        {buildSearchTable(itemList)}
    </div>
    )
}