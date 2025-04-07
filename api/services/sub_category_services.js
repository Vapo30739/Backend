const SubCategoryModel = require('../models/sub_category_model');

const create = async (name, description, main_category_id) => {
    const subCategory = new SubCategoryModel({name: name, description: description, main_category_id});
    await subCategory.save();
    return subCategory;
}

const index = async (main_category_id) => {
    const filter = {};

    if (main_category_id) {
        filter.main_category_id = main_category_id;
    }
    return SubCategoryModel.find(filter).populate("main_category_id");
}

const remove = async (id) => {
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    if (!subCategory) throw new Error("SubCategory not found");
    return subCategory;
}

const update = async (id, name, description, main_category_id) => {
    const subCategory = await SubCategoryModel.findByIdAndUpdate(id, {
        name,
        description,
        main_category_id
    }, {new: true});
    if (!subCategory) throw new Error("SubCategory not found");
    return subCategory;
}


module.exports = {
    create,
    index,
    remove,
    update
};
