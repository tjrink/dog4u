import { useState } from 'react';
import { getSliderQuizResults } from '../../services/api';
import SliderHolder from '../../components/SliderHolder/SliderHolder';
import ResultsContainer from '../../components/ResultsContainer';

//Constants for user inputs
const coat_lengths = ['Short', 'Medium', 'Long'];
const coat_types = ['Curly', 'Dense', 'Flat', 'Rough', 'Silky', 'Smooth', 'Straight', 'Wavy', 'Wiry'];
const attribute_names = [
  'Playfulness', 'Energy', 'Affection', 'Good With Strangers',
  'Good With Children', 'Drooling', 'Shedding', 'Trainability',
];

function SliderBreedSelector() {

  //Sets the initial values for all user inputs
  //Weight range is set from 10 to 200
  //Coat types and lengths are set to true by default
  //Sliders are given a random value between 1 and 100
  const [allValues, setAllValues] = useState(() => {
    const initialState = { minWeight: '10', maxWeight: '200' };
    coat_lengths.forEach(len => { initialState[`${len.toLowerCase()}Coat`] = true; });
    coat_types.forEach(type => { initialState[`${type.toLowerCase()}Coat`] = true; });
    attribute_names.forEach(attr => { initialState[attr] = Math.floor(Math.random() * 100); });
    return initialState;
  });

  const [results, setResults] = useState(null);

  //Updates allValues when any user input is changed
  const handleChange = (e) => {
    const { name, checked, value, type, dataset } = e.target;
    const fieldName = name || dataset.attribute_name;
    const finalValue = type === 'checkbox' ? checked : value;
    setAllValues(prev => ({ ...prev, [fieldName]: finalValue }));
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

  return (
    <div className="p-8 bg-neutral-900 rounded-xl text-white max-w-7xl mx-auto">
      <ResultsContainer data={results} />

      {/* Filter Bar - Contains weight, coat type and coat length filters */}
      <div className="flex flex-col md:flex-row gap-6 bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
        <WeightFilter allValues={allValues} handleChange={handleChange}></WeightFilter>
        <CoatLengthFilter allValues={allValues} handleChange={handleChange}></CoatLengthFilter>
        <CoatTypeFilter allValues={allValues} handleChange={handleChange}></CoatTypeFilter>
      </div>

      {/* Attribute Slider holder */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <SliderHolder
          attributes={attribute_names}
          values={allValues}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold rounded-lg transition-transform active:scale-95 shadow-lg shadow-amber-400/10"
        >
          Find My Perfect Breed
        </button>
      </form>
    </div>
  );
}

function WeightFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[30%]">
      <h4 className="text-amber-400 font-semibold uppercase tracking-wider text-sm mb-4">Weight (lbs)</h4>
      <div className="flex gap-2">
        <input
          type="number"
          name="minWeight"
          value={allValues.minWeight}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:ring-2 focus:ring-amber-400 outline-none"
          placeholder="Min"
        />
        <input
          type="number"
          name="maxWeight"
          value={allValues.maxWeight}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 focus:ring-2 focus:ring-amber-400 outline-none"
          placeholder="Max"
        />
      </div>
    </div>
  )
} 

function CoatLengthFilter({ allValues, handleChange }) {
  return (
    <div className="w-full md:w-[30%]">
      <h4 className="text-amber-400 font-semibold uppercase tracking-wider text-sm mb-4">Coat Length</h4>
      <div className="flex flex-wrap gap-4">
        {coat_lengths.map((len) => (
          <label key={len} className="flex items-center gap-2 cursor-pointer text-sm hover:text-amber-200 transition-colors">
            <input
              name={`${len.toLowerCase()}Coat`}
              type="checkbox"
              checked={allValues[`${len.toLowerCase()}Coat`]}
              onChange={handleChange}
              className="w-4 h-4 accent-amber-400"
            />
            {len}
          </label>
        ))}
      </div>
    </div>
  )
}

function CoatTypeFilter({ allValues, handleChange }) {
  return (
        <div className="w-full md:w-[40%]">
          <h4 className="text-amber-400 font-semibold uppercase tracking-wider text-sm mb-4">Coat Type</h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {coat_types.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer text-sm hover:text-amber-200 transition-colors">
                <input
                  name={`${type.toLowerCase()}Coat`}
                  type="checkbox"
                  checked={allValues[`${type.toLowerCase()}Coat`]}
                  onChange={handleChange}
                  className="w-4 h-4 accent-amber-400"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
  )
}


export default SliderBreedSelector;