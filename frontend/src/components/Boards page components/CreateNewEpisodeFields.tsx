import React from "react";

export default function CreateNewEpisodeFields() {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it after the episode ends)</label>
            <input type="text" className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Recording date</label>
            <input required={true} type="date" className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it after the episode ends)</label>
            <input type="date" className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Host</label>
            <select required={true} className="border border-gray-300 w-full p-2 mt-1 select">
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>
            
            <button className="bg-blue-500 text-white p-2 mt-4">Create Episode</button>
            <button className="bg-black-500 text-white p-2 mt-4">Cancel</button>
        </div>
    );
}