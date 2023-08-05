/* eslint-disable react/prop-types */
import "react";
import { Alert, Button, Form } from "react-bootstrap";
import "./login.css";
import { useState } from "react";

const origin = "http://localhost:3000";

function Login(props) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [confirmPasswordErr, setconfirmPasswordErr] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = { userName: userName, password: password };

  async function loginUser(e) {
    e.preventDefault();
    const url = `${origin}/login`;
    const response = await postUserInfo(url, user);
    if (!response.ok) {
      // response.statusText
      return;
    }
    const responseUserInfo = await response.json();
    console.log(responseUserInfo);
    props.setUser(JSON.parse(JSON.stringify(responseUserInfo)));
  }
  async function signUpUser(e) {
    if (!isRegistered && password !== confirmPassword) {
      e.preventDefault();
      setconfirmPasswordErr(true);
      return;
    }

    const url = `${origin}/signup`;
    const res = await (await postUserInfo(url, user)).json();
    console.log(res);
    setIsRegistered(!isRegistered);
  }
  return (
    <section>
      <Form onSubmit={isRegistered ? loginUser : signUpUser}>
        <h1>{isRegistered ? "Login" : "Sign Me Up!"}</h1>
        <Form.Control
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isRegistered && (
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button type="submit">Submit</Button>
        <p
          style={{ color: "blue", fontWeight: "bold" }}
          onClick={() => setIsRegistered(!isRegistered)}
        >
          Go to {!isRegistered ? "Login" : "SignUp"}
        </p>
      </Form>
      {!isRegistered && confirmPasswordErr && (
        <Alert>The password does&apos;t match</Alert>
      )}
    </section>
  );
}

async function postUserInfo(url, user) {
  const message = JSON.stringify(user);
  console.log(message);
  try {
    const req = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: message,
    });
    return await fetch(req);
  } catch (error) {
    console.log(error);
  }
}

export default Login;
