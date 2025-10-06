import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';

@Entity('atletas')
export class Atleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  dni: number;

  @Column({ type: 'nvarchar', length: 100 })
  nombre: string;

  @Column({ type: 'nvarchar', length: 50 })
  tiempo: string;

  @Column({ type: 'int', default: 0 })
  posicion: number;

  @ManyToOne(() => Ciudad, ciudad => ciudad.atletas, { eager: true })
  @JoinColumn({ name: 'ciudadId' })
  ciudad: Ciudad;
}