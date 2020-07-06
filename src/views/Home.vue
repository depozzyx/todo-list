<template>
	<div class="home">
		<Bogdan msg="Welcome to Your Vue.js App" />

		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Bogdan from "@/components/Bogdan.vue";

export default {
  name: "Home",
  components: {
	HelloWorld,
	Bogdan
  }
};
</script>
