<template>
<div class="template" > 
  <v-container class="fom"  text-xs-center >
    <v-layout   align-center justify-center row fill-height id="app">
        <v-flex  lg5>
        <v-form   id="inspire" class="inte" ref="form" v-model="valid" lazy-validation>
        <br>
      <v-container class="text">
          Déjanos tus datos  
      </v-container>      
      <v-text-field class='input'
        v-model="name"
        :rules="nameRules"
        :counter="20"
        label="Nombre Completo"
        required
      ></v-text-field>
      <v-text-field class='input'
        v-model="date"
        :rules="[v => !!v || 'Campo requerido']"
        label="Fecha de Nacimiento"
        required
      ></v-text-field>
      <v-text-field class='input'
        v-model="phone"
        :rules="[v => !!v || 'Campo requerido']"
        label="Telefono"
        required
      ></v-text-field>
       <v-text-field class='input'
        v-model="email"
        :rules="emailRules"
        label="Correo Electronico"
        required
      ></v-text-field>
      <v-select class='input'
        v-model="gender"
        :items="items"
        :rules="[v => !!v || 'Campo requerido']"
        label="Genero"
        required
      ></v-select>
      <v-checkbox class='input'
        v-model="checkbox"
        label="Todos los datos son correctos"
        required
      ></v-checkbox>
      <div class="text-xs-center" v-if="show">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <v-btn
            
            @click="Registro()"
            slot="activator"
            color="blue"
            class="btnRegistrarse"
            dark
          >
            Registrarse
          </v-btn>

          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
               Se registró exitosamente
            </v-card-title>

            <v-card-text>
              Se adjuntaron dos documentos de contrato a su correo electrónico, cualquier pregunta al inteligo@gmail.com
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="backHome()"
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-btn round color="rgb(164,164,164)" class="btnBorrar"
       @click="clear">Limpiar</v-btn>  
       <v-card-text v-if="none" class="none">
			  Es obligatorio llenar todos los campos
				</v-card-text>     
    </v-form>    
  </v-flex>
    </v-layout> 
</v-container>
</div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "login",
  props: [],
  data() {
    return {
      dialog: false,
      profile: this.$route.params.profile,
      tipo: "",
      valid: true,
      name: "",
      date: "",
      gender: "",
      phone: "",
      email: "",
      items: ["Femenino", "Masculino"],
      checkbox: false,
      emailRules: [
        v => !!v || "Campo requerido",
        v => /.+@.+/.test(v) || "Email invalido"
      ],
      nameRules: [
        v => !!v || "Campo requerido",
        v => (v && v.length <= 20) || "20"
      ],
      none: false
    };
  },
  mounted() {},
  created() {},
  watch: {},
  computed: {
    show: function () {
      if(this.nombre !== '' && this.telefono !== ''&& this.genero !== '' && this.fecha !== '' && this.email !== ''){
        return true
      }else{
        return false
      }

    }
  },
  methods: {
    Registro() {
      if(this.nombre !== '' && this.telefono !== ''&& this.genero !== '' && this.fecha !== '' && this.email !== ''){
        firebase
        .database()
        .ref("users/")
        .push({
          nombre: this.name,
          fecha: this.date,
          genero: this.gender,
          telefono: this.phone,
          email: this.email,
          profile:this.profile
        })
        if (this.gender === "Femenino") {
          this.tipo = "Estimada Sra.";
        } else {
          this.tipo = "Estimado Sr.";
        }
        this.mandril(this.name);
      }else{
        this.none = true
      }
      
    },

    mandril(pdfBase64String) {
      $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          key: "ZGiSDAUGJIgaCMIqm9ysPA",
          message: {
            html: `<div>
          <p>
          ${this.tipo} ${this.name}
           <br>
           <br>
          Inteligo le da la bienvenida.A continuación se adjunta los principales contratos para completar su registro a inteligo.
          <br>
          Asimmismo, un asesor se comunicará con usted a la brevedad posible.
          <br>
          <br>
          Saludos cordiales
          <br>
          <br>
          <img src="https://raw.githubusercontent.com/OshinVillegas/hackathon-Inteligo/login/src/assets/inteligopeque%C3%B1o.png">
          <br>
          <p style="display:none">https://drive.google.com/open?id=17bXJhMNTfsEwv_XHpykwLQYnvEhMGHF8
          https://drive.google.com/open?id=1bC8Bn7A7hMYpJ9yzSJ-nf9hysnpmvIeV</p>
          
         </div>`,

            text: "Example text content",
            "subject": ` Bienvenido a Inteligo ${this.name} `,
            from_email: "villegasoshin25@laboratoria.la",
            from_name: "Inteligo",
            to: [
              {
                email: this.email,
                name: this.name,
                tipo: this.tipo,
                type: "to"
              }
            ],
            headers: {
              "Reply-To": "villegasoshin25@gmail.com"
            }
          },
          async: false,
          ip_pool: "Main Pool",
          send_at: "2018-10-10 10:00:00"
        }
      });
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    backHome(){       
      this.$router.push('/home')
    }
  },
  components: {}
};
</script>
<style scoped>
.inte { 
  background: rgb(241, 241, 242);
  border-style: solid;
  border-color: rgb(241, 241, 242);
} 
.btnBorrar{
  margin-bottom: 5%;
  background: black;
  color:white;
  font-family: 'Arial Regular';
}
.btnRegistrarse{
  margin-bottom: 5%;
  background: black;
  color:white;
  font-family: 'Arial Regular';
}
label{
  font-family: 'Arial Regular';
}
.input{
  margin-left: 5%;
  margin-right: 5%;
  font-weight: 100 !important;
  font-family: 'Arial Regular';

}
.template{
	background: url('https://images.pexels.com/photos/955447/pexels-photo-955447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260') no-repeat;
	background-size: cover;
	height: 100%;
}
.text{
  font-size: 200%;
  font-family: 'Arial Regular';
color: black;
font-weight: 100;
}
.none{
  color: red
}
</style>