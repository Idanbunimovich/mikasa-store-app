import React from "react";
import {futsalGame, basketGame, footyGame, soccerGame, volleyGame} from "./img/export";
import Logo2 from "./logo2";

class Sports extends React.Component {
    render() {
        return(
            <div>
                <Logo2/>
            <div className="flex pa4 ma4">
                <img alt='fut' src={basketGame}/>
                <p className="f8 ml2">Basketball, colloquially referred to as hoops, is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball  through the defender's hoop while preventing the opposing team from shooting through their own hoop</p>

            </div>
        <div className="flex pa4 ma4">
            <img alt='fut1' src={footyGame}/>
            <p className="f8 ml2">Footvolley (Portuguese: Futevôlei) is a sport which combines aspects of beach volleyball and association football.

                Footvolley was created by Octavio de Moraes in 1965 in Brazil. Footvolley combines field rules that are based on those of beach volleyball with ball-touch rules taken from association football. Essentially footvolley is beach volleyball except players are not allowed to use their hands and a football replaces the volleyball.</p>

        </div>
                <div className="flex pa4 ma4">
                    <img alt='fut1' src={volleyGame}/>
                    <p className="f8 ml2">Volleyball is a team sport in which two teams of six players are separated by a net. Each team tries to score points by grounding a ball on the other team's court under organized rules. It has been a part of the official program of the Summer Olympic Games since Tokyo 1964.</p>

                </div>
                <div className="flex pa4 ma4">
                    <img alt='fut1' src={futsalGame}/>
                    <p className="f8 ml2">Futsal (also known as fútsal or footsal) is a ball sport played on a hard court, smaller than a football pitch, and mainly indoors. It has similarities to five-a-side football.

                        Futsal is played between two teams of five players each, one of whom is the goalkeeper. Unlimited substitutions are permitted. Unlike some other forms of indoor football, the game is played on a hard court surface delimited by lines; walls or boards are not used. Futsal is also played with a smaller, harder, low-bounce ball. The surface, ball and rules together favour ball control and passing in small spaces. The game's "emphasis is on improvisation, creativity and technique".</p>

                </div>
                <div className="flex pa4 ma4">
                    <img alt='fut1' src={soccerGame}/>
                    <p className="f8 ml2">Association football, more commonly known as football or soccer, is a team sport played with a spherical ball between two teams of 11 players. It is played by approximately 250 million players in over 200 countries and dependencies, making it the world's most popular sport. The game is played on a rectangular field called a pitch with a goal at each end. The object of the game is to outscore the opposition by moving the ball beyond the goal line into the opposing goal. The team with the higher number of goals wins the game.</p>

                </div>
            </div>
        );
    }
    }
    export default Sports;
