import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate,Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

function Login() {
  const{getUser,signInUser} = useUser();



  const [getData, setData] = useState({
    email: "",
    password: "",
    appType: "music",
  });

  const [getError, setError] = useState("")

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError("")

    axios.post("https://academics.newtonschool.co/api/v1/user/login", getData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token)
       signInUser({name : response.data.data.user.name,status:response.data.status, token:response.data.token})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      
        if (error.response) {
          // Check if the response is in HTML format and contains "Unauthorized"
          if (typeof error.response.data === "string" && error.response.data.includes("Unauthorized")) {
            setError("Incorrect email or password. Please try again.");
          } else if (error.response.data && error.response.data.message) {
            // Handle JSON error messages if they exist
            setError(error.response.data.message);
          } else {
            setError("An unknown error occurred. Please try again later.");
          }
        } 
      });
  };

  return (
    <>
      <section id="students-offer">
        <h3>Please Login Here</h3>
        <button>LEARN MORE</button>
        <form onSubmit={onSubmitHandler}>
          <h2 style={{color:"red"}}>{getError}</h2>
          <input
            type="email"
            name="email"
            id="email"
            value={getData.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={getData.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
            autoComplete="off"
          />

          <label for="appType">App Type</label>
          <select
            name="appType"
            onChange={onChangeHandler}
            id="appType"
            required
          >
            <option value="music">music</option>
            <option value="album">album</option>
          </select>

          <button type="submit">SUBMIT</button>
        </form>
      </section>
    </>
  );
}

export default Login;
