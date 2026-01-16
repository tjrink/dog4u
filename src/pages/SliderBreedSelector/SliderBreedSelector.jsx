import { useState } from 'react';
import { getSliderQuizResults } from '../../services/api';
import styles from './SliderBreedSelector.module.css';
import SliderHolder from '../../components/SliderHolder/SliderHolder';
import ResultsContainer from '../../components/ResultsContainer';

//Sets up names for attribute inputs and sliders
const coat_lengths = ['Short', 'Medium', 'Long'];
  const coat_types = ['Curly', 'Dense', 'Flat', 'Rough', 'Silky', 'Smooth', 'Straight', 'Wavy', 'Wiry'];
const attribute_names = [
  'Playfulness',
  'Energy',
  'Affection',
  'Good With Strangers',
  'Good With Children',
  'Drooling',
  'Shedding',
  'Trainability',
];

function SliderBreedSelector() {
  // Sets initial values of all inputs and sliders 
  const [allValues, setAllValues] = useState(() => {
    //Initialization of weight and coat values
    const initialState = {
      minWeight: '10',
      maxWeight: '200'
    };

    //Initialize Coat Lengths (True by default)
    coat_lengths.forEach(len => {
      initialState[`${len.toLowerCase()}Coat`] = true;
    });

    //Initialize Coat Types (True by default)
    coat_types.forEach(type => {
      initialState[`${type.toLowerCase()}Coat`] = true;
    });

    //Sets initial values of sliders to random numbers
    for (let i = 0; i < attribute_names.length; i++) {
      initialState[attribute_names[i]] = Math.floor(Math.random() * 100);
    }
    return initialState;
  });

  //Updates values when any user input element changes
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    // Use the name attribute, or the custom data attribute for sliders
    const fieldName = name || dataset.attribute_name;

    // Determine if we should use the 'checked' boolean or the input 'value'
    const finalValue = type === 'checkbox' ? checked : value;

    setAllValues(prev => ({
      ...prev,
      [fieldName]: finalValue
    }));

  };

  // Submit slider values and show results
  const [results, setResults] = useState(null);

  //Sends current slider values to the quiz API
  //API calculates results and sends back the data set
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getSliderQuizResults(allValues);

      if (data && data.received) {
        setResults(data.received);
      } else if (data.error) {
        setResults([{ name: `Error: ${data.error}` }]);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setResults([{ name: 'Error fetching results' }]);
    }
  };

  return (
    <div className={styles.slider_container}>
      <ResultsContainer data={results}></ResultsContainer>
      <div className={styles.weight_filter_box}>
        <div className={styles.filter_bar}>
          {/* Box 1: Weight*/}
          <WeightFilter allValues={allValues} handleChange={handleChange}></WeightFilter>

          {/* Box 2: Coat Length*/}
          <CoatLengthFilter allValues={allValues} handleChange={handleChange}></CoatLengthFilter>

          {/* Box 3: Coat Type*/}
          <CoatTypeFilter allValues={allValues} handleChange={handleChange}></CoatTypeFilter>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <SliderHolder
          attributes={attribute_names}
          values={allValues}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </form>
    </div>
  );
}

function WeightFilter({ allValues, handleChange }) {
  return (
    <div className={styles.filter_section_30}>
      <h4 className={styles.section_title}>Weight (lbs)</h4>
      <div className={styles.weight_inputs_row}>
        <input
          type="number"
          name="minWeight"
          placeholder="Min"
          value={allValues.minWeight}
          onChange={handleChange}
          className={styles.weight_input}
        />
        <input
          type="number"
          name="maxWeight"
          placeholder="Max"
          value={allValues.maxWeight}
          onChange={handleChange}
          className={styles.weight_input}
        />
      </div>
    </div>
  )
}

function CoatLengthFilter({ allValues, handleChange }) {
  return (
    <div className={styles.filter_section_30}>
      <h4 className={styles.section_title}>Coat Length</h4>
      <div className={styles.checkbox_group_row}>
        {coat_lengths.map((len) => {
          const fieldName = `${len.toLowerCase()}Coat`; // This matches your state keys like 'shortCoat'
          return (
            <label key={len} className={styles.checkbox_label}>
              <input
                name={fieldName}
                type="checkbox"
                checked={allValues[fieldName]} // This makes it reflect the true/false in state
                onChange={handleChange}        // Use the unified handler
              />
              {len}
            </label>
          );
        })}
      </div>
    </div>
  )
}

function CoatTypeFilter({ allValues, handleChange }) {
  return (
    <div className={styles.filter_section_40}>
      <h4 className={styles.section_title}>Coat Type</h4>
      <div className={styles.checkbox_grid}>
        {coat_types.map((type) => {
          const fieldName = `${type.toLowerCase()}Coat`;
          return (
            <label key={type} className={styles.checkbox_label}>
              <input
                name={fieldName}
                type="checkbox"
                checked={allValues[fieldName]}
                onChange={handleChange}
              />
              {type}
            </label>
          );
        })}
      </div>
    </div>
  )
}

export default SliderBreedSelector;
