import React from "react"
import Competitor from "./Competitor"

export default function WinnerModalContent({competitor, onClose, onEndEpisode}){
    return (
        <div className="grid grid-cols-1 gap-4">
            <h1 className="text-center">Winner!!!!!</h1>
            <div className="flex content-center justify-center">
                <img className="w-3xs rounded-box" src={competitor.getCompetitorImage()} alt="" />
            </div>
            <h2 className="text-center text-4xl">{competitor.getName()}</h2>
            <h2 className="text-center text-1xl">With {competitor.tabulatePoints()} points!</h2>
            <div className="flex gap-4">
                <button onClick={onClose} className="btn btn-soft flex-1">Cancel</button>
                <button onClick={onEndEpisode} className="btn btn-soft btn-success flex-1">End Episode</button>
            </div>
        </div>
    )
}