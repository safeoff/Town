// 座標
export class Point {
	// x座標
	public x: number;
	// y座標
	public y: number;

	constructor();
	constructor(p: Point);
	constructor(x: number, y: number);
	constructor(arg1?: any, arg2?: any) {
		if (arg1 == null) return;
		if (typeof arg1 === "number") {
			this.x = arg1;
			this.y = arg2;
		}
		this.x = arg1.x;
		this.y = arg1.y;
	}
}