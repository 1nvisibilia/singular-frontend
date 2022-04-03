import { Socket } from "socket.io-client";
import CanvasEngine from "../canvas/CanvasEngine.js";

const currentGameStatus = "current game status";
const aPlayerJoined = "a user joined";
const aPlayerLeft = "a player left";
const requestInput = "request input";
const sendBackInput = "send back input";
const sendGameData = "send game data";
const joinRoom = "join room";
const leaveRoom = "leave room";
const sendChatMessage = "send chat message";
const broadcastMessage = "broadcast message";

/**
 * @param { Socket } socket
 * @param { HTMLElement } canvas
 * @returns { CanvasEngine }
 */
function setupSocketIOClient(socket, canvas) {
	const canvasEngine = new CanvasEngine(canvas);

	socket.on(currentGameStatus, (game) => {
		game.players.forEach(player => {
			canvasEngine.render("player", player.xCord, player.yCord);
		});
	});

	socket.on(aPlayerJoined, (player) => {
		canvasEngine.render("player", player.xCord, player.yCord);
		console.log(player.id, "has joined us");
	});

	socket.on(aPlayerLeft, (game) => {
		canvasEngine.clearScreen();
		game.players.forEach(player => {
			canvasEngine.render("player", player.xCord, player.yCord);
		});
	});

	return canvasEngine;
}

/**
 * @param { Socket } socket
 * @param { { roomID: String, playerName: String } } gameInfo
 */
function join(socket, gameInfo) {
	socket.emit(joinRoom, gameInfo);
}

/**
 * @param { Socket } socket
 * @param { { roomID: String, playerName: String } } gameInfo
 */
function leave(socket, gameInfo) {
	socket.emit(leaveRoom, gameInfo.roomID);
}

function receiveMessage(socket, callBack) {
	socket.on(broadcastMessage, (messageObject) => {
		callBack(messageObject);
	});
}

/**
 * @param { Socket } socket
 * @param { String } message
 */
function sendMessage(socket, message) {
	socket.emit(sendChatMessage, message);
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

/**
 * @param { Socket } socket
 * @param { CanvasEngine } canvasEngine
 */
function receiveUpdate(socket, canvasEngine) {
	socket.on(sendGameData, (game) => {
		canvasEngine.startAnimation(game);
	});
}

export default {
	setupSocketIOClient,
	sendUserInput,
	receiveUpdate,
	join,
	leave,
	sendMessage,
	receiveMessage
};
