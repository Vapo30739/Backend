const fs = require("fs");
const path = require("path");
const uploadPath = path.join(process.cwd(), 'storage', 'images'); // Where images will be stored
const {v2} = require("cloudinary");
const cloudinary = v2
// Configuration
cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.ClOUDINARY_API_KEY,
    api_secret: process.env.ClOUDINARY_SECRET_KEY,
});

const saveFileLocally = async (fileBuffer, fileName) => {
    try {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory and all parent directories
        }

        const saveTo = path.join(uploadPath, fileName);

        // Write the buffer to the file
        await fs.promises.writeFile(saveTo, fileBuffer);

        return saveTo;
    } catch (err) {
        console.log('Error saving file locally:', err);
        throw new Error('File save failed');
    }
};

const saveFileToCloudinary = async (fileBuffer) => {
    try {

        // Upload the collected buffer to Cloudinary
        return await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', // Automatically detect the file type
                    folder: "AboMariam"
                },
                (error, uploadResult) => {
                    if (error) {
                        console.log('Error uploading to Cloudinary:', error);
                        return reject(error);
                    }
                    resolve(uploadResult);
                }
            );


            const bufferStream = require('stream').Readable.from(fileBuffer);
            bufferStream.pipe(stream);
        });
    } catch (err) {
        console.log('File upload failed:', err);
        throw new Error('File upload failed');
    }
};

const deleteFileFromCloudinary = async (url) => {
    const extracted_url = extractPublicId(url)
    console.log(extracted_url)
    await cloudinary.api.delete_resources(extracted_url);
}


function extractPublicId(url) {
    const start = url.indexOf("AboMariam");
    const end = url.indexOf(".jpg");

    if (start !== -1 && end !== -1) {
        return url.slice(start, end);
    }
    return null;
}

module.exports = {
    saveFileLocally,
    saveFileToCloudinary,
    deleteFileFromCloudinary,
    uploadPath,
}