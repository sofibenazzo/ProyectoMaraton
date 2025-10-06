import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';

@Controller('atletas')
export class AtletaController {
  constructor(private readonly atletaService: AtletaService) {}

  @Post()
  create(@Body() createAtletaDto: CreateAtletaDto) {
    return this.atletaService.create(createAtletaDto);
  }

  @Get()
  findAll() {
    return this.atletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.atletaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(id, updateAtletaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.atletaService.remove(id);
  }
}
