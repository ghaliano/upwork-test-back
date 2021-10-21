import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { User } from "./User";

@Entity("expense")
export class Expense {
    resourceName = 'Expense';
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column("varchar", { length: 255, })
    description: string | null;

    @Column("varchar", { length: 255, nullable: true })
    note: string | null;

    @Column("float", { nullable: true })
    amount: number;

    @Column("int", { name: "user_id" })
    userId: number;

    @ManyToOne(() => User, (user) => user.expenses, {
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ 
      name: "user_id", 
      referencedColumnName: "id" 
    }])
    user: User;

    @Column("datetime", { name: "created_at", nullable: false })
    createdAt: Date;

    @BeforeInsert()
    updateDateCreation() {
        const date =  new Date();
        this.createdAt = date;
    }
}