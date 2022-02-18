import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarImages1645165528210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_images',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCarImage',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }
  s;

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_images');
  }
}
