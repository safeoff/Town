// 町データ管理クラス。画像のロード、マップ画面の描画も担当する。
export class TownMap {
	public static SOURCE_SIZE = 1;
	public static SOURCE_NUM = 1;
	public static MAP_W = 1;
	public static MAP_H = 1;

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
	// テスト用
	inca(a: number) {return a+1;}
}