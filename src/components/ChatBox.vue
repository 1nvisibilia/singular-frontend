<script setup>
import { chatBox } from "../UIData.json";
</script>

<script>
export default {
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 0
		};
	},
	mounted() {
		this.width = chatBox.width;
		this.height = chatBox.height;
		this.borderWidth = chatBox.borderWidth;
	}
};
</script>

<template>
	<div id="chatbox-container" v-on:keyup.enter="onClick"></div>
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
