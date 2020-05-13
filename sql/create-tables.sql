CREATE TABLE "Places"(
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name varchar UNIQUE NOT NULL,
  address jsonb,
  "isHalal" boolean DEFAULT FALSE,
  PRIMARY KEY (id)
);

CREATE TABLE "Visits"(
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  "PlaceId" uuid NOT NULL,
  rating numeric DEFAULT 0,
  "isSponsored" boolean DEFAULT FALSE,
  "youtubeUrl" varchar,
  "dateOfUpload" date NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY ("PlaceId") REFERENCES "Places" (id)
);

CREATE TABLE "Food"(
  id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "PlaceId" uuid NOT NULL,
  "VisitId" uuid NOT NULL, name varchar,
  "priceMin" numeric, "priceMax" numeric,
  notes varchar,
  currency varchar,
  "hasPriceRange" boolean DEFAULT FALSE,
  PRIMARY KEY(id), FOREIGN KEY ("PlaceId")
  REFERENCES "Places" (id),
  FOREIGN KEY ("VisitId") REFERENCES "Visits" (id)
);