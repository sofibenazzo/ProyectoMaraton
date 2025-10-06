import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atleta } from './atleta/entities/atleta.entity';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { AtletaModule } from './atleta/atleta.module';
import { CiudadModule } from './ciudad/ciudad.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',             
      port: 1433,                    
      username: 'maratonUser',       
      password: '1234',              
      database: 'dbProyectoMaraton', 
      entities: [Atleta, Ciudad],
      synchronize: false, //cambie a false, ya que hace que no toque las tablas de la base de datos             
      options: {
        encrypt: false,             
        trustServerCertificate: true,
      },
    }),
    AtletaModule,
    CiudadModule,
  ],
})
export class AppModule {}