import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsResolver } from './creators.resolver';
import { Creator } from './entities/creator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Creator])],
  providers: [CreatorsResolver, CreatorsService],
  exports: [CreatorsService],
})
export class CreatorsModule {}
