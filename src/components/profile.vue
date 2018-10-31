<template>
    <div>
		<h1 class="perfil">{{validate}}</h1>
		<v-layout row wrap container>
			<v-flex xs4 offset-xs1>
				<img :src="img1" alt="">
			</v-flex>
			<v-flex xs4 offset-xs3>
				<img :src="img2" alt="">
			</v-flex>
			<v-flex xs4 offset-xs5>
				<v-btn @click="register()" center blocks color="success">Registrarme</v-btn>
			</v-flex>
		</v-layout>
		<div>
  	</div>
	</div>
</template>
<script>
import firebase from 'firebase'
import {dataProfile} from '@/plugins/dataProfile'
export default {
	name:'profile',
	props: [],
	data(){
		return {
			validate: this.$route.params.validate,
			img1: this.$route.params.img1,
			img2: this.$route.params.img2
		}
	},
	mounted(){},
	created(){},
	watch: {},
	computed:{},
	methods:{
		register(){
			this.$router.push('/login')
		}
	},
	components:{}
}
</script>
<style scoped>
.perfil{
	text-align: center;
    padding: 1em;
}
</style>