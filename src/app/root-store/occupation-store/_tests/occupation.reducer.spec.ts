import { reducer } from '../occupation.reducer';
import { initialOccupationState } from '../occupation.state';

describe('Occupation Reducer', () =>
{
  describe('an unknown action', () =>
  {
    it('should return the previous state', () =>
    {
      const action = {} as any;

      const result = reducer(initialOccupationState, action);

      expect(result).toBe(initialOccupationState);
    });
  });
});
