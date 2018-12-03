const jwt = require('jsonwebtoken'),
  Usuario = require('../models/usuario'),
  keys = require('../../config/keys'),
  utils = require('../handlers/utils')

function generateToken(usuario) {
  return jwt.sign(usuario, keys.secret, {
    expiresIn: 36000,
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

exports.login = function(req, res, next) {
  Usuario.findOne({ correo: req.body.correo }).exec((err, usuario) => {
    const usuarioInfo = setUsuarioInfo(usuario)

    res.status(201).json({
      token: 'JWT ' + generateToken(usuarioInfo),
      usuario: usuarioInfo,
    })
  })
}

exports.register = function(req, res, next) {
  const nombre = req.body.nombre,
    apellido = req.body.apellido,
    correo = req.body.correo,
    password = req.body.password,
    rol = req.body.rol,
    programa = req.body.programa

  if (!correo) {
    return res.status(422).send({ error: 'Debes ingresar un correo.' })
  }

  if (!password) {
    return res.status(422).send({ error: 'Debes ingresar un password.' })
  }

  Usuario.findOne({ correo: correo }, function(err, existingUsuario) {
    if (err) {
      return next(err)
    }

    if (existingUsuario) {
      return res.status(422).send({ error: 'El correo ya está en uso' })
    }

    const usuario = new Usuario({
      nombre,
      apellido,
      correo,
      password,
      rol,
      programa,
    })

    usuario.save((err, usuario) => {
      utils.show(res, err, usuario)
    })
  })
}

exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const usuario = req.user

    Usuario.findById(usuario._id, function(err, foundUsuario) {
      if (err) {
        res.status(422).json({ error: 'No se encontró el usuario.' })
        return next(err)
      }

      if (foundUsuario.rol == role) {
        return next()
      }

      res.status(401).json({ error: 'No tienes permisos para relizar esta acción.' })
      return next('Unauthorized')
    })
  }
}
