<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Empleado from './components/Empleado.vue'
import crearEmpleado from './components/crearEmpleado.vue'
import Admi from "./components/admi.vue"
import deletEmpleado from './components/deletEmpleado.vue'
import editEmpleado from './components/editEmpleado.vue'
import generarReporte from './components/generarReporte.vue'

export default {
  name: 'app',
  components: {
    Empleado,
    crearEmpleado,
    Admi,
    deletEmpleado,
    editEmpleado,
    generarReporte
  },
  mounted(){
    $('.modal').modal();
    $(".button-collapse").sideNav();

  }
}
</script>
