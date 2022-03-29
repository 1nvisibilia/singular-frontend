<script setup></script>

<script>
export default {
	props: {
		socket: Object
	},
	data() {
		return {
			playerName: "",
			roomCode: ""
		};
	},
	methods: {
		createRoom() {
			this.$emit("playGame", {
				action: "create",
				room: undefined
			});
		},
		joinRoom(roomCode) {
			this.$emit("playGame", {
				action: "join",
				room: roomCode
			});
		}
	}
};
</script>

<template>
	<div id="component">
		<div id="title">Singular</div>
		<section>
			<input
				id="inputName"
				v-model="playerName"
				type="text"
				placeholder="Enter Your Name Here..."
			/>
			<span>
				Hey<span id="displayName"> {{ playerName === "" ? "" : " " + playerName }} </span>.
				Welcome to Singular!
			</span>
			<label v-on:click="createRoom">Create A New Room</label>
			<label v-on:click="joinRoom(roomCode)">Join A Room</label>
			<input
				id="inputParty"
				v-model="roomCode"
				type="text"
				placeholder="Enter Your Party Code"
			/>
		</section>
	</div>
</template>

<style scoped>
#component {
	font-family: "Raleway", sans-serif;
	margin: auto;
	z-index: 2;
	width: 600px;
	height: 400px;
	border: 15px double rgb(66, 189, 247);
	border-radius: 20px;
}

input {
	font-family: "Raleway", sans-serif;
	outline: none;
	text-align: center;
}

#title {
	margin: 20px auto;
	font-size: 40px;
}

#inputName {
	border-style: none none solid none;
	border-image: linear-gradient(to right, rgb(255, 0, 0), rgb(153, 0, 255)) 50;
	border-width: 5px;
	font-size: 25px;
	margin: auto;
	width: 300px;
	margin-bottom: 15px;
}

#inputParty {
	font-size: 16px;
	margin: auto;
	height: 30px;
	width: 250px;
	border-style: none solid solid solid;
}

section {
	display: flex;
	flex-direction: column;
}

section span {
	font-style: italic;
}

section span #displayName {
	color: rgb(255, 42, 77);
}

label {
	font-size: 16px;
	padding: 0 40px;
	border: 2px solid rgb(208, 0, 255);
	cursor: pointer;
	margin: 30px auto 0;
	width: 250px;
}
</style>
