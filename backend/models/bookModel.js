import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
)
export const Book = mongoose.model('Cat',bookSchema);