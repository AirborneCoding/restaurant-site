import cloudinary from "cloudinary"
import fs from "fs"

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Cloudinary Upload Image
const uploadImageCloudinary = async (fileToUpload) => {
    const data = await cloudinary.v2.uploader.upload(
        fileToUpload,
        {
            use_filename: true,
            folder: "panda"
        }
    )
    fs.unlinkSync(fileToUpload)
    return data
}

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.v2.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        // console.log(error);
        throw new Error('Internal Server Error (cloudinary)');
    }
};

export {
    uploadImageCloudinary,
    cloudinaryRemoveImage,
}