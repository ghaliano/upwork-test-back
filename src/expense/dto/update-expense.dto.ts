import { IsNotEmpty} from 'class-validator';

export class UpdateExpenseDto {
  @IsNotEmpty()
  description: string;
  amount: number;
  note: string;
}
