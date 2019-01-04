exports.show = function(res, err, data) {
  if (err) {
    res.status(422).send({
      error: 'Ocurrió un error, revisa la información',
      description: err,
    })
  } else {
    res.send(data)
  }
}
