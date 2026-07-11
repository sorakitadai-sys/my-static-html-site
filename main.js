const express = require("express");
const app = express();

// EJSをテンプレートエンジンとして使えるように設定する
app.set("view engine", "ejs");
// クライアントからPOST送信されたフォームデータを受け取るための設定
app.use(express.urlencoded({ extended: true }));

// トップページ（/）にアクセスされた時の処理
app.get("/", (req, res) => {
    // index.ejs（クイズの入力フォーム画面）をクライアントに表示する
    res.render("index");
});

// 「採点する」ボタンが押され、データがPOST送信された時の処理
app.post("/grade", (req, res) => {
    // フォームから送られたQ1〜Q3の回答データを受け取る
    const q1 = req.body.q1;
    const q2 = req.body.q2;
    const q3 = req.body.q3;
    
    let score = 0; // 正解数をカウントする変数を準備

    // それぞれの回答が正解の文字列と一致しているか判定．正解なら+1点
    if (q1 === "kindoflove") score += 1;
    if (q2 === "kaho") score += 1; 
    if (q3 === "ohisama") score += 1;

    // ランクとコメントを入れるための変数を準備
    let rank = "";
    let comment = "";

    // 合計の正解数（score）に応じて、ランクとコメントを条件分岐で決定する
    if (score === 3) {
        rank = "伝説のおひさま";
        comment = "全問正解！あなたの日向坂愛は本物です．これからも応援しましょう！";
    } else if (score >= 1) {
        rank = "立派なおひさま";
        comment = "あともう一息！かなり日向坂の深いところまで知っていますね．";
    } else {
        rank = "おひさま見習い";
        comment = "全問不正解です．ぜひ楽曲を聴いてハッピーオーラに触れてみてください！";
    }

    // 結果画面に、計算した点数・ランク・コメントのデータを渡して表示する
    res.render("result", { 
        score: score, 
        rank: rank,
        comment: comment
    });
});

// ポート3000番でサーバーを起動して待機状態にする
app.listen(3000, () => {
    console.log("Ohisama Quiz App is running on port 3000");
});