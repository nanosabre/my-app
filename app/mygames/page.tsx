import appHeader from "@/components/appHeader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        {appHeader()}
      </main>
    </div>
  );
}