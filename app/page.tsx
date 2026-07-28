import Image from "next/image";

export default function Home() {
  return (
    <main className="main">
      <div className="headerBar">
        <ul>
          <li><a href="#Home">Spellblade TTRPG</a></li>
          <li><a href="/mycharacters">My Characters</a></li>
          <li><a href="/mygames">My Games</a></li>
          <li><a href="/rules">Rules</a></li>
        </ul>
        <div className="account">Sign Out <br/> fakeemail@gmail.com </div>
      </div>

      <div className="login">
        <a href="#login">Log In</a>
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