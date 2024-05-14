const express = require("express")

const router = express.Router()
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")

// user routes
router.get("/", userController.getAllUsers)
router.get("/oneUser/:id", userController.getOneUser)
router.post("/createuser", userController.createUser)
router.put("/updateUser/:id", userController.updateUser)
router.delete("/deleteUser/:id", userController.deleteUser)
router.post("/user/login",userController.userLogin)

// category routes 
router.get("/getAllCategories",categoryController.getAllCategories)
router.post("/createCategory",categoryController.createCategory)
router.delete("/deleteCategory/:id",categoryController.deleteCategory)

module.exports = router