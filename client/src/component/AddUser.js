import React,{useState,useEffect} from 'react';
import {
    Input,Button,Grid,Paper,makeStyles,
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles({
  paper : {
    height : 250,
  },
})

export default function AddUser({nextId,setUserList,userList,setUserData}){
  const classes = useStyles();
    const [newUser, setNewUser] = useState("");
    const handleSubmit = (e) => {
      if(newUser===""){alert('名前を入力してください'); return}
      for(let i=0; i<userList.length; i++){
        if(newUser === userList[i].name){
          alert("既に登録されているため登録できません");
          setNewUser("");
          return;
        }
      }
      const newName = newUser;
      e.preventDefault();
      Axios.post("http://localhost:4000/addUser",{
        id : nextId,
        name : newUser
      })
        .then(response => {
          console.log(response.data);
          setUserList(response.data.userList);
          setUserData(response.data.userData);
          console.log("update userList and userData");
        })
      setNewUser("");
      alert(newUser+' が追加されました')
    }
    return(
      <div>
        <br /><br />
        <Grid container justify='center'>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <Grid container justify='center' direction='column'>
                <br />
                <Grid item>
                  <h4>追加するプレイヤー名を入力してください</h4>
                </Grid>
                <Grid container justify='center'>
                  <Grid item>
                    <Input 
                      type="text" 
                      //placeholder="enter name"
                      value={newUser}
                      onChange={(e)=>setNewUser(e.target.value)}
                      style={{width : 180}}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid container justify='center'>
                  <Grid item>
                    <Button onClick={handleSubmit} size='large' style={{width : 180}} variant="contained" color='secondary'>追加</Button>
                  </Grid>
                </Grid>      
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };
  