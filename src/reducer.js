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
    visitId: null,
    showVisitForm: false,
    showFoodForm: false,
    loading: false,
    success: false,
    error: null,
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
  [Actions.ADD_PLACE_REQUEST]: state => ({
    ...state,
    add: {
      ...state.add,
      loading: true,
      success: false,
      error: null,
    },
  }),
  [Actions.ADD_PLACE_SUCCESS]: (state, action) => ({
    ...state,
    add: {
      ...state.add,
      loading: false,
      success: true,
      error: null,
      placeId: action.payload,
      showVisitForm: true,
    },
  }),
  [Actions.ADD_PLACE_FAILURE]: (state, action) => ({
    ...state,
    add: {
      ...state.add,
      loading: false,
      success: false,
      error: action.payload,
    },
  }),
  [Actions.ADD_VISIT_REQUEST]: state => ({
    ...state,
    add: {
      ...state.add,
      loading: true,
      success: false,
      error: null,
    },
  }),
  [Actions.ADD_VISIT_SUCCESS]: (state, action) => ({
    ...state,
    add: {
      ...state.add,
      loading: false,
      success: true,
      error: null,
      visitId: action.payload,
    },
  }),
  [Actions.ADD_VISIT_FAILURE]: (state, action) => ({
    ...state,
    add: {
      ...state.add,
      loading: false,
      success: false,
      error: action.payload,
    },
  }),
}, initialState);
