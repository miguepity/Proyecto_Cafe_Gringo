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
      <div class="col l3 s6 col-izquierda">
        <br>
        <h4 class="nombre">Miguel Ardon</h4>
      </div>
      <div class="col l9 s6">
        <div class="row">
            <div class="col l8  offset-l2">
              <div class="contenido">
                <div class="row">
                  <div class="col s6 izquierdo">
                    <input class="nombreCompleto" type="text" placeholder="  Nombre Completo" required>
                    <input class="celular" type="text" placeholder="  Celular" required>
                    <input class="password" type="password" placeholder="  Verificar Contraseña" required>
                  </div>
                  <div class="col s6 derecho">
                    <input class="username" type="text" placeholder="  Username" required>
                    <input class="email" type="text" placeholder="  Correo electronico" required>
                    <input class="verificarpassword" type="password" placeholder="  Verificar Contraseña" required>
                  </div>
                  <div class="row">
                    <button class="waves-effect waves-light btn" type="button" name="button">Crear Empleado</button>
                  </div>
                </div>
              </div>
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
  margin-left: 33%;
  border-radius: 10px;
  background-color: #3B8DDF;
}

.contenido{
  background-color: #353B40;
  padding-top: 9%;
  margin-top: 10%;
  border-radius: 6px 6px 6px 6px;
}

input{
  background-color: white;
  border-radius: 6px 6px 6px 6px;
  margin-bottom: 20%;
  width: 100%;
  border:1px solid #DADADA;
}

</style>
