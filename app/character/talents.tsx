import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import "./talents.css";

const talentList = ["Assassination", "Counteraction","Covenant","Dueling","Elemental","Fabrication","Occult","Psychic","Somatic","Theatrics","Vanguarding","Wayfaring"];

const descy = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ex ante. Phasellus ut sapien ac ipsum euismod hendrerit. Vestibulum congue interdum magna, ac aliquet odio posuere in. Integer pretium rhoncus faucibus. In porttitor bibendum neque scelerisque faucibus. Aliquam vitae blandit lorem. Vivamus dictum mollis nisi, sit amet tincidunt nunc congue et. Ut luctus rutrum nibh, non rhoncus nunc molestie in. Integer aliquet dictum mi nec fermentum. Pellentesque sit amet volutpat sem, a sagittis orci. Donec bibendum magna quis ex porta, eu eleifend diam auctor. Integer aliquam ac libero sit amet aliquam. Donec in nisl molestie, semper leo cursus, vestibulum diam. In porttitor enim ut faucibus efficitur. Vestibulum iaculis venenatis lorem, quis sodales ipsum mollis id. ";

const covAbility = "Your Patron’s spells are not counted against your maximum number of learned spells and you may learn one of its blessing spells. Choose a form of soul damage based on your Patron. When you deal damage to a creature, you may expend one Mana Point to additionally deal 3d4 of your chosen soul damage’s type to that creature.";
const countAbility = "You may perform your actions on any other creature’s turn as a reaction without needing to declare the action beforehand. Your parry action may be used on any melee or ranged weapon attack within its range. Your passive Sense score (the DC for deception and stealth roll made against you) is increased by your Focus score.";

export default function talents(character:Character,setCharacterData:Function) {
    const [talentSelection, setTalentSelection] = useState(true);
    const [readySelection, setReadySelection] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [talent1, setTalent1] = useState("None Selected");
    const [talent2, setTalent2] = useState("None Selected");

    const setTalent = (e:string)=> {
        if (e == talent1) {
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: 0,
            talent1: ""
            }))
            setTalentSelection(true);
            setTalent1("None Selected");
        }
        else if (e == talent2) {
            setCharacterData((prev: any) => ({
            ...prev,
            attribute2: 0,
            talent2: ""
            }))
            setReadySelection(false);
            setTalent2("None Selected");
        }
        else if (talentSelection) {
            setCharacterData((prev: any) => ({
            ...prev,
            talent1: e
            }))
            setTalentSelection(false);
            setTalent1(e);
        }
        else if (!readySelection) {
            setCharacterData((prev: any) => ({
            ...prev,
            talent2: e
            }))
            setReadySelection(true);
            setTalent2(e);
        }

    }

    function buildTalentCards(talentList:string[]) {
        return(<div className="talentChoices">
            {talentList.map((talent:string)=>(
                <button key={talent} className={((!talentSelection)&&(readySelection)) ? ("disabledTalentCard"): ("talentCard")} onClick={()=>{ setTalent(talent)}}>
                    {!((talent1 == talent)||(talent2 == talent)) ? (
                        <div className="cardGrid">
                            <div className="talentName">
                                {talent}
                            </div>
                            <div className="talentIcon">
                                Icon
                            </div>
                            <div className="talentType">
                                Type
                            </div>
                            <div className="talentRole">
                                Role
                            </div>
                            <div className="talentCompl">
                                Complexity
                            </div>
                            <div className="talentSplash">
                                Splash
                            </div>
                        </div>
                    ): (<div className="cardBack">
                            <div className="cardBackName">
                                {talent}
                            </div>
                            <div className="cardDesc">
                                Talent Description Here
                            </div>
                    </div>)}
                </button>
            ))}
        </div>)
    }

    return (
    <div className="talents">
        <div className="header">
            Choose two Talents ({Number(!talentSelection) + Number(readySelection)}/2)
        </div>
        { !showSelected ? (
            <div>
                {buildTalentCards(talentList)}
                <div className="view" onClick={()=>{ setShowSelected(true)}}>
                    View Details
                </div>
            </div>
        ): (
        <div className="selected">
            <div className="viewTalent1">
                <div className="selectedName">
                    { talent1 }
                </div>
                <div className="selectedType">
                    Spellcaster
                </div>
                <div className="selectedFlavor">
                    {descy}
                </div>
                <div className="selectedRoles">
                    Mage, Utility, Disruption
                </div>
                <div className="selectedComplexity">
                    Complexity : 3
                </div>
                <div className="selectedSkills">
                    Preferred Skills: Focus, Sense
                </div>
                <div className="selectedBonus">
                    Bonuses: <br/> +6 Hit Point Maximum | +3 Mana Maximum
                </div>
                <div className="selectedAbility">
                    Abilities: <br/> {covAbility}
                </div>
                <div className="selectedAtts">
                    Attributes:
                </div>
                <div className="selectedAttributes"> 
                    <div className="att1">
                        <u>Cleric</u> <br/> Guidance | Cure Wounds | Revive | Silence | Dissuade
                    </div>
                    <div className="att2">
                        <u>Paladin</u> <br/> Soul Armor | Taunting Presence | Forify Mind | Rebuke | Resiliance
                    </div>
                    <div className="att3">
                        <u>Warlock</u> <br/> Light/Extinguish | Hallow/Desecrate | Essence Transfer | Weaken Soul | Drain
                    </div>
                    <div className="att4">
                        <u>Justiciar</u> <br/> Holy Weapon | Summon Creature | Divine Warning | Zealotry | Persecute
                    </div>
                </div>
            </div>
            <div className="viewTalent2">
                <div className="selectedName">
                    { talent2 }
                </div>
                <div className="selectedType">
                    Blademaster
                </div>
                <div className="selectedFlavor">
                    {descy}
                </div>
                <div className="selectedRoles">
                    Fighter, Tank, Lethality
                </div>
                <div className="selectedComplexity">
                    Complexity: 1
                </div>
                <div className="selectedSkills">
                    Preferred Skills: Fitness, Precisoon
                </div>
                <div className="selectedBonus">
                    Bonuses: <br/> +10 Hit Point Maximum
                </div>
                <div className="selectedAbility">
                    Abilities: <br/> {countAbility}
                </div>
                <div className="selectedAtts">
                    Attributes:
                </div>
                <div className="selectedAttributes"> 
                    <div className="att1">
                        <u>Interceptor</u> <br/> Interceptor
                    </div>
                    <div className="att2">
                        <u>Provoker</u> <br/> Provoker
                    </div>
                    <div className="att3">
                        <u>Tactician</u> <br/> Tactician
                    </div>
                    <div className="att4">
                        <u>Deflector</u> <br/> Deflector
                    </div>
                </div>
            </div>
            <div className="returnTalent" onClick={()=>{setShowSelected(false)}}>
                Return
            </div>
        </div>)}
    </div>
)
}