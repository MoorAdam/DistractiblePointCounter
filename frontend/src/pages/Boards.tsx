import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";

const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

import CompetitorData from '../components/Boards page components/CompetitorData.js';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState(false);


    interface winner {
        name : string,
        data : string[]
    }

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
        let maxPoints : number = Number.MIN_VALUE
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
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={resetPoints} >Reset Scores</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={() => setNewEpisodeModalVisibility(true)} >Create new Episode</button>
                </div>
            </div>
            <Modal children={<CreateNewEpisodeFields/>} open={newEpisodeModalVisibility} onClose={setNewEpisodeModalVisibility}/>
            <div className={"container"}>
                <CompetitorBoard
                        competitorData={competitorData.Mark}
                        addPoint={handleAddPoint}
                    />
                    <CompetitorBoard
                        competitorData={competitorData.Bob}
                        addPoint={handleAddPoint}
                    />
                    <CompetitorBoard
                        competitorData={competitorData.Wade}
                        addPoint={handleAddPoint}
                    />
            </div>
        </div>
    );

}

export default Boards;
