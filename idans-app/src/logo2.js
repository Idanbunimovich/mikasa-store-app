import {logo} from "./img/export";
import React from "react";
import Tilt from "react-tilt";

const Logo2 = () => {
    return (
        <div style={{margin:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{height: 150, width: 500 }} >
                <div className="Tilt-inner pa3" style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <h1 style={{margin:"10px"}}>Sports</h1>
                    <img className="logo" style={{paddingTop: '5px'}} alt="logo" src={logo}/>
                </div>
            </Tilt>
        </div>
    )
}
export default Logo2;
