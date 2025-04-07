const { saveFileToCloudinary, deleteFileFromCloudinary } = require("../helpers/file_helpers");
const FaqModel = require("../models/faq_model")

const create = async (question, answer, images) => {
    const Faq = new FaqModel({ question, answer });
    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        Faq.images.push(url);
    }
    await Faq.save();
    return Faq;
}

const index = async () => {
    return FaqModel.find();
}

const get = async (faq_id) => {
    return FaqModel.findById(faq_id);
}

const remove = async (id) => {
    const faq = await FaqModel.findByIdAndDelete(id);
    for (const image in faq.images) {
        await deleteFileFromCloudinary(faq.images[image])
    }
    return faq;
}

const update = async (id, question, answer) => {
    const faq = await FaqModel.findById(id);
    if (!faq) throw new Error("faq does not exist");

    if (question) faq.question = question;
    if (answer) faq.answer = answer;

    await faq.save();

    return faq;
}

const add_faq_photo = async (id, images) => {
    const faq = await FaqModel.findById(id);
    if (!faq) throw new Error("faq not found ")
    for (const image in images) {
        const { url } = await saveFileToCloudinary(images[image].buffer);
        faq.images.push(url);
    }

    faq.save();
    return faq;

}


const remove_faq_photo = async (id, index) => {
    const faq = await FaqModel.findById(id);
    if (!faq) throw new Error("faq not found ")
    if (!faq.images[index]) throw new Error("photo not found");
    console.log(`removing ${faq.images[index]}`)
    await deleteFileFromCloudinary(faq.images[index]);
    faq.images.splice(index, 1);
    await faq.save();
    return faq;
}


const edit_faq_photo = async (id, index, image) => {
    let faq = await FaqModel.findById(id);
    faq = await remove_faq_photo(id, index);
    const { url } = await saveFileToCloudinary(image.buffer);
    faq.images.splice(index, 0, url);
    await faq.save();
    return faq;
}

module.exports = {
    create,
    index,
    remove,
    update,
    add_faq_photo,
    remove_faq_photo,
    edit_faq_photo,
    get
}