import React from "react";
import Grid from "@material-ui/core/Grid";
import "./login.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { black } from "color-name";

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
              <TextField
                className={classes.input}
                required
                id="outlined-required"
                label="Email"
                type="email"
                //   defaultValue="enter email"
                variant="outlined"
              />

              <TextField
                className={classes.input}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
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
