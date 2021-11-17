import React,{useState,useContext} from 'react';
import img from "../images/img2.svg";
import {NavLink,useNavigate} from "react-router-dom";
import axios from "axios";

import {Context} from "../App";
const Login = () => {
  const session = useContext(Context);
  const navigate = useNavigate();
  const [emailData , setEmailData] = useState();
  const [passwordData , setPasswordData] = useState();

  const emailEvent =(e)=>{
    const value = e.target.value;
     setEmailData(value);
    //  console.log(emailData);
  }
  const passEvent =(e)=>{
    const value = e.target.value;
     setPasswordData(value);
    //  console.log(passwordData);
  }

  const loginBtn = async (e) =>{
    e.preventDefault();
    const loginData = {email:emailData,password:passwordData};
    // console.log(emailData,passwordData);
    // const email = emailData;
    // const password = passwordData;
    const res = await fetch("http://localhost:5000/signin",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include",
      body: JSON.stringify({
        email:emailData,
        password:passwordData
      })
    })

    // const res = await axios.post("http://localhost:5000/signin",loginData,{
    //   withCredentials:true // cookie ko store krne ke liye
    // })

    // const data = await res.json();
    // console.log("fetch data",data);
    // console.log("fetch res",res.status);
    if(res.status === 422){
      window.alert("invailed credentional");
    }else if(res.status === 400){
      window.alert("plz filled the field properly");
      
    }else if(res.status === 500){
      window.alert("invailed credentional");

    }else if(res.status === 200) {
      // session.dispatch({type:"USER",payload:true});
      console.log("session state",session.state)
      window.alert("login successfully");
      navigate("/");

    }
  }
    return (
        <>
               <div className="container">
        <div className="container-fluid nav-bg container_home">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row mt-4">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column  justify-content-center">
                <h1 className="font-weight-bold my-3 text-white">Login</h1>
                  <form method="POST">
                    
                    <div class="form-group">
                    <div class="input-group bg-white">
                    <div class="input-group-addon d-flex align-items-center justify-content-center mx-1 {color:#ff0000; background-color: #ffffff;} ">
                    <i class="fas fa-envelope "></i>
                        
                            </div>
   
                      <input
                        type="email"
                        name="email"
                        onChange={emailEvent}
                      
                        class="form-control"
                        placeholder="Email"
                        
                        aria-describedby="emailHelp"
                      />
                    </div>
                    </div>
                    
                    <div class="form-group">
                      
                      <input
                        type="password"
                        name="password"
                        
                        onChange={passEvent}
                        class="form-control"
                        placeholder="Password"
                        
                        aria-describedby="emailHelp"
                      />
                    </div>
                   
                    <button type="submit" class="btn btn-primary" onClick={loginBtn}>
                      Login
                    </button>
                  </form>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 my-auto header-img">
                  <img src={img} className="animation" alt="home" />
                  <div className="text-center my-3" >
                  <NavLink className="navlink_signup " to="/register">Create an Account</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Login;