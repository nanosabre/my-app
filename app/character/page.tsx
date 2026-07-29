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
import { useState } from "react";
import { Character, emptyCharacter } from "@/types/characterTypes";
import "./page.css";


  //create an empty character, for now.   this will be the master data that everything will update or reference

const tabs = ["background", "talents", "attributes", "spells", "equipment", "story", "sheet"];

export default function Home() {
    const [currentTab, setCurrentTab] = useState("background");
    const [characterData, setCharacterData] = useState<Character>(emptyCharacter)

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

  return (
    <main className="main">
        <div className="headerBar">
          <ul>
            <li><a href="/">Spellblade TTRPG</a></li>
            <li><a href="/mycharacters">My Characters</a></li>
            <li><a href="/mygames">My Games</a></li>
            <li><a href="/rules">Rules</a></li>
          </ul>
          <div className="account">Sign In</div>
        </div>
      <div className="page">
        <div className="prevButton" onClick={()=>{prevTab()}}>
            Prev
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
            <TabsContent value="attributes">{attributes(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="spells">{spells()}</TabsContent>
            <TabsContent value="equipment">{equipment()}</TabsContent>
            <TabsContent value="story">{story()}</TabsContent>
            <TabsContent value="sheet">{sheet()}</TabsContent>
        </Tabs>
      </div>
      <div className="footerbar">
          footer
      </div>
    </main>
  );
}