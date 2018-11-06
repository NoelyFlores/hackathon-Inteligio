import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
Vue.config.productionTip = false
var config = {
  apiKey: "AIzaSyCAqKfuh9hpK_S1DXyO2XiU9SxlzkU5ls4",
  authDomain: "inteligo-lab.firebaseapp.com",
  databaseURL: "https://inteligo-lab.firebaseio.com",
  projectId: "inteligo-lab",
  storageBucket: "inteligo-lab.appspot.com",
  messagingSenderId: "493107654864"
};
firebase.initializeApp(config);
/* firebase.auth().signInWithEmailAndPassword('admin@gmail.com', '12345678')
  .then()
  .catch()
let app
firebase.auth().onAuthStateChanged((e) => {
  if (!app) {
    console.log('succefull conection')
    app = new Vue({
      el: '#app',
      render: h => h(App),
      router
    })
  }
}) */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

