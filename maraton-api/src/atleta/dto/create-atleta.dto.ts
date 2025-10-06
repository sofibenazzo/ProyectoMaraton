import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAtletaDto {
  @IsInt()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  dni: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El tiempo es obligatorio (ej: 2h 07m 30s)' })
  tiempo: string;

  @IsInt()
  @IsNotEmpty({ message: 'Debe asignarse un ID de ciudad' })
  ciudadId: number;
}
