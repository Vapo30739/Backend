const CategoryModel = require('../models/category_model');
const SubCategoryModel = require('../models/sub_category_model');
const { saveFileToCloudinary } = require('../helpers/file_helpers');

const create = async (name, description, image) => {
    const { url } = await saveFileToCloudinary(image.buffer);
    const Category = new CategoryModel({ name: name, description: description, image: url });
    await Category.save();
    return Category;
}

const index = async () => {
    const Categories = CategoryModel.find();
    return Categories;
}

const remove = async (id) => {
    const category = await CategoryModel.findByIdAndDelete(id);
    await SubCategoryModel.deleteMany({ main_category_id: id });
    if (!category) throw new Error("Category not found");
    return category;
}


const update = async (id, name, description, image) => {
    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Category not found");

    if (image) {
        const { url } = await saveFileToCloudinary(image.buffer);
        category.image = url;
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    return category;
}

const get = async (id) => {
    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
}

module.exports = {
    create,
    index,
    remove,
    update,
    get
};
