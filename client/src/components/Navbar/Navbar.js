import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import "./navbar.css";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../MainComponent";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
const history = useHistory()
  return (
    <div className="navbar">
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid xs={3}>
          <NavLink to="/">
            {" "}
            <img className="pic" src="../assets/images/logo.png" />
          </NavLink>
        </Grid>
        <Grid xs={3}>
          <input type="text" placeholder="Search" />
        </Grid>

        <Grid xs={4}>
          <NavLink to="/">
            {" "}
            <i class="fas fa-home"></i>
          </NavLink>
          <NavLink to="/message">
            <i class="fab fa-facebook-messenger" width="50px"></i>
          </NavLink>
          <NavLink to="/create">
            <i class="fas fa-plus-circle"></i>
          </NavLink>
          <NavLink to="/liked">
            <i class="far fa-heart"></i>
          </NavLink>
          <NavLink to="/notifications">
            <i class="far fa-bell"></i>
          </NavLink>
          {/* <NavLink to="/create">
          <i class="fas fa-plus-square"></i>
          </NavLink> */}
          {state ? (
            <>
              <NavLink to="/profile">
                <i class="far fa-user"></i>
              </NavLink>
              <Button
                type="submit"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                  history.push("/login");
                }}
              >
                Logout
              </Button>{" "}
            </>
          ) : (
            <NavLink to="/login">Login/Sign Up</NavLink>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
