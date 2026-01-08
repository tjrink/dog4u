import { useState } from "react"

function ABPanel(props) {

    // const [items, setItems] = useState([
    //     
    // ]);
    
    
    return (
        <div className="ab_panel">
            <h1>{props.panel_name}</h1>
            {props.option_choices.map((text, index) => (
                <OptionHolder key={index} option_text={text} />
            ))}
        </div>
    )
}


function OptionHolder(props) {

  
  return (
    <div className="ab_option">{props.option_text}</div>
  )
}


export default ABPanel