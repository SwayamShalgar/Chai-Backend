import mongoose, {Schema} from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        tyoe: String,// cloudinary using
        required: true
    },
    title: {
        tyoe: String,
        required: true
    },
    description: {
        tyoe: String,
        required: true
    },
    duration: {
        tyoe: Number,// cloudinary using
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});

export const Video = mongoose.model("Video",videoSchema);