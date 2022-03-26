import { io } from "socket.io-client";
import CanvasEngine from "../canvas/CanvasEngine.js";
import { BackendURL } from "../backend.js";

const currentGameStatus = "current game status";
const aPlayerJoined = "a user joined";
const aPlayerLeft = "a player left";
const requestInput = "request input";
const sendBackInput = "send back input";
const sendGameData = "send game data";

/**
 * @param { HTMLElement } canvas
 * @returns { void }
 */
function setupSocketIOClient(canvas) {
	const canvasEngine = new CanvasEngine(canvas);
	const socket = io(BackendURL);

	socket.on(currentGameStatus, (game) => {
		game.players.forEach(player => {
			if (player) {
				canvasEngine.renderCircle("lightblue", player.xCord, player.yCord, 30);
			}
		});
	});

	socket.on(aPlayerJoined, (player) => {
		canvasEngine.renderCircle("lightblue", player.xCord, player.yCord, 30);
		console.log(player.id, "has joined us");
	});

	socket.on(aPlayerLeft, (game) => {
		canvasEngine.clearScreen();
		game.players.forEach(player => {
			if (player) {
				canvasEngine.renderCircle("lightblue", player.xCord, player.yCord, 30);
			}
		});
	});
	return { socket, canvasEngine };
}

function sendUserInput(socket, controller) {
	socket.on(requestInput, () => {
		if (controller.inputChanged === true) {
			controller.inputChanged = false;
			socket.emit(sendBackInput, controller.inputState);
		} else {
			socket.emit(sendBackInput, null);
		}
	});
}

function receiveUpdate(socket, canvasEngine) {
	socket.on(sendGameData, (game) => {
		canvasEngine.startAnimation(game);
	});
}

export {
	setupSocketIOClient,
	sendUserInput,
	receiveUpdate
};
