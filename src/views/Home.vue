<template>
	<div class="home md-layout md-gutter">
		<div class="col-sm-4"></div>
		<div class="col-sm-4 d-flex align-items-center min-vh-100">
			<div style = "width: 100%;" >
				<div class="p-2 d-flex justify-content-center">
					<span class="md-display-2">My todo list</span>
				</div>


				<md-content style = "overflow-y: scroll; max-height: 300px; width: 50%; margin-left: 25%;" class="md-scrollbar">
					<md-list>
						<!-- <md-subheader>Current todos</md-subheader> -->
						
						<md-list-item v-for="(item, index) in todoTitles" :key = "index">
							<md-checkbox v-model="todoChecked" @change = "updateTodoClicked" :value="index" />
							<span class="md-list-item-text"> {{item}}</span>
						</md-list-item>
					</md-list>
				</md-content>
					
				<!-- {{todoChecked}}
				{{todoList}} -->
				<br>
				<md-divider style='margin-left: 25%; width: 50%;'></md-divider>

			</div>
				
		</div>
		<div class="col-sm-4 d-flex align-items-center min-vh-100">
			<div style = "width: 50%; margin-left: 25%;">
				<md-card style = 'overflow: hidden; margin-bottom: 30px;' class="md-layout-item md-size-100 md-small-size-100">
					<md-card-header>
						<div class="md-title">Add todo</div>
					</md-card-header>

					<md-card-content>
						<md-field :class="messageClass">
							<label>Todo text</label>
							<md-textarea @change = "checkError" required v-model="todoText" md-autogrow></md-textarea>
							<span class="md-error">Field is required. Remove all "//" expressions.</span>
						</md-field>
						<md-button @click = 'addTodo' style = 'float: right;' class="md-fab md-primary md-mini"><md-icon>add</md-icon></md-button>
					</md-card-content>
				</md-card>
				<md-card style = 'overflow: hidden;' class="md-layout-item md-size-100 md-small-size-100">
					<md-card-header>
						<div class="md-title">Help</div>
					</md-card-header>

					<md-card-content>
						You will get no help
					</md-card-content>
				</md-card>
			</div>
		</div>
		
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Bogdan from "@/components/Bogdan.vue";
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export default {
	name: "Home",
	components: {
		// md-display-3
		// HelloWorld,
		// Bogdan
	},
	created(){
		let c1 = getCookie('todoNames')
		let c2 = getCookie('todoState')
		if (c1){
			console.log(c1)
			console.log(c2)
			let a = c1.split('//')
			let b = c2.split('//')
			for (let i = 0; i < a.length; i++) {
				this.todoTitles.push(a[i])
				this.todoStates.push(parseInt(b[i]))
			}
			for (let i = 0; i < this.todoStates.length; i++) {
				if (this.todoStates[i] == 1){
					this.todoChecked.push(i)
				}
			}
        }
		
	},
	data: () => ({
		notification: [],
		todoChecked: [],
		hasMessages: false,
		todoText: '',
		todoTitles: [],
		todoStates: [],
		// todoList: [['Todo',0], ['Todo2',1]],
	}),
    computed: {
      messageClass () {
        return {
          'md-invalid': this.hasMessages
        }
      }
	},
	methods: {
		addTodo() {
            if (this.checkError()){
				this.todoTitles.unshift(this.todoText);
				this.todoStates.unshift(0);
				this.todoText = ''

				let a = this.todoTitles.join('//')
				let b = this.todoStates.join('//')
				document.cookie = `todoNames=${a};`
				document.cookie = `todoState=${b};`
				console.log(document.cookie, getCookie('todoNames'))
			}
		},
		checkError() {
			if (this.todoText == ''){
				this.hasMessages = true
				return 0
			}else{
				this.hasMessages = false
				return 1
			}
		},
		updateTodoClicked(){
			for (let i = 0; i < this.todoStates.length; i++) {
				let f = 0
				for (let m = 0; m < this.todoChecked.length; m++) {
					if (this.todoChecked[m] == i){
						this.todoStates[i] = 1
						f = 1
						break
					}
				}
				if (f == 0){
					this.todoStates[i] = 0
				}
				let b = this.todoStates.join('//')
				document.cookie = `todoState=${b};`
			}
		}
	}
};
</script>

<style scoped>
	.home{
		height: 100%;

	}
	md-layout-item{
		height: 100%;
	}
</style>
