import React, {useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";
import {NavItem, Point} from "@types";
const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

const POST_POINT_URL = "/api/add-point";
const POST_NEW_EPISODE_URL = "/api/create-episode";
const UPDATE_EPISODE_URL = "/api/update-episode";

import CompetitorData from '../components/Boards page components/Competitor';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';
import NavBar from '../components/NavBar';
import WinnerModalContent from '../components/Boards page components/WinnerModalContent';
import EndEpisodeFields from '../components/Boards page components/EndEpisodeFields';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState(false);
    const [endEpisodeModalVisibility, setEndEpisodeModalVisibility] = useState(false);
    const [winnerModal, setWinnerModal] = useState(false);
    
    const [winner, setWinner] = useState(null);

    const initialData = {
        Mark: new CompetitorData("Mark", markImage),
        Bob: new CompetitorData("Bob", bobImage),
        Wade: new CompetitorData("Wade", wadeImage),
    };
    const [title, setTitle] = useState<string>(null);
    const [recordingDate, setRecordingDate] = useState<Date>(new Date(Date.now()));
    const [releaseDate, setReleaseDate] = useState<Date>(null);
    const [host, setHost] = useState<CompetitorData>(null);
    const [competitors, setCompetitors] = useState(initialData)

    const [error, setError] = useState<string>("");

    interface Episode {
        title? : string,
        recordingDate : Date,
        releaseDate? : Date,
        competitors : string[],
        winner : string,
        host : string
    }

    function createEpisodeFromStates(){
        const episode : Episode = {
            title : title ? title : null,
            recordingDate : recordingDate,
            releaseDate : releaseDate ? releaseDate : null,
            winner : winner ? winner : null,
            competitors : Object.keys(competitors),
            host : host.getName()
        }
        return episode;
    }
    
    async function createNewEpisode() {
        try{

            if(!host || !recordingDate){
                setError("You must fill all required fields!");
            }
            else{
                setError("");
                const response = await fetch(POST_NEW_EPISODE_URL, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/JSON"
                    },
                    body : JSON.stringify(createEpisodeFromStates())
                })

                if(!response.ok){
                    const error = await response.json();
                    console.log(error);
                    setError(error);
                    return
                }

                const responseData = await response.json();

                localStorage.setItem("episodeId", responseData.episodeId);
                console.log("trying to create episode and close everything")
                clearCompetitorData();
                setNewEpisodeModalVisibility(false);
            }
        }
        catch(e){
            //setError(e.message)
            //TODO: write to modal: something happened
        }

    }

    function clearCompetitorData() {
        setCompetitors((prevCompetitors) => {
            const updatedCompetitors = { ...prevCompetitors };
            Object.values(updatedCompetitors).forEach(function(comp){comp.clearPoints()});
            return updatedCompetitors;
        });
    }

    async function handleAddPoint(newPoint : Point){
        console.log("newPoint : " + JSON.stringify(newPoint));

        if (newPoint.description === ''){
            alert("By the Laws of the Constitution, you have to write a description! (I can see you Wade....)");
        }
        else{

            await submitNewPoint(newPoint);

            const updatedData = { ...competitors };
            updatedData[newPoint.competitor].addPoint(newPoint);
            setCompetitors(updatedData);
        }

    }

    async function endEpisode(newPoint : Point){
        try{
            const response = await fetch(UPDATE_EPISODE_URL, {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/JSON"
                },
                body : JSON.stringify({
                    episodeId : localStorage.getItem("episodeId"),
                    updates : {...createEpisodeFromStates(), isClosed : true}
                })
            })
            if (response.ok){
                console.log("episode was updated")
            }
            else {
                console.log("nope...")
            }
        }
        catch(e){
            console.log(e.message)
            setError(e.message)
        }
    }

    async function submitNewPoint(newPoint : Point){
        try{
            console.log("Trying to submit new Point")
            const response = await fetch(POST_POINT_URL, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/JSON"
                },
                body : JSON.stringify({
                    episodeId : localStorage.getItem("episodeId"),
                    point : newPoint
                })
            });
            if (response.ok){
                console.log("point was submitted")
            }
            else {
                console.log("nope...")
            }
            return await response.json();
        }
        catch (e) {
            console.log(e.message )
            setError(e.message)
        }

    }

    const buttonStyle = "btn btn-outline btn-success";

    const navBarItems: NavItem[] = [
        {buttonText: "Create new Episode", onclick: () => setNewEpisodeModalVisibility(true), buttonStyle : buttonStyle},
        {buttonText: "Calculate Winner", onclick: calculateWinner, buttonStyle : buttonStyle},
    ];

    function calculateWinner(){
        let maxPoints : number = Number.MIN_VALUE
        let winner = null;
        for (let competitorName in competitors) {
            const points = competitors[competitorName].tabulatePoints();
            if (points > maxPoints) {
                winner = competitors[competitorName]
                maxPoints = points;
            }
        }
        setWinner(winner);
        setWinnerModal(true);
        return winner;
    }

    const createEpisodeFieldsProps = {
        "episodeTitle": (t : string) => setTitle(t),
        "recordingDate" : (t : Date) => setRecordingDate(t),
        "releaseDate" : (t : Date) => setReleaseDate(t),
        "host" : function (t : string) {
            const host = competitors[t];
            setHost(host);
        },
        "onSubmit" : createNewEpisode,
        "onCancel" : () => setNewEpisodeModalVisibility(false),
        "errorMessage" : error
    }

    const endEpisodeFieldsProps = {
        "recordingDate" : (t : Date) => recordingDate,
        "setRecordingDate" : (t : Date) => setRecordingDate(t),
        "releaseDate" : (t : Date) => releaseDate,
        "setWinner" : (t : string) => setWinner(t),
        "winner" : winner,
        "title" : title,
        "setTitle" : (t : string) => setTitle,
        "setReleaseDate" : (t : Date) => setReleaseDate(t),
        "host" : (t : string) => host,
        "setHost" : function (t : string) {
            const host = competitors[t];
            setHost(host);
        },
        "onEndEpisode" : () => (endEpisode),
        "onCancel" : () => setEndEpisodeModalVisibility(false),
    }

    return(
        <div>
            <Modal children={<WinnerModalContent competitor={winner} onClose={() => setWinnerModal(false)} onEndEpisode={function(){setWinnerModal(false); setEndEpisodeModalVisibility(true)}}/>} open={winnerModal}/>

            <Modal children={<EndEpisodeFields {...endEpisodeFieldsProps}/>} open={endEpisodeModalVisibility}/>

            <div><NavBar children={navBarItems}/></div>

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
