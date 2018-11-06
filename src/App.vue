<template>
  <v-app>
  <v-toolbar dark color="colornav">
    	<v-flex xs4 sm1 @click="redirec()">
					<v-img src="http://www.3mindstrategic.com/app/img/clientes/cliente_3mindstrategic_inteligo.gif">
					</v-img>
				</v-flex>
    <v-spacer></v-spacer>
    <v-btn router-link to="/admin" icon >
      <v-icon large >account_circle</v-icon>
    </v-btn>
  </v-toolbar>
  <router-view/>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  methods:{
    redirec(){
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped>
.colornav {
    background-color: #FF9800 !important;
    border-color: #FF9800 !important;
}
.application{
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
}

</style>

