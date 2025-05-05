import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { connectDB } from './db/connectDB.js'
import userRouter from './routes/user.route.js'
import taskRouter from './routes/task.route.js'

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.use('/', (req, res) => {
    res.send(process.env.FRONTEND_URL);
})

app.listen(PORT, () => {
    connectDB();
    console.log('Server is Listening to PORT:', PORT);
})