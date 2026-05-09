const Usuario = require('../models/usuario.model');

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    res.status(201).json({ token, usuario: { nombre, email } });
  } catch (error) {
    res.status(400).json({ message: 'Error en el registro', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email, password });
    if (!usuario) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

module.exports = { registro, login };