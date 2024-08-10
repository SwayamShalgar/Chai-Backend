import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.model.js";
import {uploadResult} from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "Ok"
    })
    const { fullname, email, username, password } = req.body
    console.log("Email : ", email);

    if([fullname,email,password,username].some(() => field?.trim() === "")){
        throw new ApiError(400, "Full name is required");
    }

    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if(existingUser) {
        throw new ApiError(409, "SUer with email or Username is already exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadResult(avatarLocalPath);
    const coverImage = await uploadResult(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required");    
    }

    const user = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong while creating user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered success")
    )

} )

export {registerUser};