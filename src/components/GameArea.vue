<script setup>
import { Socket } from "socket.io-client";
import GameBoard from "./GameBoard.vue";
import ChatBox from "./ChatBox.vue";
import { Controller } from "../controller/Controller";
import SocketClient from "../socket/socket-client.js";
import UIData from "../UIData.json";
</script>

<script>
export default {
	data() {
		return {
			copyCodeStatus: "Copy Room Code",
			canvasEngine: null,
			controller: null
		};
	},
	components: {
		ChatBox,
		GameBoard
	},
	props: {
		roomID: String,
		socket: Socket
	},
	methods: {
		leaveGame() {
			SocketClient.leave(this.socket, this.roomID);
			this.$emit("navHome");
		},
		copyPartyCode() {
			navigator.clipboard.writeText(this.roomID);
			this.copyCodeStatus = "Copied!!";
			setTimeout(() => {
				this.copyCodeStatus = "Copy Room Code";
			}, 800);
		}
	},
	mounted() {
		console.log(this.roomID);

		// Adds the canvas size independent of Vue's renderings.
		const gameCanvas = document.getElementById("game-canvas");
		gameCanvas.width = UIData.gameBoard.width;
		gameCanvas.height = UIData.gameBoard.height;

		// setup the game controllers
		this.controller = new Controller(gameCanvas);
		this.controller.activeListeners(); // register all the event listener
		this.controller.registerControlInterval(); // start listening for changes

		console.log("ID :" + this.roomID);
		// Setup the socket and Canvas rendering engine.
		const canvasEngine = SocketClient.setupSocketIOClient(this.socket, gameCanvas);
		SocketClient.join(this.socket, this.roomID);
		SocketClient.sendUserInput(this.socket, this.controller);
		SocketClient.receiveUpdate(this.socket, canvasEngine);

		this.canvasEngine = canvasEngine;
	}
};
</script>

<template>
	<div id="component">
		<nav id="game-nav">
			<label v-on:click="leaveGame">Leave Room</label>
			<span>Room Code: {{ roomID }}</span>
			<label v-on:click="copyPartyCode">{{ copyCodeStatus }}</label>
		</nav>
		<GameBoard v-bind:socket="socket" v-bind:roomID="roomID"></GameBoard>
		<ChatBox></ChatBox>
	</div>
</template>

<style scoped>
#component {
	font-family: "Raleway", sans-serif;
	margin: 0;
	padding: 0;
}

#game-nav {
	font-size: 16px;
	margin: 7px auto 23px;
	width: 90%;
	display: flex;
	justify-content: space-around;
}

#game-nav label,
#game-nav span {
	width: 200px;
}

#game-nav label {
	border: 3px solid rgb(255, 0, 255);
	width: 200px;
	cursor: pointer;
}
</style>
