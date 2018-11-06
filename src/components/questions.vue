<template>
	<div class="text-xs-center">
		<v-stepper v-model="e1" v-if="questionsForSteps.length === 8">
     <v-stepper-header>
			 <v-divider></v-divider>	
       <v-stepper-step v-for="(question, index) in questionsForSteps" :key="index" :complete="e1 >index+1" :step="index+1">Pregunta {{index+1}} 		 
			 </v-stepper-step>
			 <v-divider></v-divider>			 
     </v-stepper-header>
     <v-stepper-items>
       <v-stepper-content v-for="(question,index) in questionsForSteps" :key="index" :step="index+1" class="steppercontent">
         <v-card class="mb-5">
					 <v-card-title class="headline" color= "white" >
					 {{question.question}}
            </v-card-title>
           <answers :dataQuestion="question.answers" :itemKey="question.quetions"/>
         	</v-card>
         	<v-btn v-if=" !seenButton" color="primary" @click="e1 = index + 2">Continue</v-btn>
         	<v-dialog v-if="seenButton" v-model="dialog" width="500">
							<v-btn slot="activator" color="blue lighten-2" dark > Empezar </v-btn>						
							<v-card>
								<v-card-title class="headline grey lighten-2" primary-title >
									A continuación se mostrará su perfil de inversión
								</v-card-title>
								<v-card-text>
									Ingrese su correo electrónico y le enviaremos la información de su perfil y portafolio óptimo
								</v-card-text>				
								<v-divider></v-divider>
								<v-card-actions class="section-email">
									<v-text-field
										v-model="email"
										:rules="emailRules"
										label="E-mail"
										required
									></v-text-field>
									<v-btn flat @click="redirec()">
										Cancelar
									</v-btn>
									<v-btn color="primary" flat @click="sendEmail()"> Enviar </v-btn>									
								</v-card-actions>
								<v-card-text v-if="emailNone" class="emailNone">
									Es obligatorio igresar un email válido
								</v-card-text>
							</v-card>
						</v-dialog> 
       </v-stepper-content>
     </v-stepper-items>
   </v-stepper>
	  <div v-else>
			</div> 
	 </div>
  </template>
<script>
import firebase from 'firebase'
import answers from '@/components/answers'
import {EventBus} from '@/plugins/bus.js'
import {sendDataMandrill} from '@/plugins/mandrill.js'
import {perfilValue} from '@/plugins/validatePerfil'
import {dataProfile} from '@/plugins/dataProfile'
export default {
	name:'webcam',
	props: [],
	data(){
		return {
			items: [
			{answers:{
				answer1:{answer:'hola cero 1', value:2},
				answer2:{answer:'hola munfo cruwl', value:2},
				answer3:{answer:'hola cero 2', value:4},
				answer4:{answer:'hola cero 3', value: 9}},
				question:'pregunta 02',
				quetions:'question2'},
					{answers:{
				answer1:{answer:'hola cero 1', value:2},
				answer2:{answer:'hola munfo cruwl', value:2},
				answer3:{answer:'hola cero 2', value:4},
				answer4:{answer:'hola cero 3', value: 9}},
				question:'pregunta 02',
				quetions:'question2'},
					{answers:{
				answer1:{answer:'hola cero 1', value:2},
				answer2:{answer:'hola munfo cruwl', value:2},
				answer3:{answer:'hola cero 2', value:4},
				answer4:{answer:'hola cero 3', value: 9}},
				question:'pregunta 02',
				quetions:'question2'},
					{answers:{
				answer1:{answer:'hola cero 1', value:2},
				answer2:{answer:'hola munfo cruwl', value:2},
				answer3:{answer:'hola cero 2', value:4},
				answer4:{answer:'hola cero 3', value: 9}},
				question:'pregunta 02',
				quetions:'question2'},
				
		],
			emailNone: false,
			e1: 0,
			switch1: true,
			questions: [],
			result: [],
			clickNum: 0,
			valid: false,
			dialog: false,    
			email: '',	
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
		}
	},
	mounted(){},
	created(){
		this.questionsList()		
		EventBus.$on('send-answer', value => {
			const profile = this.result
			if(profile.length !== 0){
				let findAnswer = false
				for (let index = 0; index < profile.length; index++) {
					if(profile[index].question === value.emitQuestion){
						profile[index].value = value.emitValue
						index=profile.length
						findAnswer = true
					}					
				}
				if(findAnswer === false){
					this.result.push({question:value.emitQuestion, value:value.emitValue})
				}
			}else{
				this.result.push({question:value.emitQuestion, value:value.emitValue})
			}
		})		
	},
	beforeDestroy(){
    EventBus.$off()
  },
	watch: {},
	computed:{
		questionsForSteps: function() {
			let result = [];
			for(let i = 0;i<this.questions.length;i++){
				result.push(this.questions[i])
			}
			return result
		},
		seenButton: function() {
			if(this.e1===8){
			return true
			}else{
				return false
			}
		}
	},
	methods:{
		questionsList(){
			const temp = []
			let dataFirebase = firebase.database().ref().child('questions')
			dataFirebase.on('value', data => {
				// array de preguntas
				const arr = data.val()
				Object.keys(arr).forEach((element, index) => {
					temp.push({answers:arr[element].answers, question: arr[element].question, quetions:element})
				})
				this.questions = temp
			})
		},
		next(){
			console.log(this.result.length)			
		},
		total(){
			let x = 0;
			let y = 0;
			this.result.forEach((element, index) => {
				if(index <= 3){
					x = x + element.value
				}else{
					y = y + element.value
				}
			})
			return {total1: x, total2: y}
		},
		sendEmail(){
			if(this.email){				
				this.dialog = false
				let img, img2, rpa, pyear, myear, desc, colors

				const validate = perfilValue(this.total().total1, this.total().total2)
				dataProfile.forEach(element => {
				if(element.perfil === validate){
					img2 = element.img2
					rpa = element.rpa
					pyear= element.pyear
					myear = element.myear
					desc = element.description
					colors = element.color
				}
				});
				sendDataMandrill(this.email, validate, img)
				this.$router.push({ name: 'profile', params: { validate: validate, img2: img2, rpa:rpa, pyear:pyear, myear:myear, desc: desc, colors:colors }})
			}else{
				this.emailNone = true
			}			
		},
		redirec(){
			this.$router.push('/home')
		}
	},
	components:{answers}
}
</script>
<style scoped>
.v-dialog__activator {
    position: absolute !important;
    margin-top: 65% !important;
    margin-left: 40% !important;
    z-index: 1 !important;
}
.steppercontent {
  padding: 24px 100px 16px !important;
	background: #e7eaee;
}
.mb-5 {
	padding: 18px;
  background: #fff;
  box-shadow: 3px 0px 20px 0px #9E9E9E; 
}
.primary{
  background-color: #19439a !important;
  border-color: #19439a !important;
}
.section-email{
	padding: 0px 15px;
}
.emailNone{
	color: red
}
.headline {
  font-size: 16px !important;
  height: 80px !important;
}
@media(max-width: 480px){
	.steppercontent{
		padding: 10px 10px 10px !important;
	}
}
</style>