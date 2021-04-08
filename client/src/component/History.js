import React from 'react';
import {
  TableContainer,Table,TableHead,TableCell,TableRow,Paper,withStyles,makeStyles,Grid, TableBody,
} from '@material-ui/core';

const StyledTableCell = withStyles({
  head : {
    backgroundColor : '#222222',
    color : 'white'
  },
})(TableCell);

const StyledTableRow = withStyles({
  root : {
    '&:nth-of-type(odd)' : {
      backgroundColor : '#DDDDDD',
    }
  }
})(TableRow);

const useStyles = makeStyles({
  
})

export default function History({userList,gameRecode}){
  const classes = useStyles();
    return(
      <>
      <h1>対戦履歴</h1>
      {gameRecode.length===0 ? <h1>データがありません</h1>
      :
      <Grid container justify='center'>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="center">1位</StyledTableCell>
                  <StyledTableCell align="center">2位</StyledTableCell>
                  <StyledTableCell align="center">3位</StyledTableCell>
                  <StyledTableCell align="center">4位</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...gameRecode].reverse().map(game => {
                  const order = [
                    {score : parseInt(game.EastScore), id : parseInt(game.EastId)},
                    {score : parseInt(game.SouthScore), id : parseInt(game.SouthId)},
                    {score : parseInt(game.WestScore), id : parseInt(game.WestId)},
                    {score : parseInt(game.NorthScore), id : parseInt(game.NorthId)},
                  ];
                  console.log('before',order);
                  function cmp(a,b){
                    let comparison = 0;
                    if(a.score > b.score) comparison = -1;
                    else if (a.score < b.score) comparison = 1;
                    return comparison;
                  }
                  order.sort(cmp);
                  console.log("after",order);
                
                  return(
                    <StyledTableRow key={game.gameId}>
                      <StyledTableCell component="th">
                        {gameRecode.length-game.gameId+1}回前
                      </StyledTableCell>
                      {order.map(ord => (
                        <StyledTableCell align='center' key={ord.id}>
                          {userList[ord.id-1].name} : {ord.score}pt
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
              }
      <br/><br/>
      </>

    );
  };
  