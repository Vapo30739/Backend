const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const UserSChema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    }


}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

UserSChema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSChema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const ItemModel = mongoose.model('user', UserSChema);
module.exports = ItemModel;
