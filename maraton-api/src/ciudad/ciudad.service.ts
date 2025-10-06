import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepo: Repository<Ciudad>,
  ) {}

  // CREATE
  async create(dto: CreateCiudadDto): Promise<Ciudad> {
    const existe = await this.ciudadRepo.findOne({ where: { nombre: dto.nombre } });
    if (existe) throw new BadRequestException('Ya existe una ciudad con ese nombre');

    const ciudad = this.ciudadRepo.create(dto);
    return this.ciudadRepo.save(ciudad);
  }

  // READ ALL
  async findAll(): Promise<Ciudad[]> {
    return await  this.ciudadRepo.find({ relations: ['atletas'] });
  }

  // READ ONE
  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepo.findOne({ where: { id }, relations: ['atletas'] });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    return ciudad;
  }

  // UPDATE
  async update(id: number, dto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.ciudadRepo.findOne({ where: { id } });
    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');

    ciudad.nombre = dto.nombre ?? ciudad.nombre;
    return this.ciudadRepo.save(ciudad);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
  const ciudad = await this.ciudadRepo.findOne({ where: { id } });
  if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
  await this.ciudadRepo.remove(ciudad);
  return { message: 'Ciudad eliminada correctamente' };
}
}
