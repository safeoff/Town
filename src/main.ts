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

  draw() {
	// do stuff
	this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
	this.ctx2.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
	this.ctx3.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
	this.ctx1.fillRect(this.a, 0, 10, 10);
	this.ctx2.fillRect(this.a, 50, 10, 10);
	this.ctx3.fillRect(this.a, 100, 10, 10);
	this.a++;
    window.requestAnimationFrame(() => this.draw());
  }
}

// Below is the way to call animation
const canvas1 = <HTMLCanvasElement>document.getElementById('canvas1');
const canvas2 = <HTMLCanvasElement>document.getElementById('canvas2');
const canvas3 = <HTMLCanvasElement>document.getElementById('canvas3');
new CanvasAnimation(canvas1, canvas2, canvas3);