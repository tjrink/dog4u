import { useState } from 'react';
import { getSliderQuizResults } from '../../services/api';
import styles from './SliderBreedSelector.module.css';
import SliderHolder from '../../components/SliderHolder/SliderHolder';

function SliderBreedSelector() {
  const attribute_names = [
    'Playfulness',
    'Energy',
    'Affection',
    'Loyalty',
    'Good With Children',
    'Drooling',
    'Shedding',
    'Trainability',
  ];

  // Sets initial values of all sliders to a random number between 0 and 100
  const [allValues, setAllValues] = useState(() => {
    const initialState = {};
    for (let i = 0; i < attribute_names.length; i++) {
      initialState[attribute_names[i]] = Math.floor(Math.random() * 100);
    }
    return initialState;
  });

  // Function to handle app behavior when a slider changes
  const slider_change = (event) => {
    const name = event.target.dataset.attribute_name;
    const value = parseInt(event.target.value);

    setAllValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit slider values and show results ---
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getSliderQuizResults(allValues);
      if (data.error) {
        setResults([{ name: `Error: ${data.error}` }]);
      } else {
        setResults(data.received);
      }
    } catch {
      setResults([{ name: 'Error fetching results' }]);
    }
  };

  return (
    <div className={styles.slider_container}>
      <h1>Preference Selector</h1>
      <form onSubmit={handleSubmit}>
        <SliderHolder
          attributes={attribute_names}
          values={allValues}
          onChange={slider_change}
        />
        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
        <ul>
          {results &&
            results.map((breed, index) => <li key={index}>{breed.name}</li>)}
        </ul>
      </form>
    </div>
  );
}

export default SliderBreedSelector;
