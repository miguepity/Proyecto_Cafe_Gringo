<template>
  <div class="row rowNav">
    <div class="container">
      <h3>Nuevo Empleado</h3>
      <div class="row informacion">
        <div class="col s8 m7 l5">
          <input type="text" placeholder="Nombres"  required v-model="name">
        </div>

        <div class="col s8 m7 l5">
          <input type="text" placeholder="Apellidos" required v-model="apellido">
        </div>
      </div>

      <div class="row informacion">
        <div class="col s6 m7 l3">
          <input type="text" placeholder="Usuario" required v-model="empleado.username">
        </div>
        <div class="col s6 m7 l4">
          <input type="password" placeholder="Contraseña" required v-model="empleado.pass">
        </div>
        <div class="col s6 m7 l3">
          <input type="password" placeholder="Confirme Constraseña" required v-model="conPass">
        </div>
      </div>

      <div class="row informacion">
        <div class="col s8 m7 l5">
          <input type="text" placeholder="Correo electronico" required v-model="empleado.email">
        </div>
        <div class="col s8 m7 l5">
          <input type="text" placeholder="Celular/Telefono" required v-model="empleado.celular">
        </div>
      </div>

      <div class="row informacion">
        <div class="col s8 m5 l6">
          <h6>Genero:</h6>
          <input type="radio" name="genero" id="m" value="M" checked>
          <label for="m">Masculino</label>
          <input type="radio" name="genero" id="f" value="F">
          <label for="f">Femenino</label>
        </div>
        <div class="col s8 m5 l6">
          <h6>Estado:</h6>
          <input type="radio" name="prop" id="empleado" checked value="empleado">
          <label for="empleado">Empleado</label>
          <input type="radio" name="prop" id="admin" value="admin">
          <label for="admin">Administrador</label>
        </div>
      </div>

      <div class="row informacion">
        <div class="col s12 m12 l12">
          <button class="btn" type="button" name="button" v-on:click="addEmpelado">Agregar</button>
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
export default {
  data () {
    return {
      nombre:"",
      name:'',
      apellido:'',
      conPass:'',
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
      },
    }
  },
  methods:{
    addEmpelado:function(){
      if(this.name!=="" && this.apellido!=="" && this.empleado.username!=="" && this.empleado.pass!=="" && this.conPass!=="" && this.empleado.email!=="" && this.empleado.celular!==""){
        this.empleado.Nombre =this.name+" "+this.apellido;
        if(this.empleado.pass===this.conPass){
          if($('input[name=genero]:checked').val()==="M"){
            this.empleado.genero= "M";
          }else if($('input[name=genero]:checked').val()==="F"){
            this.empleado.genero= "F";
          }
          if($('input[name=prop]:checked').val()==="empleado"){
            this.empleado.scope= "empleado";
          }else if($('input[name=prop]:checked').val()==="admin"){
            this.empleado.scope= "admin";
          }
          this.$http.post("http://localhost:8000/cafe/creatempleado",this.empleado).then((response)=>{
            if(response.body.success===true){
              sweetAlert({
                title: "Genial!",
                text:  "Empleado creado con exito!",
                type:  "success",
              });
              this.name="";
              this.apellido="";
              this.empleado.username="";
              this.empleado.pass="";
              this.conPass="";
              this.empleado.email="";
              this.empleado.celular="";
            }else{
              sweetAlert({
                title: "Ohh No!...",
                text:  "Algo salio mal!,Intentalo mas tarde!",
                type:  "error",
              });
              this.name="";
              this.apellido="";
              this.empleado.username="";
              this.empleado.pass="";
              this.conPass="";
              this.empleado.email="";
              this.empleado.celular="";
            }
          });
        }else{
          sweetAlert({
            title: "Ohh No!...",
            text:  "Algo esta mal!...La Contrseña no coincide!",
            type:  "error",
          });
        }
      }else{
        sweetAlert({
          title: "Ohh No!...",
          text:  "Algo esta mal!...Asegurese de tener todos los campos llenos del fromulario!",
          type:  "error",
        });
      }
    },
    logout:function(){
      this.$http.get("http://localhost:8000/cafe/logout").then((response)=>{
        this.$router.push("/");
      });
    }
  },
  beforeMount(){
    var username = localStorage.getItem("username");
    this.$http.get("http://localhost:8000/cafe/empleado/"+username).then((res)=>{
      var empleado = res.body;
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

h3{
  margin-left: 50%;
}

.informacion{
  padding-top: 2%;
  padding-left: 40%;
}

.btn{
  margin-left: 30%;
  border-radius: 20px;
  margin-bottom: 0%;
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
