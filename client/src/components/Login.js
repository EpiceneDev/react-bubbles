import React, { useState } from "react";
import axiosWithAuth from './utils/axiosWithAuth';

const Login = props => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChanges = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // make a post request to retrieve a token from the api
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", form)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
        setForm({ username: "", password: "" });
      });
  };
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
    <div>
      <form onSubmit={login}>
        {/* username */}
        <input
          type="text"
          name="username"
          onChange={handleChanges}
          value={form.username}
        />

        {/* password */}
        <input
          type="password"
          name="password"
          onChange={handleChanges}
          value={form.password}
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
