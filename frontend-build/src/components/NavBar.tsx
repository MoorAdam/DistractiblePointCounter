import React from "react";

export default function NavBar({children}){
    //TODO: create constraint for NavBar children to only accept NavItems
    return(
        <div className="navbar bg-base-100 ">
            <div className="flex gap-4">
                {children.map((navItem, index) => {
                    return <button key={index} className={navItem.buttonStyle} onClick={navItem.onclick}>{navItem.buttonText}</button>
                })}
            </div>
        </div>
    )
}