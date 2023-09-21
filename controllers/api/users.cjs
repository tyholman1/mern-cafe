const User = require("../../models/user.cjs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {
    create,
    login, 
    checkToken
}

async function create(req, res){
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function login(req, res){
    try {
        const user = await User.findOne({ email: req.body.email})
        if(!user) throw new Error("User not found")
        //if we find the email, compare password
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) throw new Error()
        //const token = createJWT(user)
        res.json(createJWT(user))
    } catch (error) {
        console.log(error)
        res.status(400).json("Bad Login")

   
    }
}

function checkToken(req, res){
    console.log(req.user)
    res.json(req.exp)
}

//Helper Function
//function needs 3 params
function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }