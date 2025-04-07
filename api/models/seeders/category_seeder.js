const CategoryModel = require("../category_model");


const categories = [
    {name: 'جوسات', description: 'أنواع مختلفة من الجوسات للتدخين الإلكتروني'},
    {name: 'أجهزة', description: 'أجهزة وأدوات للتبخير الإلكتروني'},
    {name: 'تانكات', description: 'تانكات للتبخير الإلكتروني'},
    {name: 'إكسسوارات', description: 'إكسسوارات للتبخير الإلكتروني'},
    {name: 'كويلات', description: 'كويلات بديلة للخزانات'},
    {name: 'التصليح', description: 'خدمات إصلاح الأجهزة والتانكات'},
];


const seed = async () => {
    try {
        await CategoryModel.insertMany(categories);
        console.log('Category created');

    } catch (err) {
        console.error(err);
    }

}

module.exports = {seed};