const express = require("express");
const faqController = require("../controllers/faq_controller.js");
const faqRouter = express.Router();
const busboy = require("../middlewares/busboy_middleware");
const auth = require("../middlewares/admin_auth.js")

/**
 * @openapi
 * tags:
 *   name: FAQ
 *   description: Frequently Asked Questions management
 */

/**
 * @openapi
 * /faq:
 *   post:
 *     summary: Create a new FAQ entry
 *     tags: [FAQ]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question of the FAQ entry
 *               answer:
 *                 type: string
 *                 description: The answer to the FAQ question
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of images
 *             required:
 *               - question
 *               - answer
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question of the FAQ entry
 *               answer:
 *                 type: string
 *                 description: The answer to the FAQ question
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The file URLs associated with the FAQ entry
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       201:
 *         description: FAQ entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created FAQ entry
 *                 question:
 *                   type: string
 *                   description: The question of the created FAQ entry
 *                 answer:
 *                   type: string
 *                   description: The answer to the created FAQ question
 *       400:
 *         description: Bad request, invalid data or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.post('/', auth.is_admin, busboy.bus, faqController.create);

/**
 * @openapi
 * /faq:
 *   get:
 *     summary: Retrieve a list of all FAQ entries
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of FAQ entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the FAQ entry
 *                   question:
 *                     type: string
 *                     description: The question of the FAQ entry
 *                   answer:
 *                     type: string
 *                     description: The answer to the FAQ question
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: URLs of associated images
 *       404:
 *         description: No FAQs found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no FAQs were found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.get('/', faqController.index);


/**
 * @openapi
 * /faq/{faq_id}:
 *   delete:
 *     summary: Delete an FAQ entry by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to delete
 *     responses:
 *       204:
 *         description: FAQ entry deleted successfully
 *       404:
 *         description: FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.delete('/:faq_id/', auth.is_admin, faqController.remove);

/**
 * @openapi
 * /faq/{faq_id}:
 *   get:
 *     summary: Retrieve a specific FAQ entry by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the FAQ entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the FAQ entry
 *                 question:
 *                   type: string
 *                   description: The question of the FAQ entry
 *                 answer:
 *                   type: string
 *                   description: The answer to the FAQ question
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URLs of associated images
 *       404:
 *         description: FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.get('/:faq_id/', faqController.get);


/**
 * @openapi
 * /faq/{faq_id}/{index}:
 *   put:
 *     summary: Update a specific FAQ entry's photo by ID and index
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to update within the FAQ entry
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of images
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: FAQ entry photo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated FAQ entry
 *                 question:
 *                   type: string
 *                   description: The question of the updated FAQ entry
 *                 answer:
 *                   type: string
 *                   description: The answer to the updated FAQ question
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URLs of associated images
 *       400:
 *         description: Bad request, invalid data or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 *       404:
 *         description: FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.put('/:faq_id/:index', auth.is_admin, busboy.bus, faqController.edit_faq_photo);

/**
 * @openapi
 * /faq/{faq_id}/{index}:
 *   delete:
 *     summary: Delete a specific photo from a FAQ entry by ID and index
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to delete within the FAQ entry
 *     responses:
 *       204:
 *         description: FAQ entry photo deleted successfully
 *       404:
 *         description: Photo not found or FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the photo or FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.delete('/:faq_id/:index', auth.is_admin, faqController.remove_faq_photo);

/**
 * @openapi
 * /faq/{faq_id}:
 *   post:
 *     summary: Add a new photo to a specific FAQ entry by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of images
 *             required:
 *               - images
 *     responses:
 *       201:
 *         description: FAQ entry photo added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated FAQ entry
 *                 question:
 *                   type: string
 *                   description: The question of the updated FAQ entry
 *                 answer:
 *                   type: string
 *                   description: The answer to the updated FAQ question
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URLs of associated images (e.g., images, documents)
 *       400:
 *         description: Bad request, invalid data or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 *       404:
 *         description: FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.post('/:faq_id/', auth.is_admin, busboy.bus, faqController.add_faq_photo);

/**
 * @openapi
 * /faq/{faq_id}:
 *   put:
 *     summary: Update a specific FAQ entry by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: faq_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The updated question of the FAQ entry
 *               answer:
 *                 type: string
 *                 description: The updated answer to the FAQ question
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       200:
 *         description: FAQ entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated FAQ entry
 *                 question:
 *                   type: string
 *                   description: The updated question of the FAQ entry
 *                 answer:
 *                   type: string
 *                   description: The updated answer to the FAQ question
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URLs of associated images
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 *       404:
 *         description: FAQ entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the FAQ entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
faqRouter.put('/:faq_id/', auth.is_admin, faqController.update);



module.exports = faqRouter;