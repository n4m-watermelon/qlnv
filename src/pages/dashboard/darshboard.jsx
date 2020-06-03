import React from "react";
import TopMenu from "../../components/topMenu/topMenu";
import GetUsers from "../../components/getUsers/getUsers";
import UserDetail from '../../components/userDetail/userDetail'
import Home from '../../pages/home/home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <Router>
        <TopMenu />
        <Switch>
          <Route exact path="/dashboard/" children={<Home />} />
          <Route exact path="/dashboard/user/:id" children={<UserDetail />} />
          <Route exact path="/dashboard/user/" children={<GetUsers />} />
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;
