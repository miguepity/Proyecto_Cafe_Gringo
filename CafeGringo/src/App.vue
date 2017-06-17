<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Empleado from './components/Empleado.vue'
import crearEmpleado from './components/crearEmpleado.vue'

export default {
  name: 'app',
  components: {
    Empleado,
    crearEmpleado
  },
  mounted(){
    $('.modal').modal();

  }
}
</script>
