import React, { useEffect, useState,useContext } from 'react'
import { UserContext } from './MainComponent';

export default function Profile() {
    const [mypost,setMyPost] = useState([]);
    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch("http://localhost:5000/myposts",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
        .then(result => {
            // console.log(result)
            setMyPost(result.mypost)
        })
    },[])
    return (
        <div>
            <div>{state.name}</div>
            {mypost.map((item) => {
                return(
                    <div>
                        
                       <img src= {item.photo} alt="photo" />
                        </div>
                )
            })}
        </div>
    )
}
