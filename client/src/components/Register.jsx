import React,{useState} from "react";
import img from "../images/img1.svg";
import {NavLink,useNavigate} from "react-router-dom";
import {sendEmail} from "../Email/sendEmail";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    work:'',
    password:'',
    cpassword:''
  })
  // const history = useHistory();
  const inputEvent = (event) =>{
    const {name,value} = event.target;
    setUserData((old)=>{
      return ({
          ...old,
          [name]:value
      });
    })
    // console.log(userData);
  }

  const submitBtn = async (e)=>{
    e.preventDefault();
    // get data from useState hook
    const {name,email,phone,work,password,cpassword} = userData;
    // console.log(userData);

    // do fetch request
    const res = await fetch("http://localhost:5000/signup",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },

      // send data in body 
      body:JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword
      })
    })

    const data = await res.json();
    
    if(res.status ===  422){
      window.alert("plz filled the feild properly");
      // console.log("plz filled the feild properly");
    }else if(res.status ===  403){
      window.alert("User Already Exist");
      // console.log("User Already Exist");

    }else if(res.status ===  401){
      window.alert("password and confirm password must be same");
      // console.log("password and confirm password must be same");

    }
    else if(res.status ===  201){
      window.alert("registration successfully");
      // console.log("registration successfully");
      // history.push('/login');
      
      const emailRes = await sendEmail(userData,"register");
      console.log(emailRes);
      navigate("/login");
    }
    else if(res.status ===  500){
      window.alert("registration failed");
      // console.log("registration failed");
     
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
                    <h1 className="font-weight-bold my-3 text-white">Sign Up</h1>
                  <form method="POST">
                    <div class="form-group">
                      
                      <input
                        type="text"
                        name='name'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Enter Name"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group">
                      
                      <input
                        type="email"
                        name='email'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="example@gmail.com"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group">
                      
                      <input
                        type="phone"
                        name='phone'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="+91 9993242344"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group">
                      
                      <input
                        type="text"
                        name='work'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Your Profession"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group">
                      
                      <input
                        type="password"
                        name='password'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Password"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="form-group">
                      
                      <input
                        type="password"
                        name='cpassword'
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Confrm Password"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    
                    <button type="submit" onClick={submitBtn} class="btn btn-primary">
                      SignUp 
                    </button>
                  </form>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 my-auto header-img">
                  <img src={img} className="animation" alt="home" />

                  <div className="text-center my-3" >
                  <NavLink className="navlink_signup " to="/login">I am already SignUp</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
