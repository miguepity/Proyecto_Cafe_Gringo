<template>
  <div class="row rowNav">
    <div class="container">
      <h3>Editar Empleado</h3>
      <div class="row username">
        <div class="col s12 m6 l6">
          <input type="text" placeholder="Username para editar" v-model="username">
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
          <input type="password" v-model="pass">
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
          <input class="datepicker">
          <button class="btn" type="button" v-on:click="fecha">Buscar Fecha</button>
        </div>
        <div class="col s12 m5 l4">
          <input type="text" v-model="hrIn">
        </div>
        <div class="col s12 m5 l4">
          <input type="text" v-model="hrOut">
        </div>
      </div>
      <button type="button" class="edit btn" v-on:click="editar">Editar</button>


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

import baseUrl from '../../config'
import moment from 'moment'
import sweetAlert from 'sweetalert'

export default {
  data () {
    return {
      nombre:'',
      username:'',
      pass:'',
      conPass:'',
      date:'',
      hrIn: '',
      hrOut:'',
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
    buscar: function(){
      this.$http.get(`${baseUrl.uri}/cafe/empleado/`+this.empleado.username).then((response)=>{
        if(response.body==""){
          sweetAlert({
            title: "Ohh No!...",
            text:  "Algo esta mal!...Usuario -"+this.username +"- no existe",
            type:  "error",
          });
          this.username="";
        }else{
          this.empleado.Nombre=response.body[0].Nombre;
          this.empleado.email=response.body[0].email;
          this.empleado.celular=response.body[0].celular;
          if(response.body[0].scope==="admin"){
            $('#admin').attr('checked', 'checked');
          }else{
            $('#empleado').attr('checked', 'checked');
          }
          this.empleado.date=response.body[0].date;
          this.empleado.hrIn=response.body[0].hrIn;
          this.empleado.hrOut=response.body[0].hrOut;
        }
      });
    },

    logout:function(){
      this.$http.get(`${baseUrl.uri}/cafe/logout`).then((response)=>{
        this.$router.push("/");
      });
    },
    fecha:function(){
      this.date=$('.datepicker').val();
      this.$http.get(`${baseUrl.uri}/cafe/empleado/`+this.username).then((response)=>{
        var date = response.body[0].date;
        var hrin = response.body[0].hrIn;
        var hrout = response.body[0].hrOut;
        for (var i = 0; i < date.length; i++) {
          for (var j = 0; j < hrin.length; j++) {
            if ((moment(this.date).isSame(hrin[j], 'year') && moment(this.date).isSame(hrin[j], 'month') && moment(this.date).isSame(hrin[j], 'day'))){
              this.hrIn=moment(hrin[j]).format("hh:mm a");
            }
          }
          for (var k = 0; k < hrout.length; k++) {
            if((moment(this.date).isSame(hrout[k], 'year') &&
            moment(this.date).isSame(hrout[k], 'month') && moment(this.date).isSame(hrout[k], 'day'))){
              this.hrOut=moment(hrout[k]).format("hh:mm a");
            }
          }
        }
        if(this.hrIn==="" && this.hrOut===""){
          sweetAlert({
            title: "Ohh No!...",
            text:  "No hay registrada una fecha igual a la ingresada!!",
            type:  "error",
          });
        }
      });
    },
    editar:function(){
      if(this.pass!=="" && this.conPass!==""){
        if(this.pass===this.conPass){
          if($('input[name=prop]:checked').val()==="empleado"){
            this.empleado.scope= "empleado";
          }else if($('input[name=prop]:checked').val()==="admin"){
            this.empleado.scope= "admin";
          }
          if(this.date!==""){
            for (var i = 0; i < this.empleado.date.length; i++) {
              if((moment(this.empleado.date[i]).isSame(this.date, 'year') && moment(this.empleado.date[i]).isSame(this.date, 'month') && moment(this.empleado.date[i]).isSame(this.date, 'day'))){
                for (var j = 0; j < this.empleado.hrIn.length; j++) {
                  if((moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'year') && moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'month') && moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'day'))){
                    var año=moment(this.empleado.date[i]).format('YYYY');
                    var mes=moment(this.empleado.date[i]).format('MM');
                    var dia=moment(this.empleado.date[i]).format('DD');
                    this.empleado.hrIn[j]=moment(año+'-'+mes+'-'+dia+" "+this.hrIn).format();
                  }
                }
                for (var k = 0; k < this.empleado.hrOut.length; k++) {
                  for (var j = 0; j < this.empleado.hrOut.length; j++) {
                    if((moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'year') && moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'month') && moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'day'))){
                      var año=moment(this.empleado.date[i]).format('YYYY');
                      var mes=moment(this.empleado.date[i]).format('MM');
                      var dia=moment(this.empleado.date[i]).format('DD');
                      this.empleado.hrOut[j]=moment(año+'-'+mes+'-'+dia+" "+this.hrOut).format();
                    }
                  }
                }
              }
            }
            if(this.hrIn!="" && this.hrOut!="")
            this.empleado.date.push(moment(this.date).format());
            var año=moment(this.date).format('YYYY');
            var mes=moment(this.date).format('MM');
            var dia=moment(this.date).format('DD');
            this.empleado.hrIn.push(moment(año+'-'+mes+'-'+dia+" "+this.hrIn).format());
            this.empleado.hrOut.push(moment(año+'-'+mes+'-'+dia+" "+this.hrOut).format());
          }

          var nuevo = {
            Nombre:this.empleado.Nombre,
            celular:this.empleado.celular,
            email:this.empleado.email,
            pass:this.pass,
            date:this.empleado.date,
            hrIn:this.empleado.hrIn,
            hrOut:this.empleado.hrOut,
            scope:this.empleado.scope
          }
          this.$http.put("http://localhost:8000/cafe/updatempleado/"+this.username,nuevo).then((res)=>{
            if(res.body.success===true){
              sweetAlert({
                title: "Genial!",
                text:  "Empleado editado con exito!",
                type:  "success",
              });
            }else{
              sweetAlert({
                title: "Ohh No!...",
                text:  "Algo esta mal!...No se pudo editar el empleado!",
                type:  "error",
              });
            }
          });
        }else{
          sweetAlert({
            title: "Ohh No!...",
            text:  "Algo esta mal!...La Contrseña no coincide!",
            type:  "error",
          });
        }
      }
      // else{
      //   if($('input[name=prop]:checked').val()==="empleado"){
      //     this.empleado.scope= "empleado";
      //   }else if($('input[name=prop]:checked').val()==="admin"){
      //     this.empleado.scope= "admin";
      //   }
      //   if(this.date!==""){
      //     for (var i = 0; i < this.empleado.date.length; i++) {
      //       if((moment(this.empleado.date[i]).isSame(this.date, 'year') && moment(this.empleado.date[i]).isSame(this.date, 'month') && moment(this.empleado.date[i]).isSame(this.date, 'day'))){
      //         alert("estamos igual");
      //         for (var j = 0; j < this.empleado.hrIn.length; j++) {
      //           if((moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'year') && moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'month') && moment(this.empleado.date[i]).isSame(this.empleado.hrIn[j], 'day'))){
      //             var año=moment(this.empleado.date[i]).format('YYYY');
      //             var mes=moment(this.empleado.date[i]).format('MM');
      //             var dia=moment(this.empleado.date[i]).format('DD');
      //             this.empleado.hrIn[j]=moment(año+'-'+mes+'-'+dia+" "+this.hrIn).format();
      //           }
      //         }
      //         for (var k = 0; k < this.empleado.hrOut.length; k++) {
      //           for (var j = 0; j < this.empleado.hrOut.length; j++) {
      //             if((moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'year') && moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'month') && moment(this.empleado.date[i]).isSame(this.empleado.hrOut[j], 'day'))){
      //               var año=moment(this.empleado.date[i]).format('YYYY');
      //               var mes=moment(this.empleado.date[i]).format('MM');
      //               var dia=moment(this.empleado.date[i]).format('DD');
      //               this.empleado.hrOut[j]=moment(año+'-'+mes+'-'+dia+" "+this.hrOut).format();
      //             }
      //           }
      //         }
      //       }
      //     }
      //     alert("no hay");
      //     if(this.hrIn!="" && this.hrOut!="")
      //     this.empleado.date.push(moment(this.date).format());
      //     var año=moment(this.date).format('YYYY');
      //     var mes=moment(this.date).format('MM');
      //     var dia=moment(this.date).format('DD');
      //     this.empleado.hrIn.push(moment(año+'-'+mes+'-'+dia+" "+this.hrIn).format());
      //     this.empleado.hrOut.push(moment(año+'-'+mes+'-'+dia+" "+this.hrOut).format());
      //   }
      //
      //   var nuevo = {
      //     Nombre:this.empleado.Nombre,
      //     celular:this.empleado.celular,
      //     email:this.empleado.email,
      //     date:this.empleado.date,
      //     hrIn:this.empleado.hrIn,
      //     hrOut:this.empleado.hrOut,
      //     scope:this.empleado.scope
      //   }
      //   this.$http.put("http://localhost:8000/cafe/updatempleado/"+this.username,nuevo).then((res)=>{
      //     if(res.body.success===true){
      //       sweetAlert({
      //         title: "Genial!",
      //         text:  "Empleado editado con exito!",
      //         type:  "success",
      //       });
      //     }else{
      //       sweetAlert({
      //         title: "Ohh No!...",
      //         text:  "Algo esta mal!...No se pudo editar el empleado!",
      //         type:  "error",
      //       });
      //     }
      //   });
      // }
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
