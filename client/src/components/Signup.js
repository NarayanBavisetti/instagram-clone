import React, {  useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./login.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "4px",
  },
  button: {
    width: "220px",
    marginTop: "6px",
  },
  dbutton: {
    margin: "0px 25px",
  },
}));

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error,setError] = useState("");
const history = useHistory();

  const postData = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return setError("Inalid email")
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } 
        else if (data.msg) {
          // setError(data.msg)
          history.push("/login")
         
        }
      });
  };

  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <div className="login">
          <div>
            <img
              src="./assets/images/signup.jpg"
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
                label="Username"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                //   defaultValue="enter email"
                variant="outlined"
              />
              <TextField
                className={classes.input}
                required
                id="outlined-required"
                label="Email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                //   defaultValue="enter email"
                variant="outlined"
                value={email}
              />
              <TextField
                className={classes.input}
                id="outlined-password-input"
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                value={password}
              />
              <TextField
                required
                className={classes.input}
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                name="confirmpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                value={confirmpassword}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => postData()}
              >
                Sign Up
              </Button>
              <div className="pdivider">
                <div className="divider"></div>
                <div className={classes.dbutton}>OR</div>
                <div className="divider"></div>
              </div>
              Already have an account ? <Link to="/login"> Sign In</Link>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}
