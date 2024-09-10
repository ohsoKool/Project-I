import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs;"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_SECRET_KEY,
})


const uploadOnCloudinary= async (localFilePath)=>{
try {
    if(!localFilePath) return null
    //uploda file on cloudinary
     const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })
    //file has been uploaded successfully
    console.log("File has been uploaded on cloudinary",response.url);
    return response
    
} catch (error) {
    fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation is failed
    return null
}
}

export {uploadOnCloudinary}