import express from 'express';
import router from './routes/router.js';
import mongoose from 'mongoose';
import 'dotenv/config.js';

await mongoose.connect(process.env.MONGODB_URI, { dbName: 'farm2table' })
  .then(() => {
    console.log('Connected to MongoDB');
  });

const app = express();

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening at port 3000...');
});
