import React,{useEffect,useState} from 'react';
import {sendEmail} from "../Email/sendEmail";

const Contact = () => {
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    message:''
  });
  // const [data , setData] = useState()
  const getDataFromBackend = async () =>{
    try{
        const res = await fetch("http://localhost:5000/getData",{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        });

        const data = await res.json();
        // console.log(data);
        setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

        if(!res.status ===200){
          throw new Error(res.error);
        }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getDataFromBackend();
  }, [])


  const inputEvent = (e) =>{
    const {name,value} = e.target;
    setUserData((old)=>{
      return {
        ...old,
        [name]:value
      }
      // console.log(userData);
    })
  }

  const fromSubmit = async (e)=>{
    e.preventDefault();
    // console.log(userData);
    const {name,email,phone,message} = userData;
    const res = await fetch("http://localhost:5000/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      }),
      credentials:"include"
    })
    const resData = await res.json();
    // console.log(resData);

    if(res.status === 400){
      window.alert("data not found");
    }else if(res.status === 401){
      window.alert("data not save");
      
    }else if(res.status === 500){
      window.alert("plz filled the field properly");

    }else if(res.status === 200) {
      window.alert("data saved");
      setUserData({...userData, message:''});

      // send Email to the user

      const emailRes = await sendEmail(userData,"contact");
      console.log(emailRes);

    }
  }
    return (
        <>
        <div className="container">
        <div className="container-fluid nav-bg container_contact">
          <div className="row">
            <div className="col-12 col-md-4 my-2">
                <div className="box text-center d-flex align-items-center justify-content-center">
                    <div className="mx-3 ">
                        <i class="fas fa-envelope "></i>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-items-start m-0">
                          <h1 >Email</h1>
                          <p>deepanshu@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4 my-2">
                <div className="box text-center d-flex align-items-center justify-content-center">
                    <h1 className="align-middle">Phone : +91 7206685433</h1>
                </div>
            </div>
            <div className="col-12 col-md-4 my-2">
                <div className="box text-center d-flex align-items-center justify-content-center">
                    <h1 className="align-middle">Address : xyz</h1>
                </div>
            </div>
          </div>

              <form method="POST" className="contact_form my-5">
          <h1 className="font-weight-bold my-2 text-white">Contact Us</h1>
          <div className="row">

                <div className="col-12 col-md-4 my-2">
                <div class="form-group">
                      
                      <input
                        type="text"
                        name="name"
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Name"
                        value={userData.name}
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                    </div>
                    <div className="col-12 col-md-4 my-2">
                    <div class="form-group">
                      
                      <input
                        type="email"
                        name="email"
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Email"
                        value={userData.email}
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                    </div>
                    <div className="col-12 col-md-4 my-2">
                    <div class="form-group">
                      
                      <input
                        type="text"
                        name="phone"
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Phone"
                        value={userData.phone}
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                    </div>
          </div>
          <div className="row">
              <div className="col-12">
              <div class="form-group">
                      
                      <textarea
                        type="text"
                        name="message"
                        onChange={inputEvent}
                        class="form-control"
                        placeholder="Message"
                        value={userData.message}
                        aria-describedby="emailHelp"
                      />
                    </div>
              </div>
            </div>
          <div className="row">
              <div className="col-12">
              <button type="submit" onClick={fromSubmit} class="btn btn-primary">
                      Submit 
                    </button>
              </div>
          </div>

              </form>
        </div>
      </div>
        </>
    )
}

export default Contact;