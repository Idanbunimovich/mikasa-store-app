import React from "react";
import {profile} from "./img/export";

class AboutMe extends React.Component{

    render() {
        return(
          <div className='flex pa4 ma4'>
              <img alt='profile' src={profile}/>
              <p>im Idan Bunimovich Completed successfully second year of computer science major at the Interdisciplinary Center Herzliya (“IDC”).
              i was a DRONE OPERATOR AND INSTRUCTOR in the IDF Conducting drone instruction and presentations in multi participant forums and expos.
              and Operating Skylark Drone in complex army operations.
                  also i enjoy playing a vary amount of sport game involving a ball and also i enjoy programming so i combined my two passions to build this application
                  <br/><br/>thank you alot for visiting my app
              </p>
          </div>
        );
    }
}
export default AboutMe;