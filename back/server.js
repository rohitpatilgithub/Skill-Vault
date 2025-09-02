import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/UserR/user.routes.js';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/TaskR/task.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: [
    'http://localhost:5173',
    'https://skill-vault-ten.vercel.app'
  ],
    credentials: true
}));

app.use(express.static("../frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);

connectDB();
app.listen(PORT , () => {
    console.log(`Running at port ${PORT}`);
})
