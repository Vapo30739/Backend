const ItemServices = require("../services/item_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const { name, ar_name, description, price, discount, sub_category_id, main_category_id, files, is_hidden } = req.body;
        const item = await ItemServices.create(name, ar_name, description, price, discount, files, sub_category_id, main_category_id, is_hidden);
        return parseHelper(res, 201, item, "created successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const update = async (req, res) => {
    try {
        const { name, ar_name, description, price, discount, sub_category_id, main_category_id, is_hidden } = req.body;
        const item = await ItemServices.update(req.params.id, name, ar_name, description, price, discount, sub_category_id, main_category_id, is_hidden);
        return parseHelper(res, 200, item, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
};

const index = async (req, res) => {
    try {
        const { main_category_id, sub_category_id, max_price, min_price, cursor, limit, discount, include_hidden } = req.query;
        const items = await ItemServices.index(main_category_id, sub_category_id, max_price, min_price, discount, cursor, limit, include_hidden === 'true');
        if (!items.length) throw new Error("There is no items found");
        return parseHelper(res, 200, { items: items, cursor: items[items.length - 1]._id }, "returned successfully");
    } catch (err) {
        if (err.message === "There is no items found")
            return parseHelper(res, 404, null, err.message);
        console.log(err);
        return parseHelper(res, 500, null, err);
    }
}

const remove = async (req, res) => {
    try {
        const items = await ItemServices.remove(req.params.id);
        return parseHelper(res, 204, items, "deleted successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}


const get = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await ItemServices.getById(id);
        if (!item) throw new Error("item not found");
        return parseHelper(res, 200, item, "returned successfully");
    } catch (err) {
        console.log(err);
        if (err.message === "item not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}




const add_item_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const { item_id } = req.params
        const item = await ItemServices.add_item_photo(item_id, files);
        return parseHelper(res, 201, item, "added successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const edit_item_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const { item_id, index } = req.params
        const item = await ItemServices.edit_item_photo(item_id, index, files[0]);
        return parseHelper(res, 200, item, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}


const remove_item_photo = async (req, res) => {
    try {
        const { item_id, index } = req.params
        const item = await ItemServices.remove_item_photo(item_id, index);
        return parseHelper(res, 204, item, "deleted successfully");
    } catch (err) {
        console.log(err);
        if (err.message === "photo not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 500, null, err);
    }
}


module.exports = {
    create,
    index,
    remove,
    update,
    get,
    add_item_photo,
    edit_item_photo,
    remove_item_photo
};