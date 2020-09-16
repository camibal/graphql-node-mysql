import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['id'])
export class Cities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  city: string;

  @Column()
  @MinLength(3)
  country: string;

  @Column()
  @MinLength(3)
  continent: string;
}
