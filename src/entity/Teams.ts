import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['id'])
export class Teams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  equipment: string;

  @Column()
  @MinLength(3)
  ligue: string;

  @Column()
  @MinLength(3)
  country: string;
}
