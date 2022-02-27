import { io } from "socket.io-client";
import CanvasEngine from "../canvas/CanvasEngine.js";
import { BackendURL } from "../backend.js";

const currentGameStatus = "current game status";
const newPlayerJoined = "new user joined";

/**
 * @param { HTMLElement } canvas
 * @param { Player[] } players
 */

/**
 * @param { HTMLElement } canvas
 * @returns { void }
 */
function setupSocketIOClient(canvas) {
	const canvasEngine = new CanvasEngine(canvas);
	const socket = io(BackendURL);

	socket.on(currentGameStatus, (game) => {
		game.players.forEach(player => {
			canvasEngine.renderCircle("blue", player.xCord, player.yCord, 10);
		});
	});

	socket.on(newPlayerJoined, (player) => {
		canvasEngine.renderCircle("blue", player.xCord, player.yCord, 10);
		console.log(player.id, "has joined us");
	});
	return socket;
}

export {
	setupSocketIOClient
};
