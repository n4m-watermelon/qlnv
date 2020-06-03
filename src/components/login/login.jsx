import React, { useState } from "react";
import "./login.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logIn } from "../../action/login";
function Login(props) {
  const status = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  console.log(status);

  function loginSuccess() {
    if (userName === "admin" && pass === "12345") {
      dispatch(logIn());
    }
  }

  return (
    <div>
      {status && <Redirect exact to="/dashboard/" />}
      {status === false && (
        <div className="wrap">
          <div className="form_login">
            <h1>Login</h1>
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="Your Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Your Password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </FormGroup>
              <Button onClick={() => loginSuccess()} className="btn_custom">
                Submit !
              </Button>
            </Form>
          </div>
          <div className="bg_cover"></div>
        </div>
      )}
    </div>
  );
}

export default Login;
