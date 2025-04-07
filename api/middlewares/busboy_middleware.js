const busboy = require("busboy");
const parseHelper = require("../helpers/response_helper");

const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE * 1024 * 1024 || 5 * 1024 * 1024;

const bus = (req, res, next) => {
    try {
        if (!req.is('multipart/form-data')) {
            return next();
        }
        const bb = busboy({headers: req.headers});

        // Initialize arrays to store file data and form fields
        req.body.files = [];

        // Handle file upload
        bb.on('file', (fieldName, file, info) => {
            const {filename, mimeType} = info;
            if (!mimeType.startsWith('image/')) {
                throw new Error('fileTypeNotAllowed');
            }

            let bytesReceived = 0;
            let fileBuffer = Buffer.alloc(0);  // Initialize an empty buffer

            file.on('data', (data) => {
                console.log('Received data chunk:', data.length); // Log chunk size
                bytesReceived += data.length;

                // Append data to the buffer
                fileBuffer = Buffer.concat([fileBuffer, data]);

                if (bytesReceived === 0) {
                    throw new Error('Empty file detected');
                }

                if (bytesReceived > MAX_FILE_SIZE) {
                    file.resume(); // Stop the file stream if it's too large
                    throw new Error('fileSizeNotAllowed');
                }
            });

            // Store the file buffer and information once the file has finished
            file.on('end', () => {
                if (bytesReceived > 0) {
                    req.body.files.push({
                        buffer: fileBuffer,
                        fieldName: fieldName,
                        fileName: filename,
                        mimeType: mimeType,
                    });
                    fileBuffer = null;

                } else {
                    throw new Error('Empty file detected');
                }
            });
        });

        bb.on('field', (name, value) => {
            req.body[name] = value; // Move form fields to req.body
        });

        bb.on('finish', () => {
            next();
        });

        req.pipe(bb);

    } catch (err) {
        if (err.message === 'fileSizeNotAllowed') {
            parseHelper(res, 403, null, `Maximum file size is ${MAX_FILE_SIZE} MB`);
        }
        if (err.message === 'fileTypeNotAllowed') {
            parseHelper(res, 403, null, 'Only images can be uploaded');
        } else {
            parseHelper(res, 400, null, 'File upload failed');
        }
    }
};


module.exports = {bus};
