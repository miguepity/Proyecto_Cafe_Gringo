var empleado = require('../schemas/empleado');
var mongoose = require('mongoose');

exports.createEmpleado = {
  auth: {
    mode:'try',
    strategy:'session'
  },
  handler: function(request, reply){
    var empleados = new empleado({
      Nombre: request.payload.Nombre,
      username : request.payload.username,
      pass: request.payload.pass,
      date: request.payload.date,
      hrIn: request.payload.hrIn,
      hrOut: request.payload.hrOut,
      scope: request.payload.scope,
    });
    empleados.save(function(err){
      if(!err){
        return reply({
          success: true
        })
      }else{
        return reply({
          success: false
        })
      }
    });
  }
}

exports.getEmpleado = {
  handler: function(request, reply){
    var empleados = empleado.find({username: request.params.username});
    reply(empleados);
  }
}

exports.updateEmpleado = {
  handler: function(request, reply){
    empleado.update({username: request.params.username},
      {$set:
        {
          Nombre: request.payload.Nombre,
          username : request.payload.username,
          pass: request.payload.pass,
          date: request.payload.date,
          hrIn: request.payload.hrIn,
          hrOut: request.payload.hrOut,
          scope: request.payload.scope,
        }
      }, function(err){
        if(err){
          return reply(boom.wrap(err, 'Empleado no encontrado'));
        }else{
          return reply('Actualizado con exito!!');
        }
      }
    );
  }
}

exports.deleteEmpleado = {
  handler: function(request, reply){
    empleado.find({username: request.params.username}).remove().exec();
    return reply('Empleado borrado con exito!!');
  }
}

exports.getAllEmpleado = {
  handler: function(request, reply){
    var empleados = empleado.find({});
    reply(empleados);
  }
}
