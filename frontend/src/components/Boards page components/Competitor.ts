
import {Point} from "@types";

export default class competitorData {
    competitorImage : string;
    isHost : boolean;
    competitorName : string;
    points : Point[];

    constructor(competitorName: string, competitorImage: string){
        this.competitorImage = competitorImage;
        this.competitorName = competitorName;
        this.points = [];
    }
    getName(){
        return this.competitorName;
    }

    setIsHost(isHost : boolean){
        this.isHost = isHost;
    }

    getIsHost(){
        return this.isHost;
    }

    addPoint(newPoint : Point){
        this.points.push(newPoint);
    }

    clearPoints(){
        this.points = [];
    }

    getCompetitorImage(){
        return this.competitorImage;
    }

    getAllPoints(){
        return this.points;
    }
    tabulatePoints(){

        let sum= 0;

        for (let point of this.points){
            sum = sum + point.point;
        }

        //it puts a 0 before the number. No solution found yet

        return sum;
    }
}