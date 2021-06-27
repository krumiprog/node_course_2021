import 'reflect-metadata';
import config from './common/config';
import app from './app';
import { tryDBConnect } from './db/db';

const PORT = config.PORT || 4000;

tryDBConnect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
