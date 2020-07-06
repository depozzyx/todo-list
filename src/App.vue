<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
export default {
    name: "App",
    data () {
        return {
            ULogin: 'Account',
        }
	},
	methods: {
		UpdLogin(){
			if (getCookie('login')){
				this.ULogin = '#'+getCookie('login')
			}else{
				this.ULogin = 'ACCOUNT'
			}
		}
	}
		
}
</script>

<style>

	html, body, #app {height:100%;}
	body{
		overflow: hidden;
	}

</style>
