<script>
export default {
	data() {
		return {
			width: 0,
			height: 0
		};
	},
	props: {
		gameBoardSize: Object
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
	<div v-on:keyup.enter="onClick" id="gameboard-container"></div>
</template>

<style scoped>
#gameboard-container {
	margin-right: 30px;
	display: inline-block;
	left: 0px;
	border-color: black;
	border-width: 2px;
	border-style: solid;
	width: v-bind(width + "px");
	height: v-bind(height + "px");
}
</style>
