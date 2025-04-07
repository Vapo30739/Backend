const mongoose = require('mongoose');



const WhatsAppScehma = new mongoose.Schema({
    link: {
        type: String,
    },
    phone_number: {
        type: String
    },
    name: {
        type: String
    }
}, { _id: false })

const SocialMediaSchema = new mongoose.Schema({
    facebook: {
        type: String,
        default: "facebook"

    },
    whatsapp: {
        type: [WhatsAppScehma],
    },
    telegram: {
        type: String,
        default: "telegram"
    },
    instagram: {
        type: String,
        default: "instagram"
    },
    youtube: {
        type: String,
        default: "youtube"
    },
    whatsapp_channel: {
        type: String,
        default: "whatsapp channel"
    }
}, { _id: false });


const SettingsSchema = new mongoose.Schema({
    dollar_price: {
        type: Number,
        required: true,
        default: 0
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category',
    },
    hero: {
        type: [String],
    },
    about_us: {
        type: String,
        default: "this is about_us"
    },
    social_media: {
        type: SocialMediaSchema,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});


const SettingsModel = mongoose.model('settings', SettingsSchema);

module.exports = SettingsModel;
