const express = require("express");
const UserController = require("../controllers/user_controller");
const UserRouter = express.Router();
/**
 * @openapi
 * tags:
 *   name: User
 *   description: User management API
 */

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The username of the new user
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *               role:
 *                 type: number  # Changed from string to number
 *                 description: The role of the new user (e.g., 1 for "admin", 2 for "user")
 *             required:
 *               - user_name
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user_name:
 *                   type: string
 *                 role:
 *                   type: number  # Changed from string to number
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Server error
 */
UserRouter.post('/register', UserController.create);

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *             required:
 *              - user_name
 *              - password
 *     responses:
 *       200:
 *         description: User logged in successfully, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     role:
 *                       type: number  # Changed from string to number
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
UserRouter.post("/login", UserController.login);

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Retrieve all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_name:
 *                     type: string
 *                   role:
 *                     type: number  # Changed from string to number
 *       404:
 *         description: No users found
 *       400:
 *         description: Server error
 */

UserRouter.get("/", UserController.index);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User removed successfully
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
UserRouter.delete("/:id",UserController.remove);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *               role:
 *                 type: number  # Changed from string to number
 *                 description: The new role for the user (e.g., 1 for "admin", 2 for "user")
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user_name:
 *                   type: string
 *                 role:
 *                   type: number  # Changed from string to number
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
UserRouter.put("/:id", UserController.update);

module.exports = UserRouter;