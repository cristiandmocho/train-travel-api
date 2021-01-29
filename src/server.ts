import dotenv from 'dotenv';
dotenv.config();

import express, { Request } from 'express';
import controllers from './controllers';

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = 8000;

// Configuring modules
morgan.token('body', function (req: Request, _res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? ':method :url :status :res[content-length] - :response-time ms - :body'
      : 'dev'
  )
); // Logs

app.use(helmet()); // Security
app.use(cors());
app.use(express.json()); // Defaults the API to JSON payloads

// Main API route
app.use('/api', controllers);

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});
