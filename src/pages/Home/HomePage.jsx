import styles from './HomePage.module.css'
import { Route, Link } from 'react-router-dom';

function HomePage() {

    //Connects to the database and returns a list of all breeds. Prints each breed to console.
    //Does not serve any purpose, used only as a test of database functionality.
    //Will be removed in later versions.
    const fetch_breeds = async () => {
    try {
        //Queries breeds api
        const response = await fetch('http://localhost:5000/api/breeds');
        
        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        const data = await response.json();
        
        //Prints name of each breed in the response
        data.forEach(breed => {
            console.log(breed.breed_name);
        });

    } catch (error) {
        console.log("Error fetching breeds:", error);
    }
    };  


    //Looks up a breed by name and returns the breed's nickname
    //Used only as a test of sending a parameterized query to the database
    //Will be removed in future versions
    const get_breed_nickname = async () => {

        //Gets breed name based on the value of the relevant text box
        const breed_input = document.getElementById("breed_test");
        const requested_breed = breed_input.value;

        //Sends a POST request with the parameter
        try {
            const response = await fetch('http://localhost:5000/api/get_breed_nickname', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({requested_breed})
            });

            if (!response.ok) {
                throw new Error("Network response not ok")
            }

            const data = await response.json();

            //Prints the breed nickname to console
            data.forEach(item => {
                console.log(item);
            });
        } catch (error) {
            console.log("Error getting nicknames");
        }
    };

    //Home page element with a few placeholder buttons 
    return (
        <div>
            <Link to="/quiz">
                <button className={styles.home_button}>Take the quiz</button>
            </Link>
            <Link to="/slider">
                <button className={styles.home_button}>Custom Preferences</button>
            </Link>
            <button onClick={get_breed_nickname}>Log breed information</button>
            <input type="text" name="breed_test" id="breed_test"></input>
        </div>



    )


}

export default HomePage