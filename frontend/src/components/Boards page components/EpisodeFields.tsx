import React from "react";
import {useState} from "react"
import {Episode} from "@types";

export default function EpisodeFields({recordingDate = null, setRecordingDate, releaseDate = null, setReleaseDate, host = null, setHost, winner = null, setWinner = null, title = null, setTitle, onSubmit, submitLabel, onCancel}) {
    
    const [localTitle, setLocalTitle] = useState<string>(title);
    const [localRecordingDate, setLocalRecordingDate] = useState<Date>(recordingDate ? recordingDate : new Date(Date.now()));
    const [localReleaseDate, setLocalReleaseDate] = useState<Date>(releaseDate);
    const [localHost, setLocalHost] = useState<string>(host ? host.getName() : null);
    const [localWinner, setLocalWinner] = useState<string>(winner ? winner.getName() : null);

    const getYMD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function onSubmitting(){
        setTitle(localTitle);
        setHost(localHost);
        setRecordingDate(localRecordingDate);
        releaseDate ? setReleaseDate(localReleaseDate) : "";
        winner ? setWinner(localWinner) : ""

        const newEpisodeDetails : Episode = {
            title : localTitle ? localTitle : null,
            recordingDate : localRecordingDate,
            releaseDate : localReleaseDate ? localReleaseDate : null,
            host : localHost,
            winner : localWinner ? localWinner : null,
            competitors : ["Mark", "Bob", "Wade"]
        }
        onSubmit(newEpisodeDetails);
    }
    
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it on the Episodes page)</label>
            <input type="text" placeholder={localTitle ? localTitle : ""} onChange={(e) => setLocalTitle(e.target.value)} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Recording date</label>
            <input type="date" value={localRecordingDate ? getYMD(localRecordingDate) : getYMD(new Date(Date.now()))} onChange={(e) => setLocalRecordingDate(new Date(e.target.value))} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it on the Episodes page)</label>
            <input type="date" value={localReleaseDate ? getYMD(localReleaseDate) : ""} onChange={(e) => setLocalReleaseDate(new Date(e.target.value))} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Host</label>
            <select required onChange={(e) => setLocalHost(e.target.value)} defaultValue={localHost ? localHost : "Mark"} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>

            {winner ? 
                (
                    <>
                        <label className="text-sm font-semibold text-gray-400 mt-4">Winner</label>
                        <select onChange={(e) => setLocalWinner(e.target.value)} defaultValue={localWinner} className="border border-gray-300 w-full p-2 mt-1 select">
                            <option value="Mark">Mark</option>
                            <option value="Bob">Bob</option>
                            <option value="Wade">Wade</option>
                        </select>
                    </>
                
                ) : ""} 

            <button onClick={onSubmitting} className="bg-blue-500 text-white p-2 mt-4">{submitLabel}</button>
            <button onClick={onCancel} className="bg-black-500 text-white p-2 mt-4">Cancel</button>
        </div>
    );
}