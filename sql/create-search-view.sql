CREATE VIEW "SearchView" AS
  WITH
    p as (
      SELECT id, name, "isHalal", address->>'street' AS street, address->>'building' AS building, address->>'postal' AS postal
      FROM "Places"
    ),
    v as (
      SELECT id, "isSponsored", rating
      FROM "Visits"
    )
  SELECT
    f.id as "FoodId",
    f."PlaceId",
    f."VisitId",
    f."priceMin",
    f."priceMax",
    v."isSponsored",
    v.rating,
    p."isHalal",
    STRING_AGG(LOWER(f.name) || ' '  || LOWER(p.name) || ' ' || COALESCE(LOWER(p.street), '') || ' ' || COALESCE(LOWER(p.building), '') || ' ' || COALESCE(p.postal, ''), ' ') AS terms
  FROM "Food" f
  LEFT JOIN v on v.id = f."VisitId"
  LEFT JOIN p on p.id = f."PlaceId"
  GROUP BY
    f.id,
    f."PlaceId",
    f."VisitId",
    f."priceMin",
    f."priceMax",
    v."isSponsored",
    v.rating,
    p."isHalal"
;