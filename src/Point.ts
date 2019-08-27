// 座標
export class Point {
	// x座標
	public x = 0;
	// y座標
	public y = 0;

	constructor();
	constructor(p: Point);
	constructor(x: number, y: number);
	constructor(arg1?: any, arg2?: any) {
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
}