<script setup>
// Backend API setup
import axios from "axios";
import { io } from "socket.io-client";
import { BackendURL } from "./backend";

// VueJS setup
// import { RouterLink, RouterView } from "vue-router";
import HomePage from "./components/HomePage.vue";
import GameArea from "./components/GameArea.vue";
</script>

<script>
export default {
	components: {
		HomePage,
		GameArea
	},
	data() {
		return {
			displayHomePage: true,
			displayGameArea: false,
			gameInfo: {
				roomID: null,
				playerName: null
			},
			socket: null
		};
	},
	methods: {
		async playGame(playRequest) {
			if (playRequest.playerName.trim().length === 0) {
				alert("you name cannot be empty or consists of only white spaces");
				return;
			}
			if (playRequest.action === "create") {
				// create a room
				const response = await axios.post("/api/game/create", {
					playerName: playRequest.playerName
				});
				this.displayHomePage = false;
				this.displayGameArea = true;
				this.gameInfo.roomID = response.data;
				this.gameInfo.playerName = playRequest.playerName;
			} else if (playRequest.action === "join" && typeof playRequest.room === "string") {
				// Attempt to join a room
				const response = await axios.post("/api/game/join/", {
					playerName: playRequest.playerName,
					roomID: playRequest.room
				});
				const result = response.data;
				// if the room is joinable
				if (result.available === true) {
					this.displayHomePage = false;
					this.displayGameArea = true;
					// make sure to trigger the watcher in Game Area
					if (this.gameInfo.roomID === playRequest.room) {
						this.gameInfo.roomID = "";
					}
					this.gameInfo.roomID = playRequest.room;
					this.gameInfo.playerName = playRequest.playerName;
				} else {
					// change this later
					alert(result.errorMessage);
				}
			}
		},
		navHome() {
			this.displayHomePage = true;
			this.displayGameArea = false;
		}
	},
	created() {
		// Config axios
		axios.defaults.baseURL = BackendURL;

		// Crate the socket connection
		this.socket = io(BackendURL);
	},
	mounted() {}
};
</script>

<template>
	<div id="app">
		<HomePage v-show="displayHomePage" v-on:playGame="playGame"></HomePage>
		<GameArea
			v-show="displayGameArea"
			v-on:navHome="navHome"
			v-bind:socket="socket"
			v-bind:gameInfo="gameInfo"
		></GameArea>
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
