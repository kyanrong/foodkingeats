const bodyParser = require('body-parser');
const es = require('elasticsearch');
const express = require('express');
const groupBy = require('lodash.groupby');
const path = require('path');
const pg = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

const pgClient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const esClient = new es.Client({
  host: process.env.SEARCHBOX_URL,
});

const esIndex = 'foodkingeats-data';

const init = async () => {
  pgClient.connect(err => {
    if (err) {
      throw err;
    }
    console.log('Postgres: connected');
  });

  const indexExists = await esClient.indices.exists({ index: esIndex });
  if (!indexExists) {
    await triggerIndexing();
  }

  app.use(express.static('dist'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/place', async (req, res) => {
    const data = req.body;
    values = [data.name, data.street, data.unit, data.building, data.postal, data.isHalal];
    const sql = 'INSERT INTO "Places"(name, street, unit, building, postal, "isHalal") VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
    let response = await pgClient.query(sql, values);
    
    res.send(response.rows[0]);
  });

  app.get('/places', async (req, res) => {
    const terms = req.query.terms;

    let response = await pgClient.query('SELECT * FROM "Places" WHERE name ILIKE $1', [`%${terms}%`]);
    res.send(response.rows);
  });

  app.get('/search', async (req, res) => {
    let terms = req.query.terms;
    terms = terms.trim();
    terms = terms.toLowerCase();

    let response = await esClient.search({
      index: esIndex,
      body: {
        query: {
          bool: {
            should: [{
              match: {
                terms: {
                  query: terms,
                  analyzer: 'whitespace',
                },
              },
            }, {
              wildcard: {
                terms: {
                  value: `*${terms}*`,
                },
              },
            }],
          },
        },
      },
    });
    response = response.hits.hits;
    if (response.length) {
      const placeIds = `(${response.map(x => `'${x._source.PlaceId}'`).join(',')})`;
      const visitIds = `(${response.map(x => `'${x._source.VisitId}'`).join(',')})`;
      const foodIds = `(${response.map(x => `'${x._source.FoodId}'`).join(',')})`;

      const data = response.map(x => ({
        placeId: x._source.PlaceId,
        foodsAndVisits: [
          {
            visitId: x._source.VisitId,
            foodId: x._source.FoodId,
          }
        ],
      }));
      
      let result = groupBy(data, x => x.placeId);
      result = Object.keys(result).map(key => {
        if (result[key].length === 1) {
          return result[key][0];
        } else {
          const temp = { placeId: key, foodsAndVisits: []};
          result[key].forEach(x => {
            temp.foodsAndVisits = temp.foodsAndVisits.concat(x.foodsAndVisits);
          });
          return temp;
        }
      });

      let places = await pgClient.query(`SELECT * FROM "Places" where id in ${placeIds}`);
      places = places.rows;

      let visits = await pgClient.query(`SELECT * FROM "Visits" where id in ${visitIds}`);
      visits = visits.rows;

      let food = await pgClient.query(`SELECT * FROM "Food" where id in ${foodIds}`);
      food = food.rows;

      res.send({
        searchResults: result,
        places: places,
        visits: visits,
        foods: food,
      });
    } else {
      res.send({
        searchResults: [],
        places: [],
        visits: [],
        foods: [],
      });
    }
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', '/index.html'));
  })

  app.listen(port, host, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`Express: server is listening on ${port}`);
  });
};

const triggerIndexing = async () => {
  let res = await pgClient.query('SELECT * FROM "SearchView"');
  res = res.rows;

  await esClient.indices.create({
    index: esIndex,
    body: {
      mappings: {
        properties: {
          PlaceId: { type: 'keyword' },
          VisitId: { type: 'keyword' },
          FoodId: { type: 'keyword' },
          priceMin: { type: 'float' },
          priceMax: { type: 'float' },
          rating: { type: 'float' },
          isSponsored: { type: 'boolean' },
          isHalal: { type: 'boolean' },
          terms: { type: 'text' },
        },
      },
    },
  });

  const body = res.flatMap(doc => [{ index: { _index: esIndex } }, doc]);
  const bulkRes = await esClient.bulk({ refresh: true, body });
  if (bulkRes.errors) {
    throw bulkRes.errors;
  } else {
    const countRes = await esClient.count({ index: esIndex });
    console.log(`Elasticsearch: indexed ${countRes.count} items`);
  }
};

init();
