function ResultsContainer({ data }) {

    //Doesn't render cards unless data contains objects
    if (!data || data.length === 0) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Adjust sliders and click submit to see matches!</div>;
    }
   return (
        //Creates a breed card for each item in the data set
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {data.map((breed, index) => (
                <BreedCard key={index} breed_information={breed} />
            ))}
        </div>
    );
}

function BreedCard({ breed_information }) {
    return (
        <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '30px', 
            width: '250px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
        }}>
            <img style={{
                width: '250px',
                height: '250px'    
            }} 
            src={breed_information.breed_image}></img>
            <h3 style={{ margin: '0 0 10px 0' }}>{breed_information.name}</h3>
            <p>Score: {breed_information.breed_score ? Math.round(breed_information.breed_score) : 'N/A'}</p>
        </div>
    );
}

export default ResultsContainer;