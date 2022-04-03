<script setup>
import { chatBox } from "../UIData.json";
</script>

<script>
export default {
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 0,
			chatMessage: "",
			chatLog: []
		};
	},
	props: {
		messageObject: Object
	},
	watch: {
		messageObject: {
			deep: false,
			handler() {
				this.chatLog.push({ ...this.messageObject });
			}
		}
	},
	methods: {
		sendMessage() {
			// emitter to parent
			this.$emit("sendMessage", this.chatMessage);
			// clear the input box
			this.chatMessage = "";
		}
	},
	mounted() {
		this.width = chatBox.width;
		this.height = chatBox.height;
		this.borderWidth = chatBox.borderWidth;
	}
};
</script>

<template>
	<div id="chatbox-container">
		<div id="flow-chat">
			<div id="message-box" v-for="messageInfo in chatLog">
				<div>{{ messageInfo.senderName }}: {{ messageInfo.message }}</div>
			</div>
		</div>
		<input id="chat-input" v-model="chatMessage" v-on:keyup.enter="sendMessage" />
	</div>
</template>

<style scoped>
#chatbox-container {
	font-family: "Raleway", sans-serif;
	margin: 0 0 0 30px;
	padding: 0;
	border-color: black;
	border-width: v-bind(borderWidth + "px");
	border-style: solid;
	width: v-bind(width + borderWidth * 2 + "px");
	height: v-bind(height + borderWidth * 2 + "px");
}

#flow-chat {
	border: 6px double blueviolet;
	height: 620px;
}

#chat-input {
	font-family: "Raleway", sans-serif;
	font-size: 18px;
	outline: none;
	border: 3px solid rgb(164, 148, 0);
	display: block;
	height: 31px;
	width: 100%;
}
</style>
