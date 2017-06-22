<template lang="html">
  <div class="row rowNav">
    <div class="container">
      <h3>Generar Reporte</h3>
      <div class="row informacion">
        <div class="col s12 m12 l5">
          <input type="text" placeholder="Username"  required v-model="username">
        </div>
      </div>

      <div class="row respuesta">
        <div class="col s12 m5 l4">
          <label for="fechaInicio"></label>
          <input class="datepicker" name="fechaInicio" id="inicio">
        </div>
        <div class="col s12 m5 l4">
          <label for="fechaFin"></label>
          <input class="datepicker" name="fechaFin" id="fin">
        </div>
      </div>


      <div class="row informacion">
        <div class="col s12 m12 l12">
          <button class="btn" type="button" name="button" v-on:click="generarReporte">Generar Reporte</button>
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
                <a><i class="fa fa-users" aria-hidden="true"></i>Cafe el Gringo</a>
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
                <a><i class="fa fa-ban" aria-hidden="true"></i>Eliminar Empleado</a>
              </li>
            </router-link>
            <router-link to="/editempleado">
              <li>
                <a><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Editar Empleado</a>
              </li>
            </router-link>
            <li>
              <a ><i v-on:click="logout" class="fa fa-sign-out" aria-hidden="true"></i>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import sweetAlert from 'sweetalert'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import baseUrl from '../../config'

export default {
  data(){
    return{
      username:'',
      fechaInicio:'',
      fechaFin:'',
      empleadoThis: {
        date : [],
        hrIn : [],
        hrOut : [],
        Nombre: ''
      }
    }
  },
  methods:{
    generarReporte:function(){
      var $dateInicio = $('#inicio').pickadate();
      var picker = $dateInicio.pickadate('picker')
      var fechaInicioo = picker.get('value');


      var $dateFin = $('#fin').pickadate();
      var picker = $dateFin.pickadate('picker')
      var fechaFinn = picker.get('value');

      this.fechaInicio = moment(fechaInicioo).format();
      this.fechaFin = moment(fechaFinn).format();

      var before = moment(this.fechaInicio).isBefore(this.fechaFin);

      if (this.username === '' && before === false) {
        sweetAlert({
          title: "Ohh No!...",
          text:  "Algo esta mal!...Ingrese usuario y un rango de fechas valido",
          type:  "error"
        });
      }else if (this.username === '') {
        sweetAlert({
          title: "Ohh No!...",
          text:  "Algo esta mal!...Ingrese usuario",
          type:  "error"
        });
      }else if (before === false) {
        sweetAlert({
          title: "Ohh No!...",
          text:  "Algo esta mal!...Ingrese un rango de fechas valido",
          type:  "error"
        });
      }
      var Empleado;
      this.$http.get(`${baseUrl.uri}/cafe/empleado/`+this.username).then((res)=>{
        Empleado = res.body;
        this.empleadoThis.date = Empleado[0].date;
        console.log("Empleado.date: "+Empleado[0].date);
        this.empleadoThis.hrIn = Empleado[0].hrIn;
        this.empleadoThis.hrOut = Empleado[0].hrOut;
        this.empleadoThis.Nombre = Empleado[0].Nombre;
        var columns = ["Fecha", "Hora de entrada", "Hora de salida"];
        var cantDates = this.empleadoThis.date.length;
        console.log("cantDates: "+cantDates);
        var rows = [];
        var encontroEntrada = false, encontroSalida = false;
        var hrEntrada = '', hrSalida = '';
        var date = this.empleadoThis.date;
        var hrIn = this.empleadoThis.hrIn;
        var hrOut = this.empleadoThis.hrOut;
        for (var i = 0; i < this.empleadoThis.date.length; i++) {
          for (var j = 0; j < this.empleadoThis.hrIn.length; j++) {
            if (moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrIn[j], 'year') && moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrIn[j], 'month') && moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrIn[j], 'day')) {
              encontroEntrada = true;
              console.log("encontro entrada");
              hrEntrada = moment(this.empleadoThis.hrIn[j]).format("hh:mm a")
            }
          }
          for (var j = 0; j < this.empleadoThis.hrOut.length; j++) {
            if (moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrOut[j], 'year') && moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrOut[j], 'month') && moment(this.empleadoThis.date[i]).isSame(this.empleadoThis.hrOut[j], 'day')) {
              encontroSalida = true;
              console.log("encontro salida");
              hrSalida = moment(this.empleadoThis.hrOut[j]).format("hh:mm a")
            }
          }
          if (encontroEntrada && encontroSalida) {
            var newDate = moment(this.empleadoThis.date[i]).zone("-0600").format("DD-MM-YYYY")
            rows.push([newDate, hrEntrada, hrSalida]);
            encontroEntrada = false;
            encontroSalida = false;
            hrEntrada = '';
            hrSalida = '';
          }else if (encontroEntrada && !encontroSalida) {
            var newDate = moment(this.empleadoThis.date[i]).zone("-0600").format("DD-MM-YYYY")
            rows.push([newDate, hrEntrada, "-"]);
            encontroEntrada = false;
            encontroSalida = false;
            hrEntrada = '';
            hrSalida = '';
          }else if (!encontroEntrada && encontroSalida) {
            var newDate = moment(this.empleadoThis.date[i]).zone("-0600").format("DD-MM-YYYY")
            rows.push([newDate, "-", hrSalida]);
            encontroEntrada = false;
            encontroSalida = false;
            hrEntrada = '';
            hrSalida = '';
          }else if (!encontroEntrada && !encontroSalida) {
            var newDate = moment(this.empleadoThis.date[i]).zone("-0600").format("DD-MM-YYYY")
            rows.push([newDate, "-", "-"]);
            encontroEntrada = false;
            encontroSalida = false;
            hrEntrada = '';
            hrSalida = '';
          }
        }
        var NombreUsuario = this.empleadoThis.Nombre;
        var usernameUsuario = this.username;
        var doc = new jsPDF('p', 'pt');
        //doc.text('Reporte de Horas', 40, 250, 'center');
        doc.autoTable(columns, rows,{
          margin: {top: 160},
          addPageContent: function(data){
            var text = "Reporte de Horas",
            xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2);
            doc.text(text, xOffset, 70);
            doc.text("Nombre: "+NombreUsuario, 45, 100);
            doc.text("Username: "+usernameUsuario, 45, 120);
          }
        });
        doc.save('table.pdf');
      });

      console.log("inicio: "+this.fechaInicio +" fin: "+this.fechaFin);
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
  },
  mounted(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
    });
  }

}
</script>

<style lang="css">
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
  padding-left: 60%;
}

.respuesta{
  padding-left: 50%;
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

.row .col{
  padding: 0 0;
}
.datepicker{
  margin: 0 50%;
}
</style>
