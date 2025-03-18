import React, {useEffect, useState} from 'react';
import CompetitorBoard from "../components/Boards page components/CompetitorBoard";
import Modal from "../components/Modal";
import {NavItem, Point, Episode} from "@types";
const markImage = '/images/mark.jpg';
const wadeImage = '/images/wade.jpg';
const bobImage = '/images/bob.jpg';

const POST_POINT_URL = "/api/add-point";
const POST_NEW_EPISODE_URL = "/api/create-episode";
const GET_EPISODE_URL = "/api/get-episode";

import CompetitorData from '../components/Boards page components/Competitor';
import CreateNewEpisodeFields from '../components/Boards page components/CreateNewEpisodeFields';
import NavBar from '../components/NavBar';

function Boards() {

    const initialData = {
        Mark: new CompetitorData("Mark", markImage),
        Bob: new CompetitorData("Bob", bobImage),
        Wade: new CompetitorData("Wade", wadeImage),
    };

    const [newEpisodeModalVisibility, setNewEpisodeModalVisibility] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(null);
    const [recordingDate, setRecordingDate] = useState<Date>(new Date(Date.now()));
    const [releaseDate, setReleaseDate] = useState<Date>(null);
    const [host, setHost] = useState<CompetitorData>(null);
    const [competitors, setCompetitors] = useState(initialData)

    const [error, setError] = useState<string>("");    

    useEffect(() => {
        if(localStorage.getItem("episodeId")){
            loadEpisodeData();
        }
    },[]);

    async function loadEpisodeData() {
        const data = await getEpisodeData(localStorage.getItem("episodeId"));
        setTitle(data.title);
        setRecordingDate(data.recordingDate);
        setReleaseDate(data.releaseDate);
        setHost(competitors[data.host]);
        setCompetitors((prevCompetitors) => {
            const updatedCompetitors = { ...prevCompetitors };
            data.competitors.forEach(function(compName){
                updatedCompetitors[compName].clearPoints();
            });
            return updatedCompetitors;
        });
        loadPoints(data.points);
    }

    function loadPoints(points : Point[]){
        points.forEach(function(point){

            const preppedPoint = {...point, date : new Date(point.date)};

            const updatedData = { ...competitors };
            updatedData[preppedPoint.competitor].addPoint(preppedPoint);
            setCompetitors(updatedData);
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
        //This function gets called by the create button. It creates a new Episode variable, with the input information
        //It sends a fetch to the backend. If the request is successful, it closes the modal, and clears all the points

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
            Object.values(updatedCompetitors).forEach(function(comp){comp.clearPoints(); comp.setIsHost(false)});
            return updatedCompetitors;
        });
    }

    async function handleAddPoint(newPoint : Point){

        //When a new point has been submitted, the system adds a point to the scoreboard. This point is grayed out, till the backend returns with success
        //This will be achieved with a custom promise. If it succeeds, it will make the point black, and make the right sound(depending on if the point is positive or negative)
        //If it fails, it will display a modal that suggest the problem. Most likely backend problems


        //TODO: make the point effect described above

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


    //TODO: try making this into a promise, if possible/valuable


    //when a new point comes in, we create a new point. We keep the reference to it, so we can change the color later
    //We add this point to the board.
    //we send a request to the backend, and wait for the response.
    //if its successful, we change the color to black, and play a sound
    //If its not, we send a message to the user, and remove the point


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
        "episodeTitle": (t : string) => setTitle(t),
        "recordingDate" : (t : Date) => setRecordingDate(t),
        "releaseDate" : (t : Date) => setReleaseDate(t),
        "host" : function (t : string) {
            const host = competitors[t];
            host.setIsHost(true);
            setHost(host);
        },
        "onSubmit" : createNewEpisode,
        "onCancel" : () => setNewEpisodeModalVisibility(false),
        "errorMessage" : error
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
