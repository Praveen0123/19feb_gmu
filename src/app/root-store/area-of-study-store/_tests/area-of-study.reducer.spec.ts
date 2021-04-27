import { reducer } from '../area-of-study.reducer';
import { initialAreaOfStudyState } from '../area-of-study.state';

describe('AreaOfStudy Reducer', () =>
{
  describe('an unknown action', () =>
  {
    it('should return the previous state', () =>
    {
      const action = {} as any;

      const result = reducer(initialAreaOfStudyState, action);

      expect(result).toBe(initialAreaOfStudyState);
    });
  });
});
