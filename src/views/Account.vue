<template>
	<div class="about" style = 'height: 95%;'>
		<div v-if = 'Window === 2' style="overflow: auto;" class="wrapper-data">
			<Bogdan msg="Account" left='calc(30% + 10px)' />

			<div class = 'wrap-wisconsin-30'>
				<div class = 'crocodile-card '>
					<h1>{{UName}} <b>{{URate}}<i class="fas fa-long-arrow-alt-up"></i></b></h1>
					<h3>#{{ULogin}}</h3>
					<br />
					<h3>Creation date: {{processDate(UDate)}}</h3>
					<h3>Accound ID: {{UId}}</h3>
					<button @click="ExitAccount()">Exit</button>
				</div>
			</div><br>
		</div>

    <div v-if = 'Window === 1' class="abraham-wbot">
        <div class='d-flex justify-content-center flex-column abraham-wup'>
            <h3 class = 'robert-text'>Registration</h3>
            <input style='width: 100%;' class="p-2" type="username" v-model="TempRName" name="" placeholder="Name" value="">
            <input style='width: 100%;' class="p-2" type="login" v-model="TempRLogin" name="" placeholder="Login" value="">
            <input style='width: 100%;' class="p-2" type="password" v-model="TempRPassword" name="" placeholder="Password" value="">
            <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center' key = 'sk2'>
                <button style = 'width: 50%;' class="p-2" @click='CheckRegister()' type="button" name="button3">Register <i class="fas fa-clipboard-check"></i></button>
                <button style = 'width: 50%;' @click='Window = 0' type="back" name="button4">Back <i class="fas fa-redo"></i></button>
            </div>
        </div>
        <!-- <button style='opacity: 0;'>0</button> -->
        <!-- <h1 style='opacity: 0;'>1</h1> -->
    </div>

    <div v-if = 'Window === 0' class="abraham-wbot" >
        <div class='d-flex justify-content-center flex-column abraham-wup'>
            <h3 class = 'robert-text'>Account login</h3>
            <input style='width: 100%;' class="p-2" type="login" v-model="TempLogin" name="" placeholder="Login" value="">
            <input style='width: 100%;' class="p-2" type="password" v-model="TempPassword" name="" placeholder="Password" value="">
            <div style = 'margin-top: 10px; margin-left: 5px; width: 100%;' class = 'd-flex justify-content-center' key = 'sk1'>
                <button style = 'width: 50%;' @click='CheckLogin()' type="button" name="button1">Login <i class="fas fa-clipboard-check"></i></button>
                <button style = 'width: 50%;' @click='Window = 1' type="button" name="button2">Register <b class="fas fa-door-open"></b></button>
            </div>
        </div>
        <!-- <button style='opacity: 0;'>0</button> -->
        <!-- <h1 style='opacity: 0;'>1</h1> -->
    </div>

    <div v-if = 'Window === -1' class="abraham-wbot">
        <div class='d-flex justify-content-center flex-column abraham-wup'>
            <h3 class = 'robert-text'>{{WinText}}</h3>
            <button @click = "ExitAccount(WinButAction)">{{WinButText}}</button>
        </div>
    </div>
  </div>
</template>


<style>
    /* @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'); */

	
</style>

<script>
// @ is an alias to /src
// import ArticleComponent from "@/components/ArticleComponent.vue";
import axios from 'axios';
import Bogdan from "@/components/Bogdan.vue";

export default {
    name: "News",
    components: {
        Bogdan
    },
    data () {
        return {
            ULogin: '[LOGIN]',
            UName: 'depozzyx',
            UDate: '[DATE]',
            URate: '8',
            UId: '[ID]',

            TempPassword: '',
            TempLogin: '',
            TempRName: '',
            TempRPassword: '',
            TempRLogin: '',

            Window: 0,
            WinText: 'Processing...',
            WinButText: 'Back',
            WinButAction: 0,

            AddField: false,
            ArticleName: undefined,
            ArticleDesc: undefined,
            ArticleAuthor: undefined,
            ArticleDate: undefined,
            ArticleBug: 3,
            ArticleArray: [],
        }
    },
    created() {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        if (getCookie('login')){
            this.ULogin = getCookie('login')
            this.UName = getCookie('name')
            this.UDate = getCookie('date')
            this.URate = getCookie('rate')
            this.UId = getCookie('id')
            this.Window = 2
            // alert('logged!')
        }else{
            this.Window = 0
        }
    },
    methods: {
        CheckRegister(){
            this.Window = -1
            this.WinText = 'Processing...'
            this.WinButText = 'Stop'
            this.WinButAction = 1
            let url = `http://localhost:3001/NewUser?name=${this.TempRName}&login=${this.TempRLogin}&password=${this.TempRPassword}`
            axios.post(url, 'lol', {})
            .then(res => { // then print response status
                // this.ArticleArray = res.data
                console.log(res.data)
                if (res.data === 'ok'){
                    this.WinText = 'Successfull registration!'
                    this.WinButText = 'Login'
                    this.WinButAction = 0
                }else if (res.data === 'found'){
                    this.WinText = 'Account already exists'
                    this.WinButText = 'Try again'
                    this.WinButAction = 1
                }else{
                    this.WinText = 'Unhandled exception'
                    this.WinButText = 'Try again'
                    this.WinButAction = 1
                }
            })
        },
        CheckLogin(){
            this.Window = -1
            this.WinText = 'Processing...'
            this.WinButText = 'Stop'
            this.WinButAction = 0
            let url = `http://localhost:3001/CompareUser?login=${this.TempLogin}&password=${this.TempPassword}`
            axios.post(url, 'lol', {})
            .then(res => { // then print response status
                // this.ArticleArray = res.data
                console.log(res.data)
                if (res.data === 'not ok'){
                    this.WinText = 'Account not found'
                    this.WinButText = 'Try again'
                    this.WinButAction = 0
                }else if(res.data === 'found'){
                    this.WinText = 'Incorrect login details'
                    this.WinButText = 'Try again'
                    this.WinButAction = 0
                }else{
                    this.Window = 2
                    this.ULogin = this.TempLogin
                    this.UName = res.data[0]
                    this.UDate = res.data[1]
                    this.URate = res.data[2]
                    this.UId = res.data[3]

                    let date = new Date(Date.now() + 86400e3);
    				date = date.toUTCString();

                    document.cookie = "login="+this.TempLogin+"; expires="+date;
    		  		document.cookie = "name="+res.data[0]+"; expires="+date;
                    document.cookie = "date="+res.data[1]+"; expires="+date;
                    document.cookie = "rate="+res.data[2]+"; expires="+date;
                    document.cookie = "id="+res.data[3]+"; expires="+date;

                    this.$parent.UpdLogin();
                }
            })
        },
        ExitAccount(ToWindow = 0){
            document.cookie = "login=";
            document.cookie = "name=";
            document.cookie = "date=";
            document.cookie = "rate=;";
            document.cookie = "id=;";
            this.TempPassword = '',
            this.TempLogin = '',
            this.TempRName = '',
            this.TempRPassword = '',
            this.TempRLogin = '',
            this.Window = ToWindow

            this.$parent.UpdLogin();
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        processDate(date){
            date = new Date(parseInt(date));
            var d = '0'+date.getDate();
            var m = '0'+(date.getMonth()+1);
            var y = date.getYear()%100;
            console.log(y)
            return d.substr(-2) + '/' + m.substr(-2) + '/' + y
        }
   }
};
</script>

