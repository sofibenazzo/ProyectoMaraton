import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Atleta } from '../../atleta/entities/atleta.entity';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100, unique: true })
  nombre: string;

//Relacion con Atletas
  @OneToMany(() => Atleta, atleta => atleta.ciudad)
  atletas: Atleta[];
}
