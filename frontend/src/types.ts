interface INavItem {
    buttonText : string,
    onclick() : void,
    buttonStyle : string
}

interface IPoint{
    fulfilled : boolean,
    competitor : string,
    point : number,
    description : string,
    date : Date,
}

interface IEpisode {
        title? : string,
        recordingDate : Date,
        releaseDate? : Date,
        competitors : string[],
        winner? : string,
        isClosed? : boolean,
        host : string,
        points? : IPoint[]
    }

interface IEpisodeCard{
    title: string | "Untitled episode",
    releaseDate : Date | "No upload date!",
    recordingDate : Date,
    host : string,
    winner : string | "No winner yet!",
    closed : boolean
}

export{
    INavItem as NavItem,
    IEpisode as Episode,
    IPoint as Point,
    IEpisodeCard
} 