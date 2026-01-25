function ResultsContainer({ data }) {
  // Render skeleton grid if there is no data or data is empty
  if (!data || data.length === 0) {
    return (
      //Commented out for ease of testing
      // <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      //   {/* Empty space with fixed min-height to prevent layout shift */}
      //   <div className="mt-6 min-h-[400px]" />
      // </div>
      <div>No breeds returned. Please change your settings and try again.</div>
    );
  }

  // Render the results grid with a heading and a card for each breed
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-primary mb-6 text-center drop-shadow-sm">
        Recommended Breeds
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 min-h-100">
        {data.map((breed) => (
          <BreedCard key={breed.breed_id} breed={breed} />
        ))}
      </div>
    </section>
  );
}
// Card component for each breed
// Inline BreedCard component, only used within ResultsContainer
function BreedCard({ breed }) {
  return (
    <div className="group relative bg-white/90 border border-brand-border rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-between overflow-hidden">
      {/*Breed image*/}
      {breed.breed_image ? (
        <img
          src={breed.breed_image}
          alt={breed.breed_name}
          className="aspect-square w-full rounded-t-xl bg-brand-disabled object-cover group-hover:opacity-80 lg:aspect-auto lg:h-80 border-b border-brand-border"
        />
      ) : (
        <div className="aspect-square w-full rounded-t-xl bg-brand-disabled flex items-center justify-center lg:aspect-auto lg:h-80 border-b border-brand-border">
          {/* Placeholder SVG for missing image */}
          <svg
            className="w-12 h-12 text-brand-footer-text"
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
        <h3 className="text-xl font-bold text-brand-primary text-center">
          <span aria-hidden="true" className="absolute inset-0"></span>
          {breed.breed_name}
        </h3>
        <p className="mt-2 text-base font-medium text-brand-secondary text-center">
          Score:{' '}
          {breed.breed_score !== undefined
            ? Math.round(breed.breed_score)
            : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default ResultsContainer;
