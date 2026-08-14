"use client";
import appHeader from "@/components/appHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCharacterByAccId } from "@/hooks/useCharacterByAccId";
import { Character } from "@/types/characterTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./page.css";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";

export default function characterSelect() {

  const [characterList, setCharacterList] = useState<Character[]>([]);
  //gets the user data, bounces them if they aren't signed in

  const { data: session, status } = useSession({ required: true });
  const [characterLoad, setCharacterLoad] = useState(false);



  //gets all the characters associated with the user
  useEffect(() => {
    let user = session?.user

    if (user) {
      useCharacterByAccId(user.id).then((result) => {
        console.log(result);
        setCharacterList(result.data.charactersByUserId);
      });
    }

  }, [session]);

  useEffect(() => {
    setCharacterLoad(true);
  }, [characterList]);

  if (status != "authenticated") { return (<p>Is loading</p>) };


  return (
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        {appHeader(session, status)}
        <div className="characterList">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Aspect Level</TableHead>
                <TableHead>talent 1</TableHead>
                <TableHead>talent 2</TableHead>
                <TableHead>Ancestry</TableHead>
                <TableHead>Background</TableHead>
                <TableHead>Fitness</TableHead>
                <TableHead>Precision</TableHead>
                <TableHead>Focus</TableHead>
                <TableHead>Sense</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* dynamically stuffs each character into a table.  needs to be changed to a set of cards or sum */}
              {characterLoad && characterList?.map((character) => (
                <TableRow key={character.id}>
                  <TableCell><a href={"/character/sheet?id=" + character.id}>{character.name}</a></TableCell>
                  <TableCell>{character.attributeLevel}</TableCell>
                  <TableCell>{character.talent1.name}</TableCell>
                  <TableCell>{character.talent2.name}</TableCell>
                  <TableCell>{character.ancestry.name}</TableCell>
                  <TableCell>{character.background.name}</TableCell>
                  <TableCell>{character.baseFitness}</TableCell>
                  <TableCell>{character.basePrecision}</TableCell>
                  <TableCell>{character.baseFocus}</TableCell>
                  <TableCell>{character.baseSense}</TableCell>
                  <TableCell><button onClick={()=>useDeleteCharacter(character.id || "")}>Delete</button></TableCell>
                </TableRow>
              ))}

            </TableBody>

          </Table>
        </div>
      </main>
    </div>
  )
}