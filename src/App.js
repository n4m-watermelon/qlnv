import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "./components/topMenu/topMenu";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./pages/dashboard/darshboard";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCh-QNGA5BM-fJVA-fZUPlgABrf-s5kD50",
  authDomain: "qlnv-reactjs.firebaseapp.com",
  // ...
};
firebase.initializeApp(config);
function App() {
  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) return;
        dispatch({
          type: "LOGIN",
          payload: user,
        });
        // console.log(user.displayName)
      });
    return () => {
      unregisterAuthObserver();
    };
  }, []);
    return (
      <div className="App">
               
               {
                 user.isLogin ? <Dashboard /> : <Login />
               }

      </div>
    );
}

export default App;
