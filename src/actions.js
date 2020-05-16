import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import { Schemas } from './Schema';

export const Actions = {
  SEARCH_REQUEST: 'app/SEARCH_REQUEST',
  SEARCH_SUCCESS: 'app/SEARCH_SUCCESS',
  SEARCH_FAILURE: 'app/SEARCH_FAILURE',

  PLACES_REQUEST: 'app/PLACES_REQUEST',
  PLACES_SUCCESS: 'app/PLACES_SUCCESS',
  PLACES_FAILURE: 'app/PLACES_FAILURE',

  SELECT_PLACE_ID: 'app/SELECT_PLACE_ID',
  
  SET_SHOW_FOOD_FORM: 'app/SET_SHOW_FOOD_FORM',
  UNSET_SHOW_FOOD_FORM: 'app/UNSET_SHOW_FOOD_FORM',

  SET_SHOW_VISIT_FORM: 'app/SET_SHOW_VISIT_FORM',
  UNSET_SHOW_VISIT_FORM: 'app/UNSET_SHOW_VISIT_FORM',
};

const searchRequest = createAction(Actions.SEARCH_REQUEST);
const searchSuccess = createAction(Actions.SEARCH_SUCCESS,
  (searchResults, places, visits, foods) => ({ searchResults, places, visits, foods }));
const searchFailure = createAction(Actions.SEARCH_FAILURE);

const placesRequest = createAction(Actions.PLACES_REQUEST);
const placesSuccess = createAction(Actions.PLACES_SUCCESS, (ids, entities) => ({ ids, entities }));
const placesFailure = createAction(Actions.PLACES_FAILURE);

export const selectPlaceId = createAction(Actions.SELECT_PLACE_ID);

export const setShowFoodForm = createAction(Actions.SET_SHOW_FOOD_FORM);
export const unsetShowFoodForm =createAction(Actions.UNSET_SHOW_FOOD_FORM);

export const setShowVisitForm = createAction(Actions.SET_SHOW_VISIT_FORM);
export const unsetShowVisitForm = createAction(Actions.UNSET_SHOW_VISIT_FORM);

export const fetchSearchResults = terms => {
  return async dispatch => {
    dispatch(searchRequest());
    try {
      let response = await fetch(`/search?terms=${terms}`);
      response = await response.json();
      
      let normalizedPlaces = normalize(response.places, Schemas.PLACES);
      normalizedPlaces = normalizedPlaces.entities.place;

      let normalizedVisits = normalize(response.visits, Schemas.VISITS);
      normalizedVisits = normalizedVisits.entities.visit;

      let normalizedFoods = normalize(response.foods, Schemas.FOODS);
      normalizedFoods = normalizedFoods.entities.food;

      dispatch(searchSuccess(response.searchResults, normalizedPlaces, normalizedVisits, normalizedFoods));
    } catch (err) {
      console.log(err);
      dispatch(searchFailure(err));
    }
  };
};

export const fetchPlaces = terms => {
  return async dispatch => {
    dispatch(placesRequest());
    try {
      let response = await fetch(`/places?terms=${terms}`);
      response = await response.json();

      if (response.length) {
        const normalizedPlaces = normalize(response, Schemas.PLACES);
        dispatch(placesSuccess(normalizedPlaces.result, normalizedPlaces.entities.place));
      } else {
        dispatch(placesSuccess([], {}));
      };

    } catch (err) {
      dispatch(placesFailure(err));
    }
  };
};
