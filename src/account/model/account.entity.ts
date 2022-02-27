/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PlanEntity } from '../../plan/model/plan.entity';

@Entity()
export class AccountEntity {
  @ApiProperty({ example: 1, description: "account's ID" })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: '2022-02-28',
    description: 'Creation date of the account',
  })
  @Column()
  readonly created_at: Date;
  @ApiProperty({
    example: '2022-02-19',
    description: 'Date of the next building',
  })
  @Column()
  next_bill_date: Date;
  @ApiProperty({ example: 'Jean17', description: 'Account username' })
  @Column()
  username: string;
  @ApiProperty({ example: 'koras123', description: 'Account password' })
  @Column()
  password: string;
  @ApiProperty({ example: 'Jian', description: 'First name of owner' })
  @Column()
  first_name: string;
  @ApiProperty({ example: 'Solve', description: 'Last name of owner' })
  last_name: string;
  @ApiProperty({ example: 'Korea_Republic', description: 'Country of owner' })
  @Column()
  country: string;
  @ApiProperty({
    example: 'wjdgh0727@gmail.com',
    description: 'email of owner',
  })
  email: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @ApiProperty({ description: 'Account Plan' })
  @ManyToOne((type) => PlanEntity, (plan) => plan.account)
  @JoinColumn({ name: 'planId', referencedColumnName: 'id' })
  plan: PlanEntity;

  @OneToMany((type) => UserEntity, (user) => user.account)
  user: UserEntity;
}
