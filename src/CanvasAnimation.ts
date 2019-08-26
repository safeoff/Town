import { TowmMap } from "./TownMap";

// 街情報を更新し、再描画する。
export class CanvasAnimation {
	private readonly ctx1: CanvasRenderingContext2D;
	private readonly ctx2: CanvasRenderingContext2D;
	private readonly ctx3: CanvasRenderingContext2D;
	private a = 0;

	constructor(
		private readonly canvas1: HTMLCanvasElement,
		private readonly canvas2: HTMLCanvasElement,
		private readonly canvas3: HTMLCanvasElement
		) {
		this.ctx1 = this.canvas1.getContext('2d');
		this.ctx2 = this.canvas2.getContext('2d');
		this.ctx3 = this.canvas2.getContext('2d');
		window.requestAnimationFrame(() => this.draw());
	}

	// 画面の描画を行う。全体マップに人物の位置と主人公の経路を描画し、
	// 町の情報、および拡大マップを表示する。
	// 拡大マップの具体的な描画に関しては、TownMapを参照のこと。
	draw() {
		// 背景の消去
		this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
		this.ctx2.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
		this.ctx3.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
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
		this.ctx1.fillRect(this.a, 0, 10, 10);
		this.ctx2.fillRect(this.a, 50, 10, 10);
		this.ctx3.fillRect(this.a, 100, 10, 10);
		const townmap = new TowmMap();
		this.a = townmap.inca(this.a);
		window.requestAnimationFrame(() => this.draw());
	}
}