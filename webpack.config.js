module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.ts",

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
	  },
	  {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg)$/,
        // 画像をBase64として取り込む
        loader: "url-loader"
	  }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts"]
  }
};
