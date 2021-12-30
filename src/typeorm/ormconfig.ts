import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  development: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Chldkdus1218!',
    database: 'pick2022',
    synchronize: true,
    logging: true,
    entities: ['./dist/**/*.entity.js'],
  },
  production: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Chldkdus1218!',
    database: 'pick2022',
    synchronize: false,
    logging: true,
    entities: ['./dist/**/*.entity.js'],
  },
};

export { connectionOptions };
