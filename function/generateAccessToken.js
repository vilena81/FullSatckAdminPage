const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET


function generateAccessToken(email, role) {
    return jwt.sign({ email, role }, SECRET, { expiresIn: "36000s" });
}

module.exports={generateAccessToken}