import { createReducer, on } from '@ngrx/store';
import { clearCoachList, coachListReceived, coachRecentSearchesFailure, coachRecentSearchesReceived, coachSearchReceived, requestClearCoachRecentSearch } from './coach.actions';
import { initialCoachState } from './coach.state';



export const reducer = createReducer
  (

    initialCoachState,

    // COACH: RECENT SEARCH RECEIVED
    on(coachRecentSearchesReceived, (state, { recentSearches }) =>
    {
      return { ...state, recentSearches };
    }),


    // CLEAR COACH: RECENT SEARCHES
    on(requestClearCoachRecentSearch, (state) =>
    {
      return { ...state, recentSearches: undefined };
    }),

    on(clearCoachList, state =>
    {

      return { state, coachList: undefined };
    }),

    on(coachListReceived, (state, { coachList }) =>
    {
      return { ...state, coachList };
    }),

    on(coachSearchReceived, (state, { search }) =>
    {
      const oldRecentSearches = state.recentSearches?.filter(x => x.name != search.name).slice(0, 9) || [];
      return { ...state, recentSearches: [search, ...oldRecentSearches] };
    })
  );
