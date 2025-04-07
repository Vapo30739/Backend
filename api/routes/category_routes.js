const express = require("express");
const categoryController = require("../controllers/category_controller.js");
const categoryRouter = express.Router();
const busboy = require("../middlewares/busboy_middleware");
const auth = require("../middlewares/admin_auth.js")

/**
 * @openapi
 * tags:
 *   name: Category
 *   description: Category management
 */


/**
 * @openapi
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: A description of the category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image of the category
 *             required:
 *               - name  # Only name is required
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
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
categoryRouter.post('/',auth.is_admin, busboy.bus, categoryController.create);

/**
 * @openapi
 * /category:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     description: Fetch all categories from the database. Returns an error if no categories are found.
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "returned successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "63f13d3f88eac2b67c1e3d9a"
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         example: "Devices and gadgets"
 *                       image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/dkqzjz4yv/image/upload/v1694534841/Category/63f13d3f88eac2b67c1e3d9a.jpg"
 *       404:
 *         description: No categories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There is no categories yet"
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request or unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error occurred while processing the request"
 *                 data:
 *                   type: null
 */
categoryRouter.get("/", categoryController.index);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
categoryRouter.delete("/:id", auth.is_admin,categoryController.remove);

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *               description:
 *                 type: string
 *                 description: The new description of the category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new image of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
categoryRouter.put("/:id",auth.is_admin, busboy.bus, categoryController.update);


/**
 * @openapi
 * /category/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "returned successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: string
 *                         example: "63f13d3f88eac2b67c1e3d9a"
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         example: "Devices and gadgets"
 *                       image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/dkqzjz4yv/image/upload/v1694534841/Category/63f13d3f88eac2b67c1e3d9a.jpg"
 *       404:
 *         description: No categories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There is no categories yet"
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request or unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error occurred while processing the request"
 *                 data:
 *                   type: null
 */
categoryRouter.get("/:id", categoryController.get);

module.exports = categoryRouter;