import {Point} from '@types';
export default class Competitor {
    _competitorImage;
    _competitorName : string;
    _points : Point[];

    constructor(competitorName, competitorImage){
        this._competitorImage = competitorImage;
        this._competitorName = competitorName;
        this._points = [];
    }
    getName(){
        return this._competitorName;
    }

    addPoint(point, desc){
        //TODO: Make it less spaghetti
        const newPoint : Point = {
            point : parseInt(point),
            description : desc,
            creationDate : new Date(Date.now()),
        }
        this._points.push(newPoint);
    }

    getCompetitorImage(){
        return this._competitorImage;
    }

    getNames(){
        return this._competitorName;
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