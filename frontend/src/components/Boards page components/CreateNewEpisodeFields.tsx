import React from "react";

function formPreventDefault(e: { preventDefault: () => void; }){
    e.preventDefault();
}

//TODO: make multiple host selectable
//TODO: make the fields ony change states after Submit

export default function CreateNewEpisodeFields({episodeTitle, recordingDate, releaseDate, host, onSubmit, onCancel, errorMessage}) {
    return (
        <form className="flex flex-col" onSubmit={formPreventDefault}>
            <label className="text-sm font-semibold text-gray-400">Episode title (You can set it after the episode ends)</label>
            <input type="text" onChange={(e) => episodeTitle(e.target.value)} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Recording date</label>
            <input required={true} onChange={(e) => recordingDate(new Date(e.target.value))} type="date" className="border border-gray-300 p-2 mt-1"/>

            <label className="text-sm font-semibold text-gray-400 mt-4">Release date (You can set it after the episode ends)</label>
            <input type="date" onChange={(e) => releaseDate(new Date(e.target.value))} className="border border-gray-300 p-2 mt-1" />

            <label className="text-sm font-semibold text-gray-400 mt-4">★ Host</label>
            <select required={true} defaultValue={""} onChange={(e) => host(e.target.value)} className="border border-gray-300 w-full p-2 mt-1 select">
                <option disabled value={""}>Choose a host!</option>
                <option value="Mark">Mark</option>
                <option value="Bob">Bob</option>
                <option value="Wade">Wade</option>
            </select>
            <p className="text-red-600">{errorMessage ? errorMessage : ""}</p>

            <button type="submit" className="bg-blue-500 text-white p-2 mt-4" onClick={onSubmit}>Create Episode</button>
            <button className="bg-blue-500 text-white p-2 mt-4" onClick={onCancel}>Cancel</button>
        </form>
    );
}