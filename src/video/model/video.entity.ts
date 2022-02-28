/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGenratedColumn,
} from 'typeorm';
import { TagEntity } from '../../tag/model/tag.entity';
import { AccountEntity } from '../../account/model/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RecommandationListEntity } from 'src/recommendations/model/recommendationList.entity';

@Entity()
export class 