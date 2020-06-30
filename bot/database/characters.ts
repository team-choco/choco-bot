import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface ICharacters {
  user_id: string;

  lodestone_id: number;

  name: string;

  server: string;

  validation_value: string;

  validated: boolean;

  main: boolean;
}

@Table
export class Characters extends Model<Characters> implements ICharacters {
  @Column({
      type: DataType.STRING,
      primaryKey: true,
  })
  user_id!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    primaryKey: true,
  })
  lodestone_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  server!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  validation_value!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  validated!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  main!: boolean;
}
