const CategoryServices = require("../services/category_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const {name, description,files} = req.body;
        const category = await CategoryServices.create(name, description,files[0]);
        return parseHelper(res, 201, category, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const index = async (req, res) => {
    try {
        const categories = await CategoryServices.index();
        if (!categories.length) throw new Error("There is no categories yet");
        return parseHelper(res, 200, categories, "returned successfully");
    } catch (err) {
        if (err.message === "There is no categories yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }

}

const remove = async (req, res) => {
    try {
        const category = await CategoryServices.remove(req.params.id);
        return parseHelper(res, 204, category, "deleted successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const update = async (req, res) => {
    try {
        const {name,description,files} = req.body;

        const category = await CategoryServices.update(req.params.id,name, description,files[0]);
        return parseHelper(res, 200, category, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const get = async (req, res) => {
    try {
        const category = await CategoryServices.get(req.params.id);
        return parseHelper(res, 200, category, "returned successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

module.exports = {
    create,
    index,
    remove,
    update,
    get
};