import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableHead,
  TextField,
  Grid,
  Button,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ExpansionPanelSummary,
  useScrollTrigger,
} from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles({
  root: {},
  formContainer: {
    backgroundColor: "#fff",
  },
  select: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  submitButton: {
    textAlign: "center",
  },
});

const initialResult = {
  EastId: 0,
  SouthId: 0,
  WestId: 0,
  NorthId: 0,
  EastScore: 0,
  SouthScore: 0,
  WestScore: 0,
  NorthScore: 0,
};

export default function Score({
  userList,
  setGameRecode,
  gameId,
  setUserData,
}) {
  const classes = useStyles();
  const [result, setResult] = useState(initialResult);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({ formCheck: false, errorCode: 0 });
  useEffect(() => {
    console.log(result);
  }, [result]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickCheck = () => {
    const { EastId, SouthId, WestId, NorthId } = result;
    const EastScore = parseInt(result.EastScore);
    const SouthScore = parseInt(result.SouthScore);
    const WestScore = parseInt(result.WestScore);
    const NorthScore = parseInt(result.NorthScore);
    console.log(EastScore);
    if (!(EastId && SouthId && WestId && NorthId)) {
      setMsg({ formCheck: false, errorCode: 1 });
    } else if (
      EastId === SouthId ||
      EastId === WestId ||
      EastId === NorthId ||
      SouthId === WestId ||
      SouthId === NorthId ||
      WestId == NorthId
    ) {
      setMsg({ formCheck: false, errorCode: 2 });
    } else if (
      isNaN(EastScore) ||
      isNaN(SouthScore) ||
      isNaN(WestScore) ||
      isNaN(NorthScore)
    )
      setMsg({ formCheck: false, errorCode: 3 });
    else setMsg({ formCheck: true, errorCode: 0 });
    setOpen(true);
  };
  const handleSubmit = () => {
    console.log("game result submitted");
    setOpen(false);
    setResult(initialResult);
    Axios.post("http://localhost:4000/addGameRecode", {
      result: result,
      nextGameId: gameId,
    }).then((response) => {
      console.log(response.data[0]);
      console.log(response.data[1]);
      setGameRecode(response.data[0]);
      setUserData(response.data[1]);
    });
  };

  return (
    <>
      <h1>得点入力表</h1>
      <h1>{gameId}回戦目</h1>
      <form>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={10}>
            <TableContainer component={Paper} className={classes.formContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <h3>風</h3>
                    </TableCell>
                    <TableCell align="center">東家</TableCell>
                    <TableCell align="center">南家</TableCell>
                    <TableCell align="center">西家</TableCell>
                    <TableCell align="center">北家</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <h3>面子</h3>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.select}
                        select
                        value={result.EastId}
                        onChange={(e) =>
                          setResult({
                            ...result,
                            EastId: parseInt(e.target.value),
                          })
                        }
                        SelectProps={{ native: true }}
                        variant="outlined"
                      >
                        <option aria-label="None" value={0} />
                        {userList.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.select}
                        select
                        value={result.SouthId}
                        onChange={(e) =>
                          setResult({
                            ...result,
                            SouthId: parseInt(e.target.value),
                          })
                        }
                        SelectProps={{ native: true }}
                        variant="outlined"
                      >
                        <option aria-label="None" value={0} />
                        {userList.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.select}
                        select
                        value={result.WestId}
                        onChange={(e) =>
                          setResult({
                            ...result,
                            WestId: parseInt(e.target.value),
                          })
                        }
                        SelectProps={{ native: true }}
                        variant="outlined"
                      >
                        <option aria-label="None" value={0} />
                        {userList.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className={classes.select}
                        select
                        value={result.NorthId}
                        onChange={(e) =>
                          setResult({
                            ...result,
                            NorthId: parseInt(e.target.value),
                          })
                        }
                        SelectProps={{ native: true }}
                        variant="outlined"
                      >
                        <option aria-label="None" value={0} />
                        {userList.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h3>点数</h3>
                    </TableCell>
                    <TableCell>
                      <OutlinedInput
                        className={classes.input}
                        label="Score1"
                        type="number"
                        value={result.EastScore}
                        onChange={(e) =>
                          setResult({ ...result, EastScore: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">pt</InputAdornment>
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <OutlinedInput
                        className={classes.input}
                        label="Score2"
                        type="number"
                        value={result.SouthScore}
                        onChange={(e) =>
                          setResult({ ...result, SouthScore: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">pt</InputAdornment>
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <OutlinedInput
                        className={classes.input}
                        label="Score3"
                        type="number"
                        value={result.WestScore}
                        onChange={(e) =>
                          setResult({ ...result, WestScore: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">pt</InputAdornment>
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <OutlinedInput
                        className={classes.input}
                        label="NorthScore"
                        type="number"
                        value={result.NorthScore}
                        onChange={(e) =>
                          setResult({ ...result, NorthScore: e.target.value })
                        }
                        endAdornment={
                          <InputAdornment position="end">pt</InputAdornment>
                        }
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <br />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClickCheck}
        >
          確認
        </Button>
        <ModalDialog
          msg={msg}
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          userList={userList}
          result={result}
        />
      </form>
    </>
  );
}

function ModalDialog({
  msg,
  open,
  handleClose,
  handleSubmit,
  userList,
  result,
}) {
  console.log("jij", userList);
  const {
    EastId,
    SouthId,
    WestId,
    NorthId,
    EastScore,
    SouthScore,
    WestScore,
    NorthScore,
  } = result;
  console.log(result);
  console.log(EastScore);
  return (
    <>
      {msg.formCheck ? (
        <Dialog open={open}>
          <DialogTitle style={{ textAlign: "center" }}>記録確認</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h3>風</h3>
                      </TableCell>
                      <TableCell>東家</TableCell>
                      <TableCell>南家</TableCell>
                      <TableCell>西家</TableCell>
                      <TableCell>北家</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <h3>面子</h3>
                      </TableCell>
                      <TableCell align="center">
                        {userList && userList[EastId - 1].name}
                      </TableCell>
                      <TableCell align="center">
                        {userList && userList[SouthId - 1].name}
                      </TableCell>
                      <TableCell align="center">
                        {userList && userList[WestId - 1].name}
                      </TableCell>
                      <TableCell align="center">
                        {userList && userList[NorthId - 1].name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <h3>点数</h3>
                      </TableCell>
                      <TableCell align="center">{EastScore}pt</TableCell>
                      <TableCell align="center">{SouthScore}pt</TableCell>
                      <TableCell align="center">{WestScore}pt</TableCell>
                      <TableCell align="center">{NorthScore}pt</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <p style={{ textAlign: "center", color: "red" }}>
                誤差 :{" "}
                {parseInt(EastScore) +
                  parseInt(SouthScore) +
                  parseInt(WestScore) +
                  parseInt(NorthScore)}
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justify="center">
              <Grid item xs={3}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                  style={{ width: "100%" }}
                >
                  修正
                </Button>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleSubmit}
                  style={{ width: "100%" }}
                >
                  登録
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open}>
          <DialogTitle style={{ textAlign: "center" }}>入力ミス</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ textAlign: "center" }}>
              {msg.errorCode === 1 ? "ユーザを4人選択してください" : null}
              {msg.errorCode === 2 ? "ユーザーに重複があります" : null}
              {msg.errorCode === 3 ? "点数の欄に誤りがあります" : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justify="center">
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >
                OK
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
