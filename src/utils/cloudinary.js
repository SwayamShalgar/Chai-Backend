import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadResult = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploder.uplode(localFilePath,{
            resourec_type: 'auto'
        })

        console.log("File uploded !", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //Remove the locally saved temp file as the upload operation failed
        return null;
    }
}
    
    console.log(uploadResult)