function AttributeSlider({ attribute_name, current_value, onSliderChange }) {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-300 tracking-wide uppercase">
          {attribute_name}
        </label>
        <span className="text-lg font-bold text-amber-400 tabular-nums">
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
        className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-500 transition-all"
      />
      
      {/* Optional: Add low/high labels for better UX */}
      <div className="flex justify-between text-[10px] text-neutral-500 uppercase font-semibold">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

export default AttributeSlider;