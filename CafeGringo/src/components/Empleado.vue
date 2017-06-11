<template>
  <form>
    <div class="row">
      <div class="col s12">

        <div class="container">
          <label><b>Usuario</b></label>
          <input class="username" type="text" placeholder="Ingrese Usuario" required>

          <label><b>Contraseña</b></label>
          <input class="pass" type="password" placeholder="Ingrese Contraseña" required>

          <a class="waves-effect waves-light btn"  @click="clickLogin">Log in</a>
          <span class="psw"><a href="#">Forgot password?</a></span>
        </div>
      </div>
    </div>
    <div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=es&timezone=America%2FTegucigalpa" width="100%" height="130" frameborder="0" seamless></iframe>

          <h4>{{Nombre}}</h4>
            <div class="row">
              <div class="col s4" >
                <p>Fecha:</p>
                <p class="date">{{date}}</p>
              </div>
              <div class="col s4 " >
                <p>Hora de Entrada:</p>
                <p  class="start">{{hrIn}}</p>
              </div>
              <div class="col s4" >
                <p>Hora de Salida:</p>
                <p class="finish">{{hrOut}}</p>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat boton" @click="agree">Aceptar</a>
        </div>
      </div>
      <!--  -->
    </div>
  </form>
</template>

<script>
export default {
  data(){
    return{
      Id: '',
      Nombre:'',
      Pass:'',
      date:[],
      hrIn:[],
      hrOut:[],
    }
  },
  methods:{
    clickLogin: function(){
      if($('.username').val()!=="" && $('.pass').val()!==""){
        $('.modal').modal('open');
        $('.username').val("");
        $('.pass').val("");
      }else{
        sweetAlert({
          title: "Ohh No!...",
          text:  "Algo esta mal!...Ingrese Usuario y Contraseña!",
          type:  "error",
        });
        $('.username').val("");
        $('.pass').val("");
      }
    },
    agree:function(){
    }
  },
  mounted(){
  },
}
</script>

<style scoped>

form{
  border: 3px solid #f1f1f1;
  font-family: 'Roboto', sans-serif;
  background-image: url("./image/cafe-cup.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 243px;
  background-position:bottom;
}

input[type=text]::-webkit-input-placeholder, input[type=password]::-webkit-input-placeholder {
  color: black;
}

input[type=text], input[type=password]{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    box-sizing: border-box;
    background-color: white;
}

input[type=text]{
  margin-bottom: 40px;
}

.btn{
    background-color: #4CAF50;
    color: white;
    padding: 5px 20px;
    margin: 8px 0px;
    border: none;
    cursor: pointer;
    height: 45px;
}

.btn:hover {
    opacity: 0.8;
}

.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}

.container {
  background-color: rgba(255,255,255,.60);
    margin-top: 5%;
    padding-top: 40px;
    padding-left: 100px;
    padding-right: 100px;
    margin-right: 0px;
    border-right-width: 20px;
    padding-bottom: 40px;
    height: 340px;
    width: 600px;
    margin-left: 670px;
    border-radius: 6px 6px 6px 6px;
}

span.psw {
    float: right;
    padding-top: 20px;
}

form label{
  color: black;
  font-size: 20px;
}


</style>
