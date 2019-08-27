import { Point } from "./Point";

// 経路探索の中継点(x, y)座標を保持するリンクリスト
export class Node {
	public x: number;
	public y: number;
	private next: Node;

	// 座標は(0, 0)で初期化されます。
	constructor();
	constructor(x: number, y: number);
	constructor(p: Point);
	constructor(arg1?: any, arg2?: any) {
		this.x = 0;
		this.y = 0;
		this.next = null;
		// 引数で座標を初期化します。
		// constructor();
		if (arg1 == undefined) return;
		// constructor(x: number, y: number);
		if (typeof arg1 === "number") {
			this.x = arg1;
			this.y = arg2;
			return;
		}
		// constructor(p: Point);
		this.x = arg1.x;
		this.y = arg1.y;
	}

	// 次のノードを返します。
	public getNext(): Node {
		return this.next;
	}

	// 次のノードを設定します。
	public setNext(next: Node): void {
		this.next = next;
	}

	// ノードを次のノードとの間に挿入します。
	public insert(node: Node): void {
		node.setNext(this.next);
		this.next = node;
	}

	// 次のノードを取り除きます。
	public removeNext(): void {
		this.next = this.next.getNext();
	}
}