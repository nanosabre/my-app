import "./story.css";

export default function story() {
    return (
        <div className="story">
            <textarea className="appearance" placeholder="Describe your character's appearance and impression."></textarea>
            <textarea className="bgstory" placeholder="Explore your character's background and story."></textarea>
            <textarea className="motivations" placeholder="Enter your character's Motivations."></textarea>
        </div>
)
}