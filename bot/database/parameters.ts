import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface IParameters {
  server_id: string;

  key: string;

  value: string;
}

@Table({
  tableName: 'parameters',
})
export class Parameters extends Model<IParameters> implements IParameters {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  server_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  key!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value!: string;
}
