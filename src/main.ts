import { Animation } from "./Animation";

// Below is the way to call animation
const canvas1 = <HTMLCanvasElement>document.getElementById('canvas1');
const canvas2 = <HTMLCanvasElement>document.getElementById('canvas2');
const canvas3 = <HTMLCanvasElement>document.getElementById('canvas3');
new Animation(canvas1, canvas2, canvas3);