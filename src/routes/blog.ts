import { Router, Request, Response } from "express";
import * as db from "../db";
import { PostAddDTO, PostUpdateDTO } from "../models/post";
import mongoose, { Error } from "mongoose";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const posts = await db.getPosts();
    res.json(posts);
});

router.post("/add", async (req: Request, res: Response) => {
    const post: PostAddDTO = req.body;
    // console.log(post);

    try {
        const r = await db.addPost(post.title, post.body, post.author, post.hidden);
        res.json(r);
    } catch (error) {
        if (error instanceof Error.ValidationError) {

            const customError = {
                message: error.message
            }

            res.status(400).json(customError);
        }
        else {
            res.status(500).json(error);
        }
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const r = await db.deletePost(req.params.id);

        if (r) {
            res.json({ message: "Rimozione avvenuta con successo." });
        } else {
            res.status(404).json({ message: "Impossbile rimuovere." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const post = await db.getPostById(req.params.id);

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post non trovato." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const post: PostUpdateDTO = req.body;

    try {
        const r = await db.updatePost(req.params.id, post.title, post.body, post.author, post.hidden);
        if (r) {
            res.json(r);
        } else {
            res.status(404).json({ message: "Post non trovato." });
        }
    } catch (error) {
        if (error instanceof Error.ValidationError) {

            const customError = {
                message: error.message
            }

            res.status(400).json(customError);
        }
        else {
            res.status(500).json(error);
        }
    }
});

router.patch("/pubblica/:id", async (req: Request, res: Response) => {
    try {
        const r = await db.pubblicaPostById(req.params.id);

        if (r) {
            res.json(r);
        } else {
            res.status(404).json({ message: "Post non trovato." });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;