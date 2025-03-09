import React, {useLayoutEffect} from 'react';
import Point from './Point';



function CompetitorBoard({addPoint, competitorData}) {

    const competitorName = competitorData.getName();
    const imageUrl = competitorData.getCompetitorImage();
    const points = competitorData.getAllPoints();

    const [pointDescription, setPointDescription] = React.useState<string>("");
    const [pointValue, setPointValue] = React.useState<number>(0);

    useLayoutEffect(() => {
        setCurrentPointSum(competitorData.tabulatePoints());
    })

    const [currentPointSum, setCurrentPointSum] = React.useState(0);

    return (
        <div className={"glass rounded-box flex-auto h-full"}>
            <div className="m-4">
                <div className={"competitor-bar-profile"}>
                    <div className={"flex gap-4"}>
                        <img className={"rounded-box"} src={imageUrl} alt="CompetitorHandle image"/>
                        <h1 className={"align-middle pt-15 pl-20"}>{competitorName} : {currentPointSum}</h1>
                    </div>
                </div>
                <div className={"competitor-board-input-bar felx gap-4 mt-4 mb-4"}>
                        <input type="number" placeholder="Point" className="input input-bordered flex-1/5" onChange={(e) => setPointValue(parseInt(e.target.value))}/>
                        <input type="text" placeholder="Description" className="input input-bordered" onChange={(e) => setPointDescription(e.target.value)}/>
                        <input type="button" className={"btn btn-success"} value={"Submit"} onClick={() => addPoint(competitorName, pointValue, pointDescription)}/>
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
                                    points.map((value, index) => (
                                        <tr>
                                            <td>{value.point}</td>
                                            <td>{value.description}</td>
                                            <td>{value.creationDate.getHours() + ":" + value.creationDate.getMinutes()}</td>
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