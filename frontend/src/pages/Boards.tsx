import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";

const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

import CompetitorData from '../components/Boards page components/CompetitorData.js';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(null);
    const [recordingDate, setRecordingDate] = useState<Date>(new Date(Date.now()));
    const [releaseDate, setReleaseDate] = useState<Date>(null);
    const [host, setHost] = useState<CompetitorData>(null);

    interface Episode {
        title? : string,
        recordingDate : Date,
        releaseDate? : Date,
        competitors : string[],
        host : string
    }

    interface winner {
        name : string,
        data : string[]
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

            console.log(createEpisodeFromStates());

            const url = "/api/create-episode";
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/JSON"
                },
                body : JSON.stringify(createEpisodeFromStates())
            })
            if(!response.ok){
                console.error("Check the inputs. Something is not right: " + response.toString());
            }
            else{
                clearAllPoints();
                setNewEpisodeModalVisibility(false);
                clearAllPoints();
            }

            
        }
        catch(e){
            console.error(e.message);

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
        onCancel : () => setNewEpisodeModalVisibility(false)
    }

    return(
        <div>
            <div>
                <div className={"menu-container glass-background content-inset menu-bar"}>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={calculateWinner}>Calculate winner</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={clearAllPoints} >Reset Scores</button>
                    <button className={"item menu-item interaction content-inset three-dimensional"} onClick={() => setNewEpisodeModalVisibility(true)} >Create new Episode</button>
                </div>
            </div>
            <Modal children={<CreateNewEpisodeFields {...createEpisodeFieldsProps}/>} open={newEpisodeModalVisibility}/>
            <div className={"container"}>
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
