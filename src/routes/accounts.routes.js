const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")



const router=express.Router()



router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)



module.exports=router