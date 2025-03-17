import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";
import {NavItem} from "@types";

const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

import CompetitorData from '../components/Boards page components/Competitor.js';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';
import NavBar from '../components/NavBar';
import WinnerModalContent from '../components/Boards page components/WinnerModalContent';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState(false);
    const [winner, setWinner] = useState(null);

    const [winnerModal, setWinnerModal] = useState(false);

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

    const buttonStyle = "btn btn-outline btn-success";

    const navBarItems: NavItem[] = [
        {buttonText: "calculateWinner", onclick: calculateWinner, buttonStyle : buttonStyle},
        {buttonText: "resetPoints", onclick: resetPoints, buttonStyle : buttonStyle},
        {buttonText: "Create new Episode", onclick: () => setNewEpisodeModalVisibility(true), buttonStyle : buttonStyle}
    ];



    function calculateWinner(){
        let maxPoints : number = Number.MIN_VALUE
        let winner = null;
        for (let competitorName in competitorData) {
            const points = competitorData[competitorName].tabulatePoints();
            if (points > maxPoints) {
                winner = competitorData[competitorName]
                maxPoints = points;
            }
        }
        setWinner(winner);
        setWinnerModal(true);
        return winner;
    }
    

    return(
        <div>
            <Modal children={<WinnerModalContent competitor={winner} onClose={() => setWinnerModal(false)} onEndEpisode={() => setWinnerModal(false)}/>} open={winnerModal}/>

            <div>
                <NavBar children={navBarItems}/>
            </div>
            
            {winnerModal ? <Modal children={<CreateNewEpisodeFields/>} open={newEpisodeModalVisibility}/> : null} 
            <div className={"flex gap-4 m-4 h-full"}>
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
