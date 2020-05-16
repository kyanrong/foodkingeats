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
  options: {
    placeIds: [],
  },
  add: {
    placeId: null,
    showVisitForm: false,
    showFoodForm: false,
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
  [Actions.PLACES_SUCCESS]: (state, action) => ({
    ...state,
    options: {
      ...state.options,
      placeIds: action.payload.ids,
    },
    entities: {
      ...state.entities,
      place: {
        ...state.entities.place,
        ...action.payload.entities,
      },
    },
  }),
  [Actions.SELECT_PLACE_ID]: (state, action) => ({
    ...state,
    add: {
      ...state.add,
      placeId: action.payload,
    },
  }),
  [Actions.SET_SHOW_FOOD_FORM]: state => ({
    ...state,
    add: {
      ...state.add,
      showFoodForm: true,
    },
  }),
  [Actions.UNSET_SHOW_FOOD_FORM]: state => ({
    ...state,
    add: {
      ...state.add,
      showFoodForm: false,
    },
  }),
  [Actions.SET_SHOW_VISIT_FORM]: state => ({
    ...state,
    add: {
      ...state.add,
      showVisitForm: true,
    },
  }),
  [Actions.UNSET_SHOW_VISIT_FORM]: state => ({
    ...state,
    add: {
      ...state.add,
      showVisitForm: false,
    },
  }),
}, initialState);
