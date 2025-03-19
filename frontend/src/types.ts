interface NavItem {
    buttonText : string,
    onclick() : void,
    buttonStyle : string
}

interface Point{
    fulfilled : boolean,
    competitor : string,
    point : number,
    description : string,
    date : Date,
}

interface Episode {
        title? : string,
        recordingDate : Date,
        releaseDate? : Date,
        competitors : string[],
        winner? : string,
        isClosed? : boolean,
        host : string,
        points? : Point[]
    }

export{
    NavItem,
    Episode,
    Point
} 