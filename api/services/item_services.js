const itemModel = require('../models/item_model');
const { saveFileToCloudinary, deleteFileFromCloudinary } = require("../helpers/file_helpers");
const ItemModel = require("../models/item_model");

// Modify the create function
const create = async (name, ar_name, description, price, discount, images, sub_category_id, main_category_id, is_hidden = false) => {
    const item = new itemModel({ name, ar_name, price, discount, description, sub_category_id, main_category_id, is_hidden });
    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        item.images.push(url);
    }
    await item.save();
    return item;
}


const remove = async (id) => {
    const item = await ItemModel.findByIdAndDelete(id);
    if (!item) throw new Error("Item not found");
    for (const image of item.images) {
        await deleteFileFromCloudinary(image);
    }
    return item;
}

const getById = async (id) => {
    return ItemModel.findById(id)
        .populate('main_category_id')
        .populate('sub_category_id');
}


// Modify the update function
const update = async (id, name, ar_name, description, price, discount, sub_category_id, main_category_id, is_hidden) => {
    const item = await itemModel.findById(id);
    if (!item) throw new Error("Item not found");

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.sub_category_id = sub_category_id || item.sub_category_id;
    item.main_category_id = main_category_id || item.main_category_id;
    item.discount = discount || item.discount;
    item.ar_name = ar_name || item.ar_name;
    item.is_hidden = is_hidden !== undefined ? is_hidden : item.is_hidden;
    await item.save();

    return item;
};

// Modify the index function to filter out hidden items by default
const index = async (main_category_id, sub_category_id, max_price, min_price, discount, cursor, limit, include_hidden = false) => {
    const filter = {};
    
    if (!include_hidden) {
        filter.is_hidden = false;
    }
    if (main_category_id) {
        filter.main_category_id = main_category_id;
    }
    if (sub_category_id) {
        filter.sub_category_id = sub_category_id;
    }
    if (max_price) {
        filter.price = { ...filter.price, $lte: max_price };
    }
    if (min_price) {
        filter.price = { ...filter.price, $gte: min_price };
    }
    if (cursor) {
        filter._id = { $gt: cursor };
    }
    if (discount == 1) {
        filter.discount = { ...filter.discount, $gt: 0 };
    }
    if (discount == 0) {
        filter.discount = { ...filter.discount, $lte: 0 };
    }


    return await itemModel.find(filter)
        .limit(limit)
        .populate('main_category_id')
        .populate('sub_category_id');
};

const add_item_photo = async (item_id, images) => {
    const item = await ItemModel.findById(item_id);
    if (!item) throw new Error("faq not found ")
    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        item.images.push(url);
    }

    item.save();
    return item;

}

const remove_item_photo = async (item_id, index) => {
    const item = await ItemModel.findById(item_id);
    if (!item) throw new Error("item not found ")
    console.log(index)
    if (!item.images[index]) throw new Error("photo not found");
    await deleteFileFromCloudinary(item.images[index]);
    item.images.splice(index, 1);
    await item.save();
    return item;
}


const edit_item_photo = async (item_id, index, image) => {
    let item = await ItemModel.findById(item_id);
    item = await remove_item_photo(item_id, index);
    const { url } = await saveFileToCloudinary(image.buffer);
    item.images.splice(index, 0, url);
    await item.save();
    return item;
}

module.exports = {
    create,
    index,
    remove,
    update,
    getById,
    add_item_photo,
    edit_item_photo,
    remove_item_photo
};
