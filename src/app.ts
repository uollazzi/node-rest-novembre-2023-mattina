import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/posts", blogRouter);
app.use("/api", usersRouter);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));