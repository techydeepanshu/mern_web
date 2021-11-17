import React from 'react';
import {NavLink} from "react-router-dom";
import Lottie from "lottie-react";
import Error from "../lottie_animation/Error_1.json";
const Error_404 = () => {
    return (
        <>
         
        <div className="error_style d-flex flex-column align-items-center justify-content-center">

        <div className="error_animation">
            <Lottie animationData={Error}  />
        </div>
        <NavLink className="btn btn-outline-primary mt-4" to="/">Got To Home</NavLink>
        </div>
     
        </>
    )
}

export default Error_404;
