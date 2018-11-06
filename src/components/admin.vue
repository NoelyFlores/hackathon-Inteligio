<template>
 <div div class="content">
	<div class="content-home">
  <v-card class="mx-auto" width="350px"  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Email"
            value="admin@gmail.com"
						v-model="email"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            Ingrese la cuenta del administrador "admin@gmail.com"
          </span>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            label="Password"
            type="12345678"
						v-model="password"
            required
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            Por favor ingrese la contraseña "12345678"
          </span>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="3">
        <div class="pa-3 text-xs-center">
          <v-img
            class="mb-3"
            contain
            height="128"
            src="http://www.3mindstrategic.com/app/img/clientes/cliente_3mindstrategic_inteligo.gif"
          ></v-img>
          <h3 class="title font-weight-light mb-2">Bienvenido a Inteligo</h3>
          <span class="caption grey--text">Gracias por iniciar sesión!</span>
        </div>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        flat
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        depressed
        @click="next()"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
	</div>
</div>
</template>
<script>
import firebase from 'firebase'
	export default {
    name:'admin',
    data(){
        return {
					email: '',
					password: '',
          step: 1,
          state: false
        }
		},
		computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Iniciar Sesión'
          case 2: return 'Ingrese su contraseña'
          default: return 'Iniciaste sesión!!'
        }
      }
    },
		methods:{
			next(){
        if(this.step === 1 && this.email === 'admin@gmail.com'){          
          this.step++
        }
        if(this.step === 2 && this.password === '12345678'){
          this.step++
           firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then()
            .catch()
            firebase.auth().onAuthStateChanged((e) => {
              this.state = true
           })          
          }        
        if(this.step === 3 && this.state === true){
          this.$router.push('register')
        }
      }
		}
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
    padding: 120px 0em;
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

