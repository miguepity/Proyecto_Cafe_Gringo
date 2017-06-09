<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Empleado from './components/Empleado.vue'
import VistaEmpleado from './components/VistaEmpleado.vue'

export default {
  name: 'app',
  components: {
    Empleado
  },
  mounted(){
    $('.modal').modal();

  }
}
</script>
