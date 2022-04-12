import { Socket } from "socket.io-client";
import CanvasEngine from "../canvas/CanvasEngine.js";

const SocketEventMap = {
	currentGameStatus: "current game status",
	aPlayerJoined: "a user joined",
	aPlayerLeft: "a player left",
	requestInput: "request input",
	sendBackInput: "send back input",
	sendGameData: "send game data",
	joinRoom: "join room",
	leaveRoom: "leave room",
	sendChatMessage: "send chat message",
	broadcastMessage: "broadcast message"
};

/**
 * @param { Socket } socket
 * @param { HTMLElement } canvas
 * @returns { CanvasEngine }
 */
function setupSocketIOClient(socket, canvas) {
	const canvasEngine = new CanvasEngine(canvas);

	socket.on(SocketEventMap.currentGameStatus, (game) => {
		game.players.forEach(player => {
			canvasEngine.render("player", player.xCord, player.yCord);
		});
	});

	socket.on(SocketEventMap.aPlayerJoined, (player) => {
		canvasEngine.render("player", player.xCord, player.yCord);
	});

	socket.on(SocketEventMap.aPlayerLeft, (eventInfoObject) => {
		const game = eventInfoObject.game;
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
	socket.emit(SocketEventMap.joinRoom, gameInfo);
}

/**
 * @param { Socket } socket
 * @param { { roomID: String, playerName: String } } gameInfo
 */
function leave(socket, gameInfo) {
	socket.emit(SocketEventMap.leaveRoom, gameInfo.roomID);
}

function receiveMessage(socket, callBack) {
	socket.on(SocketEventMap.broadcastMessage, (messageObject) => {
		callBack(messageObject);
	});
}

/**
 * @param { Socket } socket
 * @param { String } message
 */
function sendMessage(socket, message) {
	socket.emit(SocketEventMap.sendChatMessage, message);
}

function sendUserInput(socket, controller) {
	socket.on(SocketEventMap.requestInput, () => {
		if (controller.inputChanged === true) {
			controller.inputChanged = false;
			socket.emit(SocketEventMap.sendBackInput, controller.inputState);
		} else {
			socket.emit(SocketEventMap.sendBackInput, null);
		}
	});
}

/**
 * @param { Socket } socket
 * @param { CanvasEngine } canvasEngine
 * @param { Function } callBack
 */
function receiveUpdate(socket, canvasEngine, callBack) {
	socket.on(SocketEventMap.sendGameData, (game) => {
		canvasEngine.startAnimation(game);
		callBack(game);
	});
}

export default {
	SocketEventMap,
	setupSocketIOClient,
	sendUserInput,
	receiveUpdate,
	join,
	leave,
	sendMessage,
	receiveMessage
};
