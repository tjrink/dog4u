import { useState } from "react";
import styles from "./SliderQuiz.module.css";

function SliderQuiz() {
    const attribute_names = ["Playfulness", "Energy", "Affection", "Loyalty", "Good With Children", "Drooling", "Shedding", "Trainability"];



    //Sets initial values of all sliders to a random number between 0 and 100
    const [allValues, setAllValues] = useState(() => {
        const initialState = {};
        for (let i = 0; i < attribute_names.length; i++) {
            initialState[attribute_names[i]] = Math.floor(Math.random() * 100); 
        }
        return initialState;
    });

    //Function to handle app behavior when a slider changes
    //Ultimately, this function will send the state to the database, recieve the new results and change the display
    const slider_change = (event) => {
        const name = event.target.dataset.attribute_name;
        const value = parseInt(event.target.value);

        //Updates the allValues object to current set of slider values
        setAllValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Logs values
        // console.log("Current State of All Sliders:", allValues);
    };

    return (
        <div className={styles.slider_container}>
            <h1>Preference Quiz</h1>
            <SliderHolder 
                attributes={attribute_names} 
                values={allValues} 
                onChange={slider_change} 
            />
            
        </div>
    );
}

function SliderHolder({ attributes, values, onChange }) {
    return (
        <div className={styles.slider_holder}>
            {attributes.map((text, index) => (
                <AttributeSlider 
                    key={index} 
                    attribute_name={text} 
                    current_value={values[text]} 
                    onSliderChange={onChange}
                />
            ))}
        </div>
    );
}

function AttributeSlider({ attribute_name, current_value, onSliderChange }) {
    return (
        <div className={styles.attribute_slider}>
            <label className={styles.slider_label}>{attribute_name}: {current_value}</label>
            <input 
                type="range" 
                min="0"
                max="100"
                value={current_value}
                data-attribute_name={attribute_name} 
                onChange={onSliderChange}
            />
        </div>
    );
}

export default SliderQuiz;