import { useState } from "react"
import styles from './ABPanel.module.css'


//Temporary holder for option choice strings. Done to get functionality working
const option_strings = ["Sheds constantly", "Great with kids", "Aggressive with strangers", "10-14 pounds", "Needs daily grooming", "Drool machine", "Rarely sheds", "No children allowed"];

//Shuffles strings
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


function ABQuiz(props) {
    //Shuffle the option strings. Give the first half to Panel A and the second half to Panel B
        const shuffled = shuffle(option_strings);
        const firstFour = shuffled.slice(0, 4);
        const lastFour = shuffled.slice(4, 8);
    
    return (
        <div className={styles.ab_panel_container}>
            <div className={styles.ab_panel_row}>
                <ABPanel panel_name="Breed A" option_choices={firstFour}/>
                <ABPanel panel_name="Breed B" option_choices={lastFour}/>
            </div>
            <OptionButtonHolder></OptionButtonHolder>
        </div>
    )
}

function ABPanel(props) {

    return (
        <div>
            <div className={styles.ab_panel}>
                <h1>{props.panel_name}</h1>
                {props.option_choices.map((text, index) => (
                    <OptionHolder key={index} option_text={text} />
                ))}
            </div>
        </div>
    )
}


function OptionHolder(props) {

  
  return (
    <div className={styles.ab_option}>{props.option_text}</div>
  )
}

function OptionButtonHolder() {
    return (
        <div className={styles.button_holder}>
            <OptionButton button_text="Button 1"></OptionButton>
            <OptionButton button_text="Button 2"></OptionButton>
            <OptionButton button_text="Button 3"></OptionButton>
            <OptionButton button_text="Button 4"></OptionButton>
            <OptionButton button_text="Button 5"></OptionButton>

        </div>
    )
}

function OptionButton(props) {
    return (
        <button className={styles.choice_button}>{props.button_text}</button>
    )
}


export default ABQuiz