import "./sheet.css";

export default function sheet() {
    return (
    <div className="sheet">
        <div className="invPanel">
            Inventory
        </div>
        <div className="mainPanel">
            <div  className="mainName">
                Name
            </div>
            <div className="mainArmor">
                Armor
            </div>
            <div className="mainPicture">
                Picture
            </div>
            <div className="mainHealthMana">
                Health Mana
            </div>
            <div className="mainSkills">
                Skills
            </div>
            <div className="mainConditions">
                Conditions
            </div>
            <div className="mainFitness">
                Fitness
            </div>
            <div className="mainFocus">
                Focus
            </div>
            <div className="mainPrecision">
                Precision
            </div>
            <div className="mainSense">
                Sense
            </div>
            <div className="mainTalent1">
                Talent 1
            </div>
            <div className="mainTalent2">
                Talent 2
            </div>
        </div>
        <div className="spellPanel">
            Spells
        </div>
    </div>
)
}