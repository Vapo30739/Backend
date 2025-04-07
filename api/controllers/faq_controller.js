const faqServices = require("../services/faq_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const { question, answer, files } = req.body;
        const faq = await faqServices.create(question, answer, files);
        return parseHelper(res, 201, faq, "created successfully");
    } catch (err) {
        console.log(err)
        return parseHelper(res, 400, null, err);
    }
}

const index = async (_, res) => {
    try {
        const faqs = await faqServices.index();
        if (!faqs.length) throw new Error("There is no faqs found");
        return parseHelper(res, 200, faqs, "returned successfully");
    } catch (err) {
        if (err.message === "There is no faqs found")
            return parseHelper(res, 404, null, err.message);
        console.log(err);
        return parseHelper(res, 500, null, err);
    }
}

const get = async (req, res) => {
    try {
        const { faq_id } = req.params;
        const faqs = await faqServices.get(faq_id);
        if (!faqs) throw new Error("faq not found");
        return parseHelper(res, 200, faqs, "returned successfully");
    } catch (err) {
        if (err.message === "faq not found")
            return parseHelper(res, 404, null, err.message);
        console.log(err);
        return parseHelper(res, 500, null, err);
    }
}

const update = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const { faq_id } = req.params;

        const faq = await faqServices.update(faq_id, question, answer);
        if (!faq) throw new Error("faq does not exist");
        return parseHelper(res, 200, faq, "updated successfully");

    } catch (err) {
        if (err.message === 'faq does not exist')
            return parseHelper(res, 404, null, err.message);
        console.log(err)
        return parseHelper(res, 500, null, err);

    }
}

const add_faq_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const { faq_id } = req.params
        const faq = await faqServices.add_faq_photo(faq_id, files);
        return parseHelper(res, 201, faq, "added successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const edit_faq_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const { faq_id, index } = req.params
        const faq = await faqServices.edit_faq_photo(faq_id, index, files[0]);
        return parseHelper(res, 200, faq, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}


const remove_faq_photo = async (req, res) => {
    try {
        const { faq_id, index } = req.params
        const faq = await faqServices.remove_faq_photo(faq_id, index);
        return parseHelper(res, 204, faq, "deleted successfully");
    } catch (err) {
        console.log(err);
        if (err.message === "photo not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 500, null, err);
    }
}


const remove = async (req, res) => {
    try {
        const { faq_id } = req.params;
        const faq = await faqServices.remove(faq_id);
        if (!faq) throw new Error("faq does not exist");
        return parseHelper(res, 204, faq, "removed successfully");

    } catch (err) {
        if (err.message === 'faq does not exist')
            return parseHelper(res, 404, null, err.message);
        console.log(err)
        return parseHelper(res, 500, null, err);
    }
}


module.exports = {
    create,
    index,
    remove,
    add_faq_photo,
    remove_faq_photo,
    edit_faq_photo,
    update,
    get
};