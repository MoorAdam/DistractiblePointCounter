import React from "react";

export default function EndEpisodeFields({recordingDate, setRecordingDate, releaseDate, setReleaseDate, host, setHost, winner, setWinner, title, setTitle, onEndEpisode, onCancel}) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it on the Episodes page)</label>
            <input type="text" onChange={setTitle} value={title ? title : ""} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Recording date</label>
            <input type="date" onChange={setRecordingDate} value={recordingDate.stringify} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it on the Episodes page)</label>
            <input type="date" onChange={setReleaseDate} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Host</label>
            <select onChange={setHost} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>

            <label className="text-sm font-semibold text-gray-400 mt-4">Winner</label>
            <select onChange={setWinner} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>
            
            <button onClick={onEndEpisode} className="bg-blue-500 text-white p-2 mt-4">End Episode</button>
            <button onClick={onCancel} className="bg-black-500 text-white p-2 mt-4">Cancel</button>
        </div>
    );
}