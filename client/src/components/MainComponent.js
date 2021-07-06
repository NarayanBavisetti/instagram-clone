import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import profile from "./profile";
import Home from "./Home";
import CreatePost from "./CreatePost";

export default function Main() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile" component={profile} />
      <Route exact path="/create" component={CreatePost} />
    </Router>
  );
}
