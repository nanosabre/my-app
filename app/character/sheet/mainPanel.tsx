"use client"
import { CalculatedState, Character } from "@/types/characterTypes"
import "./mainPanel.css"




export default function mainPanel(character : Character, setCharacter : Function, characterState : CalculatedState, setCharacterState : Function) {


    return (
        <div className="mainPanel">
            <div className="characterName">
                {character.name}
            </div>
            <div className="picture"></div>
            <div className="armor">
                <div className="currentArmor">  
                    Armor:{" "}
                    <input value={character.state.armor} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, armor: (Number(e.target.value) || prev.state.armor)}}))} 
                                  className="w-[35px]"/>/{characterState.armorMax}

                </div>
                <div className="minArmor">Min Armor: {characterState.armorMin}</div>
                <div className="movement">Movement: {characterState.movement}</div>
            </div>
            <div className="health">
                <div className="hitPoints"> 
                    HP:{" "}
                    <input value={character.state.hitPoints} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, hitPoints: (Number(e.target.value) || prev.state.hitPoints)}}))} 
                                  className="w-[35px]"/>/{characterState.hitPointsMax}
                    <div className="hitCalc">calc</div>
                </div>
                <div className="manaPoints"> MP:{" "}
                    <input value={character.state.manaPoints} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, manaPoints: (Number(e.target.value) || prev.state.manaPoints)}}))} 
                                  className="w-[35px]"/>/{characterState.manaMax}</div>
                <div className="wounds"> Wounds:{" "}
                    <input value={character.state.wounds} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, wounds: (Number(e.target.value) || prev.state.wounds)}}))} 
                                  className="w-[35px]"/>/{characterState.woundsMax} </div>
            </div>
            <div className="skills">
                <div className="skillsTitle">Skills</div>
                <div className="awareness">Awareness: {characterState.awareness}</div>
                <div className="celerity">Celerity: {characterState.celerity}</div>
                <div className="dexterity">Dexterity: {characterState.dexterity}</div>
                <div className="evasion">Evasion: {characterState.evasion}</div>
                <div className="subtlety">Subtlety: {characterState.subtlety}</div>
                <div className="tenacity">Tenacity: {characterState.tenacity}</div>
            </div>
            <div className="conditions">
                Conditions
                <textarea/>
            </div>
            <div className="fitness"> Fitness: {characterState.fitness}</div>
            <div className="focus"> Focus: {characterState.focus} </div>
            <div className="precision"> Precision: {characterState.precision}</div>
            <div className="sense"> Sense: {characterState.sense} </div>
            <div className="talent1Name">{character.talent1.name}</div>
            <div className="talent2Name">{character.talent2.name}</div>
            <div className="talent1Attributes">
                {character.attributes1[0]?.name || ""}{character.attributes1[0]?.description1 || ""} <br/>
                {character.attributes1[1]?.name || ""}{character.attributes1[1]?.description1 || ""} <br/>
                {character.attributes1[2]?.name || ""}{character.attributes1[2]?.description1 || ""} <br/>
                {character.attributes1[3]?.name || ""}{character.attributes1[3]?.description1 || ""}
            </div>
            <div className="talent2Attributes">
                {character.attributes2[0]?.name || ""}{character.attributes2[0]?.description1 || ""} <br/>
                {character.attributes2[1]?.name || ""}{character.attributes2[1]?.description1 || ""} <br/>
                {character.attributes2[2]?.name || ""}{character.attributes2[2]?.description1 || ""} <br/>
                {character.attributes2[3]?.name || ""}{character.attributes2[3]?.description1 || ""}
            </div>
        </div>
    )
}