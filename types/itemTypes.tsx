export interface Item {
    id: string
    name: string
    itemType: string
    equippable: boolean
    size: string
    weight: number
    description: string
    properties: string
    attack1String: string
    attack2String: string
    effectName: string
    baseCost: number
    rarity: string
}

export interface Inventory {
    [key: string]: string | number | boolean | null | undefined,
    id: string | null
    characterId: string | null
    itemId: string
    equipped: boolean
    quantity: number
}

export interface InventoryDAO {
    inventory: Inventory
    item: Item
}
export interface Pack {
    id: string
    name: string
    background: string
    currency: number
    rations: number
    salves: number
    reagents: string
    materials: string
    innerwear: string
    outerwear: string
    items: string
}

export interface proficiencyDAO {
    item: Item
    mastery: boolean
}



export var emptyItem: Item = {
    id: "string",
    name: "string",
    itemType: "string",
    equippable: false,
    size: "string",
    weight: 0,
    description: "string",
    properties: "string",
    attack1String: "string",
    attack2String: "string",
    effectName: "string",
    baseCost: 0,
    rarity: "string"
}

export var emptyInventory: Inventory = {
    id: null,
    characterId: null,
    itemId: "",
    equipped: false,
    quantity: 1

}

export var emptyInventoryDAO: InventoryDAO = {
    inventory: emptyInventory,
    item: emptyItem
}

export var emptyPack: Pack = {
    id: "",
    name: "",
    background: "",
    currency: 0,
    rations: 0,
    salves: 0,
    reagents: "",
    materials: "",
    innerwear: "",
    outerwear: "",
    items: ""
}