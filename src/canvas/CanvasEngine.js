const playerCellWidth = 3;

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
	 * @param { String } color
	 * @param { Number} xCord
	 * @param { Number } yCord
	 * @param { Number } radius
	 */
	renderCircle(color, xCord, yCord, radius) {
		this.context.lineWidth = playerCellWidth;
		this.context.beginPath();
		this.context.arc(xCord, yCord, radius, 0, Math.PI * 2);
		this.context.strokeStyle = "cyan";
		this.context.stroke();
		this.context.fillStyle = color;
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
					this.renderCircle("lightblue", player.xCord, player.yCord, 30);
				}
			});

			game.bullets.forEach((bullet) => {
				this.renderCircle("lightblue", bullet.xCord, bullet.yCord, 10);
			});
		});
	}
}

export default CanvasEngine;
