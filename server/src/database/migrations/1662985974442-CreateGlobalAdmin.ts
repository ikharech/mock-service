import { Roles } from '@entities/Roles';
import { Users } from '@entities/Users';
import { MigrationInterface, QueryRunner } from 'typeorm';
import CryptoJS from 'crypto-js';

export class CreateGlobalAdmin1662985974442 implements MigrationInterface {
  name = 'CreateGlobalAdmin1662985974442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createGlobalAdmin(queryRunner);
  }

  private async createGlobalAdmin(queryRunner: QueryRunner) {
    const { GLOBAL_ADMIN_ROLE, GLOBAL_ADMIN_NAME, GLOBAL_ADMIN_PASSWORD } =
      process.env;

    const rolesRepository = await queryRunner.connection.getRepository(Roles);
    const usersRepository = await queryRunner.connection.getRepository(Users);

    let role = await rolesRepository.findOne({
      where: { name: GLOBAL_ADMIN_ROLE },
    });
    const user = await usersRepository.findOne({
      where: { username: GLOBAL_ADMIN_NAME as string },
    });

    if (!role) {
      role = rolesRepository.create({ name: GLOBAL_ADMIN_ROLE });
      await rolesRepository.save(role);
    }

    if (!user) {
      const hashedPassword = CryptoJS.SHA256(
        GLOBAL_ADMIN_PASSWORD as string,
      ).toString();
      const user = usersRepository.create({
        username: GLOBAL_ADMIN_NAME,
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
