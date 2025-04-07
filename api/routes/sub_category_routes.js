const express = require("express");
const subCategoryController = require("../controllers/sub_category_controller.js");
const subCategoryRouter = express.Router();
const auth = require("../middlewares/admin_auth.js")

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: SubCategory management API
 */

/**
 * @swagger
 * /sub_category:
 *   post:
 *     summary: Create a new sub-category
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sub-category
 *               description:
 *                 type: string
 *                 description: Description of the sub-category
 *               main_category_id:
 *                 type: string
 *                 description: ID of the main category associated with this sub-category
 *     responses:
 *       201:
 *         description: Sub-category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 main_category_id:
 *                   type: string
 *       400:
 *         description: Invalid input or server error
 */
subCategoryRouter.post('/', auth.is_admin, subCategoryController.create);

/**
 * @swagger
 * /sub_category:
 *   get:
 *     summary: Retrieve all sub-categories
 *     tags: [SubCategory]
 *     parameters:
 *       - in: query
 *         name: main_category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter sub-categories by their main category ID
 *     responses:
 *       200:
 *         description: List of all sub-categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   main_category_id:
 *                     type: string
 *       404:
 *         description: No sub-categories found
 *       400:
 *         description: Server error or invalid request
 */
subCategoryRouter.get("/", subCategoryController.index);

/**
 * @swagger
 * /sub_category/{id}:
 *   delete:
 *     summary: Delete a sub-category by ID
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sub-category to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sub-category deleted successfully
 *       400:
 *         description: Sub-category not found or server error
 */
subCategoryRouter.delete("/:id", auth.is_admin, subCategoryController.remove);

/**
 * @swagger
 * /sub_category/{id}:
 *   put:
 *     summary: Update a sub-category by ID
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sub-category to be updated
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
 *                 description: Name of the sub-category
 *               description:
 *                 type: string
 *                 description: Description of the sub-category
 *               main_category_id:
 *                 type: string
 *                 description: ID of the main category associated with this sub-category
 *     responses:
 *       200:
 *         description: Sub-category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 main_category_id:
 *                   type: string
 *       400:
 *         description: Sub-category not found or invalid input
 */
subCategoryRouter.put("/:id", auth.is_admin, subCategoryController.update);

module.exports = subCategoryRouter;