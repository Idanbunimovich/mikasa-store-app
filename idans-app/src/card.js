import React from "react";
import "./card.css";
const Card = ({ballType,sport}) => {
    return(
        <div className='grow br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
            <img alt='logo' src={ballType}/>
            <p className="f2 measure b">{sport}</p>
          <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" onClick={}>add to shoping card</p>
        </div>

    );
}
export default Card;