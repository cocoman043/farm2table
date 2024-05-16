import express from 'express';
import router from './routes/router.js';

const app = express();

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening at port 3000...');
});
