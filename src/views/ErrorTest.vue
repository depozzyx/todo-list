<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Error generator. Really.</h1>
    <div>
        <input type="text" v-model="ErrTitle" name="" placeholder="Error Title" value="">
        <input type="text" v-model="ErrDesc" name="" placeholder="Error Description" value="">
    </div>
    <button type="button" name="button" @click = 'ErrorGenerate'>Generate! Yay! We love dis!</button>
    <ErrorHandler :title="ErrTitle" :desc="ErrDesc" :type="ErrType" :array = "ErrArray" @error-remove="ErrorRemove" />
  </div>
</template>

<script>
// @ is an alias to /src
import ErrorHandler from "@/components/ErrorHandler.vue";

export default {
    name: "ErrorTest",
    components: {
        ErrorHandler
    },
    data () {
        return {
            ErrTitle: undefined,
            ErrDesc: undefined,
            ErrType: undefined,
            ErrArray: [],
        }
    },
    methods: {
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

<style>

</style>
