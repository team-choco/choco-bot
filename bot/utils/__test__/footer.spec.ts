import { Characters } from '@team-choco/xiv';

import { getPoweredByFooter } from '../footer';

describe('Footer', () => {
  describe('func(getPoweredByFooter)', () => {
    it('should support having a powered by annotation', () => {
      expect(getPoweredByFooter(Characters.prototype.get)).toEqual({
        content: 'Powered by XIV API',
        iconURL: 'https://xivapi.com/logo.png',
      });
    });

    it('should the lack of a powered by annotation', () => {
      const mockFunction = () => ({});

      expect(getPoweredByFooter(mockFunction)).toEqual(undefined);
    });
  });
});
