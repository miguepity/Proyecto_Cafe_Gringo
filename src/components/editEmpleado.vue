<template>
  <div class="row rowNav">
    <div class="container">
      <h3>Editar Empleado</h3>
      <div class="row username">
        <div class="col s12 m6 l6">
          <input type="text" placeholder="Username para editar" v-model="empleado.username">
        </div>
        <div class="col s12 m6 l6">
          <button type="button" class="waves-effect waves-light btn" v-on:click="buscar">Buscar</button>
        </div>
      </div>
      <div class="row respuesta">
        <input type="text" v-model="empleado.Nombre">
      </div>
      <div class="row respuesta">
        <div class="col s12 m6 l6">
          <input type="password" v-model="empleado.pass">
        </div>
        <div class="col s12 m6 l6">
          <input type="password" v-model="conPass">
        </div>
      </div>
      <div class="row respuesta">
        <div class="col s8 m5 l4">
          <input type="text" v-model="empleado.email">
        </div>
        <div class="col s8 m5 l4">
          <input type="text" v-model="empleado.celular">
        </div>
        <div class="col s8 m5 l4">
          <h6>Estado:</h6>
          <input type="radio" name="prop" id="empleado" checked value="empleado">
          <label for="empleado">Empleado</label>
          <input type="radio" name="prop" id="admin" value="admin">
          <label for="admin">Administrador</label>
        </div>
      </div>
      <div class="row respuesta">
        <div class="col s12 m5 l4">
          <input class="datepicker" v-on:change="set">
        </div>
        <div class="col s12 m5 l4">
          <input type="text" v-model="empleado.hrIn">
        </div>
        <div class="col s12 m5 l4">
          <input type="text" v-model="empleado.hrOut">
        </div>
      </div>
      <button type="button" class="edit btn">Editar</button>


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
                <a><i class="fa fa-users" aria-hidden="true"></i>Cafe el Gringo</a>
              </li>
              </router-link>

              <router-link to="/admi">
              <li>
                <a><i class="fa fa-table" aria-hidden="true"></i>Inventario</a>
              </li>
              </router-link>

              <router-link to="/admi">
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
                <a><i class="fa fa-ban" aria-hidden="true"></i>Eliminar Empleado</a>
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
import baseUrl from '../../config'
export default {
  data () {
    return {
      nombre:'',
      conPass:'',
      date: new Date(),
      empleado:{
        Nombre:'',
        celular:'',
        email:'',
        genero:'',
        username:'',
        pass:'',
        date:[

        ],
        hrIn:[

        ],
        hrOut:[

        ],
        scope:'',
      }
    }
  },
  methods:{
    set:function(){

    },
    buscar: function(){
      this.$http.get(`${baseUrl.uri}/cafe/empleado/`+this.empleado.username).then((response)=>{
        if(response.body==""){
          sweetAlert({
             title: "Ohh No!...",
             text:  "Algo esta mal!...Usuario -"+this.empleado.username +"- no existe",
             type:  "error",
           });
           this.empleado.username="";
        }else{
          console.log(response.body);
          this.empleado.Nombre=response.body[0].Nombre;
          // this.empleado.pass=String(SHA3(response.body[0].pass));
          // this.conPass=String(SHA3(response.body[0].pass));
          this.empleado.email=response.body[0].email;
          this.empleado.celular=response.body[0].celular;

        }
      });
    },

    logout:function(){
      alert(this.date);
      this.$http.get(`${baseUrl.uri}/cafe/logout`).then((response)=>{
        this.$router.push("/");
      });
    }
  },
  beforeMount(){
    var username = localStorage.getItem("username");
    this.$http.get(`${baseUrl.uri}/cafe/empleado/`+username).then((res)=>{
      var empleado = res.body;
      this.nombre = empleado[0].Nombre;
    });
  },
  mounted(){
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
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

h3{
  margin-left: 50%;
}

.username{
  margin-left: 40%;
}

.respuesta{
  margin-left: 30%;
}

.edit{
  margin-left: 60%;
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
