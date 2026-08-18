import { signIn, useSession } from "next-auth/react";
import SignOutButton from "./signoutButton";
import "./appHeader.css";

export default function appHeader(session : any, status : any){

    return (
    <div className="headerBar">
        <ul>
          <li><a href="/">Spellblade TTRPG</a></li>
          <li><a href="/mycharacters">My Characters</a></li>
          <li><a href="/mygames">My Games</a></li>
          <li><a href="/rules">Rules</a></li>
        </ul>
        {status==="authenticated"? 
        <div className="account"><SignOutButton/> <br/> {session?.user?.email} </div>:
        <div className="account"><button onClick={() => signIn("cognito")}>Sign In</button></div>
        }
      </div>)
}