const express = require("express");
const ItemController = require("../controllers/item_controller.js");
const busboy = require("../middlewares/busboy_middleware");
const auth = require("../middlewares/admin_auth.js")

const itemRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Item
 *   description: Item management
 */

/**
 * @openapi
 * /item:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item (required)
 *               ar_name:
 *                 type: string
 *                 description: The Arabic name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount on the item (optional)
 *               is_hidden:
 *                 type: boolean
 *                 description: Whether the item should be hidden from regular listings
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub category the item belongs to
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of files (images) associated with the item
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ar_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     is_hidden:
 *                       type: boolean
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     main_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     sub_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         main_category_id:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.post('/', auth.is_admin, busboy.bus, ItemController.create);

/**
 * @openapi
 * /item:
 *   get:
 *     summary: Get a list of items with optional filters and pagination
 *     tags: [Item]
 *     parameters:
 *       - name: main_category_id
 *         in: query
 *         description: The ID of the main category
 *         schema:
 *           type: string
 *       - name: sub_category_id
 *         in: query
 *         description: The ID of the sub category
 *         schema:
 *           type: string
 *       - name: max_price
 *         in: query
 *         description: Maximum price of items
 *         schema:
 *           type: number
 *           format: float
 *       - name: min_price
 *         in: query
 *         description: Minimum price of items
 *         schema:
 *           type: number
 *           format: float
 *       - name: discount
 *         in: query
 *         description: Discount (0 = false, 1 = true)
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *       - name: include_hidden
 *         in: query
 *         description: Whether to include hidden items in the results
 *         schema:
 *           type: boolean
 *           default: false
 *       - name: cursor
 *         in: query
 *         description: Cursor for pagination, representing the last item's ID from the previous page
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of items to retrieve per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of items with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           ar_name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           discount:
 *                             type: number
 *                           is_hidden:
 *                             type: boolean
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           main_category_id:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               image:
 *                                 type: string
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                           sub_category_id:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               description:
 *                                 type: string
 *                               main_category_id:
 *                                 type: string
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     cursor:
 *                       type: string
 *                       description: Cursor for the next page of results
 *       404:
 *         description: No items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.get("/", ItemController.index);

/**
 * @openapi
 * /item/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ar_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     main_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     sub_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         main_category_id:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.get("/:id", ItemController.get);

/**
 * @openapi
 * /item/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.delete("/:id", auth.is_admin, ItemController.remove);

/**
 * @openapi
 * /item/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               ar_name:
 *                 type: string
 *                 description: The Arabic name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                  type: number
 *                  format: float
 *                  description: The discount of the item
 *               is_hidden:
 *                  type: boolean
 *                  description: Whether the item should be hidden from regular listings
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub-category the item belongs to
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ar_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     is_hidden:
 *                       type: boolean
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     main_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     sub_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         main_category_id:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.put("/:id", auth.is_admin, ItemController.update);

/**
 * @openapi
 * /item/{item_id}/{index}:
 *   delete:
 *     summary: Delete a specific photo from an item by ID and index
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to delete
 *     responses:
 *       204:
 *         description: Photo deleted successfully
 *       404:
 *         description: Photo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.delete('/:item_id/:index', auth.is_admin, ItemController.remove_item_photo);

/**
 * @openapi
 * /item/{item_id}:
 *   post:
 *     summary: Add photos to an existing item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item
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
 *                   type: file
 *                   format: binary
 *                 description: The photos to add
 *             required:
 *               - files
 *     responses:
 *       201:
 *         description: Photos added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ar_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     main_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     sub_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         main_category_id:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.post('/:item_id', auth.is_admin, busboy.bus, ItemController.add_item_photo);

/**
 * @openapi
 * /item/{item_id}/{index}:
 *   put:
 *     summary: Edit a specific photo of an item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to edit
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
 *                   type: file
 *                   format: binary
 *                 description: The new photo file
 *             required:
 *               - files
 *     responses:
 *       200:
 *         description: Photo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ar_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     main_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     sub_category_id:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         main_category_id:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.put('/:item_id/:index', auth.is_admin, busboy.bus, ItemController.edit_item_photo);

module.exports = itemRouter;
