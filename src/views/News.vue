<template>
	<div class="about">
		<Bogdan msg="Community Blogs" left = 'calc(30% + 10px)'/>
		
		<div class="row" style = 'padding: 0; width: 100%'>
			<div class = 'col-sm-3'>
				<br>
			</div>
			<div class = 'col-sm-6' >

				<transition-group name="list" tag="div">
					<router-link :to="{ name: 'Article', params: { id: article[5]}}"
								v-for='(article, index) in ArticleArray.slice().reverse()'
								:key = 'Date.now() * index'>
						<ArticleComponent :title = 'article[0]'
										:desc = 'article[1]'
										:author = 'article[2]'
										:date = 'article[3]'
										:rate = 'article[4]'
										class="list-item"/>
					</router-link>
				</transition-group>
			</div>
			<div class = 'col-sm-3' style = 'padding-left: 0'>
				<div class = 'crocodile-card crocodile-card-half'  style = 'float: left; position: sticky; padding: 0'>
                    <button key = 'pepega0'
                            @click='AddField = !AddField; HelpField = false; OlegUpdate = 0' 
                            class="crocodile-emo-button" 
                            :style = "[AddField ? {borderBottom: '5px solid #f77062'} : {borderBottom: '0px solid #f77062'}]">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button key = 'pepega1'
                            @click='UpdButton()' 
                            class="crocodile-emo-button" 
                            :style = "[OlegUpdate ? {borderBottom: '5px solid #f77062'} : {borderBottom: '0px solid #f77062'}]">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button @click='HelpField = !HelpField; AddField = false; OlegUpdate = 0;' 
                            class="crocodile-emo-button"
                            key = 'pepega3'
                            :style = "[HelpField ? {borderBottom: '5px solid #f77062'} : {borderBottom: '0px solid #f77062'}]" >
                        <i class="fas fa-comment"></i>
                    </button>
					<!-- <div style = 'width: 100%'>
						<h1 style = 'float: left;'>Want to add one?</h1>
						<button style='float: right;'>dismiss.</button>
						<button v-show = '!AddField' @click='AddField = !AddField' class = 'button--sacnite' style='float: right;'>yes!</button>
						<button v-show = 'AddField' @click='AddField = !AddField' style='float: right;'>well, no.</button>
					</div> -->
					<div style = 'padding: 5px;'>
						<div v-if="AddField">
							<div v-if="TimCook" class = 'd-flex flex-column justify-content-center' style = 'width: 100%; margin-top: 50px;'>
								<input style = 'resize:both' type="text" v-model="ArticleName" name="" placeholder="Blog title" value="">
								<input size="1" style = 'resize:both' type="text" v-model="ArticleDesc" name="" placeholder="Error Title" value="">
								<button @click='ProcessArticle()' type="button" name="button">Add</button>
							</div>
							<div v-if="!TimCook" class = 'd-flex flex-column justify-content-center' style = 'width: 100%; margin-top: 50px;'>
								<p>You are not logged in. Would you like to?</p>
								<router-link to="/account"><button type="button" name="button">Go to login!</button></router-link>
							</div>
						</div>

						<div v-else-if="HelpField">
							<h3 class = 'robert-text'>Need help?</h3>
							<button>Yes</button>
						</div>
						<div v-else-if="OlegUpdate === 1">
							<h3 class = 'robert-text'>Fetching...</h3>
						</div>
						<div v-else-if="OlegUpdate === 2">
							<h3 class = 'robert-text'>Updated</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import ArticleComponent from "@/components/ArticleComponent.vue";
import Bogdan from "@/components/Bogdan.vue";
import axios from 'axios';

export default {
    name: "News",
    components: {
        ArticleComponent,
        Bogdan
    },
    data () {
        return {
            AddField: false,
            TimCook: false,
            OlegUpdate: false,
            HelpField: false,

            ArticleName: undefined,
            ArticleDesc: undefined,
            ArticleAuthor: undefined,
            ArticleAuthorLogin: undefined,
            ArticleDate: undefined,
            ArticleBug: 3,
            ArticleArray: [],
        }
    },
    beforeCreate() {
        axios.post('http://localhost:3001/GetArticle', 'lol', {})
        .then(res => { // then print response status
            this.ArticleArray = res.data
        })
    },
    created(){
        this.ArticleAuthor = this.getCookie('name')
        this.ArticleAuthorLogin = this.getCookie('login')
        if (this.ArticleAuthorLogin){
            this.TimCook = true
        }
    },
    methods: {
        GetArticlesArray(){
            axios.post('http://localhost:3001/GetArticle', 'lol', {})
            .then(res => { // then print response status
                this.ArticleArray = res.data
            })
        },
        UpdButton(){
            this.HelpField = false;
            this.AddField = false;
            this.OlegUpdate = 1
            this.GetArticlesArray()
            setTimeout(() => this.OlegUpdate = 2,1000)
            


            
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        ProcessArticle(){
            this.ArticleBug = 6
            !this.ArticleName ? this.ArticleName = '' : this.ArticleBug -= 1
            !this.ArticleDesc ? this.ArticleDesc = '' : this.ArticleBug -= 1
            !this.ArticleAuthor ? this.ArticlAuthor = '' : this.ArticleBug -= 1

            !this.ArticleName.replace(' ','') ? this.ArticleName = '' : this.ArticleBug -= 1
            !this.ArticleDesc.replace(' ','') ? this.ArticleDesc = '' : this.ArticleBug -= 1
            !this.ArticleAuthor.replace(' ','') ? this.ArticlAuthor = '' : this.ArticleBug -= 1

            this.ArticleDate =  Date.now()

            if (!this.ArticleBug){
                let url = `http://localhost:3001/PostArticle?name=${this.ArticleName}&desc=${this.ArticleDesc}&author=${this.ArticleAuthor}&login=${this.ArticleAuthorLogin}`

        		axios.post(url, 'data', {})
        		.then(res => { // then print response status
        			if (res.data == 'ok'){
                        this.GetArticlesArray()
                    }else{
                        this.TimCook = false
                        console.log('lox')
                        document.cookie = "login=;expires=0";
                    }

        		})
                this.ArticleName = ''
                this.ArticleDesc = ''


            }else{
                console.log('lox2')
            }

        },
       ErrorGenerate() {
           // this.ErrTitle = 'Hi!';
           // this.ErrDesc = 'Sample error (;';
           this.ErrType = '#D4444A';
           this.ErrExpires = 10;
           if (!this.ErrTitle){
               this.ErrTitle = ''
           }
           if (!this.ErrDesc){
               this.ErrDesc = ''
           }

           if ((this.title != "[TITLE]") && (this.ErrTitle.replace(' ','') != '') && (this.ErrDesc.replace(' ','') != '')){
               this.ErrArray.push([this.ErrTitle,this.ErrDesc,this.ErrType,this.ErrExpires]);
               this.ErrTitle = '';
               this.ErrDesc = '';
           }else{
               if (this.ErrTitle.replace(' ','') == '')
                   this.ErrArray.push(['No title!','Please, add some',this.ErrType,this.ErrExpires]);
               if (this.ErrDesc.replace(' ','') == '')
                   this.ErrArray.push(['No description!','Please, add some',this.ErrType,this.ErrExpires]);
           }
       },
       ErrorRemove(index){
           console.log(<index></index>)
           this.ErrArray.splice(index,1)
       }
   }
};
</script>

<style scoped>

</style>
