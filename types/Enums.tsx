export interface DamageType {
    name: string
    type: string
}

export const DamageTypes: DamageType[] = [
    {name: "Pierce", type:"Physical"},
    {name: "Slash", type:"Physical"},
    {name: "Bludgeon", type:"Physical"},
    {name: "Shatter", type:"Physical"},
    {name: "Burn", type:"Elemental"},
    {name: "Freeze", type:"Elemental"},
    {name: "Shock", type:"Elemental"},
    {name: "Poison", type:"Elemental"},
    {name: "Radiant", type:"Soul"},
    {name: "Necrotic", type:"Soul"},
    {name: "Spirit", type:"Soul"},
    {name: "Psychic", type:"Soul"}
]

export const weaponQuantity = new Map([
     ["Boomerang", 3],
     ["Nail", 3],
     ["Stake", 3], 
     ["Throwing Knife", 8],
     ["Shuriken", 12],
     ["Javelin", 4],
     ["Rope", 5],
     ["Chain", 5],
     ["", -1]
])

export const ammoQuantity = new Map([
     ["Arrow", 30],
     ["Bullet", 24],
])

export const proficiencyTypes = ["Light", "Medium", "Heavy", "SpellCasting Tool", "Shield", "Ranged"]