import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header.js";
import styled from "styled-components";
import SideBar from "./components/SideBar.js";
import {useAuthState} from "react-firebase-hooks/auth"
import Chat from "./components/Chat"
import { auth } from "./firebase";
import Login from "./components/Login";


function App() {
  <title></title>
  const [user, loading] = useAuthState(auth)
  var Spinner = require('react-spinkit');
  if(loading){
    return(
      <AppLoading>
      <AppLoadingContent>
      <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
      alt="Slack"/>
      <Spinner name="ball-spin-fade-loader"
      fadeIn="none"
      color="purple"/>
      </AppLoadingContent>
      </AppLoading>
    );
    
  }
  return (
    <div className="app">
      <Router>
      {!user ? (
        <Login />
  ):(
    <>
    <Header />
    {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
    <AppBody>
      <SideBar />
      <Switch>
        <Route path="/">
        <Chat />
        </Route>
      </Switch>
    </AppBody>
  </>
  )}
       
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  
height:100vh;
display: grid;
place-items: center;
width:100%

`;
const AppLoadingContent = styled.div`
text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  >img{
    height:100px;
    padding:20px;
    margin-bottom:40px;
  }

`