import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./components/ProfilePage";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import MainFeed from "./components/Mainfeed/MainFeed";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  if (!sessionUser) {
    history.push("/");
    return <Splash />;
  } else {
    return (
      <div id="app">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <MainFeed />
          </Route>
          <Route path="/users/:id">
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
