import { Animation } from "./Animation";

// Below is the way to call animation
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
window.onload = function() {
	new Animation(canvas);
}