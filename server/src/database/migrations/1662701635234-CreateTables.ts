import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1662701635234 implements MigrationInterface {
  name = 'CreateTables1662701635234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE  IF NOT EXISTS "public"."company" (
          "id" SERIAL NOT NULL PRIMARY KEY,
          "name" VARCHAR(255) NOT NULL,
          "private" BOOLEAN,
          "public" BOOLEAN
        )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."response" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "url" VARCHAR(2048) NOT NULL,
        "statusCode" INT NOT NULL,
        "type" VARCHAR(255) NOT NULL,
        "body" VARCHAR(5000) NOT NULL,

        "companyid" SERIAL,
        CONSTRAINT fk_company
        FOREIGN KEY("companyid") 
        REFERENCES "company"(id)
        ON DELETE CASCADE
      )`,
    );
  }

  public async down(): Promise<void> {
    return;
  }
}
