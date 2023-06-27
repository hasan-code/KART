const jwt = require('jsonwebtoken');

const User = require('../src/models/users');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: verifyUser._id});
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}


module.exports = userAuth;