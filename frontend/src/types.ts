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

export{
    NavItem,
    Point
} 