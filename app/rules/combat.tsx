export default function Combat() {


    return (
        <div className="content">
            <h1>Combat</h1>
            <p>
                When any creature initiates a hostile action against another creature, it begins its first round of combat.
            </p>
            <h2>Taking Turns</h2>
            <p>
                Ally creatures share turn order. Each turn represents about a second of game time.
            </p>
            <h2>Combat Actions</h2>
            <p>
                A single action may take several turns for a creature to perform.
            </p>
            <h2>Reactions</h2>
            <p>
                When a creature is attacked by another creature, it must make a choice as to how it responds.
            </p>
            <h3>Evade</h3>
            <p>
                When a creature attempts to completely avoid an attack, it takes the Evade Reaction. A player character makes an Evasion skill roll against the DC of the attack. 
                If the roll succeeds, the attack is completely avoided and the creature takes no damage or effect (weapon attacks and projection spells), or partial damage (area projection spells). 
                If a creature fails its Evasion roll, it takes full effect from the attack with damage partially mitigated by its armor.
                Creatures that take the Evade Reaction cancel any actions in progress when evading.
            </p>
            <h3>Withstand</h3>
            <p>
                When a creature allows an attack to land, it takes the Withstand Reaction. The attack made against the creature automatically succeeds, but the withstanding creature gains an additional 1d4 armor for that attack. 
                A creature withstanding an attack continues any actions in progress, if possible. A creature may take the withstand reaction in place of another creature within 1m for an attack intended for the other creature.
            </p>
            <h3>Parry</h3>
            <p>
                When a creature attempted to use its weapon to reduce damage made against it from a melee attack, it takes the Parry Reaction. 
                The attack made agaisnt the creature automatically succeeds, but the Parrying creature reduces the damage by its weapon's damage roll. The resulting damage is again reduced by its armor.
                A creature parrying an attack cancels an actions in progress, and uses its action for that turn.
            </p>
            <h2>Movement</h2>
            <p>
                All creatures have a movement score that represents how many tiles a creature can freely move during its turn.
            </p>
            <h3>Dash Action</h3>
            <p>
                By expending an action to do so, a creature may move up to three times its movement score during a turn.
            </p>
        </div>
    );
}