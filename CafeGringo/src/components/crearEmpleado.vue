<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo"><strong>Cafe El Gringo</strong></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="/" class="nav-but">Home</a></li>
          <li><a href="#" class="nav-but">LogOut</a></li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="col l3 s2 col-izquierda">
        <br>
        <h4 class="nombre">Miguel Ardon</h4>
      </div>
      <div class="contenido">
        <div class="row">
          <div class="col s5">
            <label><b>Nombres</b></label>
            <input class="nombres" type="text" placeholder="Nombres" required>
            <label><b>Celular</b></label>
            <input class="celular" type="text" placeholder="Celular" required>
            <label><b>Contraseña</b></label>
            <input class="password" type="text" placeholder="Contraseña" required>
          </div>
          <div class="col s5">
            <label><b>Apellidos</b></label>
            <input class="apellidos" type="text" placeholder="Apellidos" required>
            <label><b>Correo Electronico</b></label>
            <input class="email" type="text" placeholder="Correo electronico" required>
            <label><b> Verificar Contraseña</b></label>
            <input class="verificarpassword" type="text" placeholder="Verificar Contraseña" required>
          </div>
          <div class="row">
            <button class="waves-effect waves-light btn" type="button" name="button">Crear Empleado</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    data () {
      return {
      }
    }
  }
  </script>

<style scoped>
.nav-wrapper{
  background-color: white;
}
.nav-wrapper .brand-logo{
  background-color: #282B2E;
  width: 25%;
  text-align: center;
}
.nav-but{
  color: #353B40;
  padding: 0 35px;
}
.col-izquierda{
  background-color: #353B40;
  height: 100vh;
  text-align: center;
  color: white;
}

.nombre{
  margin-top: 15%;
}

.btn{
  margin-top: 1%;
  margin-left: 30%;
}

.contenido{
  padding-top: 5%;
  padding-left: 30%;
}
</style>
