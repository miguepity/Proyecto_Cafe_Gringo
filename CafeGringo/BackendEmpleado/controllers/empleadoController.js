var empleado = require('../schemas/empleado');
var mongoose = require('mongoose');

exports.createEmpleado = {
  handler: function(request, reply){
    var empleados = new empleado({
      Nombre: request.payload.Nombre,
      username : request.payload.username,
      pass: request.payload.pass,
      date: request.payload.date,
      hrIn: request.payload.hrIn,
      hrOut: request.payload.hrOut,
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
    empleado.update({_id: request.params.id},
      {$set:
        {
          Nombre: request.payload.Nombre,
          username : request.payload.username,
          pass: request.payload.pass,
          date: request.payload.date,
          hrIn: request.payload.hrIn,
          hrOut: request.payload.hrOut,
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
    empleado.find({_id : request.params.id}).remove().exec();
    return reply('Empleado borrado con exito!!');
  }
}

exports.getAllEmpleado = {
  handler: function(request, reply){
    var empleados = empleado.find({});
    reply(empleados);
  }
}
