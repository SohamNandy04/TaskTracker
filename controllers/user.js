import { user } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"

export const register = async (req,res)=>{

    try{
        const { name, email, password } = req.body

        let User = await user.findOne({ email })

        if(User) return next(new ErrorHandler(404,"User Already Exists"))

        const hashedPass = await bcrypt.hash(password,10)

        User = await user.create({ name, email, password: hashedPass })

        sendCookie(User,res,"Registered Successfully",201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) => {

    try {
        const {email, password} = req.body

        const User = await user.findOne({email}).select("+password")

        if(!User)
            return next(new ErrorHandler(404,"Invalid Email or Password"))

        const isMatch = await bcrypt.compare(password,User.password)

        if(!isMatch)
            return next(new ErrorHandler(404,"Invalid Email or Password"))

        sendCookie(User,res,`Welcome Back, ${User.name}`,200)
    } catch (error) {
        next(error)
    }
}

export const getMyDetails = (req,res)=>{

    res.status(200).json({
        success: true,
        User: req.User
    })
}

export const logout = (req,res) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: "Logged Out"
    })
}

// export const updateUser = async (req,res)=>{

//     const {id} = req.params;
//     const User = await user.findById(id)


//     res.json({
//         success: true,
//         message: "Updated"
//     })
// }

// export const deleteUser = async (req,res)=>{

//     const {id} = req.params;
//     const User = await user.findById(id)

//     await User.remove()

//     res.json({
//         success: true,
//         message: "Deleted"
//     })
// }