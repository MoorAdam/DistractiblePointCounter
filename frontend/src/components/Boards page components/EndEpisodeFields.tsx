import React from "react";

export default function EndEpisodeFields({recordingDate, releaseDate, host, winner, title}) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it on the Episodes page)</label>
            <input type="text" value={title ? title : ""} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Recording date</label>
            <input type="date" value={recordingDate ? recordingDate : Date.now()} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it on the Episodes page)</label>
            <input type="date" value={releaseDate ? recordingDate : Date.now()} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Host</label>
            <select value={host} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>

            <label className="text-sm font-semibold text-gray-400 mt-4">Winner</label>
            <select value={host} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>
            
            <button className="bg-blue-500 text-white p-2 mt-4">End Episode</button>
            <button className="bg-black-500 text-white p-2 mt-4">Cancel</button>
        </div>
    );
}