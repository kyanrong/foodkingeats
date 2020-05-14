import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';

import { Schemas } from './Schema';

export const Actions = {
  SEARCH_REQUEST: 'app/SEARCH_REQUEST',
  SEARCH_SUCCESS: 'app/SEARCH_SUCCESS',
  SEARCH_FAILURE: 'app/SEARCH_FAILURE',
};

const searchRequest = createAction(Actions.SEARCH_REQUEST);
const searchSuccess = createAction(Actions.SEARCH_SUCCESS,
  (searchResults, places, visits, foods) => ({ searchResults, places, visits, foods }));
const searchFailure = createAction(Actions.SEARCH_FAILURE);

export const fetchSearchResults = terms => {
  return async dispatch => {
    dispatch(searchRequest());
    try {
      let response = await fetch(`/search?terms=${terms}`);
      response = await response.json();

      console.log(response);
      
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
