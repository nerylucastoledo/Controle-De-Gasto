import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

library.add([
  faEdit
])

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)

Vue.filter("numeroPreco", valor => {
  valor = Number(valor)
  if(!isNaN(valor)) {
    return valor.toLocaleString("pt-bR", {
      style: "currency",
      currency: "BRL"
    })
  } else {
    return ""
  }
})

const firebaseConfig = { 
  apiKey : "AIzaSyB4d7JiPLCirz941jZe0l0ES_6vb9XmhHw" , 
  authDomain : "meusgastos-d1929.firebaseapp.com" , 
  databaseURL : "https://meusgastos-d1929-default-rtdb.firebaseio.com" , 
  projectId : "meusgastos-d1929" , 
  storageBucket : "meusgastos-d1929.appspot.com" , 
  messagingSenderId : "52928062171" , 
  appId : "1: 52928062171: web: 75e859db0cd0136f0de2fe" , 
  measurementId : "G-XZWNV6D6GM" 
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if(user.email) {
    localStorage.setItem('login', true)
    localStorage.setItem('displayName', user.displayName)
    store.dispatch("fetchUser", user);
  }
});
