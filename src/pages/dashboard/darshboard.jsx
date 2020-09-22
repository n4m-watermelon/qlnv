import React from "react";
import TopMenu from "../../components/topMenu/topMenu";
import GetUsers from "../../components/getUsers/getUsers";
import UserDetail from "../../components/userDetail/userDetail";
import Home from "../../pages/home/home";
import Login from '../../components/login/login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <Router>
      <TopMenu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/user/">
            <GetUsers />
          </Route>
          <Route exact path="/user/:id">
            <UserDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;
