// 経路探索の中継点(x, y)座標を保持するリンクリスト
export class Node {
	private readonly x: number;
	private readonly y: number;
	private readonly next: Node;

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