import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from "./app/auth/routes";
import profileRoutes from "./app/profiles/routes";
import swipeRoutes from "./app/swipes/routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", swipeRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

