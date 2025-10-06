import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la ciudad no puede estar vacío' })
  nombre: string;
}
