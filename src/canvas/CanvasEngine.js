import CanvasData from "./UIData.json";

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
	 * @type { Boolean } animationStopper
	 */
	animationStopper;

	/**
	 * @type { Number } prevAnimationTimeStamp
	 */
	prevAnimationTimeStamp;

	/**
	 * @param { HTMLElement } canvasElement
	 */
	constructor(canvasElement) {
		this.element = canvasElement;
		this.context = canvasElement.getContext("2d");
		this.width = canvasElement.width;
		this.height = canvasElement.height;
		this.animationStopper = true;
		this.prevAnimationTimeStamp = 0;
		console.log(this);
	}

	/**
	 * @param { String } entityType
	 * @param { Number } xCord
	 * @param { Number } yCord
	 */
	renderCircle(entityType, xCord, yCord) {
		const entityData = CanvasData[entityType];
		if (entityData === undefined) {
			throw new Error("Undefined Entity Type!");
		}

		this.context.lineWidth = entityData.borderWidth;
		this.context.beginPath();
		this.context.arc(xCord, yCord, entityData.radius, 0, Math.PI * 2);
		this.context.strokeStyle = entityData.border;
		this.context.stroke();
		this.context.fillStyle = entityData.color;
		this.context.fill();
	}

	/**
	 * @returns { void }
	 */
	clearScreen() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	/**
	 * @param { Game } game
	 */
	startAnimation(game) {
		this.animationStopper = true;
		requestAnimationFrame((frameRate) => {
			// console.log(frameRate - this.prevAnimationTimeStamp);
			this.prevAnimationTimeStamp = frameRate;
			this.clearScreen();
			game.players.forEach((player) => {
				if (player !== null) {
					this.renderCircle("player", player.xCord, player.yCord);
				}
			});

			game.bullets.forEach((bullet) => {
				this.renderCircle("bullet", bullet.xCord, bullet.yCord);
			});
		});
	}
}

export default CanvasEngine;
