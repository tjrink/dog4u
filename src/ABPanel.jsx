import { useState } from "react"
import styles from './ABPanel.module.css'

//Sample data strings to populate panels
const option_strings = ["Sheds constantly", "Great with kids", "Aggressive with strangers", "10-14 pounds", "Needs daily grooming", "Drool machine", "Rarely sheds", "No children allowed", "Resists training", "55 pounds", "Easily trainable"];

//Shuffle the strings to provide a different set of values each refresh
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function ABQuiz(props) {
    // Initialize state with a shuffle once on load
    //Shuffles category list and passes the first 4 items to panel a and the next 4 to panel b
    //This will be removed when connected to the database
    //A better workflow is likely requesting the options from the database
    const [panels, setPanels] = useState(() => {
        const shuffled = shuffle(option_strings);
        return {
            a: shuffled.slice(0, 4),
            b: shuffled.slice(4, 8)
        };
    });

    //Function to hanlde a button being clicked
    //For now, just provides logging
    //Eventually will send the data off-site for calculation
    const choice_made = (e) => {
        const panelType = e.target.dataset.selected_panel;
        const strength = e.target.dataset.preference_strength;

        
        console.log(`Selected button: ${e.target.innerText}`);
        console.log(`Panel: ${panelType}, Strength: ${strength}`);
        
        console.log("Panel A Data:", panels.a);
        console.log("Panel B Data:", panels.b);

        const nextShuffle = shuffle(option_strings);
        setPanels({
            a: nextShuffle.slice(0, 4),
            b: nextShuffle.slice(4, 8)
        });
    };

    return (
        <div>
            <h1 className='page_title'>Would You Rather Have?</h1>
            <div className={styles.ab_panel_container}>
                
                <div className={styles.ab_panel_row}>
                    <ABPanel panel_name="Breed A" option_choices={panels.a}/>
                    <ABPanel panel_name="Breed B" option_choices={panels.b}/>
                </div>
                <OptionButtonHolder onChoice={choice_made} />
            </div>
        </div>
    )
}

//Panel that holds the options to select from
function ABPanel(props) {
    return (
        <div className={styles.ab_panel}>
            <h1>{props.panel_name}</h1>
            {props.option_choices.map((text, index) => (
                <OptionHolder key={index} option_text={text} />
            ))}
        </div>
    )
}

//Individual option
function OptionHolder(props) {
  return <div className={styles.ab_option}>{props.option_text}</div>
}

//Container for the selection buttons
function OptionButtonHolder({ onChoice }) {
    return (
        <div className={styles.button_holder}>
            {/* Pass the function down to each individual button */}
            <OptionButton button_text="Definitely A" onBtnClick={onChoice} selected_panel="A" preference_strength="2" />
            <OptionButton button_text="Somewhat A" onBtnClick={onChoice} selected_panel="A" preference_strength="1" />
            <OptionButton button_text="No Opinion" onBtnClick={onChoice} selected_panel="N" preference_strength="0" />
            <OptionButton button_text="Somewhat B" onBtnClick={onChoice} selected_panel="B" preference_strength="1" />
            <OptionButton button_text="Definitely B" onBtnClick={onChoice} selected_panel="B" preference_strength="2" />
        </div>
    )
}

//Individual selection button
function OptionButton(props) {
    return (
        <button 
            className={styles.choice_button} 
            data-selected_panel={props.selected_panel} 
            data-preference_strength={props.preference_strength} 
            onClick={props.onBtnClick}
        >
            {props.button_text}
        </button>
    )
}

export default ABQuiz