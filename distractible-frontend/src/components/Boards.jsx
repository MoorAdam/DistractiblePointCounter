import React, {useEffect, useState} from 'react';
import CompetitorBoard from "./CompetitorBoard.jsx";

import markImage from '../assets/mark.jpg';
import wadeImage from '../assets/wade.jpg';
import bobImage from '../assets/bob.jpg';

import CompetitorData from './CompetitorData.js';

function Boards() {

    const initialData = {
        Mark: new CompetitorData("Mark", markImage),
        Bob: new CompetitorData("Bob", bobImage),
        Wade: new CompetitorData("Wade", wadeImage),
    };

    const [competitorData, setCompetitorData] = useState(initialData)

    function resetPoints(){
        setCompetitorData(initialData);
    }

    function handleAddPoint(competitorName, point, desc, creationDate){

        console.log(competitorName + " " + point +  " " + desc +  " " + creationDate);
        if (desc === ''){
            alert("By the Laws of the Constitution, you have to write a description! (I can see you Wade....)");
        }
        else{
            const updatedData = { ...competitorData };
            updatedData[competitorName].addPoint(point, desc, creationDate);
            setCompetitorData(updatedData);
        }

    }

    function calculateWinner(){
        let maxPoints = Number.MIN_VALUE
        let winner = null;
        for (let competitorName in competitorData) {
            const points = competitorData[competitorName].tabulatePoints();
            if (points > maxPoints) {
                winner = {
                    name : competitorName,
                    data : competitorData[competitorName]
                }
                maxPoints = points;
            }
        }
        alert(winner.name + " : " + winner.data.tabulatePoints());
        return winner;
    }

    return(
        <div>
            <div>
                <div className={"menu-container glass-background content-inset menu-bar"}>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={calculateWinner}>Calculate winner</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} >Export Scores</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} >Import Scores</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={resetPoints} >Reset Scores</button>

                    <label className={"menu-item checkbox-input-container content-inset interaction  three-dimensional"}>
                        <span className={""}>Enforce Rules</span>
                        <input type={"checkbox"}/>
                    </label>
                </div>
            </div>
            <div className={"container"}>
            <CompetitorBoard
                    competitorData={competitorData.Mark}
                    className="item"
                    addPoint={handleAddPoint}
                />
                <CompetitorBoard
                    competitorData={competitorData.Bob}
                    className="item"
                    addPoint={handleAddPoint}
                />
                <CompetitorBoard
                    competitorData={competitorData.Wade}
                    className="item"
                    addPoint={handleAddPoint}
                />
            </div>



        </div>
    );

}

export default Boards;