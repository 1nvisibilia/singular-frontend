<script setup>
import { Socket } from "socket.io-client";
import SocketClient from "../socket/socket-client";
import { chatBox } from "../UIData.json";
</script>

<script>
export default {
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 0,
			nextChatID: 0,
			chatMessage: "",
			chatLog: [],
			SocketEventMap: SocketClient.SocketEventMap,
			systemSender: `<i style="color: ${chatBox.systemColor}; font-weight: 600;">System</i>`
		};
	},
	props: {
		socket: Socket,
		roomID: String
	},
	methods: {
		updateMessageBox(event) {
			this.chatMessage = event.target.value;
		},
		sendMessage() {
			if (this.chatMessage.trim().length > 0) {
				SocketClient.sendMessage(this.socket, this.chatMessage);
			}
			// clear the input box
			this.chatMessage = "";
		},
		registerSystemMessage() {
			this.socket.on(this.SocketEventMap.currentGameStatus, (/* game */) => {
				this.updateChat({
					senderName: this.systemSender,
					message: `You have joined the room <i>${this.roomID}</i>`
				});
			});

			this.socket.on(this.SocketEventMap.aPlayerJoined, (player) => {
				this.updateChat({
					senderName: this.systemSender,
					message: `<span style="color: ${player.color}; font-weight: 600;">${player.name}</span> has joined the room.`
				});
			});

			this.socket.on(this.SocketEventMap.aPlayerLeft, (eventInfoObject) => {
				const { name, color } = eventInfoObject.leftPlayerInfo;
				this.updateChat({
					senderName: this.systemSender,
					message: `<span style="color: ${color}; font-weight: 600;">${name}</span> has left the room.`
				});
			});

			this.socket.on(this.SocketEventMap.playersKilled, (killedPlayerQueue) => {
				killedPlayerQueue.forEach((player) => {
					this.updateChat({
						senderName: this.systemSender,
						message: `<span style="color: ${player.color}; font-weight: 600;">${player.name}</span> has been destroyed.`
					});
				});
			});
		},
		updateChat(messageObject) {
			this.chatLog.push({
				...messageObject,
				id: this.nextChatID
			});
			++this.nextChatID;
		}
	},
	mounted() {
		this.width = chatBox.width;
		this.height = chatBox.height;
		this.borderWidth = chatBox.borderWidth;

		this.registerSystemMessage();
		SocketClient.receiveMessage(this.socket, (messageObject) => {
			this.updateChat(messageObject);
		});
	}
};
</script>

<template>
	<div id="chatbox-container">
		<div id="flow-chat">
			<div class="message-box" v-for="messageInfo in chatLog" v-bind:key="messageInfo.id">
				<span
					class="sender"
					v-bind:style="{ color: messageInfo.senderColor }"
					v-html="messageInfo.senderName + ' :'"
				></span>
				<span class="message-content" v-html="messageInfo.message"></span>
			</div>
		</div>
		<input
			id="chat-input"
			v-bind:value="chatMessage"
			v-on:input="updateMessageBox"
			v-on:keyup.enter="sendMessage"
			placeholder="Press ENTER to send..."
		/>
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
	overflow-x: hidden;
	overflow-y: scroll;
	border: 6px double blueviolet;
	display: flex;
	flex-direction: column;
	height: 620px;
}

#flow-chat > :first-child {
	margin-top: auto;
}

#chat-input {
	font-family: "Raleway", sans-serif;
	font-size: 18px;
	outline: none;
	border: 3px solid rgb(233, 210, 0);
	display: block;
	height: 30px;
	width: 100%;
}

.message-box {
	margin-left: 6px;
	text-align: left;
}

.sender {
	font-weight: 600;
	margin: 0 6px 0 0;
	padding: 0 2px 0 0;
}

.message-content {
	word-wrap: break-word;
	white-space: normal;
}

/* width */
::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
