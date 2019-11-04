import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDraggable from 'vue-draggable'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faUser, faUsers, faTimes, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/assets/css/styles.css'

Vue.use(BootstrapVue)
Vue.use(VueDraggable)
library.add(faCheck, faUser, faUsers, faTimes, faPencilAlt, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
