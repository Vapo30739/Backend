const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ar_name: {
        type: String,
    },

    price: {
        type: Number,
    },

    description: {
        type: String,
    },

    discount: {
        type: Number,
    },

    images: {
        type: [String],
    },

    main_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },

    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    is_hidden: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});


const ItemModel = mongoose.model('item', ItemSchema);

module.exports = ItemModel;
