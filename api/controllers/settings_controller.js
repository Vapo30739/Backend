const settingsServices = require("../services/settings_services");
const parseHelper = require("../helpers/response_helper");

const create = async (req, res) => {
    try {
        const { dollar_price } = req.body;
        const settings = await settingsServices.create(dollar_price);
        return parseHelper(res, 201, settings, "created successfully");
    } catch (err) {
        return parseHelper(res, 400, null, err);
    }
}

const get = async (req, res) => {
    try {
        const settings = await settingsServices.get();
        if (!settings.length) throw new Error("There is no settings yet");
        return parseHelper(res, 200, settings, "returned successfully");
    } catch (err) {
        if (err.message === "There is no settings yet")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 400, null, err);
    }
}

const update_dollar_price = async (req, res) => {
    try {

        const { dollar_price } = req.body;
        const settings = await settingsServices.update_dollar_price(dollar_price);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const update_about_us = async (req, res) => {
    try {
        const { about_us } = req.body;
        const settings = await settingsServices.update_about_us(about_us);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const add_hero_photo = async (req, res) => {
    try {
        const { files } = req.body;
        const settings = await settingsServices.add_photo_to_hero(files);
        return parseHelper(res, 201, settings, "added successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const edit_hero_photos = async (req, res) => {
    try {
        const { files } = req.body;
        const {index} = req.params;
        const settings = await settingsServices.edit_hero_photos(files[0], index);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const remove_hero_photo = async (req, res) => {
    try {
        const settings = await settingsServices.remove_hero_photo(req.params.index);
        return parseHelper(res, 204, settings, "deleted successfully");
    } catch (err) {
        console.log(err);
        if (err.message === "photo not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 500, null, err);
    }
}

const update_facebook = async (req, res) => {
    try {
        const { facebook } = req.body;
        const settings = await settingsServices.update_facebook(facebook);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}
const update_whatsapp_channel = async (req, res) => {
    try {
        const { whatsapp_channel } = req.body;
        const settings = await settingsServices.update_whatsapp_channel(whatsapp_channel);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const update_instagram = async (req, res) => {
    try {
        const { instagram } = req.body;
        const settings = await settingsServices.update_instagram(instagram);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const update_youtube = async (req, res) => {
    try {
        const { youtube } = req.body;
        const settings = await settingsServices.update_youtube(youtube);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}


const update_telegram = async (req, res) => {
    try {
        const { telegram } = req.body;
        const settings = await settingsServices.update_telegram(telegram);
        return parseHelper(res, 200, settings, "updated successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const add_whatsapp_account = async (req, res) => {
    try {
        const { link, phone_number, name } = req.body;
        const settings = await settingsServices.add_whatsapp_account(link, phone_number, name);
        return parseHelper(res, 201, settings, "added successfully");
    } catch (err) {
        console.log(err);
        return parseHelper(res, 400, null, err);
    }
}

const remove_whatsapp_account = async (req, res) => {
    try {
        const settings = await settingsServices.remove_whatsapp_account(req.params.index);
        return parseHelper(res, 204, settings, "deleted successfully");
    } catch (err) {
        console.log(err);
        if (err.message === "whatsapp account not found")
            return parseHelper(res, 404, null, err.message);
        return parseHelper(res, 500, null, err);
    }
}


module.exports = {
    create,
    get,
    update_dollar_price,
    add_hero_photo,
    remove_hero_photo,
    update_about_us,
    update_facebook,
    update_instagram,
    update_telegram,
    add_whatsapp_account,
    remove_whatsapp_account,
    edit_hero_photos,
    update_youtube,
    update_whatsapp_channel
};