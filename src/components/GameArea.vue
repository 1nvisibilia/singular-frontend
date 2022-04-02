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
		gameInfo: Object,
		socket: Socket
	},
	watch: {
		gameInfo: {
			deep: true,
			handler() {
				const { playerName, roomID } = this.gameInfo;
				if (typeof playerName !== "string" || playerName.trim().length === 0) {
					return;
				}
				if (typeof roomID !== "string" || roomID.length !== 8) {
					return;
				}
				this.initializeGame();
			}
		}
	},
	methods: {
		initializeGame() {
			console.log("id: " + this.gameInfo.roomID);
			console.log("ini");
			// start updating for changes
			this.controller.registerControlInterval();
			// join the room
			SocketClient.join(this.socket, this.gameInfo);
		},
		leaveGame() {
			// stop listening for changes
			this.controller.unregisterControlInterval();
			// leave the room
			SocketClient.leave(this.socket, this.gameInfo);
			// go back to the homepage
			this.$emit("navHome");
		},
		copyPartyCode() {
			navigator.clipboard.writeText(this.gameInfo.roomID);
			this.copyCodeStatus = "Copied!!";
			setTimeout(() => {
				this.copyCodeStatus = "Copy Room Code";
			}, 800);
		}
	},
	mounted() {
		console.log("mount");
		// Adds the canvas size independent of Vue's renderings.
		const canvasElement = document.getElementById("game-canvas");
		canvasElement.width = UIData.gameBoard.width;
		canvasElement.height = UIData.gameBoard.height;

		// setup the game controllers
		this.controller = new Controller(canvasElement);
		this.controller.activeListeners(); // register all the event listener

		// Setup the socket and Canvas rendering engine.
		this.canvasEngine = SocketClient.setupSocketIOClient(this.socket, canvasElement);
		SocketClient.sendUserInput(this.socket, this.controller);
		SocketClient.receiveUpdate(this.socket, this.canvasEngine);
	}
};
</script>

<template>
	<div id="component">
		<nav id="game-nav">
			<label v-on:click="leaveGame">Leave Room</label>
			<span>Room Code: {{ gameInfo.roomID }}</span>
			<label v-on:click="copyPartyCode">{{ copyCodeStatus }}</label>
		</nav>
		<GameBoard></GameBoard>
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
