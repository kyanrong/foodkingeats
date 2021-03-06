export const getSearchResults = state => state.app.search.results;

export const getLoading = state => state.app.search.loading;
export const getSuccess = state => state.app.search.success;

export const getFoods = state => state.app.entities.food;
export const getPlaces = state => state.app.entities.place;
export const getVisits = state => state.app.entities.visit;

export const getOptionsPlaceIds = state => state.app.options.placeIds;
export const getPlacesOptions = state => {
  const ids = getOptionsPlaceIds(state);
  return ids.map(x => state.app.entities.place[x]);
};

export const getShowFoodForm = state => state.app.add.showFoodForm;
export const getShowVisitForm = state => state.app.add.showVisitForm;

export const getAddLoading = state => state.app.add.loading;
export const getAddSuccess = state => state.app.add.success;

export const getAddPlaceId = state => state.app.add.placeId;
export const getAddVisitId = state => state.app.add.visitId;
