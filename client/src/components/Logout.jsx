import React,{useEffect,useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../App";
const Logout = () => {
    const session = useContext(Context);
    const navigate = useNavigate();
    const logoutMethod = async ()=>{
        try{

            const res = await fetch("http://localhost:5000/logout",{
            method:"GET",
            headers:{
                Accpet:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        // console.log("layer 1");
        // const data = await res.json();  // humne backend mein koi response json mein nhi kiya isliye hum ye code use nhi kr skte islye hume isme error mil raha hai
        // console.log("layer 2");
        // console.log(res);
        // console.log("layer 3");
        // console.log(data);
        // console.log("layer 4");
        if(res.status === 200){ 
            // console.log("status code : 200")
            session.dispatch({type:"USER",payload:false});
            navigate("/login");
        }
    }catch(err){
        console.log(err);
    }
    }
    useEffect(()=>{

        logoutMethod();
    },[]);
    return (
        <>
            {/* <h1>logout page</h1> */}
        </>
    )
}

export default Logout;
