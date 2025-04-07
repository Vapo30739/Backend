const mongoose = require("mongoose");


const SubCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    main_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
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

const SubCategoryModel = mongoose.model('sub_category', SubCategory);

module.exports = SubCategoryModel;
