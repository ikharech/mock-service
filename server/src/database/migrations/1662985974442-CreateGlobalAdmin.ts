import CryptoJS from 'crypto-js';
import { Roles } from '@entities/Roles';
import { Users } from '@entities/Users';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppConfigService } from '@configs/app/app-config.service';

export class CreateGlobalAdmin1662985974442 implements MigrationInterface {
  name = 'CreateGlobalAdmin1662985974442';

  constructor(private configService: AppConfigService) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createGlobalAdmin(queryRunner);
  }

  private async createGlobalAdmin(queryRunner: QueryRunner) {
    const globalAdminRole = this.configService.globalAdminRole;
    const globalAdminName = this.configService.globalAdminName;
    const globalAdminPassword = this.configService.globalAdminPassword;

    const rolesRepository = await queryRunner.connection.getRepository(Roles);
    const usersRepository = await queryRunner.connection.getRepository(Users);

    let role = await rolesRepository.findOne({
      where: { name: globalAdminRole },
    });
    const user = await usersRepository.findOne({
      where: { username: globalAdminName as string },
    });

    if (!role) {
      role = rolesRepository.create({ name: globalAdminRole });
      await rolesRepository.save(role);
    }

    if (!user) {
      const hashedPassword = CryptoJS.SHA256(
        globalAdminPassword as string,
      ).toString();
      const user = usersRepository.create({
        username: globalAdminName,
        password: hashedPassword,
        role: role,
      });

      await usersRepository.save(user);
    }
  }

  public async down(): Promise<void> {
    return;
  }
}
