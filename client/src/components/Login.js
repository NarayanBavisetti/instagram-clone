import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./login.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {UserContext} from "../components/MainComponent"

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "4px",
  },
  button: {
    width: "220px",
    marginTop: "6px",
  },
  
  dbutton:{
      margin: "0px 25px",
  }
}));

export default function Login() {

  const history = useHistory();
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
const [error,setError] =useState("")
const {state,dispatch} = useContext(UserContext)
  const postData = async() => {
    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          setError(data.error);
        } 
        else  {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
       
          // setError(data.msg)
          history.push("/")
         
        }
      });
  };
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        
      </Grid>
      <Grid item xs={6}>
        <div className="login">
          <div>
            <img
              src="./assets/images/signin.jpg"
              alt="signin logo"
              width="454px"
              margin="50px 0px 0px 0px"
              height="100%"
            />
          </div>
          <div className="logo">
            <img
              className="pic"
              src="./assets/images/logo.png"
              alt="instagram"
            />
            
            <div>
            {error && <Alert severity="warning">{error}</Alert>  }
              <TextField
                className={classes.input}
                required
                id="outlined-required"
                label="Email"
                type="email"
                //   defaultValue="enter email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <TextField
                className={classes.input}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => postData()}
              >
                Sign In
              </Button>
      
              <div className="pdivider">
                  <div className="divider"></div>
                  <div className={classes.dbutton}>OR</div>
                  <div className="divider"></div>
               
              </div>
              Do not have an account ? <Link to="/signup"> Sign Up</Link>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}>
      
      </Grid>
    </Grid>
  );
}
