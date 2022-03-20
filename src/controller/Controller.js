const mouse = "mouse";
const move = "move";
const click = "click";
const both = "both";

class Controller {
	/**
	 * @typedef { {
	 * 	type: String,
	 * 	up: Boolean,
	 * 	down: Boolean,
	 * 	left: Boolean,
	 * 	right: Boolean
	 * 	mouse: {
	 * 		click: Boolean
	 * 		xCord: Number,
	 * 		yCord: Number
	 * 	}
	 * } } InputState
	 */
	/**
	 * @type { HTMLElement } element
	 */
	element;

	/**
	 * @type { InputState }
	 */
	inputState;

	/**
	 * @type { InputState }
	 */
	prevInputState;

	/**
	 * @type { Number | null }
	 */
	mouseInterval;

	/**
	 * @type { Number | null }
	 */
	controlInterval;

	/**
	 * @type { Boolean }
	 */
	inputChanged;

	/**
	 * 
	 * @param { HTMLElement } element 
	 */
	constructor(element) {
		this.element = element;
		this.inputChanged = false;
		this.inputState = {};
		this.inputState.type = undefined;
		this.inputState.up = false;
		this.inputState.down = false;
		this.inputState.left = false;
		this.inputState.right = false;
		this.inputState[mouse] = {};

		// Deep Copy the inputStates
		this.prevInputState = { ...this.inputState }; // check this.
		this.mouseInterval = null;
		this.controlInterval = null;
	}

	/**
	 * @returns { void }
	 */
	activeListeners() {
		this.element.addEventListener("keyup", (event) => {
			const keyName = event.key;
			switch (keyName) {
				case "a":
				case "A":
					this.inputState.left = false;
					break;
				case "w":
				case "W":
					this.inputState.up = false;
					break;
				case "s":
				case "S":
					this.inputState.down = false;
					break;
				case "d":
				case "D":
					this.inputState.right = false;
					break;
			}
		});

		this.element.addEventListener("keydown", (event) => {
			const keyName = event.key;
			switch (keyName) {
				case "a":
				case "A":
					this.inputState.left = true;
					break;
				case "w":
				case "W":
					this.inputState.up = true;
					break;
				case "s":
				case "S":
					this.inputState.down = true;
					break;
				case "d":
				case "D":
					this.inputState.right = true;
					break;
			}
		});

		this.element.addEventListener("mousedown", (event) => {
			const { top: offsetTop, left: offsetLeft } = this.element.getBoundingClientRect();
			this.inputState[mouse].yCord = event.clientY - Math.round(offsetTop);
			this.inputState[mouse].xCord = event.clientX - Math.round(offsetLeft);

			this.inputState[mouse].click = true;
			console.log(this.inputState[mouse]);
		});

		this.element.addEventListener("mouseup", () => {
			this.inputState[mouse].click = false;
		});

		this.element.addEventListener("mousemove", (event) => {
			const { top: offsetTop, left: offsetLeft } = this.element.getBoundingClientRect();
			this.inputState[mouse].yCord = event.clientY - Math.round(offsetTop);
			this.inputState[mouse].xCord = event.clientX - Math.round(offsetLeft);
		});
	}

	/**
	 * @returns { void }
	 */
	registerControlInterval() {
		// Register control listener to listen for changes in input
		this.controlInterval = setInterval(() => {
			if (this.inputState.up !== this.prevInputState.up ||
				this.inputState.down !== this.prevInputState.down ||
				this.inputState.left !== this.prevInputState.left ||
				this.inputState.right !== this.prevInputState.right) {
				console.log(this.inputState);
				this.prevInputState = { ...this.inputState };
				this.inputState.type = move;
				// The front-end socket needs to manually change this to false.
				this.inputChanged = true;
			}
			if (this.inputState[mouse].click === true) {
				if (this.inputState.type === move) {
					this.inputState.type = both;
				} else {
					this.inputState.type = click;
				}
				this.inputChanged = true;
			}
		}, 100);
	}

	/**
	 * @returns { void }
	 */
	unregisterControlInterval() {
		clearInterval(this.controlInterval);
	}
}

export {
	Controller,
	mouse
};
