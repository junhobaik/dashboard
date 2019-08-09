import express from 'express';
import morgan from 'morgan';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send();
});

export default app;
