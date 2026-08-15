'use client';
import Image from "next/image";
import "../spellblade/TextBorder.png";
import appHeader from "@/components/appHeader";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

  return (
    <main className="main">
      {appHeader(session, status)}

      <div className="login">
        <button onClick={() => signIn("cognito")}>Sign In</button>
      </div>

      <div className="create">
        <a href="/character">Create a Character</a>
      </div>

      <div className="play">
        <a href="/character">Play the Game</a>
      </div>

      <div className="footerbar">
        Footer
      </div>
    </main>
  );
}