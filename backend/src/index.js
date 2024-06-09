import express from 'express';
import cors from 'cors';

import postsRoutes from './routes/posts.routes.js';

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', postsRoutes);

app.listen(5000);
console.log('Server on port', 5000);
