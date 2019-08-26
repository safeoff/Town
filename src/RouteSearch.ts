import { Node } from "./Node";
import { TownMap} from "./TownMap";
import { Point } from "./Point";

// 経路探索クラス。現在地から目的地までの経路を中継ノードを挿入しつつ、再帰的に検索する。
export class RouteSearch {
	SEARCH_LEVEL = 1;
	// 指定された縮小マップ画像を元に通路の当たり判定を取得し初期化する。
	constructor() {}
	// キャラクターが進行方向に進めるかどうかを判定する。
	canMove() {}
	// ランダムに通行可能な場所を取得
	getRandomPos(): Point {return new Point();}
	// 次ノードにまっすぐ行けるかどうか
	isStraight(node: Node): boolean;
	isStraight(node: Node, nextNode: Node): boolean;
	isStraight(x: number, y: number, nx: number, ny: number): boolean;
	isStraight(arg1: any, arg2?: any, arg3?: any, arg4?: any): boolean {
		return true;
	}

	private isStreet(node: Node): boolean;
	private isStreet(x: number, y: number): boolean;
	private isStreet(arg1: any, arg2?: any): boolean{
		if (typeof arg1 === "number") {
			return true;
		}
		return true;
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
	setRetryMax() {}
	// 目標地点到達回数をインクリメントする。
	countGoal() {}
}