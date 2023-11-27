import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Titolo richiesto"] },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: true },
});

export const Post = mongoose.model("Post", postSchema, "posts");

export interface PostAddDTO {
    title: string,
    author: string,
    body: string,
    hidden: boolean
}

export interface PostUpdateDTO {
    _id: string;
    title: string,
    author: string,
    body: string,
    hidden: boolean
}