import React, {useLayoutEffect} from 'react';
import {Point} from "@types";



function CompetitorBoard({addPoint, competitorData}) {

    const competitorName = competitorData.getName();
    const imageUrl = competitorData.getCompetitorImage();
    const points = competitorData.getAllPoints();

    const [pointDescription, setPointDescription] = React.useState<string>("");
    const [pointValue, setPointValue] = React.useState<number>(0);

    const fulfilledPointStyles = "text-black-600";
    const unfulfilledPointStyles = "text-black-100";

    useLayoutEffect(() => {
        setCurrentPointSum(competitorData.tabulatePoints());
    })

    const [currentPointSum, setCurrentPointSum] = React.useState(0);

    return (
        <div className={"glass rounded-box flex-auto h-full"}>
            <div className="m-4">
                <div className={"competitor-bar-profile"}>
                    <div className={"grid grid-rows-2 grid-cols-2 gap-4"}>
                        <img className={`rounded-box row-span-2`} src={imageUrl} alt="CompetitorHandle image"/>
                        <div className={"text-5xl rounded-box bg-base-100 justify-center items-center flex"}>
                            <span className={''}>{competitorName}</span>
                        </div>
                        <div className={"rounded-box bg-base-100 flex justify-center items-center"}>
                            <p className='text-3xl truncate'>{currentPointSum}</p>
                        </div>
                    </div>
                </div>
                <div className={"competitor-board-input-bar felx gap-4 mt-4 mb-4"}>
                        <input type="number" placeholder="Point" className="input input-bordered flex-1/5" onChange={(e) => setPointValue(parseInt(e.target.value))}/>
                        <input type="text" placeholder="Description" className="input input-bordered" onChange={(e) => setPointDescription(e.target.value)}/>
                        <input type="button" className={"btn btn-success"} value={"Submit"} onClick={() => addPoint({
                            competitor : competitorName,
                            point : pointValue,
                            description : pointDescription,
                            date :  new Date(Date.now())
                        })}/>
                </div>
                <div className={"points-board overflow-x-auto bg-base-300 rounded-box"}>
                    <table className='table table-zebra'>
                        <thead>
                            <tr>
                                <th>Point</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                points.map((value: Point, index : number) => (
                                    <tr className={`${value.fulfilled ? fulfilledPointStyles : unfulfilledPointStyles}`} key={index}>
                                        <td className='truncate'>{value.point}</td>
                                        <td className='truncate'>{value.description}</td>
                                        <td className='truncate'>{value.date.getHours() + ":" + value.date.getMinutes()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>

    );
}

export default CompetitorBoard;