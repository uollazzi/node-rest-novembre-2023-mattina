import { config } from "dotenv";
config();

import express, { NextFunction, Request, Response } from "express";
import path from "node:path";
import cors from "cors";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";
import usersRouter from "./routes/users";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/posts", blogRouter);
app.use("/api", usersRouter);

// fallback
app.use((req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// // errore 404
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(404).send("Risorsa non trovata.");
// });

// errore 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Qualcosa è andato storto.");
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));