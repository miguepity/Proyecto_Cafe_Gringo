var joi = require('joi');
var boom = require('boom');
var empleado = require('../schemas/empleado');
var SHA3 = require("crypto-js/sha3");

exports.login = {
    auth: false,
    validate: {
      payload: {
        username: joi.string().required(),
        pass: joi.string().required()
      }
    },
    handler: function(request, reply) {
      var pass = String(SHA3(request.payload.pass));
      empleado.find({username: request.payload.username, pass: pass}, function(err, user){

          if(!err){
            if(empleado.length > 0){
              request.cookieAuth.set(empleado[0]);
              return reply({username: empleado[0].username, scope: empleado[0].scope});
            }
            return reply(boom.unauthorized('Wrong email or password'));
          }
          return reply(boom.notAcceptable('Error Executing Query'));
      });
    }
};
exports.logout = {
    auth: {
      mode:'required',
      strategy:'session'
    },
    handler: function(request, reply) {
      request.cookieAuth.clear();
      return reply('Logout Successful!');
    }
  };
