class CanvasEngine {
	/**
	 * @type { HTMLElement } element
	 */
	element;
	/**
	 * @type { CanvasRenderingContext2D }
	 */
	context;
	/**
	 * @type { Number } width
	 */
	width;
	/**
	 * @type { Number } height
	 */
	height;

	/**
	 * @param { HTMLElement } canvasElement
	 */
	constructor(canvasElement) {
		this.element = canvasElement;
		this.context = canvasElement.getContext("2d");
		this.width = canvasElement.width;
		this.height = canvasElement.height;
		console.log(this);
	}

	/**
	 * @param { String } color
	 * @param { Number} xCord
	 * @param { Number } yCord
	 * @param { Number } radius
	 */
	renderCircle(color, xCord, yCord, radius) {
		this.context.beginPath();
		this.context.arc(xCord, yCord, radius, 0, Math.PI * 2);
		this.context.strokeStyle = color;
		this.context.stroke();
	}
}

export default CanvasEngine;
