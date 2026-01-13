import { useState, useEffect } from "react";
import styles from "./SliderQuiz.module.css";

function SliderQuiz() {
    
    //Calls the slider_change function on page load
    //Causes the initial breeds to populate
    useEffect(() => {
        slider_change(null);
    }, []);

    //List of categories being used
    const attribute_names = ["Playfulness", "Energy", "Affection", "Good With Strangers", "Good With Children", "Drooling", "Shedding", "Trainability"];

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
    const slider_change = async (event) => {
        
        let updatedValues;

        //Runs code if triggered by a slider move
        if (event) {
            const name = event.target.dataset.attribute_name;
            const value = parseInt(event.target.value);

            //Updates updatedValues object
            //Sets each slider category as a key with a value matching the slider's current setting
            updatedValues = {
                ...allValues,
                [name]: value
            };

            // Update the UI state for the slider
            setAllValues(updatedValues);
        } else {
            //Uses current state if triggered by the page load
            updatedValues = allValues;
        }


        //Sends values to server and recieves back picks
        try {
            const response = await fetch('http://localhost:5000/api/get_slider_quiz_results', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(updatedValues),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            //Receives data back and prints out top 3 breeds to console
            //This will be where the photo values are set
            const data = await response.json();
            const top_breeds = data["received"];
            console.log("Response from server: ", top_breeds[0].name, ",", top_breeds[1].name, ",", top_breeds[2].name);
        } catch (error) {
            console.log("Error occurred: ", error);
        }
    };

    return (
        <div className={styles.slider_container}>
            <h1>Preference Quiz</h1>
            <BreedsFrame></BreedsFrame>

            <SliderHolder
                attributes={attribute_names}
                values={allValues}
                onChange={slider_change}
            />

        </div>
    );
}


function BreedsFrame() {
    return (
        <div className={styles.breeds_frame}>
            <BreedHolder></BreedHolder>
            <BreedHolder></BreedHolder>
            <BreedHolder></BreedHolder>
        </div>
    )
}

function BreedHolder() {
    return (
        <div className={styles.breed_holder}>
            <img className={styles.breed_image} src="https://bestforpet.co.nz/wp-content/uploads/2025/07/Golden_Retriever.jpg"></img>
        </div>
    )
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