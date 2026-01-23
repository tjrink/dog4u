import { useState, useRef, useEffect } from 'react';
import { getSliderQuizResults } from '../../services/api';
import SliderHolder from '../../components/SliderHolder/SliderHolder';
import ResultsContainer from '../../components/ResultsContainer';

//Constants for user inputs
const coat_lengths = ['Short', 'Medium', 'Long'];
const coat_types = [
  'Curly',
  'Dense',
  'Flat',
  'Rough',
  'Silky',
  'Smooth',
  'Straight',
  'Wavy',
  'Wiry',
];
const attribute_names = [
  'Playfulness',
  'Obedicence',
  'Affection',
  'Good With Strangers',
  'Good With Children',
  'Good With Pets',
  'Drooling',
  'Shedding',
  'Barking',
  'Trainability',
  'Protective',
  'Energy',
];
const misc_attr = ['Apartment Friendly', 'First Time Owner'];

function SliderBreedSelector() {
  // Ref for results section
  const resultsRef = useRef(null);
  //Sets the initial values for all user inputs
  //Weight range is set from 10 to 200
  //Coat types and lengths are set to true by default
  //Sliders are given a random value between 1 and 100
  const [allValues, setAllValues] = useState(() => {
    const initialState = { minWeight: '10', maxWeight: '200' };
    coat_lengths.forEach((len) => {
      initialState[`${len.toLowerCase()}Coat`] = true;
    });
    coat_types.forEach((type) => {
      initialState[`${type.toLowerCase()}Coat`] = true;
    });
    misc_attr.forEach((att) => {
      initialState[`${att.toLowerCase().replaceAll(' ', '_')}`] = true;
    });
    attribute_names.forEach((attr) => {
      initialState[attr] = Math.floor(Math.random() * 100);
    });
    return initialState;
  });

  const [results, setResults] = useState(null);

  //Updates allValues when any user input is changed
  const handleChange = (e) => {
    const { name, checked, value, type, dataset } = e.target;
    const fieldName = name || dataset.attribute_name;
    const finalValue = type === 'checkbox' ? checked : value;
    setAllValues((prev) => ({ ...prev, [fieldName]: finalValue }));
  };

  //Handles actions when Submit button is clicked
  //Sends off data to the database to get breed results
  //Updates the results cintainer with returned information
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getSliderQuizResults(allValues);
      setResults(data?.received || []);
    } catch (err) {
      setResults([]);
    }
  };

  // Scroll to results section when results change
  useEffect(() => {
    if (results !== null && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  return (
    <div className="mt-8 p-8 bg-white/80 rounded-2xl shadow-xl border border-brand-border w-full max-w-7xl mx-auto text-brand-primary">
      {/* Results Section */}
      <div className="mb-10" ref={resultsRef}>
        <h2 className="text-2xl font-extrabold mb-4 text-brand-primary">
          Results
        </h2>
        <ResultsContainer data={results} />
      </div>

      {/* Physical Traits Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-brand-primary">
          Physical Traits
        </h2>
        <div className="flex flex-col md:flex-row gap-6 bg-brand-disabled/60 p-6 rounded-xl border border-brand-border">
          <WeightFilter
            allValues={allValues}
            handleChange={handleChange}
          ></WeightFilter>
          <CoatLengthFilter
            allValues={allValues}
            handleChange={handleChange}
          ></CoatLengthFilter>
          <CoatTypeFilter
            allValues={allValues}
            handleChange={handleChange}
          ></CoatTypeFilter>
          <MiscFilter
            allValues={allValues}
            handleChange={handleChange}
          ></MiscFilter>
        </div>
      </div>

      {/* Personality Traits Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-brand-primary">
          Personality Traits
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <SliderHolder
            attributes={attribute_names}
            values={allValues}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-4 bg-brand-btn hover:bg-brand-btn-hover text-brand-btn-text text-lg font-bold rounded-xl transition-transform active:scale-95 shadow-lg shadow-brand-btn/10"
          >
            Find My Perfect Breed
          </button>
        </form>
      </div>
    </div>
  );
}

function WeightFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[25%]">
      <h4 className="text-brand-primary font-bold uppercase tracking-wide text-base mb-4">
        Weight (lbs)
      </h4>
      <div className="flex gap-2">
        <input
          type="number"
          name="minWeight"
          value={allValues.minWeight}
          onChange={handleChange}
          className="w-full bg-white border border-brand-border rounded-xl p-2 focus:ring-2 focus:ring-brand-btn outline-none text-brand-primary"
          placeholder="Min"
        />
        <input
          type="number"
          name="maxWeight"
          value={allValues.maxWeight}
          onChange={handleChange}
          className="w-full bg-white border border-brand-border rounded-xl p-2 focus:ring-2 focus:ring-brand-btn outline-none text-brand-primary"
          placeholder="Max"
        />
      </div>
    </div>
  );
}

function CoatLengthFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[25%]">
      <h4 className="text-brand-primary font-bold uppercase tracking-wide text-base mb-4">
        Coat Length
      </h4>
      <div className="flex flex-wrap gap-4">
        {coat_lengths.map((len) => (
          <label
            key={len}
            className="flex items-center gap-2 cursor-pointer text-base text-brand-secondary hover:text-brand-btn transition-colors"
          >
            <input
              name={`${len.toLowerCase()}Coat`}
              type="checkbox"
              checked={allValues[`${len.toLowerCase()}Coat`]}
              onChange={handleChange}
              className="w-4 h-4 accent-brand-btn"
            />
            {len}
          </label>
        ))}
      </div>
    </div>
  );
}

function CoatTypeFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[30%]">
      <h4 className="text-brand-primary font-bold uppercase tracking-wide text-base mb-4">
        Coat Type
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {coat_types.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 cursor-pointer text-base text-brand-secondary hover:text-brand-btn transition-colors"
          >
            <input
              name={`${type.toLowerCase()}Coat`}
              type="checkbox"
              checked={allValues[`${type.toLowerCase()}Coat`]}
              onChange={handleChange}
              className="w-4 h-4 accent-brand-btn"
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  );
}

function MiscFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[30%]">
      <h4 className="text-brand-primary font-bold uppercase tracking-wide text-base mb-4">
        Miscellaneous
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
        {misc_attr.map((att) => (
          <label
            key={att}
            className="flex items-center gap-2 cursor-pointer text-base text-brand-secondary hover:text-brand-btn transition-colors"
          >
            <input
              name={`${att.toLowerCase().replaceAll(' ', '_')}`}
              type="checkbox"
              checked={allValues[`${att.toLowerCase().replaceAll(' ', '_')}`]}
              onChange={handleChange}
              className="w-4 h-4 accent-brand-btn"
            />
            {att}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SliderBreedSelector;
