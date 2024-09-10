import {asyncHandler} from "../utils/asyncHandler.js"

import {apiError} from "../utils/apiError.js"

import {User} from "../models/user.model.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"

import apiResponse from "../utils/apiResponse.js"

const registerUser=asyncHandler(async (req,res)=>{
//get user details
//validation
//check if user already exists
//check for images and avatar
//upload them to cloudinary
//create user entry in db 
//remove password and refresh token field from response
//check for user creation
//return res



// if(fullName==="")
    // throw new ApiError(400,"Full Name is required")
// console.log(email)




const {fullName,username,email,password}=req.body

if(
    [fullName,username,email,password].some((field)=> field?.trim()==="")//good way of check validation instead of checking each and every element
){
    throw new apiError(400,"All fields are required")
}

const existedUser= await User.findOne({
    $or:[{username},{email}]
    })
    if(existedUser){
        throw new apiError(409,"User with email or username already exists")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new apiError(400,"Avatar file is required")
}

const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)

if(!avatar)
    throw new apiError(400,"Avatar file is required man!")

//creating user object and making entries in data base
 const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    username:username.toLowerCase()

})

const createdUser=await User.findById(user._id).select("-password -refreshToken")
if(!createdUser)
    throw new apiError(500,"Something went wrong while registering a user!!")


return res.status(201).json(
    new apiResponse(200,createdUser,"User Registered Successfully")
)



})

export {registerUser}