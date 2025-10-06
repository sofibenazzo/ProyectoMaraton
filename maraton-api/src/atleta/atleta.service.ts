import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atleta } from './entities/atleta.entity';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';

@Injectable()
export class AtletaService {
  constructor(
    @InjectRepository(Atleta)
    private readonly atletaRepo: Repository<Atleta>,
  ) {}

  // CREATE
  async create(dto: CreateAtletaDto): Promise<Atleta> {
    const existe = await this.atletaRepo.findOne({ where: { dni: dto.dni } });
    if (existe) throw new BadRequestException('Ya existe un atleta con ese DNI');

    const atleta = this.atletaRepo.create({
      dni: dto.dni,
      nombre: dto.nombre,
      tiempo: dto.tiempo,
      posicion: 0,
      ciudad: { id: dto.ciudadId } as any, // mapear ciudadId → relación
    });

    return this.atletaRepo.save(atleta);
  }

  // READ ALL
  findAll(): Promise<Atleta[]> {
    return this.atletaRepo.find({ relations: ['ciudad'] });
  }

  // READ ONE
  async findOne(id: number): Promise<Atleta> {
    const atleta = await this.atletaRepo.findOne({ where: { id }, relations: ['ciudad'] });
    if (!atleta) throw new NotFoundException('Atleta no encontrado');
    return atleta;
  }

  // UPDATE
  async update(id: number, dto: UpdateAtletaDto): Promise<Atleta> {
    const atleta = await this.atletaRepo.findOne({ where: { id } });
    if (!atleta) throw new NotFoundException('Atleta no encontrado');

    if (
      dto.dni &&
      (await this.atletaRepo.findOne({ where: { dni: dto.dni } })) &&
      dto.dni !== atleta.dni
    ) {
      throw new BadRequestException('DNI ya registrado');
    }

    if (dto.nombre) atleta.nombre = dto.nombre;
    if (dto.tiempo) atleta.tiempo = dto.tiempo;
    if (dto.dni) atleta.dni = dto.dni;
    if (dto.ciudadId) atleta.ciudad = { id: dto.ciudadId } as any;

    return this.atletaRepo.save(atleta);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
  const atleta = await this.atletaRepo.findOne({ where: { id } });
  if (!atleta) throw new NotFoundException('Atleta no encontrado');
  await this.atletaRepo.remove(atleta);
  return { message: 'Atleta eliminado correctamente' };
}
}
