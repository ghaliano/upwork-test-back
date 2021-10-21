import { Controller, Get, Post, Body, Request, UseInterceptors, ClassSerializerInterceptor, Param, Delete, Put, Query } from '@nestjs/common';
import { ExpenseService } from '../expense/expense.service';
import { CreateExpenseDto } from '../expense/dto/create-expense.dto';  
import { UpdateExpenseDto } from 'src/expense/dto/update-expense.dto';
import { FilterExpenseDto } from 'src/expense/dto/filter-expense.dto';

@Controller('api/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  
  @Get()
  findAll(@Query() expenseParams: FilterExpenseDto, @Request() req) {
    return this.expenseService.findAll(Object.assign(expenseParams ,{userId: req.user.userId}));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    return this.expenseService.create(
      createExpenseDto, 
      req.user.userId
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateCustomerDto);
  }
}
