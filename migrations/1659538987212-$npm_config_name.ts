import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1659538987212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE task ALTER COLUMN "updatedDate" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE task ALTER COLUMN "updatedDate" SET NOT NULL',
    );
  }
}
