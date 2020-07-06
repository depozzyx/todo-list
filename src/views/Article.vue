<template>
	<div class="hatiko row" style = 'padding: 0; width: 100%; margin: 0;'>
		<Bogdan msg="Community Blogs - Blog" style = 'padding: 0;' class = 'col-sm-12' left = 'calc(30% + 10px)'/>
		<div class = 'col-sm-3'>
			<br>
		</div>
		<div class = 'col-sm-6' >
			<div class = 'crocodile-card' >
				<div v-if = '!ArticleError'>
					<h1 class = 'hatiko-text'>{{ArticleArray[0]}}</h1>
					<p class = 'hatiko-love-text'>{{ArticleArray[1]}}</p>
					<br>
					<br>
					<b>{{ArticleArray[4]}} / 5 - {{ArticleArray[5].length}} votes</b>
                    <br>
                    {{ArticleArray[2]}}, {{processDate(ArticleArray[3])}}
				</div>
				<h1 v-else class = 'hatiko-text'>{{ArticleError}}</h1>
			</div>
			<router-link to="/blogs">
				<button class = 'crocodile-emo-button crocodile-emo-button-adj'>Back</button>
			</router-link>
			<br><br><br>
		</div>
		

	<!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
	<!-- <h1>{{this.$route.params.id}}</h1> -->
	
</div>
</template>

<style>
	.hatiko-text{
		font-family: 'Segoe UI';
		font-style: italic;
		font-weight: bolder;
		color: #333;
	}
	.hatiko-love-text{
		color: #333;
		font-size: 150%;
	}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios';
import Bogdan from "@/components/Bogdan.vue";
export default {
    name: "Article",
    components: {
        Bogdan
    },
    data () {
        return {
            ArticleArray: [],
            ArticleError: undefined,
            id: -1,
        }
    },
    created() {
        if (this.$route.params.id){
            // document.cookie = "lastArticle ="+this.$route.params.id+";"
            this.id = this.$route.params.id
            axios.post(`http://localhost:3001/GetArticleById?id=${this.$route.params.id}`, 'lol', {})
            .then(res => { // then print response status
                if (res.data === 'not ok'){
                    this.ArticleError = 'Article not found - 404.'
                }else{
                    this.ArticleArray = res.data
                }
            })
        }else{
            this.ArticleError = 'What exatctly article do you want to visit?'
            this.id = -1
        }
    },
    methods:{
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
		},
		processDate(date){
            date = new Date(date);
            var d = '0'+date.getDate();
            var m = '0'+(date.getMonth()+1);
            var y = date.getYear()%100;
            console.log(y)
            return d.substr(-2) + '/' + m.substr(-2) + '/' + y
        },
    }
};
</script>
