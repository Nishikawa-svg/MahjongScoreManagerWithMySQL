import React,{useState} from 'react';
import {
    Grid,Paper,Button,
    TableContainer,Table,TableHead,TableRow,TableBody,TableCell,makeStyles,
} from '@material-ui/core'
import {Link} from 'react-router-dom';
const useStyles = makeStyles({
  paper : {
    maxHeight : 560,
    width : '100%'
  },
  firstRow : {
    backgroundColor : '#333', 
  },
  firstRowColor : {
    color : '#fff',
    fontWeight : 'bolder',
  },
  row : {
    '&:nth-of-type(1)' : {
      backgroundColor : "gold", 
    },
    '&:nth-of-type(2)' : {
      backgroundColor : "silver", 
    },
    '&:nth-of-type(3)' : {
      backgroundColor : "#cd7f32", 
    }
  }
})

function cmpScoreRanking(a,b){
  let comparison = 0;
  if(a.ranking > b.ranking) comparison = 1;
  else if(a.ranking < b.ranking) comparison = -1;
  return comparison;
}

function cmpAverageRanking(a,b){
  let comparison = 0;
  if(a.rank > b.rank) comparison = 1;
  else if(a.aveRank < b.aveRank) comparison = -1;
  return comparison;
}

function cmpAverageScoreRanking(a,b){
  let comparison = 0;
  if(a.averageScore > b.averageScore) comparison = -1;
  else if(a.averageScore < b.averageScore) comparison = 1;
  return comparison;
}


export default function Ranking({userList,userData,gameRecode}){
  const [menuIndex, setMenuIndex] = useState(1);
  const classes = useStyles();
  console.log(userData);
  console.log(userList);
  console.log(gameRecode);


  //more convenient system
  let validRankingData=[],invalidRankingData=[];
  userData.map(data => {
    if(data.totalGame) validRankingData.push(data);
    else invalidRankingData.push(data);
  });
  //average ranking
  validRankingData = validRankingData.map(person => {
    const first = person.E1+person.S1+person.W1+person.N1;
    const second = person.E2+person.S2+person.W2+person.N2;
    const third = person.E3+person.S3+person.W3+person.N3;
    const four = person.E4+person.S4+person.W4+person.N4;
    let ave = (1*first+2*second+3*third+4*four)/person.totalGame;
    ave = Math.round(ave*100)/100;
    return {...person,ave};
  });
  validRankingData = validRankingData.map(person => {
    let aveRank = validRankingData.reduce((rank,current) => {
      if(person.ave > current.ave) rank++;
        return rank;
    },1);
    return {...person,aveRank};
  });
  //average score ranking
  validRankingData = validRankingData.map(person => {    
    return {... person , averageScore : Math.round(person.totalScore/person.totalGame*100)/100};
  });
  validRankingData = validRankingData.map(person => {
    let aveScoreRank = validRankingData.reduce((rank,current) => {
      if(person.averageScore < current.averageScore) rank++
      return rank;
    },1);
    return {...person,aveScoreRank};
  });
  console.log("valid data",validRankingData);
  console.log("invalid data",invalidRankingData);
  //


  //score ranking
  let ScoreRank = [...userData];
  let validScoreRank=[], invalidScoreRank=[]; 
  ScoreRank.map(current => {
    if(current.totalGame) return validScoreRank.push(current);
    else return invalidScoreRank.push(current);
  });
  validScoreRank.sort(cmpScoreRanking);
  console.log('valid',validScoreRank);
  console.log('invalid',invalidScoreRank);

  //average ranking
  let averageRank = [...userData];
  averageRank = averageRank.map(person => {
    const first = person.E1+person.S1+person.W1+person.N1;
    const second = person.E2+person.S2+person.W2+person.N2;
    const third = person.E3+person.S3+person.W3+person.N3;
    const four = person.E4+person.S4+person.W4+person.N4;
    let ave = (1*first+2*second+3*third+4*four)/person.totalGame;
    ave = Math.round(ave*100)/100;
    return {...person,ave}
  });
  averageRank = averageRank.map(person =>(
    {...person,aveRank :
      averageRank.reduce((rank,current) => {
        if(person.ave > current.ave) rank++;
        return rank;
      },1)}
  ));
  averageRank.sort(cmpAverageRanking);
  console.log("aa",averageRank);

  //average score ranking
  let averageScoreRanking = [...userData];
  averageScoreRanking = averageScoreRanking.map(person => {
    return {... person , averageScore : Math.round(person.totalScore/person.totalGame*100)/100};
  });
  averageScoreRanking = averageScoreRanking.map(person => {
    return {...person,aveScoreRank : 
      averageScoreRanking.reduce((rank,current) => {
        if(person.averageScore < current.averageScore) rank++
        return rank;
      },1)}
  });
  averageScoreRanking.sort(cmpAverageScoreRanking);
  console.log("bb",averageScoreRanking);




  let color = ['','',''];
  switch(menuIndex){
    case 1 : color = ['secondary','',''];break;
    case 2 : color = ['','secondary',''];break;
    case 3 : color = ['','','secondary'];break;
    default : color = ['','',''];
  }
  return(
    <>
      <h1>各種ランキング</h1>
      {gameRecode.length===0 ? 
        <h1>データがありません</h1>
        :
      <>
      <Grid container justify='center'>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Grid container>
              
              <Button variant='contained' color={color[0]} size='large' onClick={()=>setMenuIndex(1)}>合計得点</Button>
              <Button variant='contained' color={color[1]} size='large' onClick={()=>setMenuIndex(2)}>平均着順</Button>
              <Button variant='contained' color={color[2]} size='large' onClick={()=>setMenuIndex(3)}>平均得点</Button>
              <TableContainer>
                {menuIndex===1 ? 
                  (
                    <Table>   
                      <TableHead>
                        <TableRow className={classes.firstRow}>
                          <TableCell className={classes.firstRowColor}>順位</TableCell>
                          <TableCell align='center'　className={classes.firstRowColor}>
                            プレイヤー
                          </TableCell>
                          <TableCell align='center'　className={classes.firstRowColor}>得合計点</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {validRankingData.sort(cmpScoreRanking).map(person => 
                        <TableRow key={person.id}>
                          <TableCell>{person.ranking}位</TableCell>
                          <TableCell align='center'>
                            <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                              {userList[person.id-1].name}
                            </Link>
                          </TableCell>
                          <TableCell align='center'>{person.totalScore}pt</TableCell>
                        </TableRow>  
                        )}
                        {invalidRankingData.map(person => 
                          <TableRow key={person.id}>
                            <TableCell>#</TableCell>
                            <TableCell align='center'>
                              <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                                {userList[person.id-1].name}
                              </Link>
                            </TableCell>
                            <TableCell align='center'>no data</TableCell>
                          </TableRow>
                         )}
                      </TableBody>
                    </Table>
                  )
                  : 
                    null
                }
                {menuIndex===2 ? 
                  (
                    <Table>
                      <TableHead>
                        <TableRow className={classes.firstRow}>
                          <TableCell className={classes.firstRowColor}>順位</TableCell>
                          <TableCell className={classes.firstRowColor} align='center'>プレイヤー</TableCell>
                          <TableCell className={classes.firstRowColor} align='center'>平均着順</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {validRankingData.sort(cmpAverageRanking).map(person => 
                        <TableRow key={person.id}>
                          <TableCell>{person.aveRank}位</TableCell>
                          <TableCell align='center'>
                            <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                              {userList[person.id-1].name}
                            </Link>
                          </TableCell>
                          <TableCell align='center'>{person.ave}位</TableCell>
                        </TableRow>  
                      )}
                      {invalidRankingData.map(person => 
                        <TableRow key={person.id}>
                          <TableCell>#</TableCell>
                          <TableCell align='center'>
                            <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                              {userList[person.id-1].name}
                            </Link>
                          </TableCell>
                          <TableCell align='center'>no data</TableCell>
                        </TableRow>
                      )}
                      </TableBody>
                    </Table>
                  ) 
                  : 
                    null
                }
                {menuIndex===3 ?
                  (
                    <Table>
                      <TableHead>
                        <TableRow className={classes.firstRow}>
                          <TableCell className={classes.firstRowColor}>順位</TableCell>
                          <TableCell className={classes.firstRowColor} align='center'>プレイヤー</TableCell>
                          <TableCell className={classes.firstRowColor} align='center'>平均得点</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {validRankingData.sort(cmpAverageScoreRanking).map(person => 
                          <TableRow key={person.id}>
                            <TableCell>{person.aveScoreRank}位</TableCell>
                            <TableCell align='center'>
                              <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                                {userList[person.id-1].name}
                              </Link>
                            </TableCell>
                            <TableCell align="center">{person.averageScore}点</TableCell>
                          </TableRow>
                        )}
                        {invalidRankingData.map(person => 
                          <TableRow key={person.id}>
                            <TableCell>#</TableCell>
                            <TableCell align='center'>
                              <Link to={`/user/${userList[person.id-1].id}_${userList[person.id-1].name}`} style={{color : 'blue',textDecoration : 'none'}} >
                                {userList[person.id-1].name}
                              </Link>
                           </TableCell>
                          <TableCell align='center'>no data</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )
                  :
                  null
                }
              </TableContainer>
            </Grid>
          </Paper> 
        </Grid>
      </Grid>
        <br/>
        <p>#試合数が０のプレイヤーはランキングから除外されます</p>
        <br/>
        </>
  }
    </>
    
  );
};