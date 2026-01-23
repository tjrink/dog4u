import AttributeSlider from '../AttributeSlider/AttributeSlider';

function SliderHolder({ attributes, values, onChange }) {
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mb-8 shadow-inner">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">
        Breed Personality Traits
      </h3>

      {/* The grid container: 
        - 1 column on mobile (grid-cols-1)
        - 2 columns on larger screens (md:grid-cols-2)
        - 3 columns on extra-large screens (lg:grid-cols-3)
        - 'gap-6' provides enough space so sliders don't overlap 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {attributes.map((attr) => (
          <div key={attr} className="w-full">
            <AttributeSlider
              attribute_name={attr}
              current_value={values[attr]}
              onSliderChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderHolder;
