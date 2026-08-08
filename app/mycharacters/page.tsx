"use client";
import Image from "next/image";
import { Character } from "@/types/characterTypes";
import { useState } from "react";




const characterList = [];

export default function Home() {
  const [characters, setCharacters] = useState();

  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        <div className="headerBar">
          <ul>
            <li><a href="/">Spellblade TTRPG</a></li>
            <li><a href="/mycharacters">My Characters</a></li>
            <li><a href="/mygames">My Games</a></li>
            <li><a href="/rules">Rules</a></li>
          </ul>
        </div>
        <div className="characterList">
          CharacterList
        </div>
        <div className="footerbar">
          footer
        </div>
      </main>
    </div>
  );
}