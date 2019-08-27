import { RouteSearch } from "./RouteSearch";
import { Point } from "./Point";
import { Node } from "./Node";
import { TownMap } from "./TownMap";

// 町の人クラス
export class People {
	/** 主人公以外のキャラの種類数 */
	private static TYPE_NUM = 24;

	/** 右足前の歩きパターン */
	private static RIGHT = 0;
	/** 左足前の歩きパターン */
	private static LEFT = 1;

	/** 移動方向　西 */
	public  static WEST = 0;
	/** 移動方向　北 */
	public static NORTH = 1;
	/** 移動方向　東 */
	public static EAST = 2;
	/** 移動方向　南 */
	public static SOUTH = 3;

	/** 通常状態　頭上マークなし */
	public static NORMAL = 0;
	/** ゴール到達状態　頭上に「！」マーク */
	public static GOAL = 1;
	/** 再検索状態　頭上に「？」マーク */
	public static SEARCH = 2;
	/** 頭上マークの表示時間 */
	private static DISP_TIME = 90;

	/** 人々に割り振るID番号のカウンター */
	private static idCounter = 0;

	/** ID番号 */
	private id: number;
	/** 経路探査アルゴリズム */
	private rs: RouteSearch;
	/** 最大リトライ回数 */
	private retryMax: number;
	/** ステータス表示時間 */
	private dispTime: number;

	/** 移動経路 */
	public node: Node;
	/** 現在座標 */
	public pos: Point;
	/** 目標座標 */
	public goal: Point;
	/** 表示パターン */
	public walkPattern: number;
	/** 移動方向 */
	public dir: number = 0;
	/** キャラタイプ */
	public type: number;
	/** 頭上マークの状態 */
	public status: number;

	// 町の人の状態を初期化。タイプ、現在地、目的地はランダム。
	constructor(rs: RouteSearch) {
		this.id = People.idCounter++;
		this.rs = rs;

		// 乱数で初期化
		// type = 0 は主人公専用にする
		this.type = 1 + Math.floor(Math.random() * People.TYPE_NUM);

		// 現在地と目的地の初期化
		this.pos = new Point(rs.getRandomPos());
		this.setGoal();

		// 経路を探索
		rs.searchRoute(this.node, 1);
	}
	// キャラクター状態を更新。ノードに向かって移動する。
	// もし、次のノードにまっすぐ進めない場合は経路の再探索。
	// 目的地に到達している場合は、目的地の再設定。
	public update(counter: number): void {
		// マップソース単位の処理
		if (this.pos.x % TownMap.SOURCE_SIZE == 0 && this.pos.y % TownMap.SOURCE_SIZE == 0) {

			// ノードに到着していたときの処理
			if (this.pos.x == this.node.x && this.pos.y == this.node.y) {
				const nodeNext = this.node.getNext();
				if (nodeNext == null) {
					// 目的地到着　再設定
					this.setGoal();
					RouteSearch.countGoal();
					// 経路探索
					this.rs.searchRoute(this.node, 1);
					// ゴール到着ステータス
					this.status = People.GOAL;
					this.dispTime = People.DISP_TIME;
				} else if (!this.rs.isStraight(this.node)) {
					// まっすぐ進めなかったらゴールまで再探索
					this.node.setNext(new Node(this.goal));
					this.rs.searchRoute(this.node, 1);
					// 再建策数を集計
					this.retryMax++;
					RouteSearch.setRetryMax(this.retryMax);
					// 再建策ステータス
					this.status = People.SEARCH;
					this.dispTime = People.DISP_TIME;
				}
				// 次のノードへ進む
				this.node = this.node.getNext();
			}

			if (this.pos.x == this.node.x) {
				if (this.pos.y > this.node.y) {
					this.dir = People.NORTH;
				} else {
					this.dir = People.SOUTH;
				}
			} else if (this.pos.y == this.node.y) {
				if (this.pos.x > this.node.x) {
					this.dir = People.WEST;
				} else {
					this.dir = People.EAST;
				}
			}
		}

		// 進行方向に進む
		switch (this.dir) {
			case People.WEST:
				this.pos.x--;
				break;
			case People.NORTH:
				this.pos.y--;
				break;
			case People.EAST:
				this.pos.x++;
				break;
			case People.SOUTH:
				this.pos.y++;
				break;
		}

		// 1つのマップソースを2歩で歩く
		if (counter % TownMap.SOURCE_SIZE > (TownMap.SOURCE_SIZE / 2)) {
			this.walkPattern = People.RIGHT;
		} else {
			this.walkPattern = People.LEFT;
		}

		// ステータスの表示時間を減らす
		if (--this.dispTime <= 0) {
			this.status = People.NORMAL;
		}
	}

	// 新たな目標地点をランダムに設定する。
	public setGoal(): void {
		// 通路上の座標を目的地に設定
		this.goal = new Point(this.rs.getRandomPos());
		// 現在の座標を最初のノードに指定
		this.node = new Node(this.pos);
		// 目的地を次のノードに指定
		this.node.setNext(new Node(this.goal));
		// 再建策数を初期化
		this.retryMax = 0;
	}
}