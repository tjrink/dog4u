import AttributeSlider from '../AttributeSlider/AttributeSlider';
import styles from '../../pages/SliderBreedSelector/SliderBreedSelector.module.css';

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

export default SliderHolder;
