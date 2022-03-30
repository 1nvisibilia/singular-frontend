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
			borderWidth: 3,
			canvasEngine: undefined,
			controller: undefined
		};
	},
	props: {
		elementID: String,
		roomID: String,
		socket: Object
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

		// Adds the canvas size independent of Vue's renderings.
		const gameCanvas = document.getElementById(this.elementID);
		gameCanvas.width = gameBoard.width;
		gameCanvas.height = gameBoard.height;

		// setup the game controllers
		this.controller = new Controller(gameCanvas);
		this.controller.activeListeners(); // register all the event listener
		this.controller.registerControlInterval(); // start listening for changes

		console.log("asdfasdf  " + this.roomID);
		// Setup the socket and Canvas rendering engine.
		const { socket, canvasEngine } = SocketClient.setupSocketIOClient(this.socket, gameCanvas, this.roomID);
		SocketClient.sendUserInput(socket, this.controller);
		SocketClient.receiveUpdate(socket, canvasEngine);
		this.canvasEngine = canvasEngine;
		// this.socket = socket;

		// Send back the socket to the parent.
		this.$emit("gameBoardInitResponse", socket);
	}
};
</script>

<template>
	<div id="gameboard-container" v-on:keyup.enter="onClick">
		<canvas v-bind:id="elementID" tabindex="0"></canvas>
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
