const jwt = require('jsonwebtoken')

function checkAdmin(req, res){
    const tokenadmin = req.headers.authorization;
    const decoded = jwt.decode(tokenadmin)

    if (decoded.role === 0){
      return true
    } else {
      return false
    }
  }

  module.exports = {checkAdmin}