const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Tasks = require('../models/task');
const SECRET_KEY = 'Balramsaini@123#$';
async function userCreate(req, res) {
    // Create a new user object with the request body data.
    const user = new User(req.body);

    try {
        // Save the user to the database.
        await user.save();

        // Send a success response with the created user data.
        res.status(201).send({ message: 'User created successfully', user });
    } catch (e) {
        // If there is a duplicate key error (11000), send a bad request response.
        // Otherwise, send a server error response.
        if (e.code === 11000) {
            res.status(400).send({ message: 'Email must be unique' });
        } else {
            res.status(500).send({ error: e.message });
        }
    }
}


async function usersGet(req, res) {
    try {
        const users = await User.find({});
        if (!users || users.length === 0) {
            return res.status(404).send({ message: 'Users not found' });
        }
        // Manually populate tasks for each user

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function userGet(req, res) {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id).populate('Tasks','') // Automatically populates the jobs based on the virtual
        
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function userUpdate(req, res) {
    const id = req.params.userId;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true } // This returns the updated document
        );

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'User updated successfully', user });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function userDelete(req, res) {
    const id = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function userLogin (req, res) {
    const {email, password} = req.body

    try{
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).send({message: 'user not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send({message: 'invalid credentials'})
        }
        const token = jwt.sign({ _id: user._id.toString() }, SECRET_KEY, { expiresIn: '1h' });
        // let oldTokens = user.tokens || []

        // if(oldTokens.length){
        //     oldTokens = oldTokens.filter(t => {
        //         const timeDiff = (Date.now() - parseInt(t.signedAt))/1000
        //         if(timeDiff < 86400){
        //             return t
        //         }
        //     })
        // }

        // await User.findByIdAndUpdate(user._id, {tokens: [...oldTokens, {token, signedAt: Date.now().toString()}]})
        res.status(200).send({message: 'login successful', token})
    }catch (e) {
        res.status(500).send({ error: e.message });
    }
}

async function userLogout(req, res) {
    // try {
    //     if (!req.headers.authorization) {
    //         return res.status(401).json({ success: false, message: 'Authorization fail' });
    //     }
        
    //     const token = req.headers.authorization.split(' ')[1];
        
    //     if (!token) {
    //         return res.status(401).json({ success: false, message: 'Authorization fail' });
    //     }

    //     const tokens = req.user.tokens;

    //     const newTokens = tokens.filter(t => t.token !== token);

    //     await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });

    //     res.json({ success: true, message: 'Logout successfully' });
    // } catch (e) {
    //     res.status(500).send({ error: e.message });
    // }
    console.log('Token remove here')
}

module.exports = {
    userCreate, usersGet, userGet, userUpdate, userDelete, userLogin, userLogout
};
