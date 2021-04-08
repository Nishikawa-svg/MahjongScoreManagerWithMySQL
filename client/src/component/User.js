import React,{useState,useEffect} from 'react';
import {
    Grid,Button,Paper,
    TableContainer,TableHead,TableBody,TableCell,TableRow,Table,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Link} from 'react-router-dom'

export default function User({userList}){
    return(
      <div>
        <h1>メンバーリスト</h1>
        <Grid container justify='center'>
          <Grid item xs={8}>
          </Grid>  
          <Grid item xs={4}>
            <Link to='/user/add' style={{textDecoration : 'none'}} >
              <Button color='secondary' variant='contained'>
                <AddCircleOutlineIcon style={{marginLeft : '-7px', marginRight : '5px'}}/>
                メンバー追加
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        {userList.length===0 ?
        <h1>ユーザーがいません</h1>
        :
        <Grid container justify='center'>
            <Grid item xs={10}>
                <TableContainer component={Paper} style={{backgroundColor : '#fff'}}>
                    <Table>
                      <TableBody>
                        <TableRow style={{backgroundColor : '#333'}}>
                          <TableCell align='center' style={{fontWeight : 'bolder', color : 'white'}}>id</TableCell>
                          <TableCell align='center' style={{fontWeight : 'bolder', color : 'white'}}>プレイヤー名</TableCell>
                        </TableRow>
                        {userList.map(user => (
                          <TableRow key={user.id}>
                            <TableCell align='center'>{user.id}</TableCell>
                            <TableCell align='center'>
                              <Link to={`/user/${user.id}_${user.name}`} style={{color : 'blue',textDecoration : 'none'}} >
                                {user.name}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        }
        <br/><br/>
      </div>
    );
  };