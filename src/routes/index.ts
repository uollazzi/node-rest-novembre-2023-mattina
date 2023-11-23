import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Benvenuti sul Blog REST API");
});

router.get("/contatti", (req: Request, res: Response) => {
    res.send("Contattaci");
});

export default router;