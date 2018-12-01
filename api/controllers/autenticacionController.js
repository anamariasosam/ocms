const jwt = require('jsonwebtoken'),
  Usuario = require('../models/usuario'),
  keys = require('../../config/keys'),
  utils = require('../handlers/utils')

function generateToken(usuario) {
  return jwt.sign(usuario, keys.secret, {
    expiresIn: 36000, // in seconds
  })
}

function setUsuarioInfo(request) {
  return {
    _id: request._id,
    nombre: request.nombre,
    apellido: request.apellido,
    correo: request.correo,
    password: request.password,
    rol: request.rol,
  }
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
  Usuario.findOne({ correo: req.body.correo }).exec((err, usuario) => {
    let usuarioInfo = setUsuarioInfo(usuario)

    res.status(201).json({
      token: 'JWT ' + generateToken(usuarioInfo),
      usuario: usuarioInfo,
    })
  })
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const correo = req.body.correo
  const password = req.body.password
  const rol = req.body.rol

  // Return error if no correo provided
  if (!correo) {
    return res.status(422).send({ error: 'You must enter an correo address.' })
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' })
  }

  Usuario.findOne({ correo: correo }, function(err, existingUsuario) {
    if (err) {
      return next(err)
    }

    // If usuario is not unique, return error
    if (existingUsuario) {
      return res.status(422).send({ error: 'That correo address is already in use.' })
    }

    // If correo is unique and password was provided, create account
    let usuario = new Usuario({
      nombre,
      apellido,
      correo,
      password,
      rol,
    })

    usuario.save((err, usuario) => {
      utils.show(res, err, usuario)
    })
  })
}

exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const usuario = req.usuario

    Usuario.findById(usuario._id, function(err, foundUsuario) {
      if (err) {
        res.status(422).json({ error: 'No usuario was found.' })
        return next(err)
      }

      // If usuario is found, check role.
      if (foundUsuario.role == role) {
        return next()
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' })
      return next('Unauthorized')
    })
  }
}
