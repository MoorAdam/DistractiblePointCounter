
interface point{
    point : number,
    desc : string,
    creationDate : Date
}

export default class competitorData {
    competitorImage;
    competitorName : string;
    points : point[];

    constructor(competitorName, competitorImage){
        this.competitorImage = competitorImage;
        this.competitorName = competitorName;
        this.points = [];
    }
    getName(){
        return this.competitorName;
    }

    addPoint(point, desc, creationDate){
        const newPoint : point = {
            point : parseInt(point),
            desc : desc,
            creationDate : creationDate
        }
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