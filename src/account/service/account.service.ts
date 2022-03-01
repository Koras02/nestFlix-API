/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../model/account.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { AuthService } from 'src/auth/service/auth.service';
import { map, switchMap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import { AccountDto } from '../dto/account.dto';
import { PlanEntity } from '../../plan/model/plan.entity';
import { VideoEntity } from '../../video/model/video.entity';
import { VideoDto } from '../../video/dto/video.dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountEntityRepository: Repository<AccountEntity>,
    @InjectRepository(PlanEntity)
    private planEntityRepository: Repository<PlanEntity>,
    @InjectRepository(VideoEntity)
    private videoEntityRepository: Repository<VideoEntity>,

    private authSerive: AuthService,
  ) {}

  // Create an account 
  createAnAccount(data): Observable<AccountDto> {
    return this.authSerive.hashPassword(data.password).pipe(
      switchMap(( passwordHash: string ) => {
        const newAccount = new AccountEntity(
          data.id,
          new Date(),
          data.next_bill_date,
          data.username,
          passwordHash,
          data.first_name,
          data.last_name,
          data.country,
          data.email
        );
        return from(this.accountEntityRepository.save(newAccount)).pipe(
          map((account: AccountEntity) => {
            const { password, ...result} = account
            return this.convertToDto(result);
          }),
        )
      })
    )
  }

  findOne(id: number): Promise<any> {
    return this.accountEntityRepository.findOne(id, {relations:['plan', 'user']}).then(account => {
      if (!account) 
        throw new NotFoundException(this.errorhandle(id, "find account", 404))
        return this.convertToDto(account)
    }
    )
  }


  login(account: AccountEntity) {
    return from(this.validateAccount(account.email, account.password)).pipe(
      switchMap(( account: AccountEntity ) => {
        if (account) {
          return this.authSerive.generateJWT(account).pipe(map(( jwt: string) => jwt))
        }
      })
    )
  }



  async addPlanToAccount(id, planId) {
    return from (this.accountEntityRepository.findOne(parseInt(id.id), {relations: ['plan']})).pipe (
         switchMap((account: AccountEntity) => {
           if(!account) {
             throw new NotFoundException(this.errorhandle(parseInt(id.id), "Find account", 404))
           }
         })
    )
  }

}
