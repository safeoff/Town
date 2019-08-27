import { TownMap } from "./TownMap";
import { RouteSearch } from "./RouteSearch";

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
		private readonly canvas: HTMLCanvasElement,
		) {
			this.ctx = canvas.getContext('2d');
			this.town = new TownMap();
			this.ctx.fillStyle = "rgb(233, 214, 178)";
			this.ctx.fillRect(0, 0, canvas.width, canvas.height);
			window.requestAnimationFrame(() => this.draw());
	}

	// 画面の描画を行う。全体マップに人物の位置と主人公の経路を描画し、
	// 町の情報、および拡大マップを表示する。
	// 拡大マップの具体的な描画に関しては、TownMapを参照のこと。
	draw() {
		// 背景の消去
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
		let node = mainPeople.node;
		const pos = mainPeople.pos;
		const goal = mainPeople.goal;

		// 主人公が目指すノードへの線を描画
		this.ctx.strokeStyle = "rgb(0, 190, 255)";
		this.ctx.beginPath();
		this.ctx.moveTo(Animation.STREET_X + pos.x / 8 + 2, Animation.STREET_Y + pos.y / 8 + 2);
		this.ctx.lineTo(Animation.STREET_X + node.x / 8 + 2, Animation.STREET_Y + node.y / 8 + 2);
		this.ctx.closePath();
		this.ctx.stroke();

		// 主人公の探索経路を描画 while
		while (node != null) {
			const nextNode = node.getNext();

			// 次のノードが存在するなら線を描画
			if (nextNode != null) {
				this.ctx.strokeStyle = "rgb(100, 100, 100)";
				this.ctx.beginPath();
				this.ctx.moveTo(Animation.STREET_X + node.x / 8 + 2, Animation.STREET_Y + node.y / 8 + 2);
				this.ctx.lineTo(Animation.STREET_X + nextNode.x / 8 + 2, Animation.STREET_Y + nextNode.y / 8 + 2);
				this.ctx.closePath();
				this.ctx.stroke();
			}
			// ノードの描画
			this.ctx.fillStyle = "rgb(240, 0, 0)";
			this.ctx.fillRect(Animation.STREET_X + node.x / 8, Animation.STREET_Y + node.y / 8, 4, 4);
			// 次のノードに移動
			node = nextNode;
		}

		// 主人公の位置を描画
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(Animation.STREET_X + pos.x / 8, Animation.STREET_Y + pos.y / 8, 4, 4);
		// 目的地を描画
		this.ctx.fillStyle = "orange";
		this.ctx.fillRect(Animation.STREET_X + goal.x / 8, Animation.STREET_Y + goal.y / 8, 4, 4);
		this.ctx.fillStyle = "red";
		this.ctx.rect(Animation.STREET_X + goal.x / 8, Animation.STREET_Y + goal.y / 8, 4, 4);

		// 表示エリアを表す矩形
		const screenPos = this.town.getScreenPos();
		this.ctx.fillStyle = "rgb(240, 30, 30)";
		this.ctx.rect(Animation.STREET_X + screenPos.x / 8, Animation.STREET_Y + screenPos.y / 8, 44, 44);

		// 街の情報表示
		this.ctx.fillStyle = "rgb(110, 71, 43)";
		this.ctx.fillText("Map座標 : x = " + screenPos.x + ", y =" + screenPos.y,
		Animation.STREET_X, 280 + 16 * 0);
		this.ctx.fillText("時間 : " + this.town.getCounter(),
		Animation.STREET_X, 280 + 16 * 1);
		this.ctx.fillText("人数 : " + peopleList.length + "人",
		Animation.STREET_X, 280 + 16 * 2);
		this.ctx.fillText("最大ノード数 : " + RouteSearch.getNodeMax() + "個",
		Animation.STREET_X, 280 + 16 * 3);
		this.ctx.fillText("最大再検索 : " + RouteSearch.getRetryMax() + "回",
		Animation.STREET_X, 280 + 16 * 4);
		this.ctx.fillText("のべ目標到達 " + RouteSearch.getGoalCount() + "回",
		Animation.STREET_X, 280 + 16 * 5);

		// 拡大マップの描画
		this.town.drawMapImage();
		this.ctx.drawImage(this.town.getMapImage(), Animation.MAP_X, Animation.MAP_Y);
		this.town.update();
		window.requestAnimationFrame(() => this.draw());
	}
}