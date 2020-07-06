<template>
	<div class="bogdan">
		<div class = 'bogdan-wrap'>
			<div class = 'bogdan-text' :style="{ marginLeft: left }">
				<h3>{{msg}}</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		props: {
			msg: String,
			left: {
				type: String,
				required: true,
				default: '10%'
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.bogdan-wrap{
		height: 200px;
		width: 100%;
		background: url('../assets/bg.jpg');
		background-position: center;
		background-attachment:fixed;
		display : flex;
		align-items : center;	
	}
	.bogdan-text{
		display: table-cell;
    	vertical-align: middle;
		color: #fff;
		background-color: #f77062;
		margin-left: 10%;
		transition: 0.5s;
	}
	.bogdan-text:hover{
		box-shadow: 2px 2px 10px #f77062;
	}
	.bogdan-text h3{
		margin: 20px;
		margin-left: 50px;
		margin-right: 50px;
		font-size: 200%;
		font-style: italic;
		font-weight: bolder;
	}
</style>
