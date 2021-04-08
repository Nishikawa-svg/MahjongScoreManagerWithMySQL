const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mahjongScoreManager',
    multipleStatements : true,
});

app.get('/load',(req,res) => {
    console.log('load');
    let loadData = {userList : null, gameRecode : null, userData : null};
    let sqlSelect = "select * from userList";
    connection.query(sqlSelect,(error,loadedUserList) => {
        loadData.userList = loadedUserList;
        sqlSelect = "select * from gameRecode";
        connection.query(sqlSelect,(error,loadedGameRecode) => {
            loadData.gameRecode = loadedGameRecode;
            sqlSelect = "select * from userData";
            connection.query(sqlSelect,(error,loadedUserData) => {
                loadData.userData = loadedUserData;
                console.log('-> load success')
                res.send(loadData);
            })
        })
    })
})

app.post('/addUser',(req,res) => {
    console.log('add user');
    const id = parseInt(req.body.id);
    const name = req.body.name;
    const valid = 1;
    let updateData = {userList : null, userData : null};
    let sqlInsert = "INSERT INTO userList(id,name,valid,registrationDate) values(?,?,?,now())";
    connection.query(sqlInsert,[id,name,valid],(error,insertUserList)=>{
        sqlInsert = "insert into userData(id,totalScore,ranking,totalGame,E1, E2, E3, E4,S1, S2, S3, S4,W1, W2, W3, W4,N1, N2, N3, N4) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(sqlInsert,[id,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],(error,insertUserData) => {            
             let sqlSelect = "select * from userList";
             connection.query(sqlSelect,(error,updatedUserList)=>{
                 updateData.userList = updatedUserList;
                 sqlSelect = "select * from userData";
                 connection.query(sqlSelect,(error,updatedUserData) => {
                     console.log('add user -> success');
                     updateData.userData = updatedUserData;
                     res.send(updateData);
                 })
             })

        })
    })
})

function getTotalRank(A){
    let arr = [...A];
    let rank = Array(arr.length).fill(1);
    for(let i=0; i<arr.length; i++){
        if(arr[i].totalGame===0) rank[i]=0;
    }
    
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length; j++){
            if(i===j) continue;
            if(arr[i].totalGame===0 || arr[j].totalGame===0) continue;
            if(arr[i].totalScore < arr[j].totalScore) rank[i]++;
        }
    }

    return rank;
}

function getgameRank(A){
    let arr = [...A];
    let rank = Array(arr.length).fill(1);
    rank = arr.map(score => {
        return arr.reduce((tot,current) => {
            if(score < current) tot++;
            return tot;
        },1)
    })
    return rank;
}

app.post('/addGameRecode',(req,res) => {
    console.log('save game recode');
    const gameId = req.body.nextGameId;
    EastId = parseInt(req.body.result.EastId); SouthId = parseInt(req.body.result.SouthId);
    WestId = parseInt(req.body.result.WestId); NorthId = parseInt(req.body.result.NorthId);
    EastScore = parseInt(req.body.result.EastScore); SouthScore = parseInt(req.body.result.SouthScore);
    WestScore = parseInt(req.body.result.WestScore); NorthScore = parseInt(req.body.result.NorthScore);    
    let [EastRank,SouthRank,WestRank,NorthRank] = getgameRank([EastScore,SouthScore,WestScore,NorthScore]);
    const sqlSelect = "select * from userData";
    connection.query(sqlSelect,(error,oldUserData) => {
        const newUserData = [...oldUserData];
        for(let i=0; i<newUserData.length; i++){
            if(newUserData[i].id===EastId){
                newUserData[i].totalScore += parseInt(EastScore);
                newUserData[i].totalGame++;
                switch(EastRank){
                    case 1 : newUserData[i].E1++; break;
                    case 2 : newUserData[i].E2++; break;
                    case 3 : newUserData[i].E3++; break;
                    case 4 : newUserData[i].E4++; break;
                    default : console.log('East Rank is over 4');
                }
            }else if(newUserData[i].id===SouthId){
                newUserData[i].totalScore += parseInt(SouthScore);
                newUserData[i].totalGame++;
                switch(SouthRank){
                    case 1 : newUserData[i].S1++; break;
                    case 2 : newUserData[i].S2++; break;
                    case 3 : newUserData[i].S3++; break;
                    case 4 : newUserData[i].S4++; break;
                    default : console.log('South Rank is over 4');
                }
            }else if(newUserData[i].id===WestId){
                newUserData[i].totalScore += parseInt(WestScore);
                newUserData[i].totalGame++;
                switch(WestRank){
                    case 1 : newUserData[i].W1++; break;
                    case 2 : newUserData[i].W2++; break;
                    case 3 : newUserData[i].W3++; break;
                    case 4 : newUserData[i].W4++; break;
                    default : console.log('West Rank is over 4');
                }
            }else if(newUserData[i].id===NorthId){
                newUserData[i].totalScore += parseInt(NorthScore);
                newUserData[i].totalGame++;
                switch(NorthRank){
                    case 1 : newUserData[i].N1++; break;
                    case 2 : newUserData[i].N2++; break;
                    case 3 : newUserData[i].N3++; break;
                    case 4 : newUserData[i].N4++; break;
                    default : console.log('North Rank is over 4');
                }
            }
        }
        const rank = getTotalRank(newUserData.map(user =>{ return {totalGame : user.totalGame, totalScore : user.totalScore} }));
        for(let i=0; i<newUserData.length; i++){
            newUserData[i].ranking = rank[i];
        }

        let mQ = `update userData set E${EastRank}=E${EastRank}+1, totalScore=${newUserData[EastId-1].totalScore}, totalGame=${newUserData[EastId-1].totalGame} where id=${EastId};
                    update userData set S${SouthRank}=S${SouthRank}+1, totalScore=${newUserData[SouthId-1].totalScore}, totalGame=${newUserData[SouthId-1].totalGame} where id=${SouthId};
                    update userData set W${WestRank}=W${WestRank}+1, totalScore=${newUserData[WestId-1].totalScore}, totalGame=${newUserData[WestId-1].totalGame} where id=${WestId};
                    update userData set N${NorthRank}=N${NorthRank}+1, totalScore=${newUserData[NorthId-1].totalScore}, totalGame=${newUserData[NorthId-1].totalGame} where id=${NorthId};`
        for(let i=0; i<newUserData.length; i++) 
            mQ += `update userData set ranking=${newUserData[i].ranking} where id=${i+1};`;
        
        connection.query(mQ,(error,multiUpdateResult) => {
            const sqlInsert = "insert into gameRecode(gameId,EastId,SouthId,WestId,NorthId,EastScore,SouthScore,WestScore,NorthScore,recordingTime) values(?,?,?,?,?,?,?,?,?,now())";
            connection.query(sqlInsert,[gameId,EastId,SouthId,WestId,NorthId,EastScore,SouthScore,WestScore,NorthScore],(error,insertNewGameRecode)=>{
                let multiGetQuery = "select * from gameRecode; select * from userData;";
                connection.query(multiGetQuery,(error,getResults) => {
                    console.log('save game recode -> success')
                    res.send(getResults);
                })
            })
         
        })
    })


})

app.listen(port);