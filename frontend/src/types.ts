interface NavItem {
    buttonText : string,
    onclick() : void,
    buttonStyle : string
}

interface Point{
    point : number,
    description : string,
    creationDate : Date,
}

export{
    NavItem,
    Point
} 