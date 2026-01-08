import ABPanel from './ABPanel'
import './App.css'

//Temporary holder for option choice strings. Done to get functionality working
const option_strings = ["Sheds constantly", "Great with kids", "Aggressive with strangers", "10-14 pounds", "Needs daily grooming", "Drool machine", "Rarely sheds", "No children allowed"];

//Shuffles strings
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


function App() {
  //Shuffle the option strings. Give the first half to Panel A and the second half to Panel B
  const shuffled = shuffle(option_strings);
  const firstFour = shuffled.slice(0, 4);
  const lastFour = shuffled.slice(4, 8);

  return (
    <>
    <div className='ab_panel_container'>
      <ABPanel panel_name="Breed A" option_choices={firstFour}/>
      <ABPanel panel_name="Breed B" option_choices={lastFour}/>
    </div>
    </>
  )
}



export default App
