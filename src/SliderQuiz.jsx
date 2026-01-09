import styles from "./SliderQuiz.module.css"

function SliderQuiz() {
    return (
        <SliderHolder></SliderHolder>

    )
}

function SliderHolder() {
    const sample_attributes = ["Playfulness", "Energy", "Affection", "Loyalty", "Good With Children", "Drooling", "Shedding", "Trainability"]

    return (
        <div className={styles.slider_holder}>
            {sample_attributes.map((text, index) => (
                <AttributeSlider key={index} attribute_name={text} />
            ))}

        </div>
    )
}

function AttributeSlider(props) {
    const slider_change = (event) => {
        console.log(event.target.dataset.attribute_name)
    }

    return (
        <div className={styles.attribute_slider}>
            <label className={styles.slider_input} for="first_slider">{props.attribute_name}</label>
            <input id="first_slider" type="range" data-attribute_name={props.attribute_name} onChange={slider_change}></input>
        </div>
    )
}




export default SliderQuiz