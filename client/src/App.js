import react,{createContext,useReducer,useContext,useEffect,useState} from "react";
import Navbar from "./components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route , Routes} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Error_404 from "./components/Error_404";
import {initialize,reducer} from "./reducer/useReducer";

// import axios from "axios";
// axios.defaults.withCredentials = true;
export const Context = createContext();

const Router = () =>{
  return(
    <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Error_404/>}/>
        </Routes>
    </>
  );
}
const App =()=>{
 
const [state,dispatch] = useReducer(reducer,initialize);
console.log("value",initialize,state);
  return(
    <>
    <Context.Provider value={{state:state,dispatch:dispatch}}>
      <Navbar/>
      <Router />
    </Context.Provider>
    </>
    ) 
}

export default App;