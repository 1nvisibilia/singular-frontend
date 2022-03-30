<script setup>
// Backend API setup
import axios from "axios";
import { BackendURL } from "./backend";

// VueJS setup
// import { RouterLink, RouterView } from "vue-router";
import GameBoard from "./components/GameBoard.vue";
import ChatBox from "./components/ChatBox.vue";
import HomePage from "./components/HomePage.vue";
import UIData from "./UIData.json";
</script>

<script>
export default {
	components: {
		GameBoard,
		ChatBox,
		HomePage
	},
	data() {
		return {
			displayHomePage: true,
			constructGameBoard: false,
			constructCharBox: false,
			socket: undefined
		};
	},
	methods: {
		gameBoardInitResponse(socket) {
			// probably no need for this later on.
			this.socket = socket;

			// Set up The Game Canvas
			const gameCanvas = document.getElementById(this.gameCanvasID);
			// Set up the Canvas size, independent from Vue's rendering.
			gameCanvas.width = UIData.gameBoard.width;
			gameCanvas.height = UIData.gameBoard.height;
		},
		playGame(response) {
			console.log(response);
			if (response.action === "create") {
				// create a room
				axios(BackendURL + "/api/game/create", { method: "POST" }).then((data) => {
					console.log(data);
					// 	return data.text();
					// })
					// .then((response) => {
					// 	console.log(response);
				});
			} else if (response.action === "join" && response.room !== undefined) {
				// join a room
			}
		}
	},
	props: {
		gameCanvasID: String,
		chatBoxContainerID: String
	},
	mounted() {
		// const chatBox = document.getElementById(appData.chatBoxContainerID); //////////////////////////
	}
};
</script>

<template>
	<div id="app">
		<HomePage v-if="displayHomePage" v-on:playGame="playGame"></HomePage>
		<GameBoard
			v-if="constructGameBoard"
			v-bind:elementID="gameCanvasID"
			v-on:gameBoardInitResponse="gameBoardInitResponse"
		></GameBoard>
		<ChatBox v-if="constructCharBox" v-bind:elementID="chatBoxContainerID"></ChatBox>
	</div>
</template>

<style>
@import "./assets/base.css";

#app-wrapper {
	display: table;
	position: absolute;
	margin: 0 auto;
	height: 100%;
	width: 100%;
	font-weight: normal;
}

#app {
	margin: 0;
	text-align: center;
	display: table-cell;
	vertical-align: middle;
	white-space: nowrap;
}

header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

a,
.green {
	text-decoration: none;
	color: hsla(160, 100%, 37%, 1);
	transition: 0.4s;
}

@media (hover: hover) {
	a:hover {
		background-color: hsla(160, 100%, 37%, 0.2);
	}
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

/* @media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
