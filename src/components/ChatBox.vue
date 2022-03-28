<script setup>
import { chatBox } from "../UIData.json";
</script>

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
		chatBoxSize: Object,
		elementID: String
	},
	methods: {
		onClick() {
			console.log("emitted");
		}
	},
	mounted() {
		this.width = chatBox.width;
		this.height = chatBox.height;
	}
};
</script>

<template>
	<div v-bind:id="elementID" v-on:keyup.enter="onClick"></div>
</template>

<style scoped>
#chatbox-container {
	margin-left: 30px;
	display: inline-block;
	left: 0px;
	border-color: black;
	border-width: v-bind(borderWidth + "px");
	border-style: solid;
	width: v-bind(width + borderWidth + "px");
	height: v-bind(height + borderWidth + "px");
}
</style>
