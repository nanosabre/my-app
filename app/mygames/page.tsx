import appHeader from "@/components/appHeader";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession({ required: true });
  
  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        {appHeader(session, status)}
      </main>
    </div>
  );
}