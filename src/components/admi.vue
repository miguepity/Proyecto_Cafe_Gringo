<template>
  <div class="row rowNav">
    <div class="container">
      <div class="row cardRow">

        <div class="col s8 m7 l5 cardCol">
          <div class="w-card">
            <img class="w-card-image" src="./image/reporte.png">
            <p class="w-card-titulo">Reportes</p>
            <p class="w-card-descripcion">Genera reportes de tus empleados</p>
            <a class="waves-effect waves-light btn w-card-boton">GENERAR</a>
          </div>

        </div>

        <div class="col s8 m7 l5 cardCol offset-l1">
          <div class="w-card">
            <img class="w-card-image" src="./image/createEmplyee.png">
            <p class="w-card-titulo">Crear Empleado</p>
            <p class="w-card-descripcion">Crea y agrega un empleado nuevo</p>
            <router-link to="/crearempleado"><a class="waves-effect waves-light btn w-card-boton">CREAR</a></router-link>
          </div>

        </div>
      </div>

      <div class="row cardRow">
        <div class="col s8 m7 l5 cardCol">
          <div class="w-card">
            <img class="w-card-image" src="./image/list.png">
            <p class="w-card-titulo">Mostrar Empleados</p>
            <p class="w-card-descripcion">Ver Empleados/ Eliminar Empleados</p>
            <router-link to="/deletempleado"><a class="waves-effect waves-light btn w-card-boton">Mostrar</a></router-link>

          </div>

        </div>
        <div class="col s8 m7 l5 cardCol offset-l1">
          <div class="w-card">
            <img class="w-card-image" src="./image/updateEmployee.png">
            <p class="w-card-titulo">Editar Empleado</p>
            <p class="w-card-descripcion">Edita los datos de un empleado</p>
            <router-link to="/editempleado"><a class="waves-effect waves-light btn w-card-boton">EDITAR</a></router-link>

          </div>

        </div>

      </div>
      <div class="col  s3 m2 l3 colNav">
        <div class="sideNav">
          <div class="brand">
            Cafe El Gringo
          </div>
          <p class="nombreSide">{{nombre}}</p>
          <p class="descriptionSide">Administrador</p>
          <div class="menu-list">
            <ul class="menu-content">

              <router-link to="/admi">
              <li>
                <a><i class="fa fa-coffee" aria-hidden="true"></i>Cafe el Gringo</a>
              </li>
              </router-link>

              <router-link to="/admi">
              <li>
                <a><i class="fa fa-table" aria-hidden="true"></i>Inventario</a>
              </li>
              </router-link>

              <router-link to="/generarreporte">
              <li>
                <a><i class="fa fa-file-excel-o" aria-hidden="true"></i>Reportes</a>
              </li>
              </router-link>

              <router-link to="/crearempleado">
              <li>
                <a><i class="fa fa-plus-square-o" aria-hidden="true"></i>Crear Empleado</a>
              </li>
              </router-link>
              <router-link to="/deletempleado">
              <li>
                <a><i class="fa fa-users" aria-hidden="true"></i>Empleados</a>
              </li>
              </router-link>
              <router-link to="/editempleado">
              <li>
                <a><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Editar Empleado</a>
              </li>
              </router-link>
              <li>
                <a v-on:click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Log Out</a>
              </li>
            </ul>
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
      nombre:""
    }
  },
  methods:{
    logout:function(){
      this.$http.get("http://localhost:8000/cafe/logout").then((response)=>{
        this.$router.push("/");
      });
    }
  },
  beforeMount(){
    var username = localStorage.getItem("username");
    console.log(username);
    this.$http.get("http://localhost:8000/cafe/empleado/"+username).then((res)=>{
      var empleado = res.body;
      console.log(empleado);
      this.nombre = empleado[0].Nombre;
    });
  }
}

</script>

<style scoped>
.colNav{
  padding-left: 0;
  padding-right: 0;
  height: 100%;
  position: fixed;
  top:0;
}
.rowNav {
  margin-right: 68%;
  padding-left: 0;
  padding-right: 0%;
  padding-bottom: 1%;
  margin-bottom: 0%;
  width: 100%;
  height: 100%;
  background-color: white;
}

.container{
  margin-left: 0%;
  margin-right: 0%;
  height: 100%;
  width: 100%;
}

.cardRow{
  margin-left: 40%;
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
background-color: #f0f0f2;
width: 110%;
height: 38vh;
margin-top: 10%;
text-align: center;
border-radius: 7px;
display: flex;
display: inline-table;
justify-content: center;
align-items: center;
}

.w-card-titulo{
color: #73B2EA;
font-size: 200%;
margin-bottom: 1%;
}

.w-card-image{
width: 20%;
margin-top: 5%;
height: auto;
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

.sideNav{
  font-family: verdana;
  font-size: 12px;
  font-weight: 200;
  background-color: #2e353d;
  top: 0px;
  height: 100%;
  color: #e1ffff;
}

.sideNav .nombreSide{
  font-size: 23px;
  text-align: center;
}

.sideNav .descriptionSide{
  font-size: 17px;
  text-align: center;
}

.sideNav .brand{
  background-color: #23282e;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 30px;
}

.sideNav ul,
.sideNav li{
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;
}

.sideNav li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
  border-top:  1px solid #23282e;
}
.sideNav li a {
  text-decoration: none;
  color: #e1ffff;
}
.sideNav li a i {
  padding-left: 10px;
  width: 20px;
  padding-right: 20px;
}

.sideNav li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
</style>
