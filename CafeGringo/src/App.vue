<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Empleado from './components/Empleado.vue'
import crearEmpleado from './components/crearEmpleado.vue'
import Admi from "./components/admi.vue"

export default {
  name: 'app',
  components: {
    Empleado,
    crearEmpleado,
    Admi
  },
  mounted(){
    $('.modal').modal();
    $(".button-collapse").sideNav();
  }
}
</script>
