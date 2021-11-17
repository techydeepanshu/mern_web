import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import bg from "../lottie_animation/bg2.json";
import { Context } from "../App";

const Home = () => {
  const session = useContext(Context);
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const getDataFromBackend = async () => {
    try {
      const res = await fetch("http://localhost:5000/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);
      setShow(true);
      // setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

      if (!res.status === 200) {
        throw new Error(res.error);
      } else {
        session.dispatch({ type: "USER", payload: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);
  return (
    <>
      <div className="home_style">
        <div className="bg_animation">
          <Lottie animationData={bg} />
        </div>
        <p>Welcome</p>
        <h1>
          Hey,{" "}
          <span style={{ textTransform: "uppercase" }}>
            {show ? userData.name : "Guys"}{" "}
          </span>
        </h1>
        <h4>Happy, to see you back</h4>
      </div>
    </>
  );
};

export default Home;
