// 経路探索の中継点(x, y)座標を保持するリンクリスト
class Node {
	// 座標は(0, 0)で初期化されます。
	constructor(x, y) {
		// x座標
		this.x = 0;
		// y座標
		this.y = 0;
		// 次のノード
		this.next = null;
		// 引数で座標を初期化します。
		if (x != null) {
			this.x = x;
			this.y = y;
		}
	}
	// 次のノードを返します。
	getNext() {}
	// 次のノードを設定します。
	setNext() {}
	// ノードを次のノードとの間に挿入します。
	insert() {}
	// 次のノードを取り除きます。
	removeNext() {}
}

// 町データ管理クラス。画像のロード、マップ画面の描画も担当する。
class TowmMap {
	// 画像の読み込み、拡大マップ表示用の裏画面の準備、人々の初期化を行う。
	constructor() {}
	// 通路情報が描かれた縮小マップ画像を返します。
	getStreetImage() {}
	// マップ表示用の裏画面を返します。この画面には人々が描画されています。
	getMapImage() {}
	// マップを描画します。マップ画面は「背景」「人々」「前景」の3つのレイヤーで構成されます。
	drawMapImage() {}
	// 時間を進め、町の人々を移動させます。移動後に人々はY座標でソートされます。
	// また、主人公が中心に来るように、マップのスクロール座標も更新します。
	update() {}
	// 主人公を返します。
	getMainPeople() {}
	// 人々のリストを返します。
	getPeopleList() {}
	// マップのスクロール座標を返します。
	getScreenPos() {}
	// 現在のフレームカウントを返します。
	getCounter() {}
}

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