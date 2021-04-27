import { reducer } from '../spinner.reducer';
import { initialSpinnerState } from '../spinner.state';

describe('Spinner Reducer', () =>
{
  describe('an unknown action', () =>
  {
    it('should return the previous state', () =>
    {
      const action = {} as any;

      const result = reducer(initialSpinnerState, action);

      expect(result).toBe(initialSpinnerState);
    });
  });
});
