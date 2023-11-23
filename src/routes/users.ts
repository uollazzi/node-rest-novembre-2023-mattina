import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
    res.json({ message: "Registrazione avvenuta con successo" });
});

router.post("/login", (req: Request, res: Response) => {
    res.json({ message: "Login avvenuto con successo" });
});

export default router;