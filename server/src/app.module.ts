import { DatabaseConfigModule } from '@configs/database/database-config.module';
import { DatabaseConfigService } from '@configs/database/database-config.service';
import { Companies } from '@entities/Companies';
import { MockedResponses } from '@entities/MockedResponses';
import { Roles } from '@entities/Roles';
import { Users } from '@entities/Users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTables1662701635234 } from './database/migrations/1662701635234-CreateTables';
import { CreateGlobalAdmin1662985974442 } from './database/migrations/1662985974442-CreateGlobalAdmin';
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
        entities: [Companies, MockedResponses, Roles, Users],
        migrations: [CreateTables1662701635234, CreateGlobalAdmin1662985974442],
        migrationsRun: databaseConfigService.migrationsRun,
        synchronize: false,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
