<template>
	<div class="app-container">
		{{message}}
	</div>
</template>
<script>
	export default {
		data() {
			return {
				message : "APP VUE"
			}
		}
	}
</script>
<style scoped>
	.app-container {
		background: url("./assets/images/doge.jpg");
		font-size: 50px;
		font-family: Impact;
		color: white;
		text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>