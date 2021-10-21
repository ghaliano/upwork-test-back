import { Entity, OneToMany, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { Expense } from "./Expense";

@Entity("user")
export class User {
  resourceName = 'User';
  
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @OneToMany(() => Expense, (quote) => quote.user)
  expenses: Expense[];

  @Column()
  email: string;

  @Column('text')
  @Exclude()
  password: string;
  
  @Column({nullable: true, default: null})
  fullName: string;
  
  @Column({type: 'boolean', nullable: false, default: 0})
  isEnabled: boolean;
}
