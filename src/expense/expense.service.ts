import { Inject, Injectable, Scope } from '@nestjs/common';
import { Expense } from 'src/entity/Expense';
import { getManager, Like, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';  
import { UpdateExpenseDto } from './dto/update-expense.dto';


export class ExpenseService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private expenseRepository: Repository<Expense>
  ) {}
  
  async findAll(params: any) {
    let where:any = {};
    if (params.userId){
      where.userId = params.userId;
    }
    if (params.term){
      where.description = Like(`%${params.term}%`);
    }
    return await this.expenseRepository.find({ where: where});
  }
  
  //find expenses per week with total amount, and average day spending
  async stats(params: any) {
    let where:any = {};
    if (params.userId){
      where.userId = params.userId;
    }
    if (params.term){
      where.description = Like(`%${params.term}%`);
    }
    return await this.expenseRepository.find({ where: where});
  }

  async create(createExpenseDto: CreateExpenseDto, userId: number) {
    const entityManager = getManager();
    let expense = Object.assign(new Expense(), createExpenseDto);
    expense.userId = userId;
    await  entityManager.save(expense);

    return this.expenseRepository.findOne(expense.id);
  }

  async findOne(id: number): Promise<Expense | undefined> {
    return await this.expenseRepository.findOne(id);
  }


  async remove(id: number) {
    return await this.expenseRepository.remove(await this.expenseRepository.findOne(+id));
  }
  
  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const entityManager = getManager();
    let expense = Object.assign(new Expense(), updateExpenseDto);
    expense.id = id;
    await  entityManager.save(expense);

    return this.expenseRepository.findOne(expense.id);
  }
}
