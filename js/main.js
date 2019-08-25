// 街情報を更新し、再描画する。
function update() {
	// canvasを取得
	var cs  = document.getElementById('canvas3');
	var ctx = cs.getContext('2d');

	// 画面の描画を行う。全体マップに人物の位置と主人公の経路を描画し、
	// 町の情報、および拡大マップを表示する。
	// 拡大マップの具体的な描画に関しては、TownMapを参照のこと。
	function render() {
		// 背景の消去
		ctx.clearRect(0, 0, cs.width, cs.height);
		// 全体マップの描画
		// 実際のマップの1/8の大きさなので、マップ上の座標を8で割れば
		// 縮小マップにおける表示位置になる。

		// 人物位置描画

		// 主人公の先頭のノードを取得

		// 主人公が目指すノードへの線を描画

		// 主人公の探索経路を描画 while
			// 次のノードが存在するなら線を描画
			// ノードの描画
			// 次のノードに移動

		// 主人公の位置を描画

		// 目的地を描画

		// 表示エリアを表す矩形

		// 街の情報表示

		// 拡大マップの描画

		// 繰り返し
		requestAnimationFrame(render);
	}
	render();
}
window.onload = function(){
	update();
}