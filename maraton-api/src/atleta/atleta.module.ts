import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';
import { Atleta } from './entities/atleta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Atleta])], 
  controllers: [AtletaController],
  providers: [AtletaService],
  exports: [TypeOrmModule], 
})
export class AtletaModule {}
