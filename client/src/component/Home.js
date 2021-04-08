import React from 'react';
import {Grid} from '@material-ui/core';


export default function Home(){
    return(
      <div style={{padding : ''}}>
        <h1 style={{marginBottom : '50px'}}>Mahjong Score Manager</h1>
        <Grid container justify='center'>
          <Grid item xs={8}>
            <div style={{textAlign : 'left', margin : ''}}>
              <h2 style={{textAlign : 'center'}}>使い方</h2>
              <p>１．未登録のメンバーを「メンバー➡メンバー追加」によって追加してください．</p>
              <p>２．「得点記録」で参加メンバーを選択し，得点を入力してください．</p>
              <h2 style={{textAlign : 'center'}}>機能紹介</h2>
              <h3 >・ 得点記録</h3>
              <p>スコアを入力し，データを保存することができます．</p>
              <h3 >・ 個人データ</h3>
              <p>「メンバー」からプレイヤーを選択することで，個人データを確認できます．</p>
              <h3 >・ ランキング</h3>
              <p>「ランキング」から各種ランキングを確認できます．</p>
              <h3>・対戦履歴</h3>
              <p>「履歴」から過去の対戦の結果が確認できます．</p>      
            </div>
          </Grid>
        </Grid>
      </div>
    );
};