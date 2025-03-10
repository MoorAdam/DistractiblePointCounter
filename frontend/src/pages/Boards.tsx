import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";
import {NavItem} from "@types";

const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

import CompetitorData from '../components/Boards page components/Competitor';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';
import NavBar from '../components/NavBar';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(null);
    const [recordingDate, setRecordingDate] = useState<Date>(new Date(Date.now()));
    const [releaseDate, setReleaseDate] = useState<Date>(null);
    const [host, setHost] = useState<CompetitorData>(null);

    const [error, setError] = useState<string>("");

    interface Episode {
        title? : string,
        recordingDate : Date,
        releaseDate? : Date,
        competitors : string[],
        host : string
    }

    const initialData = {
        Mark: new CompetitorData("Mark", markImage),
        Bob: new CompetitorData("Bob", bobImage),
        Wade: new CompetitorData("Wade", wadeImage),
    };

    const [competitors, setCompetitors] = useState(initialData)

    function createEpisodeFromStates(){
        const episode : Episode = {
            title : title ? title : null,
            recordingDate : recordingDate,
            releaseDate : releaseDate ? releaseDate : null,
            competitors : Object.keys(competitors),
            host : host.getName()
        }
        return episode;
    }


    async function createNewEpisode() {
        //This function gets called by the create button. It creates a new Episode variable, with the inputed infor
        //It sends a fetch to the backend. If the request is successful, it closes the modal, and clears all the points

        try{

            if(!host || !recordingDate){
                setError("You must fill all required fields!");
            }
            else{
                setError("");
                const url = "/api/create-episode";
                const response = await fetch(url, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/JSON"
                    },
                    body : JSON.stringify(createEpisodeFromStates())
                })

                if(!response.ok){
                    setError(response.toString());
                }
                else{
                    clearAllPoints();
                    setNewEpisodeModalVisibility(false);
                    clearAllPoints();
                }
            }
        }
        catch(e){
            setError(e.message)
            //TODO: write to modal: something happened
        }

    }

    function clearAllPoints(){
        this.setCompetitors = Object.entries(competitors).map((comp) => comp[1].clearPoints())
    }

    function handleAddPoint(competitorName, point, desc, creationDate){

        console.log(competitorName + " " + point +  " " + desc +  " " + creationDate);
        if (desc === ''){
            alert("By the Laws of the Constitution, you have to write a description! (I can see you Wade....)");
        }
        else{
            const updatedData = { ...competitors };
            updatedData[competitorName].addPoint(point, desc, creationDate);
            setCompetitors(updatedData);
        }

    }

    const buttonStyle = "btn btn-outline btn-success";

    const navBarItems: NavItem[] = [
        {buttonText: "calculateWinner", onclick: calculateWinner, buttonStyle : buttonStyle},
        {buttonText: "resetPoints", onclick: clearAllPoints, buttonStyle : buttonStyle},
        {buttonText: "Create new Episode", onclick: () => setNewEpisodeModalVisibility(true), buttonStyle : buttonStyle}
    ];



    function calculateWinner(){
        let maxPoints : number = Number.MIN_VALUE
        let winner = null;
        for (let competitorName in competitors) {
            const points = competitors[competitorName].tabulatePoints();
            if (points > maxPoints) {
                winner = {
                    name : competitorName,
                    data : competitors[competitorName]
                }
                maxPoints = points;
            }
        }
        alert(winner.name + " : " + winner.data.tabulatePoints());
        return winner;
    }

    const createEpisodeFieldsProps = {
        episodeTitle : (t : string) => setTitle(t),
        recordingDate : (t : Date) => setRecordingDate(t),
        releaseDate : (t : Date) => setReleaseDate(t),
        host : (t : string) => setHost(competitors[t]),
        onSubmit : createNewEpisode,
        onCancel : () => setNewEpisodeModalVisibility(false),
        errorMessage : error
    }

    return(
        <div>
            <div>
                <NavBar children={navBarItems}/>
            </div>
            <Modal children={<CreateNewEpisodeFields {...createEpisodeFieldsProps}/>} open={newEpisodeModalVisibility}/>
            <div className={"flex gap-4 m-4 h-full"}>
                <CompetitorBoard
                        competitorData={competitors.Mark}
                        addPoint={handleAddPoint}
                    />
                    <CompetitorBoard
                        competitorData={competitors.Bob}
                        addPoint={handleAddPoint}
                    />
                    <CompetitorBoard
                        competitorData={competitors.Wade}
                        addPoint={handleAddPoint}
                    />
            </div>
        </div>
    );

}

export default Boards;
