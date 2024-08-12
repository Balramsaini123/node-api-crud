const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    user_image: {
        type: String,
        default: null,
        require: true
    }
    // tokens: [{type: Object}],
});

// Define a virtual property for jobs
userSchema.virtual('Tasks', {
    ref: 'Tasks', // The model to use
    localField: '_id', // Find jobs where `localField`
    foreignField: 'user_id', // is equal to `foreignField`
    justOne: false, // true for one-to-one relationships, false for one-to-many
});

// Make sure virtual fields are included in output
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 7);
    }

    next();
});


// Ensure the unique index is created
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
