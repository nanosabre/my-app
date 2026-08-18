"use client"
import { useSearchParams } from "next/navigation";
import { useCharacterById } from "@/hooks/useCharacterById";
import { useEffect, useState } from "react";
import { CalculatedState, Character, emptyCalculatedState, emptyCharacter } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import { SpellDAO } from "@/types/spellTypes";
import "./page.css";
import mainPanel from "./mainPanel";
import inventoryPanel from "./inventoryPanel";
import useCalculateState from "@/hooks/useCalculateState";
import { useSession } from "next-auth/react";
import appHeader from "@/components/appHeader";
import spellPanel from "./spellPanel";


export default function Sheet({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { data: session, status } = useSession();
    const searchId = useSearchParams().get('id');

    const [waitForLoad, setWaitForLoad] = useState<boolean>(true);
    const [validCharacter, setValidCharacter] = useState<boolean>(true);
    const [character, setCharacter] = useState<Character>(emptyCharacter);
    const [characterInventory, setCharacterInventory] = useState<InventoryDAO[]>([]);
    const [characterSpells, setCharacterSpells] = useState<SpellDAO[]>([]);
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);

    useEffect(()=>{
        if (searchId){
            useCharacterById(searchId).then(result=>{
                if (result.data.data.fullCharacterById) {
                    setWaitForLoad(false);
                    setCharacter(result.data.data.fullCharacterById.character);
                    setCharacterInventory(result.data.data.fullCharacterById.inventory);
                    setCharacterSpells(result.data.data.fullCharacterById.spells);
                    console.log(result);
                }
                else {
                    setWaitForLoad(false);
                    setValidCharacter(false);
                }
        })}
    },[])

    useEffect(()=>{
        let calcState = useCalculateState(character);
        setCalculatedState({...calcState, hitPoints: calcState.hitPointsMax, manaPoints: calcState.manaMax, armor: calcState.armorMax});
    },[character])

    return (
        <main className="main">
            {appHeader(session, status)}
            <div>
                {(!waitForLoad && validCharacter) ? (
                    <div className="panels">
                        <div>{inventoryPanel(characterInventory, setCharacterInventory)}</div>
                        <div>{mainPanel(character, setCharacter, calculatedState, setCalculatedState)}</div>
                        <div>{spellPanel(calculatedState, characterSpells)}</div>
                        {/*<a href={"/character?id=" + character?.id}>Go Back to Builder!</a>*/}
                    </div>): (
                    <div>{(validCharacter) ? "Please wait...": "Invalid Character Id!"}</div>
                )}
            </div>
            <div className="footerbar">
                footer
            </div>
        </main>
    )
}