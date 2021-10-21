import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_DATABASE_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [ 
        __dirname + '/../entity/*{.ts,.js}',
      ],
      synchronize: false,
      migrationsRun: true,
      logging: true,
      logger: 'file'
    }),
  },
];