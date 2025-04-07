const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
    },

    images: {
        type: [String],
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


const FaqModel = mongoose.model('faq', FaqSchema);

module.exports = FaqModel;
