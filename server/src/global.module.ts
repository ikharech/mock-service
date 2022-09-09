import { AppConfigModule } from '@configs/app/app-config.module';
import { AppConfigService } from '@configs/app/app-config.service';
import { DatabaseConfigModule } from '@configs/database/database-config.module';
import { DatabaseConfigService } from '@configs/database/database-config.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [AppConfigModule, DatabaseConfigModule],
  providers: [AppConfigService, DatabaseConfigService],
  exports: [AppConfigService, DatabaseConfigService],
})
export class GlobalModule {}
