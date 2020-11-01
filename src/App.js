import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Home from "./components/Home"
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import User from "./components/user/User";
import SearchUser from "./components/user/SearchUser";

function App(props) {
  return (
   < Router>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/add" component={AddUser} />
        <Route exact path="/users/search" component={SearchUser} />
        <Route exact path="/users/edit/:id" component={EditUser} />
         <Route exact path="/users/:id" component={User} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
