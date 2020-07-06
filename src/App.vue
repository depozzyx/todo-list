<template>
	<div id="app">
		<div class = ' navy-wrap'>
			<div class = 'navy-sub'>
				
			</div>
			<div class = 'd-flex justify-content-center navy-center'>
				<router-link to="/">
					<button @click='UpdLogin()'>
						Home
					</button>
				</router-link>

				<router-link to="/blogs"><button>Blogs</button></router-link>

				<router-link to="/">
					<button @click='UpdLogin()' style = 'padding-top: 2px;padding-bottom: 5px;'>
						<h3 class = 'robert-text' style = 'color: #fff'>
							Dango
						</h3>
					</button>
				</router-link>

				<router-link to="/error-test"><button @click='UpdLogin()'>Home</button></router-link>
				<router-link to="/account"><button @click='UpdLogin()'>Account</button></router-link>
			</div>
			<div class = 'd-flex justify-content-center navy-sub'>
				<router-link to="/account"><button @click='UpdLogin()'>{{ULogin}}</button></router-link>
			</div>
		</div>
		<!-- <transition name="fade"> -->
			<router-view />
		<!-- </transition>	 -->
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
	created() {
        if (getCookie('login')){
            this.ULogin = '#'+getCookie('login')
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
	@import url('https://fonts.googleapis.com/css2?family=Montserrat');

	/* Uni - elements */
	button{
		padding: 7px;
		padding-left: 15px;
		padding-right: 15px;
		margin: 5px !important;
		
		background: #fff;
		font-size: 120% !important;
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		color: #f77062;
		border: none;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
		border-radius: 100px !important;
		transition: 0.5s;
	}	
	button:hover{
		background: #f77062;
		box-shadow: 2px 2px 10px #f77062;
		color: #fff;
	}
	button:focus{
		outline: none !important;
	}

	input{
		padding: 7px;
		padding-left: 15px;
		padding-right: 15px;
		margin: 5px !important;
		
		background: #fff;
		font-size: 120% !important;
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		color: #f77062;
		border: 0px #f77062 solid;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
		border-radius: 100px !important;
		transition: 0.5s;
	}
	input:focus{
		outline: none !important;
		box-shadow: 2px 2px 10px #f77062, inset 0px 0px 0px 3px #f77062;
		/* box-shadow: inset 0px 0px 0px 2px #f77062; */
		/* border: 3px #f77062 solid; */
	}

	/* Uni - classes */
	.robert-text{
		margin: 10px !important;
		text-transform: uppercase;
		/* font-family: sans-serif; */
		font-weight: 900;
		font-style: italic;
		font-weight: bolder;
		color: #f77062;
		padding-left: 5px;
		/* border-left: 3px solid #f77062; */
	
	}

	.crocodile-card{
		box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
		margin: 10px;
		transition: 0.5s;
		padding: 15px;
		color: #333;
	}
	.crocodile-card-half{
		width: 50%;
	}
	.crocodile-card:hover{
		box-shadow: 2px 2px 10px #f77062, inset 0px 0px 0px 3px #f77062;
	}
	a:hover {
		text-decoration: none !important;
	}
	.crocodile-card b{
		background: #f77062;
		color: #fff;
		padding-left: 10px;
		padding-right: 10px;
		box-shadow: 2px 2px 10px #f77062;
		border-radius: 0px;
	}
	.crocodile-emo-button{
		background: #f77062;
		margin: 0px;
		width: 33.33333%;
		float: left;
		color: #fff;
		transition: 0.5s;
		border-radius: 0 !important;
		margin: 0px !important;
		box-shadow: none !important;
	}
	.crocodile-emo-button:hover{
		box-shadow: 1px 1px 5px rgba(0,0,0,1)
	}
	.crocodile-emo-button-adj{
		margin-left: 10px !important;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.2) !important;
	}
	.crocodile-emo-button-adj:hover{
		box-shadow: 2px 2px 10px #f77062 !important;
	}
	

	.kitten-window{
		position: absolute;
		width: 20% !important;
		height: 30% !important;
		top: 10%;
		left: 40%;

		font-size: 120% !important;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
		font-weight: 900 !important;
		background: #fff;
		border-radius: 20px;
		color: #f77062;
		box-shadow: 2px 2px 10px #f77062, inset 0px 0px 0px 3px #f77062;
		align-items: center;
		text-align: center;
	}
	.kitten-wrapper{
		position: absolute;
		margin: 0px;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		padding: 0px;
		background: #fff;
	}
	.kitten-button{
		width: 50%;
	}

	.abraham-wup{
		width: 25%;
		padding: 3%;
		padding-right: calc(3% + 10px);
		background: #fff;
		box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
		height: 100%;
		/* height: 1000px; */
	}
	.abraham-wbot{
		z-index: 10;
		background-image: url('assets/bg.jpg');
		height: 100%;
	}

	.wrap-wisconsin-30{
		width: 40%;
		margin-left: 30%;
	}

	/* Navy */

	.navy-wrap{
		height: 5%;
		z-index: 100;
		background-color: #f77062;
		box-shadow: 0px 0px 0px #f77062;
		transition: 0.5s;
		padding-top: 0;
		overflow: hidden
	}
	.navy-wrap:hover{
		box-shadow: 2px 2px 10px #f77062;
		z-index: 10000;
	}
	.navy-center{
		width: 80%;
		float: left;
	}
	.navy-sub{
		width: 10%;
		float: left;
		height: 80%;
	}
	.navy-wrap button{
		margin-top: 0px;
		padding: 6px;

		text-transform: uppercase;
		font-weight: 900;
		/* text-decoration: underline;	 */
		background: none;
		color: #fff !important;
		box-shadow: none;
		font-weight: bolder;
		color: #f77062;
		border-radius: 0px !important;
	}
	.navy-wrap h3{
		margin: 0px !important;
		padding-left: 0px;
	}
	.navy-wrap h3:hover{
		/* border-bottom: 3px solid #fff; */

	}
	.navy-wrap button:hover{
		border-bottom: 3px solid #fff;
	}

	/* Other */

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}

	html, body, #app {height:100%;}
	

</style>
