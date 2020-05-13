import { schema } from 'normalizr';

const FoodSchema = new schema.Entity('food');
const PlaceSchema = new schema.Entity('place');
const VisitSchema = new schema.Entity('visit');

export const Schemas = {
  FOOD: FoodSchema,
  FOODS: [FoodSchema],
  PLACE: PlaceSchema,
  PLACES: [PlaceSchema],
  VISIT: VisitSchema,
  VISITS: [VisitSchema],
};
