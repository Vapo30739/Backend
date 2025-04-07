const express = require("express");
const settingsController = require("../controllers/settings_controller.js");
const settingsRouter = express.Router();
const busboy = require("../middlewares/busboy_middleware");
const auth = require("../middlewares/admin_auth.js")

/**
 * @openapi
 * tags:
 *   name: Settings
 *   description: Settings management
 */


/**
 * @openapi
 * /settings:
 *   get:
 *     summary: Retrieve the settings
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Settings returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     sub_category_id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     about_us:
 *                       type: string
 *                       example: "This is the about_us section."
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp_channel:
 *                           type: string
 *                           example: "https://whatsapp.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                         youtube:
 *                           type: string
 *                           example: "youtube"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Returned successfully"
 *       404:
 *         description: No settings found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "There is no settings yet"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred"
 */
settingsRouter.get("/", settingsController.get);

/**
 * @openapi
 * /settings/dollar:
 *   put:
 *     summary: Update the settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dollar_price:
 *                 type: number
 *                 example: 15000
 *             required:
 *               - dollar_price
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: { 
 *                     dollar_price: 15000,
 *                     sub_category_id: "67838759c886a879a8ffc617",
 *                     hero: [
 *                       "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     ],
 *                     about_us: "This is about_us",
 *                     social_media: {
 *                       facebook: "https://facebook.com/example",
 *                       whatsapp: [
 *                         {
 *                           link: "https://wa.me/123456789",
 *                           phone_number: 123456789,
 *                           name: "Customer Support"
 *                         }
 *                       ],
 *                       telegram: "https://t.me/example",
 *                       instagram: "https://instagram.com/example"
 *                     },
 *                     createdAt: "2025-01-12T09:11:53.993Z"
 *                   }
 *                 message:
 *                   type: string
 *                   example: "Updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 */
settingsRouter.put("/dollar", auth.is_admin, settingsController.update_dollar_price);

/**
 * @openapi
 * /settings/hero:
 *   post:
 *     summary: Add photos to the hero section
 *     description: Upload one or more photos to be added to the hero section using a multipart form data request.
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The photo files to be uploaded.
 *     responses:
 *       201:
 *         description: Photos added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *       400:
 *         description: Bad request due to invalid data or an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input or server error.
 */
settingsRouter.post("/hero", auth.is_admin, busboy.bus, settingsController.add_hero_photo);

/**
 * @openapi
 * /settings/hero/{index}:
 *   put:
 *     summary: Edit photos in the hero section
 *     description: Update a specific photo in the hero section by providing the index in the path parameter and a new photo using a multipart form data request.
 *     tags:
 *       - Settings
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The index of the photo to replace in the hero section.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The new photo file to replace the existing one.
 *     responses:
 *       200:
 *         description: Photo updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *       400:
 *         description: Bad request due to invalid data or an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input or server error.
 */
settingsRouter.put("/hero/:index", auth.is_admin, busboy.bus, settingsController.edit_hero_photos);

/**
 * @openapi
 * /settings/hero/{index}:
 *   delete:
 *     summary: Remove a photo from the hero section
 *     description: Deletes a specific photo from the hero section by its index and updates the settings.
 *     tags:
 *       - Settings
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to be removed from the hero section.
 *     responses:
 *       204:
 *         description: Photo removed successfully. No content is returned in the response.
 *       404:
 *         description: Photo not found at the specified index.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "photo not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
settingsRouter.delete("/hero/:index", auth.is_admin, settingsController.remove_hero_photo)

/**
 * @openapi
 * /settings/about_us:
 *   put:
 *     summary: Update the about_us section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about_us:
 *                 type: string
 *                 example: "This is the updated about_us section."
 *             required:
 *               - about_us
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/about_us", auth.is_admin, settingsController.update_about_us);

/**
 * @openapi
 * /settings/facebook:
 *   put:
 *     summary: Update the facebook section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               facebook:
 *                 type: string
 *                 example: "This is the updated facebook section."
 *             required:
 *               - facebook
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/facebook", auth.is_admin, settingsController.update_facebook);

/**
 * @openapi
 * /settings/youtube:
 *   put:
 *     summary: Update the youtube section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               youtube:
 *                 type: string
 *                 example: "This is the updated youtube section."
 *             required:
 *               - youtube
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                         youtube:
 *                           type: string
 *                           example: "youtube"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/youtube", auth.is_admin, settingsController.update_youtube);

/**
 * @openapi
 * /settings/instagram:
 *   put:
 *     summary: Update the instagram section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instagram:
 *                 type: string
 *                 example: "This is the updated instagram section."
 *             required:
 *               - instagram
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                         youtube:
 *                           type: string
 *                           example: "youtube"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/instagram", auth.is_admin, settingsController.update_instagram);

/**
 * @openapi
 * /settings/telegram:
 *   put:
 *     summary: Update the telegram section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telegram:
 *                 type: string
 *                 example: "This is the updated telegram section."
 *             required:
 *               - telegram
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp_channel:
 *                           type: string
 *                           example: "https://whatsapp.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/telegram", auth.is_admin, settingsController.update_telegram);


/**
 * @openapi
 * /settings/whatsapp_channel:
 *   put:
 *     summary: Update the whatsapp_channel section in settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               whatsapp_channel:
 *                 type: string
 *                 example: "This is the updated telegram section."
 *             required:
 *               - whatsapp_channel
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the updated about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         facebook:
 *                           type: string
 *                           example: "https://facebook.com/example"
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/example"
 *                         instagram:
 *                           type: string
 *                           example: "https://instagram.com/example"
 *                         whatsapp_channel:
 *                           type: string
 *                           example: "https://whatsapp.com/channel"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-12T09:11:53.993Z"
 *                 message:
 *                   type: string
 *                   example: "Updated successfully."
 *       400:
 *         description: Bad request due to invalid data or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or required field missing."
 */
settingsRouter.put("/whatsapp_channel", auth.is_admin, settingsController.update_whatsapp_channel);


/**
 * @openapi
 * /settings/whatsapp:
 *   post:
 *     summary: Add a WhatsApp account to the settings
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 example: "https://wa.me/123456789"
 *               phone_number:
 *                 type: number
 *                 example: 123456789
 *               name:
 *                 type: string
 *                 example: "Customer Support"
 *             required:
 *               - link
 *               - phone_number
 *               - name
 *     responses:
 *       201:
 *         description: WhatsApp account added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67838759c886a879a8ffc617"
 *                     dollar_price:
 *                       type: number
 *                       example: 15000
 *                     about_us:
 *                       type: string
 *                       example: "This is the about_us section."
 *                     hero:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "http://res.cloudinary.com/dq8n2cyzw/image/upload/v1736676062/nrjwurjsofmwqgcn5ts4.png"
 *                     social_media:
 *                       type: object
 *                       properties:
 *                         whatsapp:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               link:
 *                                 type: string
 *                                 example: "https://wa.me/123456789"
 *                               phone_number:
 *                                 type: number
 *                                 example: 123456789
 *                               name:
 *                                 type: string
 *                                 example: "Customer Support"
 *                 message:
 *                   type: string
 *                   example: "Added successfully"
 *       400:
 *         description: Bad request due to invalid data or an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input or server error."
 */
settingsRouter.post("/whatsapp", auth.is_admin, settingsController.add_whatsapp_account);

/**
 * @openapi
 * /settings/whatsapp/{index}:
 *   delete:
 *     summary: Remove a whatsapp profile
 *     description: Deletes a specific whatsapp profile from the whatsapp section by its index.
 *     tags:
 *       - Settings
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the profile to be removed from the whatsapp section.
 *     responses:
 *       204:
 *         description: profile removed successfully. No content is returned in the response.
 *       404:
 *         description: Photo not found at the specified index.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "whatsapp account not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
settingsRouter.delete("/whatsapp/:index", auth.is_admin, settingsController.remove_whatsapp_account);



module.exports = settingsRouter;