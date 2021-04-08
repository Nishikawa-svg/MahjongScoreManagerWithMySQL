import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import {
  Button, Input, MenuItem, Select, TextField,Paper,withStyles,Grid,
  AppBar,Toolbar,Typography, ListItemText,List,ListItem,IconButton,
} from '@material-ui/core';
import'./App.css';

import Home from './component/Home';
import Score from './component/Score';
import History from './component/History';
import User from './component/User';
import PersonalData from './component/PersonalData';
import AddUser from './component/AddUser';
import Ranking from './component/Ranking';


export default function App(){
  const [userList, setUserList] = useState([]);
  const [gameRecode, setGameRecode] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/load")
      .then((response) => {
        setUserData(response.data.userData);
        setUserList(response.data.userList);
        setGameRecode(response.data.gameRecode);
        console.log(response.data);
      })
  },[]);

  return(
    <div className="App">
      <Router>
        <Header />
        <Route exact path='/'><Home /></Route>
        <Route exact path='/user'>
          <User userList={userList}/>
        </Route>
        {userList.map(user => {
          return (
          <div key={user.id}>
            <Route exact path={`/user/${user.id}_${user.name}`}>
              <PersonalData 
                userList={userList}
                userId={user.id}
                gameRecode={gameRecode}
                userData={userData[user.id-1]}
              />
            </Route>
          </div>
        )})}
        <Route exact path='/user/add'>
          <AddUser 
            nextId={userList.length+1}
            setUserList={setUserList}
            userList={userList}
            setUserData={setUserData}
          />
        </Route>
        <Route exact path='/score'>
          <Score 
            userList={userList}
            setGameRecode={setGameRecode}
            gameId={gameRecode.length+1}
            setUserData={setUserData}
          />
        </Route>
        <Route exact path='/history'>
          <History 
            userList={userList}
            gameRecode={gameRecode}
          />
        </Route>
        <Route exact path='/ranking'>
          <Ranking 
            userData={userData}
            userList={userList}
            gameRecode={gameRecode}
          />
        </Route>
      </Router>
    </div>
  );
};

function Header(){

  return(
    <div>
      <AppBar color='primary' position='static'>
        <Toolbar>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant='title' color='secondary'>
                Mahjong Score Manager
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Link to='/' style={{textDecoration : 'none'}}>
                <Button style={{color : 'white'}} size='large'>ホーム</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to='/score' style={{textDecoration : 'none'}}>
                <Button style={{color : 'white'}} size='large'>得点記録</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to='/user' style={{textDecoration : 'none'}}>
                <Button style={{color : 'white'}} size='large'>メンバー</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to='/ranking' style={{textDecoration : 'none'}}>
                <Button style={{color : 'white'}} size='large'>ランキング</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to='/history' style={{textDecoration : 'none'}}>
                <Button style={{color : 'white'}} size='large'>履歴</Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>

  );
};



