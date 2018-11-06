<template>
	<div div class="content">
		<div class="content-home">			
			<h1 class="titulo">INTELIGO</h1>
			
		<!-- 	<v-flex xs4 sm1>
					<v-img src="https://files.slack.com/files-pri/T0NNB6T0R-FDT9A66E4/imagen1.png">
					</v-img>
				</v-flex> -->
			<h3 class="subtitulo">Ofrecemos un servicio personalizado, transparente y profesional en el manejo de sus inversiones, conozca nuestra propuesta de Valor.</h3>
			<div row wrap container class="text-xs-center ">
				<v-btn @click="goQuestions()" color="primary" dark >Empezar
					<v-icon dark right>arrow_forward</v-icon>
				</v-btn>			
			</div>
		</div>     
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
	name:'home',
	props: [],
	data(){
		return {}
	},
	mounted(){},
	created(){},
	watch: {},
	computed:{},
	methods:{
		goQuestions(){		
			this.$router.push('/questions')
		}
	},
	components:{}
}
</script>
<style scoped>
.content{
	background: url('https://images.pexels.com/photos/955447/pexels-photo-955447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260') no-repeat;
	background-size: cover;
	height: 100%;
}
.content-home{
    width: 100%;
    height: 100%;
    padding: 0em 0em;
    background: rgba(0, 0, 0, 0.576562);
    text-align: left;
    color: #fff;
    display: block;
}
.titulo{
	font-size: 50px;
  letter-spacing: 1px;
  text-align: center;
  border-left: 8px solid #FFC107;
  display: inline-block;
  margin: 10% 0% 5% 10%;
  padding: 0px 15px;
}
.subtitulo{
	font-size: 25px;
  margin: 0% 0% 5% 10%;
  font-weight: 100;
}
</style>