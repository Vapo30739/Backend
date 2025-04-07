const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});


const CategoryModel = mongoose.model('category', CategorySchema);

module.exports = CategoryModel;
