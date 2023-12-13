const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const puerto = 3000;

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize('app_schema', 'root', '@12Aresop23#', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definición del modelo de Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});
// Sincronización de la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/formulario.html');
});

// Ruta para manejar el envío del formulario
app.post('/agregar-usuario', async (req, res) => {
  const { nombre, correo } = req.body;

  try {
    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
    });

    res.send('Usuario agregado correctamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar usuario.');
  }
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});



