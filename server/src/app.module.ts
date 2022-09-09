import { DatabaseConfigModule } from '@configs/database/database-config.module';
import { DatabaseConfigService } from '@configs/database/database-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTables1662701635234 } from './database/migrations/1662701635234-CreateTables';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        name: 'default',
        host: databaseConfigService.host,
        type: 'postgres',
        port: databaseConfigService.port,
        database: databaseConfigService.name,
        logging: databaseConfigService.logging,
        username: databaseConfigService.user,
        password: databaseConfigService.password,
        ...(databaseConfigService.ssl && {
          ssl: {
            rejectUnauthorized: false,
          },
        }),
        entities: [],
        migrations: [CreateTables1662701635234],
        migrationsRun: databaseConfigService.migrationsRun,
        synchronize: false,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
