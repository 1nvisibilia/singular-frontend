<script setup></script>

<script>
export default {
	props: {
		socket: Object
	}
};
</script>

<template>
	<div>Singular</div>
	<section>
		<input type="text" placeholder="Enter Your Name Here..." />
		<button type="button">Create A New Room</button>
		<button type="button">Join A Room</button>
	</section>
</template>

<style scoped></style>
