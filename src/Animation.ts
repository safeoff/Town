import { TownMap } from "./TownMap";

// 街情報を更新し、再描画する。
export class Animation {
	private readonly ctx: CanvasRenderingContext2D;
    /** 全体マップ表示位置オフセット */
    private static STREET_X = 16;
    /** 全体マップ表示位置オフセット */
    private static STREET_Y = 16;
    /** 全体マップの幅 */
    private static STREET_W = 240;
    /** 全体マップの高さ */
    private static STREET_H = 240;
    /** 拡大マップ表示位置オフセット */
    private static MAP_X = Animation.STREET_X + Animation.STREET_W + 16;
    /** 拡大マップ表示位置オフセット */
    private static MAP_Y = Animation.STREET_Y;
    /** 拡大マップの幅 */
    private static MAP_W = TownMap.SOURCE_SIZE * 11;
    /** 拡大マップの高さ */
    private static MAP_H = TownMap.SOURCE_SIZE * 11;
    /** 町データ */
    private town: TownMap;

	// 町データを作成し、タイマーイベントを開始する。
	constructor(
		private readonly canvas1: HTMLCanvasElement,
		) {
			this.ctx = this.canvas1.getContext('2d');
			this.town = new TownMap();
			window.requestAnimationFrame(() => this.draw());
	}

	// 画面の描画を行う。全体マップに人物の位置と主人公の経路を描画し、
	// 町の情報、および拡大マップを表示する。
	// 拡大マップの具体的な描画に関しては、TownMapを参照のこと。
	draw() {
		// 背景の消去
		this.ctx.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
		// 全体マップの描画
		// 実際のマップの1/8の大きさなので、マップ上の座標を8で割れば
		// 縮小マップにおける表示位置になる。
		this.ctx.drawImage(this.town.getStreetImage(), Animation.STREET_X, Animation.STREET_Y);
		this.ctx.fillStyle = "rgb(211, 211, 211)";
		this.ctx.fillRect(Animation.STREET_X, Animation.STREET_Y, Animation.STREET_W, Animation.STREET_W);

		const mainPeople = this.town.getMainPeople();

		// 人物位置描画
		const peopleList = this.town.getPeopleList();
		for (const p of peopleList) {
			this.ctx.fillStyle = "rgb(255, 240, 0)";
			this.ctx.fillRect(Animation.STREET_X + p.pos.x / 8, Animation.STREET_Y + p.pos.y / 8, 4, 4);
		}

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
		window.requestAnimationFrame(() => this.draw());
	}
}