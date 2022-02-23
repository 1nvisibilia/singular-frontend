<script>
export default {
	data() {
		return {
			locationTop: 0,
			locationLeft: 0
		};
	},
	methods: {
		onClick() {
			console.log("emitted");
		}
	},
	mounted() {
		document.addEventListener("keypress", (event) => {
			console.log("event key", event.key);
			if (event.key === "d" || event.key === "D") {
				console.log("V");
				this.locationLeft += 3;
			} else if (event.key === "a" || event.key === "A") {
				this.locationLeft -= 3;
			}
		});
	}
};
</script>

<template>
	<div v-on:keyup.enter="onClick" class="player"></div>
</template>

<style scoped>
.player {
	left: v-bind(locationLeft + "px");
	border-color: black;
	border-width: 2px;
	border-style: solid;
	width: 100px;
	height: 100px;
}
</style>
