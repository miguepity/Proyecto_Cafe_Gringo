var mongoose = require('mongoose');

var EmpleadoSchema = new mongoose.Schema({

  Nombre: String,
  username : String,
  pass: String,
  date: [Date],
  hrIn: [Date],
  hrOut: [Date],

});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
