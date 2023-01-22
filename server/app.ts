import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todos';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use('/api/todos', todoRoutes);

export default app;
