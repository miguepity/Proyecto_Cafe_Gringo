// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import Empleado from './components/Empleado.vue'
import crearEmpleado from './components/crearEmpleado.vue'
import Admi from './components/admi.vue'
import deletEmpleado from './components/deletEmpleado.vue'
import editEmpleado from './components/editEmpleado.vue'
import generarReporte from './components/generarReporte.vue'
import verEmpleado from './components/verEmpleado.vue'

import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import moment from 'moment'

Vue.use(VueResouce)
Vue.use(VueRouter)
Vue.use(moment)

Vue.http.options.credentials = true;
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
    {
     name:'AdmiView',
     path:'/admi',
     component: Admi
   },
   {
     name: 'DeletEmpleado',
     path: '/deletempleado',
     component: deletEmpleado
   },
   {
     name: 'EditEmpleado',
     path: '/editempleado',
     component: editEmpleado
   },
   {
     name: 'GenerarReporte',
     path: '/generarreporte',
     component: generarReporte
   },
   {
     name: 'verEmpleado',
     path: '/verempleado/:username',
     component: verEmpleado
   }
  ]
});

new Vue({ // eslint-disable-line no-new
  router,
  render: (h) => h(App)
}).$mount('#app');
