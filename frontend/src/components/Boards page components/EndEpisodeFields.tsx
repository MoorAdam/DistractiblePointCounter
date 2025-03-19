import React from "react";

export default function EndEpisodeFields({recordingDate, setRecordingDate, releaseDate, setReleaseDate, host, setHost, winner = null, setWinner = null, title, setTitle, onEndEpisode, onCancel}) {
    
    const getYMD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    console.log(JSON.stringify(host))
    
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it on the Episodes page)</label>
            <input type="text" placeholder={title ? title : ""} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Recording date</label>
            <input type="date" value={recordingDate ? getYMD(recordingDate) : ""} onChange={(e) => setRecordingDate(new Date(e.target.value))} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it on the Episodes page)</label>
            <input type="date" value={recordingDate ? getYMD(releaseDate) : ""} onChange={(e) => setReleaseDate(new Date(e.target.value))} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Host</label>
            <select onChange={(e) => setHost(e.target.value)} defaultValue={host} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>

            {host ? 
                (
                    <>
                        <label className="text-sm font-semibold text-gray-400 mt-4">Winner</label>
                        <select onChange={(e) => setWinner(e.target.value)} defaultValue={winner.getName()} className="border border-gray-300 w-full p-2 mt-1 select">
                            <option value="Mark">Mark</option>
                            <option value="Bob">Bob</option>
                            <option value="Wade">Wade</option>
                        </select>
                    </>
                
                ) : ""} 

            <button onClick={onEndEpisode} className="bg-blue-500 text-white p-2 mt-4">End Episode</button>
            <button onClick={onCancel} className="bg-black-500 text-white p-2 mt-4">Cancel</button>
        </div>
    );
}