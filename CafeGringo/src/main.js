// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Empleado from './components/Empleado.vue'
import crearEmpleado from './components/crearEmpleado.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {
      name:'LogInEmpleado',
      path:'/',
      component: Empleado
    },
    {
      name: 'CrearEmpleado',
      path: '/crearempleado',
      component: crearEmpleado
    },
  ]
})

new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount('#app');
