// 座標
export class Point {
	// x座標
	public x: number;
	// y座標
	public y: number;

	constructor();
	constructor(p: Point);
	constructor(p?: Point) {
		if (p != null) {
			this.x = p.x;
			this.y = p.y;
		}
	}
}