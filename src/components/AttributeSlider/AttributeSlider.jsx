function AttributeSlider({ attribute_name, current_value, onSliderChange }) {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white/5 rounded-lg border border-brand-border hover:border-brand-btn transition-colors">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-brand-secondary tracking-wide uppercase">
          {attribute_name}
        </label>
        <span className="text-lg font-bold text-brand-btn tabular-nums">
          {current_value}%
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={current_value}
        data-attribute_name={attribute_name}
        onChange={onSliderChange}
        className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-btn hover:accent-brand-btn-hover transition-all"
      />

      {/* Optional: Add low/high labels for better UX */}
      <div className="flex justify-between text-[10px] text-brand-secondary uppercase font-semibold">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

export default AttributeSlider;
