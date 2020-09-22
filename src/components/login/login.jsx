import React, { useState } from "react";
import "./login.css";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../action/login";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Form, Input, Button,Checkbox} from "antd";
import { UserOutlined, UnlockOutlined} from "@ant-design/icons";
function Login(props) {
  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  function loginSuccess() {
    if (userName === "admin" && pass === "12345") {
      dispatch(logIn());
    }
  }
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/",
  };
  return (
   <div className="background_contain">
      <div className="wrap_container">
        <div className="form_login">
          <h6>Login</h6>
          <Form>
            <Form.Item>
              <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Password" prefix={<UnlockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button className="btn" type="primary">Login</Button>
            </Form.Item>
            <Form.Item>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form>
        <p className="sub_title">or login with</p>
            <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
      <div className="img">

      </div>
      
    </div>
   </div>
  );
}

export default Login;
