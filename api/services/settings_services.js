const SettingsModel = require('../models/settings_model');
const { saveFileToCloudinary, uploadPath, deleteFileFromCloudinary } = require("../helpers/file_helpers");


const get = async () => {
    return SettingsModel.find();
}

const update_dollar_price = async (dollar_price) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.dollar_price = dollar_price;
    settings.save();
    return settings;
}

const update_about_us = async (about_us) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.about_us = about_us;
    settings.save();
    return settings;
}

const add_photo_to_hero = async (images) => {
    const settings = await SettingsModel.findOne();

    if (!settings)
        settings = new SettingsModel.create();

    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        settings.hero.push(url);
    }

    settings.save();
    return settings;

}

const edit_hero_photos = async (file, index) => {
    let settings = await SettingsModel.findOne();
    settings = await remove_hero_photo(index);
    const { url } = await saveFileToCloudinary(file.buffer);
    settings.hero.splice(index, 0, url);
    await settings.save();
    return settings;
}

const remove_hero_photo = async (index) => {
    const settings = await SettingsModel.findOne();
    if (!settings.hero[index]) throw new Error("photo not found");
    await deleteFileFromCloudinary(settings.hero[index]);
    settings.hero.splice(index, 1);
    await settings.save();
    return settings;
}

const update_facebook = async (facebook) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.social_media.facebook = facebook;
    settings.save();
    return settings;
}

const update_youtube = async (youtube) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.social_media.youtube = youtube;
    settings.save();
    return settings;
}

const update_whatsapp_channel = async (whatsapp_channel) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.social_media.whatsapp_channel = whatsapp_channel;
    settings.save();
    return settings;
}
const update_instagram = async (instagram) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.social_media.instagram = instagram;
    settings.save();
    return settings;
}

const update_telegram = async (telegram) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    settings.social_media.telegram = telegram;
    settings.save();
    return settings;
}

const add_whatsapp_account = async (link, phone_number, name) => {
    settings = await SettingsModel.findOne();
    if (!settings)
        settings = new SettingsModel.create()
    const whatsapp = {
        link, phone_number, name
    }
    settings.social_media.whatsapp.push(whatsapp);
    settings.save();
    return settings;
}

const remove_whatsapp_account = async (index) => {
    settings = await SettingsModel.findOne();
    if (!settings.social_media.whatsapp[index]) throw new Error("whatsapp account not found")
    settings.social_media.whatsapp.splice(index, 1);
    settings.save();
    return settings;
}


module.exports = {
    get,
    update_dollar_price,
    add_photo_to_hero,
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
