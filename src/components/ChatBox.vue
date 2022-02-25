<script>
export default {
	data() {
		return {
			width: 0,
			height: 0
		};
	},
	props: {
		chatBoxSize: Object
	},
	methods: {
		onClick() {
			console.log("emitted");
		}
	},
	mounted() {
		this.width = this.chatBoxSize.width;
		this.height = this.chatBoxSize.height;
	}
};
</script>

<template>
	<div v-on:keyup.enter="onClick" id="chatbox-container"></div>
</template>

<style scoped>
#chatbox-container {
	margin-left: 30px;
	display: inline-block;
	left: 0px;
	border-color: black;
	border-width: 2px;
	border-style: solid;
	width: v-bind(width + "px");
	height: v-bind(height + "px");
}
</style>
