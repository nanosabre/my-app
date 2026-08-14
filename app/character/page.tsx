"use client";
import Image from "next/image";
import {Tabs, TabsTrigger, TabsList, TabsContent} from "@/components/ui/tabs";
import background from "./background";
import talents from "./talents";
import attributes from "./attributes";
import spells from "./spells";
import equipment from "./equipment";
import story from "./story";
import sheet from "./sheet";
import { useEffect, useState } from "react";
import { CalculatedState, Character, emptyCalculatedState, emptyCharacter } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import "./page.css";
import { SpellDAO } from "@/types/spellTypes";
import appHeader from "@/components/appHeader";
import { useCharacterSave } from "@/hooks/useCharacterSave";
import { useSession } from "next-auth/react";


  //create an empty character, for now.   this will be the master data that everything will update or reference

const tabs = ["background", "talents", "attributes", "spells", "equipment", "story", "sheet"];

export default function Home() {
    const [currentTab, setCurrentTab] = useState("background");
    const [characterData, setCharacterData] = useState<Character>(emptyCharacter)
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [characterInventory, setCharacterInventory] = useState<InventoryDAO[]>([]);
    const [characterSpells, setCharacterSpells] = useState<SpellDAO[]>([]);

    const { data: session, status } = useSession();

    useEffect(()=>setCharacterData(prev=>({...prev, userId: session?.user.id})),[session]);

    function moveTab(tab:string) {
      let place = tabs.indexOf(tab);
      setCurrentTab(tab);
    }

    function nextTab() {
      let place = tabs.indexOf(currentTab);
      if ((place != -1) && (place != (tabs.length-1))) {
        setCurrentTab(tabs[place+1]);
      }
    }

    function prevTab() {
      let place = tabs.indexOf(currentTab);
      if (place != -1 && place != 0) {
        setCurrentTab(tabs[place-1]);
      }
    }

    function handleSave(){
      if(status==="authenticated"){
        useCharacterSave(characterData, characterInventory, characterSpells).then(data=>{
          console.log(data);
          let characterDAO = data.data.data.saveCharacter;
          setCharacterData(prev=>({...prev, id: characterDAO.character.id}));
          setCharacterInventory(characterDAO.inventory);
          setCharacterSpells(characterDAO.spells);
        });
      }
    }

  return (
    <main className="main">
        {appHeader(session, status)}
      <div className="page">
        <div className="prevButton" onClick={()=>{prevTab()}}>
            Prev
        </div>
        <div className="saveButton" onClick={handleSave}>
          Save
        </div>
        <div className="nextButton" onClick={()=>{nextTab()}}>
            Next
        </div>
        <Tabs className="tabsContainer" defaultValue="background" orientation="vertical" value={currentTab} onValueChange={(e:string)=>{moveTab(e)}}>
            <TabsList>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="talents">Talents</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="spells">Spells</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="sheet">Character Sheet</TabsTrigger>
            </TabsList>
            <TabsContent value="background">{background(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="talents">{talents(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="attributes">{attributes(characterData,setCharacterData, currentTab, setCalculatedState)}</TabsContent>
            <TabsContent value="spells">{spells(characterData, currentTab, calculatedState, setCharacterSpells)}</TabsContent>
            <TabsContent value="equipment">{equipment(characterData, setCharacterData, characterInventory, setCharacterInventory)}</TabsContent>
            <TabsContent value="story">{story()}</TabsContent>
            <TabsContent value="sheet">{sheet(characterData, characterInventory, characterSpells)}</TabsContent>
        </Tabs>
      </div>
      <div className="footerbar">
          footer
      </div>
    </main>
  );
}