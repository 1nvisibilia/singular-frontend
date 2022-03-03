<script>
export default {
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 3
		};
	},
	props: {
		gameBoardSize: Object,
		elementID: String
	},
	methods: {
		onClick() {
			console.log("emitted");
		}
	},
	mounted() {
		this.width = this.gameBoardSize.width;
		this.height = this.gameBoardSize.height;
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
	width: v-bind(width + borderWidth + "px");
	height: v-bind(height + borderWidth + "px");
}

/* this is still hardcoded */
#game-canvas {
	outline: none;
	padding: 0;
}
</style>
