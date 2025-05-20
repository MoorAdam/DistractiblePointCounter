import React from "react";

export default function ErrorModalContent({errorText, onClose, onCloseEpisode}){
    return (
        <div className="grid">
            <h3 className="text-justify">{errorText}</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <button className="btn btn-warning col-span-1 text-white" onClick={onCloseEpisode}>End episode</button>
                <button className="btn btn-error col-span-2 text-white" onClick={onClose}>Ok</button>
            </div>
        </div>
    )
}