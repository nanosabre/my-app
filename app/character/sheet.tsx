import "./sheet.css";

export default function sheet() {
    return (
    <div className="sheet">
        <div className="invPanel">
            <div className="invTitle">
                Inventory
            </div>
            <div className="currencies">
                <div className="currencyHead">
                    Currencies
                </div>
                <div className="currencyTotal">Total<br/><div className="text-[28px]">1,234c</div></div>
                <div className="currencyDenom1">Platinum<br/><div className="text-[24px]">1</div> </div>
                <div className="currencyDenom2">Gold<br/><div className="text-[24px]">2</div> </div>
                <div className="currencyDenom3">Silver<br/><div className="text-[24px]">3</div> </div>
                <div className="currencyDenom4">Copper<br/><div className="text-[24px]">4</div> </div>
            </div>
            <div className="supplies">
                <div className="suppliesHead">
                    Supplies
                </div>
                <div className="suppliesFood">Food<br/><div className="text-[28px]">1 Day</div></div>
                <div className="suppliesWater">Water<br/><div className="text-[28px]">1 Day</div></div>
                <div className="suppliesSalves">Salves<br/><div className="text-[28px]">3 Salves</div></div>
            </div>
            <div className="reagents">
                <div className="reagentsHead">
                    Reagents
                </div>
                <div className="reagentsOrdinary">Ordinary<br/><div className="text-[24px]">16</div></div>
                <div className="reagentsCommon">Common<br/><div className="text-[24px]">10</div> </div>
                <div className="reagentsUncommon">Uncommon<br/><div className="text-[24px]">7</div> </div>
                <div className="reagentsRare">Rare<br/><div className="text-[24px]">3</div></div>
                <div className="reagentsLegendary">Legendary<br/><div className="text-[24px]">1</div> </div>
            </div>
            <div className="materials">
                <div className="materialsHead">
                    Materials
                </div>
                <div className="materialsOrdinary">Ordinary<br/><div className="text-[24px]">16</div></div>
                <div className="materialsCommon">Common<br/><div className="text-[24px]">10</div> </div>
                <div className="materialsUncommon">Uncommon<br/><div className="text-[24px]">7</div> </div>
                <div className="materialsRare">Rare<br/><div className="text-[24px]">3</div></div>
                <div className="materialsLegendary">Legendary<br/><div className="text-[24px]">1</div> </div>
            </div>
            <div className="equip1">
                equip1
            </div>
            <div className="equip2">
                equip2
            </div>
            <div className="equip3">
                equip3
            </div>
            <div className="innerwear">
                innerwear
            </div>
            <div className="outerwear">
                outerwear
            </div>
            <div className="itemFilter">
                itemfilter
            </div>
            <div className="itemTable">
                itemTable
            </div>
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
            <div className="spellTitle">
                Spells and Abilities
            </div>
            <div className="spellInfo1">
                spell info 1
            </div>
            <div className="spellInfo2">
                spell info 2
            </div>
            <div className="spellFilter">
                spell filter
            </div>
            <div className="spellTable">
                spell table
            </div>
        </div>
    </div>
)
}