<template>
  <form>
    <div class="row">
      <div class="col s12 m12 l12">

        <div class="container">
          <label><b>Usuario</b></label>
          <input class="username" type="text" placeholder="Ingrese Usuario" required v-model="user.username">

          <label><b>Contraseña</b></label>
          <input class="pass" type="password" placeholder="Ingrese Contraseña" required v-model="user.pass">


          <div class="btn1 col s12 m6">
            <a class="waves-effect waves-light btn"  @click="clickLogin">Log in</a>
          </div>
          <div class="pass col s12 m6">
            <span class="psw"><a href="#" class="flow-text">Forgot password?</a></span>
          </div>

        </div>
      </div>
    </div>
    <div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&timezone=America%2FTegucigalpa" width="100%" height="130" frameborder="0" seamless></iframe>

          <h4>{{bienvenido}} {{userLogin.Nombre}}</h4>
            <div class="row">
              <div class="col s4" >
                <p>Fecha:</p>
                <p class="date">{{userLogin.date}}</p>
              </div>
              <div class="col s4 " >
                <p>Hora de Entrada:</p>
                <p  class="start">{{userLogin.hrIn}}</p>
              </div>
              <div class="col s4" >
                <p>Hora de Salida:</p>
                <p class="finish">{{userLogin.hrOut}}</p>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat boton" @click="agree">{{textoBoton}}</a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
var moment = require('moment')
export default {
  data(){
    return{
      user:{
        username:"",
        pass:""
      },
      userLogin:{
        username:"",
        Nombre:"",
        genero:"",
        hrIn:"",
        hrOut:""
      },
      bienvenido:"",
      textoBoton: ""
    }
  },
  methods:{
    clickLogin: function(){
      console.log("Entrando!");

      if (this.user.username == "" || this.user.pass == "") {
        sweetAlert({
            title: "Ohh No!...",
            text:  "Algo esta mal!...Ingrese Usuario y Contraseña!",
            type:  "error",
          });
      }else{


        this.$http.get("http://localhost:8000/cafe/empleado/"+this.user.username).then((res2)=>{
          var empleado = res2.body;
          this.userLogin.Nombre = empleado[0].Nombre;
          this.userLogin.username = empleado[0].username;
          this.userLogin.genero = empleado[0].genero;
          if (this.userLogin.genero === "M") {
            this.bienvenido = "Bienvenido";
          }else if (this.userLogin.genero === "F") {
            this.bienvenido = "Bienvenida";
          }
          // this.userLogin.date = empleado[0].date;
          // this.userLogin.hrIn = empleado[0].hrIn;
          // this.userLogin.hrOut = empleado[0].hrOut;
        });



        this.$http.post("http://localhost:8000/cafe/login", this.user).then((res)=>{
          if (res.body.success === true) {
            localStorage.setItem("username", this.user.username);
            if (res.body.scope === "empleado") {

              $('.modal').modal('open');
              this.user.username = "";
              this.user.pass = "";
              // $('.username').val("");
              // $('.pass').val("");
            }else if(res.body.scope === "admin"){
              this.$router.push("/admi")
              this.user.username = "";
              this.user.pass = "";
            }
          }else if(res.body.success === false) {
            console.log("entra al else")
            sweetAlert({
               title: "Ohh No!...",
               text:  "Algo esta mal!...Usuario o contraseña incorrectos",
               type:  "error",
             });
             $('.username').val("");
             $('.pass').val("");
          }
        });

        var userGetHoras={
          username: localStorage.getItem("username"),
          date: moment().format()
        }
        this.userLogin.date = moment().format("DD-MM-YYYY");

        // this.$http.get("http://localhost:8000/cafe/gethoras", userGetHoras).then((res)=>{
        //   console.log(res.body)
        //   // this.userLogin.hrIn = moment(res.body.hrIn, "hmm").format("HH:mm");
        //   // this.userLogin.hrOut = moment(res.body.hrOut, "hmm").format("HH:mm");
        //  var message = res.body.message;
        if (message === "entra") {
          this.textoBoton = "Marcar Entrada"
        }else if (message === "sale") {
          this.textoBoton = "Marcar Salida"
        }
        // });

      }


    },
    agree:function(){
      var hrInF = "";
      var hrOutF = "";
      if (this.textoBoton === "Marcar Entrada") {
        hrInF = moment().format();
        hrOutF = "nada"
      }else{
        hrInF = this.userLogin.hrIn;
        hrOutF = moment().format();
      }

      var userEnvio ={
        date: moment().format(),
        username: localStorage.getItem("username"),
        hrIn: hrInF,
        hrOut: hrOutF
      }
      this.$http.get("http://localhost:8000/cafe/sethoras", userEnvio).then((res)=>{
        if (res.body.success === true) {
          sweetAlert({
              title: "Perfecto!",
              text:  "Hora registrada con exito",
              type:  "success",
            });
        }else{
          sweetAlert({
             title: "Ohh No!...",
             text:  "Algo esta mal!... Contacta al administrador!",
             type:  "error",
           });
        }
        $('.modal').modal('close');
        $('.username').val("");
        $('.pass').val("");
      });
    }
  },
}
</script>

<style scoped>

form{
  border: 3px solid #f1f1f1;
  font-family: 'Roboto', sans-serif;
  background-image: url("./image/cafe-cup.jpg");
  background-position:bottom;
  position: relative;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

input[type=text]::-webkit-input-placeholder, input[type=password]::-webkit-input-placeholder {
  color: black;
}

input[type=text], input[type=password]{
    width: 100%;
    padding: 2% 4%;
    margin: 2% 0;
    display: inline-block;
    box-sizing: border-box;
    background-color: white;
}

input[type=text]{
  margin-bottom: 10%;
}

.btn1{
  padding-left: 0%;
}

.btn{
    background-color: #4CAF50;
    color: white;
    padding: 2% 15%;
    margin: 2% 0;
    border: none;
    cursor: pointer;
    height: 18%;
}

.btn:hover {
    opacity: 0.8;
}

.container {
    background-color: rgba(255,255,255,.60);
    margin-top: 5%;
    padding-top: 2%;
    padding-left: 6%;
    padding-right: 8%;
    border-right-width: 5%;
    padding-bottom: 8%;
    width: 40%;
    margin-left: 55%;
    border-radius: 6px 6px 6px 6px;
}

.pass{
  padding-left: 25%;
}

.psw a{
  padding-left: 10%;
  font-size: 120%;
}

form label{
  color: black;
  font-size: 139%;
}

</style>
