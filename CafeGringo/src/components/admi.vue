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
    <div class="row row-principal">
      <div class="col l3 s2 col-izquierda col-principal">
        <br>
        <h4 class="nombre">Walther Carrasco</h4>
        <h5>UX</h5>
      </div>
      <div class="col l9 s10 col-derecha col-principal">
        <div class="row">
          <div class="col l3 offset-l2 m3 offset-m3 s12">
            <div class="w-card">
              <img class="w-card-image" src="./image/reporte.png">
              <p class="w-card-titulo">Reportes</p>
              <p class="w-card-descripcion">Generar reportes de los empleados</p>
              <a class="waves-effect waves-light btn w-card-boton">GENERAR</a>
            </div>
          </div>
          <div class="col l3 offset-l2 m3 offset-m3 s12">
            <div class="w-card">
              <img class="w-card-image" src="./image/createEmplyee.png">
              <p class="w-card-titulo">Crear Empleado</p>
              <p class="w-card-descripcion">Agregar a la bd un empleado nuevo</p>
              <a class="waves-effect waves-light btn w-card-boton">AGREGAR</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col l3 offset-l2 m3 offset-m3 s12">
            <div class="w-card">
              <img class="w-card-image" src="./image/removeEmployee.png">
              <p class="w-card-titulo">Eliminar Empleado</p>
              <p class="w-card-descripcion">Eliminar a un empleado de la bd</p>
              <a class="waves-effect waves-light btn w-card-boton">ELIMINAR</a>
            </div>
          </div>
          <div class="col l3 offset-l2 m3 offset-m3 s12">
            <div class="w-card">
              <img class="w-card-image" src="./image/updateEmployee.png">
              <p class="w-card-titulo">Actualizar Empleado</p>
              <p class="w-card-descripcion">Actualiza los datos de un empleado</p>
              <a class="waves-effect waves-light btn w-card-boton">ACTUALIZAR</a>
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
      reporte:"./image/reporte.png",
      createImg:"./image/createEmplyee.png",
      removeImg:"./image/removeEmployee.png",
      updateImg:"./image/updateEmployee.png"
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

.row-principal{
  display: flex;
}

.col-izquierda{
  background-color: #353B40;
  /*height: 100vh;*/
  text-align: center;
  color: white;
}

.col-principal{

}

.col-derecha{
  background-color: #F0F0F2;
  height: 100%;
}

.card .card-image img{
  width: 75%;
  display: block;
  margin: 0 auto;
}

.card .card-image{
  max-height: 80%;
}

.card{
  margin: 50% auto;
}

.w-card{
  background-color: white;
  width: 110%;
  height: 38vh;
  margin-top: 10%;
  margin-bottom: 13%;
  text-align: center;
  border-radius: 7px;
}

.w-card-titulo{
  color: #73B2EA;
  font-size: 200%;
  margin-bottom: 1%;
}

.w-card-image{
  width: 50%;
  margin-top: 5%;
}

.w-card-descripcion{
  color: #C1C1C3;
  font-size: 110%;
}

.w-card-boton{
  border-radius: 20px;
  margin-bottom: 5%;
  background-color: #3B8DDF;
}

.nombre{
  margin-top: 15%;
}

</style>
