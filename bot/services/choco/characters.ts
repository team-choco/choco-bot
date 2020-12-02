import { ICharacters } from '../../database/characters';
import { database } from '../../database/database';

export class ChocoCharacters {
  async add(character: ICharacters): Promise<ICharacters> {
    const { Characters } = await database();

    return Characters.create(character, {
      raw: true,
    });
  }

  async update(user_id: string, lodestone_id: number, character: Partial<ICharacters>) {
    const { Characters } = await database();

    await Characters.update(character, {
      where: {
        user_id,
        lodestone_id,
      },
    });

    return this.get(user_id, lodestone_id);
  }

  async get(user_id: string): Promise<ICharacters[]>
  async get(user_id: string, lodestone_id: number): Promise<ICharacters>
  async get(user_id: string, lodestone_id?: number): Promise<(ICharacters | ICharacters[])> {
    const { Characters } = await database();

    if (lodestone_id) {
      return Characters.findOne({
        where: {
          user_id,
          lodestone_id,
        },
        raw: true,
      });
    }

    return Characters.findAll({
      where: {
        user_id,
      },
      raw: true,
    });
  }

  async getMainCharacter(user_id: string): Promise<ICharacters> {
    const { Characters } = await database();

    return Characters.findOne({
      where: {
        user_id,
        main: true,
      },
      raw: true,
    });
  }

  async getPendingCharacters(user_id: string): Promise<ICharacters[]> {
    const { Characters } = await database();

    return Characters.findAll({
      where: {
        user_id,
        validated: false,
      },
      raw: true,
    });
  }

  async any(user_id: string): Promise<boolean> {
    const { Characters } = await database();

    return await Characters.count({
      where: {
        user_id,
      },
    }) > 0;
  }

  async empty(user_id: string): Promise<boolean> {
    const hasAny = await this.any(user_id);

    return !hasAny;
  }

  async getByUserIDAndServerAndName(user_id: string, server: string, name: string): Promise<(null | ICharacters)> {
    const { Characters } = await database();

    return await Characters.findOne({
      where: {
        user_id,
        server,
        name,
      },
      raw: true,
    }) || null;
  }
}
