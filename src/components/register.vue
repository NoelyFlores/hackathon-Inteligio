<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.name"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.genero }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
				<td class="text-xs-right">{{ props.item.fecha }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            :return-value.sync="props.item.profile"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.profile }}</div>
            <div slot="input" class="mt-3 title">Actualizar Perfil</div>
            <v-text-field
              slot="input"
              v-model="props.item.profile"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
	import firebase from 'firebase'
  export default {
    data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Nombre',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Email', value: 'calories' },
          { text: 'Genero', value: 'fat' },
					{ text: 'Teléfono', value: 'carbs' },
					{ text: 'F. Nacimiento', value: 'fecha' },
          { text: 'Perfil', value: 'iron' }
        ],
        desserts: []
      }
		},
		created(){
			console.log('hola')
			const temp = []
			let dataFirebase = firebase.database().ref().child('users')
			dataFirebase.on('value', data => {
				// array de preguntas
				const arr = data.val()
				Object.keys(arr).forEach((element, index) => {
					temp.push({name:arr[element].nombre, email: arr[element].email, genero: arr[element].genero,phone: arr[element].telefono, profile: arr[element].profile, fecha: arr[element].fecha})
				})
				this.desserts = temp
				console.log(temp)
			})
		},
    methods: {
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      }
    }
  }
</script>