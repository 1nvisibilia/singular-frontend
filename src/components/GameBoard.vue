<script setup>
import { Socket } from "socket.io-client";
import { Controller } from "../controller/Controller";
import SocketClient from "../socket/socket-client.js";
import { gameBoard } from "../UIData.json";
</script>

<script>
export default {
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 0,
			canvasEngine: null,
			controller: null
		};
	},
	props: {
		roomID: String,
		socket: Socket
	},
	methods: {
		onClick() {
			console.log("emitted");
		}
	},
	mounted() {
		// Add the canvas size attribute.
		this.width = gameBoard.width;
		this.height = gameBoard.height;
		this.borderWidth = gameBoard.borderWidth;

		// Adds the canvas size independent of Vue's renderings.
		const gameCanvas = document.getElementById("game-canvas");
		gameCanvas.width = gameBoard.width;
		gameCanvas.height = gameBoard.height;

		// setup the game controllers
		this.controller = new Controller(gameCanvas);
		this.controller.activeListeners(); // register all the event listener
		this.controller.registerControlInterval(); // start listening for changes

		console.log("asdfasdf  " + this.roomID);
		// Setup the socket and Canvas rendering engine.
		const { socket, canvasEngine } = SocketClient.setupSocketIOClient(
			this.socket,
			gameCanvas,
			this.roomID
		);
		SocketClient.sendUserInput(socket, this.controller);
		SocketClient.receiveUpdate(socket, canvasEngine);
		this.canvasEngine = canvasEngine;
	}
};
</script>

<template>
	<div id="gameboard-container" v-on:keyup.enter="onClick">
		<canvas id="game-canvas" tabindex="0"></canvas>
	</div>
</template>

<style scoped>
#gameboard-container {
	margin: 0 30px 0 0;
	padding: 0;
	display: inline-block;
	left: 0px;
	border-color: black;
	border-width: v-bind(borderWidth + "px");
	border-style: solid;
	width: v-bind(width + borderWidth * 2 + "px");
	height: v-bind(height + borderWidth * 2 + "px");
}

/* this is still hardcoded */
#game-canvas {
	outline: none;
	padding: 0;
}
</style>
