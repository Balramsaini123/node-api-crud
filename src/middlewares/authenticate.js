const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'Balramsaini@123#$'; // Replace with your actual secret key

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
