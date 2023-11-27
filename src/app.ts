import { config } from "dotenv";
config();

import express, { NextFunction, Request, Response } from "express";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";
import usersRouter from "./routes/users";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/posts", blogRouter);
app.use("/api", usersRouter);

// errore 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Risorsa non trovata.");
});

// errore 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Qualcosa è andato storto.");
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));