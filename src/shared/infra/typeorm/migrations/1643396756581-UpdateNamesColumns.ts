import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNamesColumns1643396756581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'descripion', 'description');
    await queryRunner.renameColumn('cars', 'fina_amount', 'fine_amount');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'description', 'descripion');
    await queryRunner.renameColumn('cars', 'fine_amount', 'fina_amount');
  }
}
