export default function BasicRules() {


    return (
        <div className="content">
            <h1>Basic Rules</h1>
            <h2>Interacting with the World</h2>
            <p>
                Characters in spellblade are encouraged to freely interact with the game world around them according to the intent of the players driving them, the flow of the story, and the rules of the game.

                Most actions performed by characters are simple, and do not require special skills or rolls to perform. Talking to creatures, interacting with objects, and casting enchantment spells are generally considered to be simple actions.
            </p>
            <h3>Simple Actions</h3>
            <p>
                Characters in spellblade are encouraged to freely interact with the game world around them according to the intent of the players driving them, the flow of the story, and the rules of the game.

                Most actions performed by characters are simple, and do not require special skills or rolls to perform. Talking to creatures, interacting with objects, and casting enchantment spells are generally considered to be simple actions.
            </p>
            <h3>Skilled Actions and DC</h3>
            <p>
                A skilled action is something performed by a creature that has a reasonable and meaningful chance of failure. In order to succeed at a skilled action, a creature must perform a *skill roll* by using a D20 dice, increased by the action's skill score. The skill score used can be Fitness, Technique, Focus, or Sense, which decreases or increases the result of the D20 roll.

                The total result of a skill roll is compared to the difficulty check (DC) of the roll, set by the DM or compared against the stat of an opposing creature.

                Attacks made during combat are considered to be a form of skilled action, but have additional restriction on what modifiers may or may not be used.
            </p>
            <h2>Advantage and Disadvantage</h2>
            <p>
                Creatures may gain "an **advantage**" or "a **disadvantage**" to attack, skill, or save rolls. 
                Each advantage increases the number of D20s rolled, with the highest roll being chosen. 
                Each disadvantage also increases the number of dice to be used, with the lowest roll being chosen. 
                Each level of disadvantage cancels out one level of advantage. A creature can have multiple levels of advantage or disadvantage.
            </p>
            <h2>Critical Success</h2>
            <p>
                When a D20 rolls a 20, the roll is considered to be a critical success. A critical success inceases the roll by another 5. 
                If the roll is an attack, the roll becomes a *critical strike*, ignoring the hit creature's armor and inflicting an additional wound (see *Wounds and Death*) to the hit creature.
            </p>
            <h2>Helping and Hindering</h2>
            <p>
                Creatures may choose to assist or subvert another creature making a skill roll. When a creature performs a skill roll, the helping or hindering creature may add or subtract its skill score (minimum of 1) to the roll being made. More than one creature may choose to help or hinder a single action.

                In combat, a helping or hindering action requires at least two Action Points to be effective.
            </p>
            <h2>Group Rolls</h2>
            <p>
                In some situations, a group of creatures is collectively challenged with a skill roll. When this happens all creatures individually make the necessary skill roll; the result of which is determined one of three ways:

                - **First Success**: If one creature in the group succeeds the roll, the roll is considered to be a success.

                - **Average Success**: The modified results of all creature rolls are averaged (rounding up), and then compared to the required DC of the roll. If successful, the roll is considered to be a success.

                - **First Failure**: If one creature in the group fails the roll, the roll is considered to be a failure. For first failure rolls, a creature in a group may choose to give itself a disadvantage to the roll in exchange for giving a different creature in the group the help action.
            </p>
        </div>
    );
}