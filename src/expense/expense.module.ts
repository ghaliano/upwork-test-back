import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from '../controller/expense.controller';
import { expenseProviders } from './expense.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports: [ExpenseService],
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ...expenseProviders,]
})
export class ExpenseModule {}
