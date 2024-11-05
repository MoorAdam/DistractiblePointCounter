import point from "./Point.jsx";

export default class competitorData {
    _competitorImage;
    _competitorName;
    _points;

    constructor(competitorName, competitorImage){
        this._competitorImage = competitorImage;
        this._competitorName = competitorName;
        this._points = [];
    }
    getName(){
        return this._competitorName;
    }

    addPoint(point, desc, creationDate){
        const newPoint = {
            point : parseInt(point),
            desc : desc,
            creationDate : creationDate
        }
        this._points.push(newPoint);
    }

    getCompetitorImage(){
        return this._competitorImage;
    }

    getAllPoints(){
        return this._points;
    }
    tabulatePoints(){

        let sum= 0;

        for (let point of this._points){
            sum = sum + point.point;
        }

        //it puts a 0 before the number. No solution found yet

        return sum;
    }
}