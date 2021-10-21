import {ConnectionOptions} from 'typeorm';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

try {
  var environment:any = dotenv.parse(fs.readFileSync('.env'))
} catch (error) {
  console.error(".env file not found, please copy .env.dist and create your own .env");
  process.exit();
}

const config: ConnectionOptions = {
  type: 'mysql',
  host: environment.MYSQL_HOST,
  port: parseInt(environment.MYSQL_DATABASE_PORT),
  username: environment.MYSQL_USER,
  password: environment.MYSQL_PASSWORD,
  database: environment.MYSQL_DATABASE,
  entities: [
    ' src/entity/*{.ts,.js}',
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: ['migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  }
};

export = config;