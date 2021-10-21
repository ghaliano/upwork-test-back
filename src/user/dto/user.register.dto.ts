import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserRegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    fullName: string;
}