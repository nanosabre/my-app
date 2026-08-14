"use client";
import Image from "next/image";
import "./page.css";
import {Tabs, TabsTrigger, TabsList, TabsContent} from "@/components/ui/tabs";
import { useState } from "react";
import Introduction from "./introduction";
import BasicRules from "./basicRules";
import Skills from "./skills";
import HeroDice from "./heroDice";
import Stealth from "./stealth";
import Combat from "./combat";
import Conditions from "./conditions";
import WeaponsTools from "./weaponsTools";
import Spellcasting from "./spellcasting";
import ArmorDamage from "./armorDamage";
import WoundsDeath from "./woundsDeath";
import Resting from "./resting";
import Downtime from "./downtime";
import Characters from "./makingCharacter";
import Talents from "./talents";
import Ancestries from "./ancestries";
import Backgrounds from "./backgrounds";
import Weapons from "./weapons";
import Spells from "./spells";
import appHeader from "@/components/appHeader";
import { useSession } from "next-auth/react";


const tabs = ["Introduction", "Basic Rules", "Hero Dice", "Skills", "Stealth", "Combat", "Conditions", "Weapons and Tools", "Spellcasting", "Armor and Damage", "Wounds and Death", "Resting", "Down Time and Exploration", "Making a Character", "Talents and Attributes", "Ancestries", "Backgrounds", "Weapons List", "Spells List"];



export default function Home() {
    const [currentTab, setCurrentTab] = useState("Introduction");
    const { data: session, status } = useSession({ required: true });

    function moveTab(tab:string) {
      let place = tabs.indexOf(tab);
      setCurrentTab(tab);
    }

    function nextTab() {
      let place = tabs.indexOf(currentTab);
      if ((place != -1) && (place != tabs.length-1)) {
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
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        {appHeader(session, status)}
        <div className="page">
          <div className="prevButton" onClick={()=>{prevTab()}}>
              Prev
          </div>
          <div className="nextButton" onClick={()=>{nextTab()}}>
              Next
          </div>
          <Tabs className="tabsContainer" defaultValue="Introduction" orientation="vertical" value={currentTab} onValueChange={(e:string)=>{moveTab(e)}}>
              <TabsList>
                  <TabsTrigger value="Introduction">Introduction</TabsTrigger>
                  <TabsTrigger value="Basic Rules">Basic Rules</TabsTrigger>
                  <TabsTrigger value="Hero Dice">Hero Dice</TabsTrigger>
                  <TabsTrigger value="Skills">Skills</TabsTrigger>
                  <TabsTrigger value="Stealth">Stealth</TabsTrigger>
                  <TabsTrigger value="Combat">Combat</TabsTrigger>
                  <TabsTrigger value="Conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="Weapons and Tools">Weapons and Tools</TabsTrigger>
                  <TabsTrigger value="Spellcasting">Spellcasting</TabsTrigger>
                  <TabsTrigger value="Armor and Damage">Armor and Damage</TabsTrigger>
                  <TabsTrigger value="Wounds and Death">Wounds and Death</TabsTrigger>
                  <TabsTrigger value="Resting">Resting</TabsTrigger>
                  <TabsTrigger value="Down Time and Exploration">Down Time and Exploration</TabsTrigger>
                  <TabsTrigger value="Making a Character">Making a Character</TabsTrigger>
                  <TabsTrigger value="Talents and Attributes">Talents and Attributes</TabsTrigger>
                  <TabsTrigger value="Ancestries">Ancestries</TabsTrigger>
                  <TabsTrigger value="Backgrounds">Backgrounds</TabsTrigger>
                  <TabsTrigger value="Weapons List">Weapons List</TabsTrigger>
                  <TabsTrigger value="Spells List">Spells List</TabsTrigger>
              </TabsList>
              <TabsContent value="Introduction">{Introduction()}</TabsContent>
              <TabsContent value="Basic Rules">{BasicRules()}</TabsContent>
              <TabsContent value="Skills">{Skills()}</TabsContent>
              <TabsContent value="Stealth">{Stealth()}</TabsContent>
              <TabsContent value="Hero Dice">{HeroDice()}</TabsContent>
              <TabsContent value="Combat">{Combat()}</TabsContent>
              <TabsContent value="Conditions">{Conditions()}</TabsContent>
              <TabsContent value="Weapons and Tools">{WeaponsTools()}</TabsContent>
              <TabsContent value="Spellcasting">{Spellcasting()}</TabsContent>
              <TabsContent value="Armor and Damage">{ArmorDamage()}</TabsContent>
              <TabsContent value="Wounds and Death">{WoundsDeath()}</TabsContent>
              <TabsContent value="Resting">{Resting()}</TabsContent>
              <TabsContent value="Down Time and Exploration">{Downtime()}</TabsContent>
              <TabsContent value="Making a Character">{Characters()}</TabsContent>
              <TabsContent value="Talents and Attributes">{Talents()}</TabsContent>
              <TabsContent value="Ancestries">{Ancestries()}</TabsContent>
              <TabsContent value="Backgrounds">{Backgrounds()}</TabsContent>
              <TabsContent value="Weapons List">{Weapons()}</TabsContent>
              <TabsContent value="Spells List">{Spells()}</TabsContent>
          </Tabs>
        </div>

        <div className="footerbar">
          Footer
        </div>
      </main>
    </div>
  );
}