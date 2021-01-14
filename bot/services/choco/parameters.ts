import { database } from '../../database/database';
import { IParameters } from '../../database/parameters';

export class ChocoParameters {
  async save(parameter: IParameters): Promise<IParameters> {
    const { Parameters } = await database();

    await Parameters.upsert(parameter);

    return await this.get(parameter.server_id, parameter.key) as IParameters;
  }

  async get(server_id: string, key: string): Promise<(null|IParameters)> {
    const { Parameters } = await database();

    return Parameters.findOne({
      where: {
        server_id,
        key,
      },
      raw: true,
    });
  }

  async delete(server_id: string, key: string): Promise<number> {
    const { Parameters } = await database();

    return Parameters.destroy({
      where: {
        server_id,
        key,
      },
    });
  }
}
