import express from 'express';
import authRouter from './routes/auth.route.js';
const app = express();

app.use(express.json());

/* to use routes on ultimate page */
app.use("/api/auth", authRouter);

export default app;
 
