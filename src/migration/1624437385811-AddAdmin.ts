import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

const password = hashSync('admin', genSaltSync(5));

export class AddAdmin1624437385811 implements MigrationInterface {
  name = 'AddAdmin1624437385811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) VALUES ('admin', 'admin', '${password}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE login='admin'`);
  }
}
