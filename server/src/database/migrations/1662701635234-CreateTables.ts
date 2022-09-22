import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1662701635234 implements MigrationInterface {
  name = 'CreateTables1662701635234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."roles"
            ("id" SERIAL NOT NULL PRIMARY KEY,
             "name" VARCHAR(255) NOT NULL
        );
        `,
    );

    await queryRunner.query(
      `CREATE TABLE  IF NOT EXISTS "public"."companies" (
          "id" SERIAL NOT NULL PRIMARY KEY,
          "name" VARCHAR(255) NOT NULL UNIQUE,
          "private" BOOLEAN,
          "public" BOOLEAN
        )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."users"
           ("username" VARCHAR(255) NOT NULL PRIMARY KEY,
           "password" VARCHAR(255) NOT NULL,
           
           "role" INTEGER,
           CONSTRAINT fk_role
           FOREIGN KEY("role") 
	         REFERENCES roles(id),
           "companyname" VARCHAR(255),
           CONSTRAINT fk_company
           FOREIGN KEY("companyname") 
           REFERENCES "companies"(name)
           ON DELETE CASCADE
        )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."mocked_response" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "url" VARCHAR(2048) NOT NULL,
        "statusCode" INT NOT NULL,
        "type" VARCHAR(255) NOT NULL,
        "successBody" VARCHAR(5000) NOT NULL,
        "errorBody" VARCHAR(5000) NOT NULL,
        "requestType" VARCHAR(255) NOT NULL,

        "companyid" SERIAL,
        CONSTRAINT fk_company
        FOREIGN KEY("companyid") 
        REFERENCES "companies"(id)
        ON DELETE CASCADE
      )`,
    );
  }

  public async down(): Promise<void> {
    return;
  }
}
