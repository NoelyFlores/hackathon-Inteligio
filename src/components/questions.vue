<template>
<div class="text-xs-center">
<v-stepper v-model="e1" v-if="questionsForSteps.length === 8 && !seenButton">
     <v-stepper-header>
       <v-stepper-step v-for="(question, index) in questionsForSteps" :key="index" :complete="e1 >index+1" :step="index+1">Pregunta{{e1}} hi {{index+1	}}
       </v-stepper-step>
     </v-stepper-header>
     <v-stepper-items>
       <v-stepper-content v-for="(question,index) in questionsForSteps" :key="index" :step="index+1">
         <v-card class="mb-5" color="grey lighten-1" height="350px">
					 {{question.question}}
           <answers :dataQuestion="question.answers" :itemKey="question.quetions"/>
         </v-card>
         <v-btn color="primary" @click="e1 = index + 2">
           Continue
         </v-btn>
         <v-btn flat>Cancel</v-btn>
       </v-stepper-content>
     </v-stepper-items>
   </v-stepper>
	  <div v-else>
	 	<v-dialog v-model="dialog" width="500">
				<v-btn   slot="activator" color="red lighten-2" dark > Empezar </v-btn>						
				<v-card>
					<v-card-title class="headline grey lighten-2" primary-title >
						A continuación se mostrará su perfil de inversión
					</v-card-title>
					<v-card-text>
						Ingrese su correo electrónico y le enviaremos la información de su perfil y portafolio óptimo
					</v-card-text>				
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							required
						></v-text-field>
						<v-btn color="primary" flat @click="sendEmail()"> I accept </v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog> 
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
			items: [{uno:1},{uno:1},{uno:1},{uno:1},{uno:1},{uno:1},{uno:1},{uno:1}],
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
			console.log(result)
			return result
		},
		seenButton: function() {
			if(this.e1===9){
			return true
			}else{
				return false
			}
		}
	},
	methods:{
		questionsList(){
			const noe = []
				let dataFirebase = firebase.database().ref().child('questions')
			dataFirebase.on('value', data => {
				// array de preguntas
				const arr = data.val()
				Object.keys(arr).forEach((element, index) => {
					noe.push({answers:arr[element].answers, question: arr[element].question, quetions:element})
				})
				this.questions = noe
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
			this.dialog = false
			/* if(this.result.length === 8){
				this.$router.push({ name: 'profile', params: { total1: this.total().total1, total2: this.total().total2 }})
			} */
			let img = ""
			const validate = perfilValue(this.total().total1, this.total().total2)
			dataProfile.forEach(element => {
			if(element.perfil === validate){
				img = element.img
			}
			});
			sendDataMandrill(this.email, validate, img)
			this.result.push()
			this.$router.push({ name: 'profile', params: { validate: validate, img1: img, img2: img2 }})
			
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
</style>