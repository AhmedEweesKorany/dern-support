const express = require("express")

const router = express.Router()
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
const serviceController = require("../controllers/serviceController")
const testmonailController = require("../controllers/testmonailController")
const orderController = require("../controllers/orderController")
// user routes
router.get("/", userController.getAllUsers)
router.get("/oneUser/:id", userController.getOneUser)
router.post("/createuser", userController.createUser)
router.put("/updateUser/:id", userController.updateUser)
router.delete("/deleteUser/:id", userController.deleteUser)
router.post("/user/login",userController.userLogin)
router.put("/makeUserAdmin/:id",userController.makeUserAdmin)
// category routes 
router.get("/getAllCategories",categoryController.getAllCategories)
router.post("/createCategory",categoryController.createCategory)
router.delete("/deleteCategory/:id",categoryController.deleteCategory)
router.put("/updateCategory/:id",categoryController.updateCategory)

// Services routes 
router.get("/getAllServices",serviceController.getAllServices)
router.post("/createService",serviceController.createService)
router.delete("/deleteService/:id",serviceController.deleteService)
router.put("/updateService/:id",serviceController.updateService)

//Testmonail routes 

router.get("/getAllTestmonail",testmonailController.getAllTestmonail)
router.post("/createTestmonail",testmonailController.createTestmonail)
router.delete("/deleteTestmonail/:id",testmonailController.deleteTestmonail)
router.put("/updateTestmonail/:id",testmonailController.updateTestmonail)
router.put("/updateTestmonailByUserID/:id",testmonailController.updateTestmonailByUserID)


// orders route 
router.get("/getAllOrders",orderController.getAllOrder)
router.get("/completedOrders",orderController.getCompletedTasks)
router.post("/createOrder",orderController.createOrder)
router.delete("/deleteOrder/:id",orderController.deleteOrder)
router.put("/updateOrder/:id",orderController.updateOrder)
router.get("/markAsDone/:id",orderController.updateCompletedOrder)
router.get("/cancel_order/:id",orderController.updateCanceldOrder)
router.get("/userOrders/:email",orderController.getUserOrders)


module.exports = router