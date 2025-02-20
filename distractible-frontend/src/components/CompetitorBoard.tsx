import React, {useLayoutEffect} from 'react';
import Point from './Point';



function CompetitorBoard({addPoint, competitorData}) {

    const competitorName = competitorData.getName();
    const imageUrl = competitorData.getCompetitorImage();
    const points = competitorData.getAllPoints();

    const [pointDescription, setPointDescription] = React.useState('');
    const [pointValue, setPointValue] = React.useState(0);

    useLayoutEffect(() => {
        setCurrentPointSum(competitorData.tabulatePoints());
    })

    const [currentPointSum, setCurrentPointSum] = React.useState(0);

    return (
        <div className={"glass-background content-inset"}>
            <div className="content-inset">
                <div className={"competitor-bar-profile"}>
                    <div className={"competitor-data-container"}>
                        <img className={"competitor-image"} src={imageUrl} alt="CompetitorHandle image"/>
                        <h1 className={"competitor-name"}>{competitorName} : {currentPointSum}</h1>
                    </div>
                </div>
                <div className={"competitor-board-input-bar"}>

                    <div className={"competitor-board-number-input"}><input type="number"
                                                                            onChange={(e) => setPointValue(e.target.value)}/>
                    </div>
                    <div className={"points-board-td"}><input type="text" onChange={(e) => setPointDescription(e.target.value)}/></div>
                    <div className={"competitor-board-submit-input"}><input type="button" value={"Submit"} onClick={() => addPoint(competitorName, pointValue, pointDescription)}/></div>

                </div>
                <div className={"points-board"}>
                    {
                        points.length > 0 ?
                            points.map((value, index) => (
                                <Point
                                    key={index}
                                    point={value.point}
                                    desc={value.desc}/>
                            ))
                            :
                            <h4 style={{textAlign: "center"}}>No points yet!</h4>
                    }
                </div>
            </div>
        </div>

    );
}

export default CompetitorBoard;