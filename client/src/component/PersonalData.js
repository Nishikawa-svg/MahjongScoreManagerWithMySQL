import React,{useState} from 'react';
import {
  Grid,Paper,makeStyles,withStyles,
  TableContainer,Table,TableHead,TableRow,TableBody,TableCell,Button,IconButton,
} from '@material-ui/core';
import {
  Cached,
} from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from 'react-router-dom';
import {
  LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,BarChart,Bar,
} from 'recharts';



const useStyles = makeStyles({
  paper1 : {
    height: 456,
    width : '100%',
  },
  paper2 : {
    width : '100%'
  },
  container : {
    maxHeight : 500,
  }
})

const StyledTableCell = withStyles({
  head : {
    backgroundColor : '#222222',
    color : 'white'
  },
})(TableCell);


export default function PersonalData({userList,userId,gameRecode,userData}){
  const [graphType, setGraphType] = useState(true);
  const classes = useStyles();
  console.log(userData);
  const transitionScoreData = [
    {games : 0, gameId : 0, score : 0},
  ];
  let games = 0;
  let score = 0;
  gameRecode.map(game => {
    if(game.EastId===userId){ 
       games++;
       score += game.EastScore;
      transitionScoreData.push({games : games ,gameId : game.gameId, score : score});
    }
    else if(game.SouthId===userId){ 
      games++;
      score += game.SouthScore;
      transitionScoreData.push({games : games ,gameId : game.gameId, score : score});
    }
    else if(game.WestId===userId){ 
      games++;
      score += game.WestScore;
      transitionScoreData.push({games : games ,gameId : game.gameId, score : score});
    }
    else if(game.NorthId===userId){ 
      games++;
      score += game.NorthScore;
      transitionScoreData.push({games : games ,gameId : game.gameId, score : score});
    }
  });
  console.log(transitionScoreData);
  console.log(userData);
  const {E1,E2,E3,E4,S1,S2,S3,S4,W1,W2,W3,W4,N1,N2,N3,N4,totalGame} = userData;
  const totalEastGame = E1+E2+E3+E4;
  const totalSouthGame = S1+S2+S3+S4;
  const totalWestGame = W1+W2+W3+W4;
  const totalNorthGame = N1+N2+N3+N4;
  const totalFirst = E1+S1+W1+N1;
  const totalSecond = E2+S2+W2+N2;
  const totalThird = E3+S3+W3+N3;
  const totalFourth = E4+S4+W4+N4;
  const rankingDataAbsolute = [
    {
      name : "Total", 
      first : totalFirst, 
      second : totalSecond, 
      third : totalThird, 
      fourth : totalFourth
    },
    {
      name : "East", 
      first : E1, 
      second : E2, 
      third : E3, 
      fourth : E4
    },
    {
      name : "South", 
      first : S1, 
      second : S2, 
      third : S3, 
      fourth : S4
    },
    {
      name : "West", 
      first : W1, 
      second : W2, 
      third : W3, 
      fourth : W4
    },
    {
      name : "North", 
      first : N1, 
      second : N2, 
      third : N3, 
      fourth : N4
    }
  ]

  let rankingDataRelative = [
    {name : 'Total'},
    {name : 'East'},
    {name : 'South'},
    {name : 'West'},
    {name : 'North'},
  ]
  if(totalGame){
    rankingDataRelative[0].first = Math.round(totalFirst/totalGame*1000)/10;
    rankingDataRelative[0].second = Math.round(totalSecond/totalGame*1000)/10; 
    rankingDataRelative[0].third = Math.round(totalThird/totalGame*1000)/10;
    rankingDataRelative[0].fourth = Math.round(totalFourth/totalGame*1000)/10;
  }else{
    rankingDataRelative[0].first = 0;
    rankingDataRelative[0].second = 0; 
    rankingDataRelative[0].third = 0;
    rankingDataRelative[0].fourth = 0;
  }
  if(totalEastGame){
    rankingDataRelative[1].first = Math.round(E1/totalEastGame*1000)/10;
    rankingDataRelative[1].second = Math.round(E2/totalEastGame*1000)/10; 
    rankingDataRelative[1].third = Math.round(E3/totalEastGame*1000)/10;
    rankingDataRelative[1].fourth = Math.round(E4/totalEastGame*1000)/10;
  }else{
    rankingDataRelative[1].first = 0;
    rankingDataRelative[1].second = 0; 
    rankingDataRelative[1].third = 0;
    rankingDataRelative[1].fourth = 0;
  }
  if(totalSouthGame){
    rankingDataRelative[2].first = Math.round(S1/totalSouthGame*1000)/10;
    rankingDataRelative[2].second = Math.round(S2/totalSouthGame*1000)/10; 
    rankingDataRelative[2].third = Math.round(S3/totalSouthGame*1000)/10;
    rankingDataRelative[2].fourth = Math.round(S4/totalSouthGame*1000)/10;
  }else{
    rankingDataRelative[2].first = 0;
    rankingDataRelative[2].second = 0; 
    rankingDataRelative[2].third = 0;
    rankingDataRelative[2].fourth = 0;
  }
  if(totalWestGame){
    rankingDataRelative[3].first = Math.round(W1/totalWestGame*1000)/10;
    rankingDataRelative[3].second = Math.round(W2/totalWestGame*1000)/10; 
    rankingDataRelative[3].third = Math.round(W3/totalWestGame*1000)/10;
    rankingDataRelative[3].fourth = Math.round(W4/totalWestGame*1000)/10;
  }else{
    rankingDataRelative[3].first = 0;
    rankingDataRelative[3].second = 0; 
    rankingDataRelative[3].third = 0;
    rankingDataRelative[3].fourth = 0;
  }
  if(totalNorthGame){
    rankingDataRelative[4].first = Math.round(N1/totalNorthGame*1000)/10;
    rankingDataRelative[4].second = Math.round(N2/totalNorthGame*1000)/10; 
    rankingDataRelative[4].third = Math.round(N3/totalNorthGame*1000)/10;
    rankingDataRelative[4].fourth = Math.round(N4/totalNorthGame*1000)/10;
  }else{
    rankingDataRelative[4].first = 0;
    rankingDataRelative[4].second = 0; 
    rankingDataRelative[4].third = 0;
    rankingDataRelative[4].fourth = 0;
  }
  console.log("rankingDataRelative",rankingDataRelative)
 //maxWidthつかう？
  const averageRanking = Math.round((1*totalFirst+2*totalSecond+3*totalThird+4*totalFourth)/totalGame*100)/100;
  return(
    <>
      <Grid container>
        <Grid item xs={6} container justify="flex-start">
          {userId===1 ? 
            null
          :
            <Link to={`/user/${userId-1}_${userList[userId-2].name}`} style={{color : 'blue',textDecoration : 'none'}}>
              <Grid container direction='row'>
                <Grid item>
                  <ArrowBackIcon　/>
                </Grid>
                <Grid item>
                  {userList[userId-2].name}のページ       
                </Grid>
              </Grid>
            </Link>
          }
        </Grid>
        <Grid item xs={6} container justify="flex-end">
          {userId===userList.length ?
            null 
          :
            <>
              <Link to={`/user/${userId+1}_${userList[userId].name}`} style={{color : 'blue',textDecoration : 'none'}}>
              <Grid container direction='row'>
                <Grid item>
                  {userList[userId].name}のページ
                </Grid>
                <Grid>
                  <ArrowForwardIcon/>     
                </Grid>
              </Grid>
              </Link>
            </>
          }
        </Grid>
      </Grid>
      <h1>{userList[userId-1].name}のデータ</h1>
      {userData.totalGame===0 ? 
      <h1>データがありません</h1>
      :
      <>
      <Grid container justify='center'>
        <Grid item xs={10}>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={3}>
              <Grid container justify='center' direction='column'>
                  <Paper style={{height : '150px'}}>
                    <h2>合計得点</h2>
                    <h1>{userData.totalScore}pt</h1>
                  </Paper>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='center' direction='column'>
                  <Paper style={{height : '150px'}}>
                    <h2>順位</h2>
                    <h1>{userData.ranking}位</h1>
                  </Paper>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='center' direction='column'>
                  <Paper style={{height : '150px'}}>
                    <h2>試合数</h2>
                    <h1>{userData.totalGame}回</h1>
                  </Paper>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify='center' direction='column'>
                  <Paper style={{height : '150px'}}>
                    <h2>平均着順</h2>
                    <h1>{averageRanking}位</h1>
                  </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container justify='center'>
        <Grid item xs={10}>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <Grid container direction='column'>
                    <h2>得点推移</h2>
                    <ScoreChart 
                      transitionScoreData={transitionScoreData}
                    />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper1}>
                <Grid container direction='column'>
                  <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                       <h2>順位内訳</h2> 
                    </Grid>
                    <Grid item xs={4}>
                      <IconButton 
                        color='secondary' 
                        style={{marginTop : '12px', marginRight : '60px'}}
                        onClick={()=>setGraphType(!graphType)}
                      >
                        <Cached/>
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid container justify='flex-end'>
                    <Grid item xs={5}>
                    </Grid>
                  </Grid>
                  {graphType ? 
                    <ScoreDetailChartAbsolute 
                      rankingDataAbsolute={rankingDataAbsolute}
                    />
                  :
                  <ScoreDetailChartRelative 
                      rankingDataRelative={rankingDataRelative}
                    />
                  }
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br/>
      <Grid container justify='center'>
        <Grid item xs={10}>
          <Paper className={classes.paper2}>
            <Grid container direction='column'>
              <h2>対戦履歴</h2> 
            </Grid>
            <TableContainer className={classes.container}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>回戦</StyledTableCell>
                    <StyledTableCell align="center">1位</StyledTableCell>
                    <StyledTableCell align="center">2位</StyledTableCell>
                    <StyledTableCell align="center">3位</StyledTableCell>
                    <StyledTableCell align="center">4位</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...gameRecode].reverse().map(game=>{
                    if(game.EastId===userId||game.SouthId===userId||game.WestId===userId||game.NorthId===userId){
                      const order = [
                        {score : parseInt(game.EastScore), id : parseInt(game.EastId)},
                        {score : parseInt(game.SouthScore), id : parseInt(game.SouthId)},
                        {score : parseInt(game.WestScore), id : parseInt(game.WestId)},
                        {score : parseInt(game.NorthScore), id : parseInt(game.NorthId)},
                      ];
                      function cmp(a,b){
                        let comparison = 0;
                        if(a.score > b.score) comparison = -1;
                        else if(a.score < b.score) comparison = 1;
                        return comparison;
                      };
                      order.sort(cmp);
                      return(
                        <TableRow key={game.Id}>
                          <StyledTableCell component='th' style={{backgroundColor : '#ddd'}}>
                            {game.gameId}回戦
                          </StyledTableCell>
                          {order.map(ord => (
                            userId===ord.id ? 
                            <StyledTableCell align='center' key={ord.id} style={{backgroundColor : 'yellow'}}>
                              {userList[ord.id-1].name} : {ord.score}pt
                            </StyledTableCell>
                            :
                            <StyledTableCell align='center' key={ord.id}>
                              {userList[ord.id-1].name} : {ord.score}pt
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      )
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      </>
}
      <br /><br />
    </>
  )
}


function ScoreChart({transitionScoreData}){
  return(
    <div style={{width : '100%',height : 380}}>
      <ResponsiveContainer>
        <LineChart
          data={transitionScoreData}
          margin={{
            top : 20,
            right : 40,
            left : 0,
            bottom : 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="games" unit="回戦"/>
          <YAxis 
            unit='pt'
          />
          <Tooltip 
            label="試合数"
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function ScoreDetailChartRelative({rankingDataRelative}){
  let data = [
    {
      name : '全体',
      '1位' : rankingDataRelative[0].first, 
      '2位' : rankingDataRelative[0].second, 
      '3位' : rankingDataRelative[0].third, 
      '4位' : rankingDataRelative[0].fourth
    },
    {
      name : '東家',
      '1位' : rankingDataRelative[1].first, 
      '2位' : rankingDataRelative[1].second, 
      '3位' : rankingDataRelative[1].third, 
      '4位' : rankingDataRelative[1].fourth
    },
    {
      name : '南家',
      '1位' : rankingDataRelative[2].first, 
      '2位' : rankingDataRelative[2].second, 
      '3位' : rankingDataRelative[2].third, 
      '4位' : rankingDataRelative[2].fourth
    },
    {
      name : '西家',
      '1位' : rankingDataRelative[3].first, 
      '2位' : rankingDataRelative[3].second, 
      '3位' : rankingDataRelative[3].third, 
      '4位' : rankingDataRelative[3].fourth
    },
    {
      name : '北家',
      '1位' : rankingDataRelative[4].first, 
      '2位' : rankingDataRelative[4].second, 
      '3位' : rankingDataRelative[4].third, 
      '4位' : rankingDataRelative[4].fourth
    }
  ]  
  return (
    <div style={{width : '100%', height : 380}}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit={'%'}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="1位" stackId="a" fill="#ff0033" />
          <Bar dataKey="2位" stackId="a" fill="#1e90ff" />
          <Bar dataKey="3位" stackId="a" fill="#00ff7f" />
          <Bar dataKey="4位" stackId="a" fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ScoreDetailChartAbsolute({rankingDataAbsolute}){
  let data = [
    {
      name : '全体',
      '1位' : rankingDataAbsolute[0].first, 
      '2位' : rankingDataAbsolute[0].second, 
      '3位' : rankingDataAbsolute[0].third, 
      '4位' : rankingDataAbsolute[0].fourth
    },
    {
      name : '東家',
      '1位' : rankingDataAbsolute[1].first, 
      '2位' : rankingDataAbsolute[1].second, 
      '3位' : rankingDataAbsolute[1].third, 
      '4位' : rankingDataAbsolute[1].fourth
    },
    {
      name : '南家',
      '1位' : rankingDataAbsolute[2].first, 
      '2位' : rankingDataAbsolute[2].second, 
      '3位' : rankingDataAbsolute[2].third, 
      '4位' : rankingDataAbsolute[2].fourth
    },
    {
      name : '西家',
      '1位' : rankingDataAbsolute[3].first, 
      '2位' : rankingDataAbsolute[3].second, 
      '3位' : rankingDataAbsolute[3].third, 
      '4位' : rankingDataAbsolute[3].fourth
    },
    {
      name : '北家',
      '1位' : rankingDataAbsolute[4].first, 
      '2位' : rankingDataAbsolute[4].second, 
      '3位' : rankingDataAbsolute[4].third, 
      '4位' : rankingDataAbsolute[4].fourth
    }
  ]  
  return (
    <div style={{width : '100%', height : 380}}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit={'回'}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="1位" stackId="a" fill="#ff0033" />
          <Bar dataKey="2位" stackId="a" fill="#1e90ff" />
          <Bar dataKey="3位" stackId="a" fill="#00ff7f" />
          <Bar dataKey="4位" stackId="a" fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
