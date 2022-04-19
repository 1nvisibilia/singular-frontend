<script setup></script>

<script>
export default {
	data() {
		return {};
	},
	props: {
		playerStatus: Array
	}
};
</script>

<template>
	<div id="status-container">
		<div v-for="singleStatus in playerStatus" v-bind:key="singleStatus.name">
			<span class="status-name" v-bind:style="{ color: singleStatus.color }">
				{{ singleStatus.name }}
			</span>
			<span class="status-health">
				<div
					class="health-bar"
					v-bind:style="{
						width: `${singleStatus.health}%`,
						backgroundColor: singleStatus.color
					}"
				></div>
			</span>
		</div>
	</div>
</template>

<style scoped>
#status-container {
	margin: 10px;
	padding: 0;
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	top: 0;
}

.status-name {
	display: inline-block;
	width: 70px;
	margin-right: 5px;
}

.status-health {
	overflow: hidden;
	vertical-align: middle;
	height: 14px;
	border: 2px solid rgb(0, 121, 86);
	border-radius: 9px;
	display: inline-block;
	width: 140px;
	margin-left: 5px;
}

.health-bar {
	height: inherit;
	background-color: rgb(0, 255, 183);
}
</style>
