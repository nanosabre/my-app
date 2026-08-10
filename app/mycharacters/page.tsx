"use client";
import Image from "next/image";
import { Character } from "@/types/characterTypes";
import { useState } from "react";
import appHeader from "@/components/appHeader";




const characterList = [];

export default function Home() {
  const [characters, setCharacters] = useState();

  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        {appHeader()}
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