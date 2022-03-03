const up = "w";
const down = "s";
const left = "a";
const right = "d";
const click = "click";
const mouseCoolDown = 200;

class Controller {
	/**
	 * @typedef { { up: Boolean, down: Boolean, left: Boolean, right: Boolean, click: Boolean } } InputState
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
	 * @type { Number | null }
	 */
	mouseInterval;
	/**
	 * 
	 * @param { HTMLElement } element 
	 */
	constructor(element) {
		this.element = element;
		this.mouseCoolDown = false;
		this.inputState = {};
		this.inputState[up] = false;
		this.inputState[down] = false;
		this.inputState[left] = false;
		this.inputState[right] = false;
		this.inputState[click] = false;
		this.mouseInterval = null;
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
					this.inputState[left] = false;
					break;
				case "w":
				case "W":
					this.inputState[up] = false;
					break;
				case "s":
				case "S":
					this.inputState[down] = false;
					break;
				case "d":
				case "D":
					this.inputState[right] = false;
					break;
			}
		});

		this.element.addEventListener("keydown", (event) => {
			const keyName = event.key;
			switch (keyName) {
				case "a":
				case "A":
					this.inputState[left] = true;
					break;
				case "w":
				case "W":
					this.inputState[up] = true;
					break;
				case "s":
				case "S":
					this.inputState[down] = true;
					break;
				case "d":
				case "D":
					this.inputState[right] = true;
					break;
			}
		});

		this.element.addEventListener("mousedown", () => {
			this.element.focus();
			if (this.mouseInterval !== null) {
				return;
			}

			// socket notification
			console.log("shooting");
			this.mouseInterval = setInterval(() => {
				// socket notification
				console.log("shooting");
			}, mouseCoolDown);
		});

		this.element.addEventListener("mouseup", () => {
			this.element.focus();
			clearInterval(this.mouseInterval);
			this.mouseInterval = null;
		});
	}
}

export {
	Controller,
	up,
	down,
	left,
	right,
	click
};
