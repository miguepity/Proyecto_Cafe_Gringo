<template>
  <div class="row rowNav">
    <div class="container">
      <h3>Eliminar Empleado</h3>
      <div class="row tabla">
        <table class="striped responsive-table">
       <thead>
         <tr>
             <th>Nombre Completo</th>
             <th>Username</th>
             <th>Genero</th>
             <th>Correo</th>
             <th>Celular</th>
             <th>Fechas de trabajo</th>
             <th>Horas de Entrada</th>
             <th>Horas de Salida</th>
             <th>Propiedad</th>
             <th>Accion</th>
         </tr>
       </thead>

       <tbody>
         <tr v-for="(row,index) in empleados">
          <td>{{row.Nombre}}</td>
          <td>{{row.username}}</td>
          <td>{{row.genero}}</td>
          <td>{{row.email}}</td>
          <td>{{row.celular}}</td>
          <td>{{formatDate(row.date)}}</td>
          <td>{{row.hrIn}}</td>
          <td>{{row.hrOut}}</td>
          <td>{{row.scope}}</td>
          <td><a v-on:click="removeEmpleado(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
         </tr>
       </tbody>
     </table>

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
import moment from 'moment';
import baseUrl from '../../config'
export default {

  data () {
    return {
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
      empleados:[

      ]
    }
  },
  methods:{
    removeEmpleado: function(index){
      var todelete =this.empleados;
      var main = this;
      swal({
        title: "Esta seguro de BORRAR a este empelado?",
        text: "No podra recuperlo!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, BORRARLO!",
        closeOnConfirm: false
      },
      function(){
        console.log(todelete.username);
        main.$http.delete(`${baseUrl.uri}/cafe/deletempleado/`+todelete[index].username).then((response)=>{
        });
        todelete.splice(index,1);
        swal("Eliminado!", "Empleado borrado con exito!", "success");
      });

    },
    formatDate(dates){
        const formattedDates = [];
        dates.forEach(date => {formattedDates.push(moment(date).format('MM/DD/YYYY'))})
        console.log(formattedDates);
        return formattedDates.join(', ');
    },
    logout:function(){
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
    var obj;
    this.$http.get(`${baseUrl.uri}/cafe/empleados`).then((response)=>{
      for (var i = 0; i < response.body.length; i++) {
        obj=response.body[i];
        this.empleados.push(obj);
      }
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

.tabla{
  margin-left: 30%;
}

table{
  overflow-y: scroll;

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
