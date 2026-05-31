const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const emailService=require("../services/email.services")

async function userRegisterController(req, res) {
    try {
        const { email, password, name } = req.body

        const isExists = await userModel.findOne({ email })

        if (isExists) {
            return res.status(422).json({
                message: "User Already he Bhaii.",
                status: "Failed"
            })
        }

        const user = await userModel.create({
            email,
            password,
            name
        })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        res.cookie("token", token)

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        })

        await emailService.sendRegistrationEmail(user.email, user.name)

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function userLoginController(req,res){
    const {email, password}=req.body
    const user=await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Email ya Password INVALID he"
        })
    }

    const isValidPassword= await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"Email ya Password INVALID he"
        })
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}


module.exports = {
    userRegisterController,
    userLoginController
}