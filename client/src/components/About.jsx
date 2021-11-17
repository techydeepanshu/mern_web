import React,{useEffect,useState} from "react";
import passport_img from "../images/passport_img.jpg";
import {useNavigate} from "react-router-dom";
const About = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const callAboutPage = async () =>{
    try{
        const res = await fetch("http://localhost:5000/about",{
          method:"GET",
          headers:{
            Accept:"appllication/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        });

        const data = await res.json();
        // console.log(data);
        setUserData(data);

        if(!res.status ===200){
          throw new Error(res.error);
        }
    }catch(err){
      console.log(err);
      navigate("/login");
    }
  }
  useEffect(() => {
    callAboutPage();
  }, [])
  return (
    <>
      <div className="container">
        <div className="container-fluid nav-bg container_home">
          <div className="row">
            <div className="col-md-2 col-12 text-center">
              <img
                src={passport_img}
                alt="passport"
                style={{ width: "130px", borderRadius: "30px" }}
              />
            </div>
            <div className="col-md-8 col-9 pl-4 ">
              <h1 style={{ textTransform: "capitalize" }}>{userData.name}</h1>
              <p>{userData.work}</p>
              
            </div>
            <div className="col-md-2 col-3 text-left">
              <button type="button" class="btn btn-dark">
                Edit
              </button>
            </div>
          </div>
         
          <div className="row">
            <div className="col-md-2 col-3 text-left mt-3">
            </div>
            <div className="col-md-10 col-9 text-left mt-3 pl-4">
            <nav style={{ marginTop: "0rem " }}>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    class="nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    About
                  </a>

                  <a
                    class="nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Timeline
                  </a>
                </div>
              </nav>
            </div>
            <div className="col-md-2 col-3 text-left mt-3">
              <a href="#">Youtube</a> <br />
              <a href="#">Instagram</a> <br />
              <a href="#">Facebook</a> <br />
              <a href="#">Twitter</a> <br />
              <a href="#">Linkedin</a> <br />
              <a href="#">Github</a> <br />
            </div>
            <div className="col-md-10 col-9 text-left mt-3 pl-4">
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="row">
                    <div
                      className="col-md-4 col-5 text-left align-items-center"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      <p>User ID</p>
                      <p>Name</p>
                      <p>Email</p>
                      <p>Phone</p>
                      <p>Profession</p>
                    </div>
                    <div
                      className="col-md-4 col-7 text-left align-items-center"
                      style={{ color: "#535353",overflowWrap:"anywhere"}}
                    >
                      <p>{userData._id}</p>
                      <p>{userData.name}</p>
                      <p>{userData.email}</p>
                      <p>{userData.phone}</p>
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div className="row">
                    <div
                      className="col-md-4 col-5 text-left align-items-center"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      <p>User ID</p>
                      <p>Name</p>
                      <p>Email</p>
                      <p>Phone</p>
                      <p>Profession</p>
                    </div>
                    <div
                      className="col-md-4 col-7 text-left align-items-center"
                      style={{ color: "#535353",overflowWrap:"anywhere" }}
                    >
                      <p>341324</p>
                      <p>Deepanshu</p>
                      <p>deepanshu@gmail.com</p>
                      <p>7206685433</p>
                      <p>Web Developer</p>
                    </div>
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

export default About;
