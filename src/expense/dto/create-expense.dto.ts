import { IsNotEmpty} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  description: string;
  amount: number;
  note: string;
}
