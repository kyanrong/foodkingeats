# FoodKingEats

_Heroku, React, Express, Elasticsearch, Postgres Views_

https://foodkingeats.herokuapp.com/

This is a simple to app to search for food/places that [FoodKing](https://www.youtube.com/watch?v=RAa6HqXkxRM&list=PLI87wHY3Cs-xyZshSqT9UaGkK37-tvdEp) has visited. Only Season 1 videos have been added so far!

This app was built using React for frontend, and Express for backend.
Hosted on Heroku with a Postgres database and Elasticsearch for search.

**Search**

Right now, only free text search is supported.

Useful search terms like

- food name
- place name
- place address  

were collated into one string and inserted into a Postgres View.

Other useful attributes like price, isHalal, and isSponsored were also added in the event of future improvements to the search.

The data in the View table was then indexed by Elasticsearch.  

Terms query and wildcard query were used in Elasticsearch to capture as many results as possible. 