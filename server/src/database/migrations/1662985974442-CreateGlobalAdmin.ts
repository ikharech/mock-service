import * as bcrypt from 'bcrypt';
import { Roles } from '@entities/Roles';
import { Users } from '@entities/Users';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGlobalAdmin1662985974442 implements MigrationInterface {
  name = 'CreateGlobalAdmin1662985974442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createGlobalAdmin(queryRunner);
  }

  private async createGlobalAdmin(queryRunner: QueryRunner) {
    const globalAdminRole = process.env.GLOBAL_ADMIN_ROLE;
    const globalAdminName = process.env.GLOBAL_ADMIN_NAME;
    const globalAdminPassword = process.env.GLOBAL_ADMIN_PASSWORD;

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
      const saltRounds = process.env.AUTH_SALT_ROUNDS;
      const hashedPassword = await bcrypt.hash(globalAdminPassword, saltRounds);

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
