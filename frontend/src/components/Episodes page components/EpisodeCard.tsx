import React from "react";
import { Episode } from "@types";
import { useNavigate } from "react-router";

const getYMD = (date : Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default function EpisodeCard({episode} : {episode : Episode}){

    const navigate = useNavigate();

    return(
        <div className="glass p-4 rounded-box shadow-md " key={episode.title}>
            <h3 className="truncate text-4xl text-center bg-base-100 rounded-box mb-4 p-3">{episode.title ? episode.title : "No title"}</h3>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="list-row">
                    <h3 className="font-bold">Host:</h3> 
                    <h3 className="text-right">{episode.host}</h3>
                </li>
                <li className="list-row">
                    <h3 className="font-bold">Winner:</h3> 
                    <h3 className="text-right">{episode.winner ? episode.winner : "No winner yet!"}</h3>
                </li>
                <li className="list-row">
                    <h3 className="font-bold">Recording date:</h3>
                    <h3 className="text-right">{episode.recordingDate instanceof Date ? getYMD(episode.recordingDate) : episode.recordingDate}</h3>
                </li>
                <li className="list-row">
                    <h3 className="font-bold">Release date:</h3>
                    <h3 className="text-right">{episode.releaseDate instanceof Date ? getYMD(episode.releaseDate) : episode.releaseDate}</h3>
                </li>
                
            </ul>
            <div className="mt-5 col-span-2">
                <button onClick={() => {localStorage.setItem("episodeId", episode.publicId); navigate("/")} } className="btn btn-success size-full h-13">Open episode</button>
            </div>
        </div>
    )
}