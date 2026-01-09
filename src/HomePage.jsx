import styles from './HomePage.module.css'
import { Route, Link } from 'react-router-dom';

function HomePage() {

    return (
        <div>
            <Link to="/quiz">
                <button className={styles.home_button}>Take the quiz</button>
            </Link>
            <Link to="/slider">
                <button className={styles.home_button}>Custom Preferences</button>
            </Link>
        </div>



    )


}



export default HomePage