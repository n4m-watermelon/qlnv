import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './components/login/login'
import Dashboard from './pages/dashboard/darshboard'
function App() {
  return (
    <div className="App">
      <Router>
      
          <Redirect exact  to="/login/" />
          <Route  exact path="/login/"     children={ <Login />} />
          <Route  exact path="/dashboard/" children={ <Dashboard />} /> 
      
      </Router>
    </div>
  );
}

export default App;
