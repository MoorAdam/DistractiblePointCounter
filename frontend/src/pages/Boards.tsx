import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";
import {NavItem, Point, Episode} from "@types";
const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

const POST_POINT_URL = "/api/add-point";
const POST_NEW_EPISODE_URL = "/api/create-episode";
const UPDATE_EPISODE_URL = "/api/update-episode";
const GET_EPISODE_URL = "/api/get-episode";

import Competitor from '../components/Boards page components/Competitor';
import NavBar from '../components/NavBar';
import WinnerModalContent from '../components/Boards page components/WinnerModalContent';
import EndEpisodeFields from '../components/Boards page components/EndEpisodeFields';

function Boards() {

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState(false);
    const [endEpisodeModalVisibility, setEndEpisodeModalVisibility] = useState(false);
    const [winnerModal, setWinnerModal] = useState(false);

    const initialData = {
        Mark: new Competitor("Mark", markImage),
        Bob: new Competitor("Bob", bobImage),
        Wade: new Competitor("Wade", wadeImage),
    };
    const [title, setTitle] = useState<string>(null);
    const [recordingDate, setRecordingDate] = useState<Date>(null);
    const [releaseDate, setReleaseDate] = useState<Date>(null);
    const [host, setHost] = useState<Competitor>(null);
    const [competitors, setCompetitors] = useState(initialData)
    const [winner, setWinner] = useState(null);

    const [error, setError] = useState<string>("");    

    useEffect(() => {
        if(localStorage.getItem("episodeId")){
            loadEpisodeData();
        }
    },[]);

    async function loadEpisodeData() {
        const data = await getEpisodeData(localStorage.getItem("episodeId"));
        setTitle(data.title);
        setRecordingDate(new Date(data.recordingDate));
        setReleaseDate(new Date(data.releaseDate));
        setHost(competitors[data.host]);
        setCompetitors((prevCompetitors) => {
            const updatedCompetitors = { ...prevCompetitors };
            data.competitors.forEach(function(compName){
                updatedCompetitors[compName].clearPoints();
            });
            const points = data.points;
            points.forEach(function(point){
                const preppedPoint = {...point, date : new Date(point.date)};
                updatedCompetitors[preppedPoint.competitor].addPoint(preppedPoint);
            });
            return updatedCompetitors;
        });
    }

    async function getEpisodeData(episodeId : string) : Promise<Episode> {

        console.log("trying to get episode data for episode: " + episodeId)

        const response = await fetch(GET_EPISODE_URL + "/" +  episodeId, {
            method : "GET",
            headers : {
                "Content-Type" : "application/JSON"
            }
        })
        return await response.json();
    }

    async function createNewEpisode(newEpisodeDetails : Episode) {
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
                    body : JSON.stringify(newEpisodeDetails)
                })

                if(!response.ok){
                    const error = await response.json();
                    console.log(error);
                    setError(error);
                    return
                }

                const responseData = await response.json();

                localStorage.setItem("episodeId", responseData.episodeId);
                console.log("trying to create episode")
                clearCompetitorData();
                setNewEpisodeModalVisibility(false);
            }
        }
        catch(e){
            setError(e.message)
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

    async function endEpisode(episodeData : Episode){
        try{

            const response = await fetch(UPDATE_EPISODE_URL, {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/JSON"
                },
                body : JSON.stringify({
                    episodeId : localStorage.getItem("episodeId"),
                    updates : {...episodeData, isClosed : true}
                })
            })
            if (response.ok){
                console.log("episode was updated")
                setEndEpisodeModalVisibility(false);
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
            console.error(e.message )
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
        "setRecordingDate" : (t : Date) => setRecordingDate(t),
        "setReleaseDate" : (t : Date) => setReleaseDate(t),
        "setTitle" : (t : string) => setTitle(t),
        "setHost" : function (t : string) {
            const host = competitors[t];
            setHost(host);
        },
        "onSubmit" : createNewEpisode,
        "submitLabel" : "Create episode",
        "onCancel" : () => setNewEpisodeModalVisibility(false),
    }

    const endEpisodeFieldsProps = {
        "recordingDate" : recordingDate,
        "setRecordingDate" : (t : Date) => setRecordingDate(t),
        "releaseDate" : releaseDate,
        "setReleaseDate" : (t : Date) => setReleaseDate(t),
        "setWinner" : (t : string) => setWinner(competitors[t]),
        "winner" : winner,
        "title" : title,
        "setTitle" : (t : string) => setTitle(t),
        
        "host" : host,
        "setHost" : function (t : string) {
            const host = competitors[t];
            setHost(host);
        },
        "onSubmit" : endEpisode,
        "submitLabel" : "Save",
        "onCancel" : () => setEndEpisodeModalVisibility(false),
    }

    return(
        <div>
            <Modal children={<WinnerModalContent competitor={winner} onClose={() => setWinnerModal(false)} onEndEpisode={function(){setWinnerModal(false); console.log("Ending episode"); setEndEpisodeModalVisibility(true)}}/>} open={winnerModal}/>

            <Modal children={<EndEpisodeFields {...endEpisodeFieldsProps}/>} open={endEpisodeModalVisibility}/>

            <div><NavBar children={navBarItems}/></div>

            <Modal children={<EndEpisodeFields {...createEpisodeFieldsProps}/>} open={newEpisodeModalVisibility}/>

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
