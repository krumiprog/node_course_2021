import {
  createConnection,
  ConnectionOptions,
  getConnection,
  Connection,
} from 'typeorm';
import config from '../common/config';

const {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
} = config;

const DB_CONFIG = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
} as ConnectionOptions;

const connectToDB = async () => {
  let connection: Connection;

  try {
    connection = getConnection();
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      await createConnection(DB_CONFIG);
    }
    console.log('DataBase is connected successfully');
  } catch (err) {
    console.log('Connection error:', err);
  }
};

export const tryDBConnect = async (cb: () => void): Promise<void> => {
  try {
    await connectToDB();
    cb();
  } catch (err) {
    console.log(err);
  }
};
