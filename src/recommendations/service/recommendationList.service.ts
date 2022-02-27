import { InjectRepository } from '@nestjs/typeorm';


export class RecommandationListService {
    
    constructor(@InjectRepository(RecommandationListEntity))
}