<script setup>
import GameStatus from "./GameStatus.vue";
import { gameBoard } from "../UIData.json";
</script>

<script>
export default {
	components: {
		GameStatus
	},
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 0
		};
	},
	props: {
		playerStatus: Array
	},
	mounted() {
		// Add the canvas size attribute.
		this.width = gameBoard.width;
		this.height = gameBoard.height;
		this.borderWidth = gameBoard.borderWidth;
	}
};
</script>

<template>
	<div id="gameboard-container">
		<GameStatus v-bind:playerStatus="playerStatus"></GameStatus>
		<canvas id="game-canvas" tabindex="0"></canvas>
	</div>
</template>

<style scoped>
#gameboard-container {
	margin: 0 30px 0 0;
	padding: 0;
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
