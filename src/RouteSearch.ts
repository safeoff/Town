import { Node } from "./Node";
import { TownMap } from "./TownMap";
import { Point } from "./Point";
import { People } from "./People";

// 経路探索クラス。現在地から目的地までの経路を中継ノードを挿入しつつ、再帰的に検索する。
export class RouteSearch {
	/*
	* SEARCH_LEVELの値が小さいほどノードの数は増えるが、
     * その分、再検索の回数が減る傾向にある。
     * 逆に、SEARCH_LEVELが大きいと、ノード数が減り、再検索が増える。
     * このマップでは2～4が妥当な数値で、あまり大きな数だと
     * ゴールに到達できない場合があるので注意が必要。
     */
    private SEARCH_LEVEL = 3;

    /** マップ当たり情報 */
	private static mapInfo: number[][];
    /** 移動可能地点リスト */
    private static streetPos: Array<Point> = new Array();
    /** 経路探索後の最大ノード数 */
    private static nodeMax = 0;
    /** 最大再検索数 */
    private static retryMax = 0;
    /** のべ目標到達回数 */
	private static goalCount = 0;

	// 指定された縮小マップ画像を元に通路の当たり判定を取得し初期化する。
	constructor(image: HTMLImageElement) {
		// マップ当たり情報を初期化
		RouteSearch.mapInfo = new Array(TownMap.SOURCE_NUM);
		for (let i= 0; i < RouteSearch.mapInfo.length; i++) {
			RouteSearch.mapInfo[i] = new Array(TownMap.SOURCE_NUM);
		}

		// 縮小マップは4ドットで1マップソースになっている
		const w = TownMap.SOURCE_NUM * 4;
		const h = TownMap.SOURCE_NUM * 4;

		// 通路の座標を取得　目的地の選択などに使う
		// base64の画像をImageDataに変換
		const canvas = document.createElement("canvas");
		let a = document.getElementById("canvas1");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		// 白のドットは通過不可能
		image.onload = function() {
			ctx.drawImage(image, 0, 0);
			const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
			for (let y = 0; y < TownMap.SOURCE_NUM; y++) {
				for (let x = 0; x < TownMap.SOURCE_NUM; x++) {
					if (pixels.data[x * 4 * 4 + (y * 4) * w] == 255) {
						RouteSearch.mapInfo[x][y] = 1;
					} else {
						RouteSearch.mapInfo[x][y] = 0;
						// 道になっている部分のマップ上の座標を保持
						RouteSearch.streetPos.push(new Point(x * TownMap.SOURCE_SIZE,
							y * TownMap.SOURCE_SIZE));
					}
				}
			}
		}
	}

	// 指定された座標/ノードが道かどうか判定する。
	private isStreet(x: number, y: number): boolean;
	private isStreet(node: Node): boolean;
	private isStreet(arg1: any, arg2?: any): boolean{
		// 指定された座標が道かどうか判定する。
		// private isStreet(x: number, y: number): boolean;
		if (typeof arg1 === "number") {
			// mapInfoでチェックするため、マップソース座標に変換
			const sx = arg1 / TownMap.SOURCE_SIZE;
			const sy = arg2 / TownMap.SOURCE_SIZE;
			// 配列の範囲外はfalseでリターン
			if (sx > RouteSearch.mapInfo.length) return false;
			if (sy > RouteSearch.mapInfo[sx].length) return false;

			return RouteSearch.mapInfo[sx][sy] == 0 ? true : false;
		// private isStreet(node: Node): boolean;
		} else {
			// 指定された座標が道かどうか判定する。
			return this.isStreet(arg1.x, arg1.y);
		}
	}

	// キャラクターが進行方向に進めるかどうかを判定する。
	public canMove(people: People): boolean {
		// 人物の現在位置
		let x = people.pos.x;
		let y = people.pos.y;

		// 進もうとする座標を取得
		switch (people.dir) {
			case People.NORTH:
				y -= TownMap.SOURCE_SIZE;
				break;
			case People.SOUTH:
				y += TownMap.SOURCE_SIZE;
				break;
			case People.EAST:
				x += TownMap.SOURCE_SIZE;
				break;
			case People.WEST:
				x -= TownMap.SOURCE_SIZE;
				break;
		}

		// 通行可能かどうかのチェック
		return this.isStreet(x, y);
	}

	// ランダムに通行可能な場所を取得
	getRandomPos(): Point {
		return RouteSearch.streetPos[Math.floor(Math.random() * RouteSearch.streetPos.length)]
	}
	// 次ノードにまっすぐ行けるかどうか
	isStraight(node: Node): boolean;
	isStraight(node: Node, nextNode: Node): boolean;
	isStraight(x: number, y: number, nx: number, ny: number): boolean;
	isStraight(arg1: any, arg2?: any, arg3?: any, arg4?: any): boolean {
		// isStraight(x: number, y: number, nx: number, ny: number): boolean;
		if (typeof arg1 === "number") {
			if (arg1 == arg3) {
				// y軸方向へチェック
				const start = Math.min(arg2, arg4);
				const end = Math.max(arg2, arg4);
				for (let y = start; y <= end; y += TownMap.SOURCE_SIZE) {
					// 道じゃない場所があった場合は、まっすぐに進めない
					if (!this.isStreet(arg1, y)) return false;
				}
				// まっすぐに進める
				return true;
			} else if (arg2 == arg4) {
				// x軸方向へチェック
				const start = Math.min(arg1, arg3);
				const end = Math.max(arg1, arg3);
				for (let x = start; x <= end; x += TownMap.SOURCE_SIZE) {
					// 道じゃない場所があった場合は、まっすぐに進めない
					if (!this.isStreet(x, arg2)) return false;
				}
				// まっすぐに進める
				return true;
			}
			// 水平 or 垂直位置にないとまっすぐに進めない
			return false;

		// isStraight(node: Node): boolean;
		} else if (arg2 == undefined) {
			if (arg1 == null) return false;
			return this.isStraight(arg1, arg1.getNext());
		}
		// isStraight(node: Node, nextNode: Node): boolean;
		if (arg1 == null || arg2 == null) return false;
		return this.isStraight(arg1.x, arg1.y, arg2.x, arg2.y);
	}

	private searchRelayNode(node: Node): Node {
		const nextNode = node.getNext();
		// 中間点を求める
		let x = (node.x + nextNode.x) / 2;
		let y = (node.y + nextNode.y) / 2;
		// 座標はマップソース単位に
		x = x - x % TownMap.SOURCE_SIZE;
		y = y - y % TownMap.SOURCE_SIZE;

		let relayNode = new Node(x, y);

		// 次のノードとの位置関係で場合分けする
		if (node.x == nextNode.x) {
			// 上下に移動可能な場所を探す
			for (let d = 0; d < TownMap.MAP_W; d += TownMap.SOURCE_SIZE) {
				if (this.isStreet(relayNode.x + d, relayNode.y)) {
					relayNode.x = relayNode.x + d;
					break;
				} else if (this.isStreet(relayNode.x - d, relayNode.y)) {
					relayNode.x = relayNode.x - d;
					break;
				}
			}
		} else if (node.y == nextNode.y) {
			// 左右に移動可能な場所を探す
			for (let d = 0; d < TownMap.MAP_H; d += TownMap.SOURCE_SIZE) {
				if (this.isStreet(relayNode.x, relayNode.y + d)) {
					relayNode.y = relayNode.y + d;
					break;
				} else if (this.isStreet(relayNode.x, relayNode.y - d)) {
					relayNode.y = relayNode.y - d;
					break;
				}
			}
		} else {
			// 1回曲がって到達可能か？
			if (this.isStraight(node.x, node.y, node.x, nextNode.y) &&
			this.isStraight(node.x, nextNode.y, nextNode.x, nextNode.y)) {
				relayNode.x = node.x;
				relayNode.y - nextNode.y;
			} else if (this.isStraight(node.x, node.y, nextNode.x, node.y) &&
			this.isStraight(nextNode.x, node.y, nextNode.x, nextNode.y)) {
				relayNode.x = nextNode.x;
				relayNode.y - node.y;
			} else {
				// 斜めに移動可能な場所を探す
				const dx = node.x < nextNode.x ? 1 : -1;
				const dy = node.y < nextNode.y ? 1 : -1;

				for (let d = 0; d <= TownMap.MAP_W; d += TownMap.SOURCE_SIZE) {
					if (this.isStreet(relayNode.x +d, relayNode.y - d * (dx * dy))) {
						relayNode.x += d;
						relayNode.y -= d * (dx * dy);
						break;
					} else if (this.isStreet(relayNode.x - d, relayNode.y + d * (dx * dy))) {
						relayNode.x -= d;
						relayNode.y += d * (dx * dy);
						break;
					}
				}
			}
		}

		return relayNode;
	}

	private countNode(node: Node): number {return 1;}
	private nodeMax = 1;
	// 次のノードまでのルートを探索する。再帰的に呼び出されるが、
	// その際には、呼び出しレベルをインクリメントして次に渡すこと。
	// そのレベルを元に、検索の精度が変化する。
	public searchRoute(node: Node, level: number): void {
		// 次に進むノードを取得
		if (node == null) return;
		const nextNode = node.getNext();

		// 終端なら探索終了
		if (nextNode == null) return;
		// 対象のノードが進入不可能な位置にあるなら探索終了
		if (!this.isStreet(node) || !this.isStreet(nextNode)) return;
		// 一直線に進めるなら探索終了
		if (!this.isStraight(node)) return;

		// 進めない場合は中継ノードを求め挿入
		const relayNode = this.searchRelayNode(node);
		if (relayNode != null) {
			node.insert(relayNode);
			// 余分なノードを除去
			if (this.isStraight(relayNode, nextNode.getNext())) {
				relayNode.removeNext();
			}
			// 再帰的に探索
			if (level >= this.SEARCH_LEVEL) {
				this.searchRoute(relayNode, ++level);
			}
			this.searchRoute(node, ++level);
		}

		// 最大ノード数を集計
		const count = this.countNode(node);
		this.nodeMax = Math.max(this.nodeMax, count);
	}

	// ゴールカウントを返します。
	getGoalCount() {}
	// ノードの最大数を返します。
	getNodeMax() {}
	// 最大再検索数を返します。
	getRetryMax() {}
	// 与えられた値が現在の最大値より大きければ最大値を更新。
	static setRetryMax(retryMax: number) {}
	// 目標地点到達回数をインクリメントする。
	static countGoal() {}
}