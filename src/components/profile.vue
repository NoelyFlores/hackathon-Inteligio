<template>
  <div>
		<div class="pa-3 text-xs-center">
      <h3 class="title font-weight-light mb-2">Basado en sus respuestas le presentamos su perfil de inversión como {{validate}}</h3>
		</div>
		<div id="app">
				<v-app id="inspire">
					<v-container fluid grid-list-lg	style="min-height: 380">
						<v-fade-transition mode="out-in">
							<v-layout v-if="show" key="0" class="layaoutcontent" wrap>
								<v-flex xs6>
									<v-card>
										<v-card class="profilepot">											
											<v-data-table :headers="headers" :items="desserts">
												<template slot="items" slot-scope="props">
													<td class="text-xs-left">{{ props.item.desc }}</td>
													<td class="text-xs-center">{{ props.item.value }}%</td>
												</template>
											</v-data-table>
											<v-divider></v-divider>
											<v-card-title class="title font-weight-regular justify-space-between">
												<span class="caption grey--text text--darken-1">{{desc}}</span>
											</v-card-title>
										</v-card>
									<v-card-title class="title">Portafolio</v-card-title>
									</v-card>
								</v-flex>
								<v-flex xs6>
									<v-card>
										<v-img
											:src="img2"
											height="300"
											contain
											class="white darken-2"
										></v-img>										
										<span v-for="(item, index) in color" :key="item" class="caption grey--text text--darken-1"><v-icon :color="index">fiber_manual_record</v-icon>{{item}}</span>
											<v-divider></v-divider>
										<v-card-title class="title">Inversión</v-card-title>
									</v-card>
								</v-flex>
							</v-layout>
						</v-fade-transition>
					</v-container>
					<v-flex xs4 offset-xs5>
						<v-btn @click="register()" center blocks color="primary">Registrarme</v-btn>
					</v-flex>
				</v-app>
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
			img2: this.$route.params.img2,
			desc: this.$route.params.desc,
			colors: this.$route.params.colors,
			show: true,
			snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
       headers: [
         {
            text: 'Descripción',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Valor'}
        ],
        desserts: [{desc:'Retorno promedio anual esperado', value: this.$route.params.rpa},{desc:'Mejor año', value: this.$route.params.myear}, {desc:'Peor año', value: this.$route.params.pyear}]
    }
	},
	mounted(){},
	created(){},
	watch: {},
	computed:{
		color: function(){
			return this.colors
		}
	},
	methods:{
		register(){
			this.$router.push({ name: 'login', params: { profile: this.validate }})
		}
	},
	components:{}
}
</script>
<style scoped>
	.perfil{
		text-align: left;
			padding: .5em 0em 0em;
	}
	.text-xs-center{
		font-size: 14px !important;
	}
	.profilepot{
		min-width: 350px !important;
	}
@media (max-width: 720px){
	.xs6 {
			max-width: 100% !important;
	}
	.layout:only-child {
    display: flex;
    justify-content: center;
    flex-direction: row;
	}
}
@media (max-width: 480px) {
	.theme--light.v-card {
    min-width: 330px;
	}
	.profilepot{
		min-width: 320px !important;
	}
}
</style>