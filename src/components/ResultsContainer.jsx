function ResultsContainer({ data }) {
  // Card component for each breed
  // Inline BreedCard component, only used within ResultsContainer
  function BreedCard({ name, imageUrl, breed_score }) {
    // Debug: print imageUrl for each card
    console.log('BreedCard imageUrl:', imageUrl);
    return (
      <div className="group relative bg-white rounded-md shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-between">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
        ) : (
          <div className="aspect-square w-full rounded-md bg-gray-200 flex items-center justify-center lg:aspect-auto lg:h-80">
            {/* Placeholder SVG for missing image */}
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        )}
        <div className="mt-4 w-full flex flex-col items-center justify-center px-4 pb-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {name}
          </h3>
          <p className="mt-2 text-lg font-medium text-gray-700 text-center">
            Score: {breed_score !== undefined ? Math.round(breed_score) : 'N/A'}
          </p>
        </div>
      </div>
    );
  }
  // Render skeleton grid if there is no data or data is empty
  if (!data || data.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Empty space with fixed min-height to prevent layout shift */}
        <div className="mt-6 min-h-[400px]" />
      </div>
    );
  }

  // Render the results grid with a heading and a card for each breed
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {/* Section title only shown when cards are present */}
      <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
        Recommended Breeds
      </h2>
      {/* Responsive grid of breed cards. min-h-[400px] prevents layout shift when cards appear. Adjust as needed. */}
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 min-h-[400px]">
        {data.map((breed) => (
          // Use breed_id as the key for optimal React rendering
          <BreedCard
            key={breed.breed_id || breed.name}
            name={breed.name}
            imageUrl={breed.imageUrl}
            breed_score={breed.breed_score}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultsContainer;
