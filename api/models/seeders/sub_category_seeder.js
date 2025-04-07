const SubCategoryModel = require("../sub_category_model");
const CategoryModel = require("../category_model");

const sub_categories = [
    {name: 'سحبة سيجارة', description: 'جوسات سحبة السيجارة', main_category_id: null},
    {name: 'سحبة الأركيلة', description: 'جوسات سحبة الأركيلة', main_category_id: null},
    {name: 'اعادة البناء', description: 'كويلات اعادة البناء', main_category_id: null},
    {name: 'ساب اوم', description: 'كويلات ساب اوم جاهزة', main_category_id: null},
];


const seed = async () => {
    try {
        const mains = await CategoryModel.find();
        sub_categories[0].main_category_id = mains[0]._id;
        sub_categories[1].main_category_id = mains[0]._id;
        sub_categories[2].main_category_id = mains[4]._id;
        sub_categories[3].main_category_id = mains[4]._id;

        await SubCategoryModel.insertMany(sub_categories);

        console.log('SubCategory created');

    } catch (err) {
        console.error(err);
    }

}

module.exports = {seed};