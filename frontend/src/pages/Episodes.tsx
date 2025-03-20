import React, { useEffect, useState } from "react";
const EPISODES_URL = "/api/episodes";
import Loading from "../components/Loading";
import EpisodeCard from "../components/Episodes page components/EpisodeCard";
import NavBar from "../components/NavBar";
import {NavItem, Episode} from "@types";
import { useNavigate } from "react-router";

export default function Episodes(){

    const [episodes, setEpisodes] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        getAllEpisodes();
    }, [])

    async function getAllEpisodes() {
        const response = await fetch(EPISODES_URL);
        const result : Episode[] = await response.json()
        if(response.ok){
            setEpisodes(result.reverse().map(e => {
                return {...e, releaseDate : new Date(e.releaseDate), recordingDate : new Date(e.recordingDate)}
            }));
        }
        setLoading(false);
    }
    const navbarItems : NavItem[] = [
        {
            buttonText : "New episode",
            onclick : () => (navigate("/")),
            buttonStyle : "btn btn-accent"
        },
    ]

    return (
        <div>
            <NavBar children={navbarItems}/>

            {
                loading ? 
                (
                <div className="h-dvh p-80 rounded-box justify-center items-center flex">
                    <Loading></Loading>
                </div>
                )
                :
                (
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 m-4">
                        {episodes === null ? (<h1>No episodes yet!</h1>)
                        :    
                        (
                            episodes.map((ep, index) => {
                                return(
                                    <div className="" key={index}>
                                        <EpisodeCard episode={ep}/>
                                    </div>
                                )
                                
                            })
                        )
                        }
                    </div>
                )
            }
        </div>
    )
}