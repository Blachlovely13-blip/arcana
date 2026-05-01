import "dotenv/config";
import cors from "cors";
import express from "express";
import { router } from "./routes.js";
const app = express();
const port = Number(process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(router);
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
app.listen(port, () => {
    console.log(`ARCANA server running on http://localhost:${port}`);
});
