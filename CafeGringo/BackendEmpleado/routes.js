var empleadoController = require('./controllers/empleadoController');


exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API empleado, Empleado')}}},
	{method: 'POST', path: '/empleado/create', config: empleadoController.createEmpleado},
	{method: 'GET', path: '/empleado/login/{username}', config: empleadoController.getEmpleado},
  {method: 'PUT', path: '/empleado/update/{id}', config: empleadoController.updateEmpleado},
	{method: 'DELETE', path: '/empleado/deletee/{id}', config: empleadoController.deleteEmpleado},
	{method: 'GET', path: '/empleado/empleados', config: empleadoController.getAllEmpleado},
];
