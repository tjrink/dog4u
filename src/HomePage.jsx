import styles from './HomePage.module.css'
import { Route, Link } from 'react-router-dom';

function HomePage() {

    const fetch_breeds = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/breeds');
            
            if (!response.ok) {
                throw new Error('Network response not ok');
            }

            const data = await response.json();
            
            data.forEach(breed => {
                console.log(breed.breed_name);
            });

        } catch (error) {
            console.log("Error fetching breeds:", error);
        }
    };

    return (
        <div>
            <Link to="/quiz">
                <button className={styles.home_button}>Take the quiz</button>
            </Link>
            <Link to="/slider">
                <button className={styles.home_button}>Custom Preferences</button>
            </Link>
            <button onClick={fetch_breeds}>Log breed information</button>
        </div>



    )


}



export default HomePage