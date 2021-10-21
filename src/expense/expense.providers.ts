import { Expense } from 'src/entity/Expense';
import { Connection } from 'typeorm';

export const expenseProviders = [
  {
    provide: 'EXPENSE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Expense),
    inject: ['DATABASE_CONNECTION'],
  },
];