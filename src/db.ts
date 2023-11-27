import mongoose from "mongoose";
import { Post } from "./models/post";

export const getPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });
        // await mongoose.connect(connString);
        // mongoose.connection.useDb("blog");

        return await Post.find();
    } catch (error) {
        console.error(error);
    }
    finally {
        await mongoose.disconnect();
    }
};

export const addPost = async (
    title: string,
    body: string,
    author: string,
    hidden: boolean = true
) => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });

        const post = new Post();
        post.title = title;
        post.body = body;
        post.author = author;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const deletePost = async (id: string) => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });

        const r = await Post.deleteOne({ _id: id });

        return r.deletedCount > 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const getPostById = async (id: string) => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });

        return await Post.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const updatePost = async (
    id: string,
    title: string,
    body: string,
    author: string,
    hidden: boolean = true
) => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });

        const post = await Post.findById(id);

        if (post) {
            post.title = title;
            post.body = body;
            post.author = author;
            post.hidden = hidden;

            return await post.save();
        }

        return undefined;

    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const pubblicaPostById = async (id: string) => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING || "", { dbName: "blog" });

        const post = await Post.findById(id);
        if (post) {
            post.hidden = false;
            return await post.save();
        }

        return undefined;
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};