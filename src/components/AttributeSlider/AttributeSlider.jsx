import styles from '../../pages/SliderBreedSelector/SliderBreedSelector.module.css';
function AttributeSlider({ attribute_name, current_value, onSliderChange }) {
  return (
    <div className={styles.attribute_slider}>
      <label className={styles.slider_label}>
        {attribute_name}: {current_value}
      </label>
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

export default AttributeSlider;
