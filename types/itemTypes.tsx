export interface Item {
    id: string
    name: string
    itemType: string
    subtype: string
    equippable: boolean
    size: string
    weight: number
    description: string
    properties: string
    attack: Attack
    special: Special
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

export interface Attack {
    name: string
    action: number
    range: string
    damage: string
    damageType: string
}

export interface Special {
    name: string
    action: number
    description: string
}

export var emptyItem: Item = {
    id: "",
    name: "",
    itemType: "",
    subtype: "",
    equippable: false,
    size: "",
    weight: 0,
    description: "",
    properties: "",
    attack: {
        name: "",
        action: 0,
        range: "0m",
        damage: "0d4",
        damageType: "Pierce"
        },
    special: {
        name: "",
        action: 0,
        description: ""
        },
    effectName: "",
    baseCost: 0,
    rarity: ""
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

export var uanrmedItem: Item = {
    id: "",
    name: "Unarmed",
    itemType: "None",
    subtype: "None",
    equippable: false,
    size: "Light",
    weight: 0,
    description: "",
    properties: "Free Hand",
    attack: {
        name: "Strike",
        action: 1,
        range: "1m",
        damage: "1d4 + Fitness",
        damageType: "Bludgeon"
        },
    special: {
        name: "Grapple",
        action: 1,
        description: "Grab a target"
        },
    effectName: "",
    baseCost: 0,
    rarity: ""
}

export var unarmedInventory: Inventory = {
    id: null,
    characterId: null,
    itemId: "",
    equipped: false,
    quantity: 1

}

export var unarmedInventoryDAO: InventoryDAO = {
    inventory: unarmedInventory,
    item: uanrmedItem
}


export function getInventoryItemQTY(inventory : InventoryDAO[], itemName : string) {
    return (inventory.find(i=>i.item.name===itemName)?.inventory.quantity || 0);
}