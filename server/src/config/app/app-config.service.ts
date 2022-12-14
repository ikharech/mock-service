import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return +this.configService.get<string>('app.port');
  }

  get secretKey(): string {
    return this.configService.get<string>('app.secret_key');
  }

  get globalAdminRole(): string {
    return this.configService.get<string>('app.global_admin_role');
  }

  get globalAdminName(): string {
    return this.configService.get<string>('app.global_admin_name');
  }

  get globalAdminPassword(): string {
    return this.configService.get<string>('app.global_admin_password');
  }

  get authSecret(): string {
    return this.configService.get<string>('app.auth_secret');
  }

  get authTokenLifetime(): string {
    return this.configService.get<string>('app.auth_token_lifetime');
  }

  get saltRounds(): number {
    return +this.configService.get<string>('auth_salt_rounds');
  }
}
