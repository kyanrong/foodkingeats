import { handleActions } from 'redux-actions';

import { Actions } from './actions';

const initialState = {
  entities: {
    food: {},
    place: {},
    visit: {},
  },
  search: {
    loading: false,
    success: false,
    error: null,
    results: [],
  },
};

export default handleActions({
  [Actions.SEARCH_REQUEST]: state => ({
    ...state,
    search: {
      ...initialState.search,
      loading: true,
    },
  }),
  [Actions.SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      food: { ...state.entities.food, ...action.payload.foods },
      place: { ...state.entities.place, ...action.payload.places },
      visit: { ...state.entities.visit, ...action.payload.visits },
    },
    search: {
      ...initialState.search,
      success: true,
      results: action.payload.searchResults,
    },
  }),
  [Actions.SEARCH_FAILURE]: (state, action) => ({
    ...state,
    search: {
      ...initialState.search,
      error: action.payload,
    },
  }),
}, initialState);
