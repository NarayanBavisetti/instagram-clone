import React, { createContext, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar/Navbar";
import Profile from "./profile";
import Home from "./Home";
import CreatePost from "./CreatePost";
import { initialValue, reducer } from "../Context/useReducer";
import PrivateRoute from "../PrivateRoute";

export const UserContext = createContext()

export default function Main() {
 const [state,dispatch] = useReducer(reducer,initialValue)
 const history = useHistory()
 useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("user"))
   console.log(user)
   if(user){
     history.push("/")
   }else{
     history.push("/login")
   }
 })
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <Navbar />
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/create" component={CreatePost} />
    </Router>
    </UserContext.Provider>
  );
}
