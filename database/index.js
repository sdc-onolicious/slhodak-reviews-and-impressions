const { Client } = require('pg');
const squel = require('squel');
const localRole = require('../config/localRole.js');


const makeQuery = (client, sql, callback) => {
  client.connect()
    .then(() => {
      client.query(sql)
        .then((res) => {
          callback(null, res.rows);
          client.end();
        })
        .catch((err) => {
          callback(err);
          client.end();
        });
    })
    .catch((err) => {
      callback(err);
      client.end();
    });
};

module.exports.getAllReviews = (restaurantId, callback) => {
  const client = new Client({
    user: localRole,
    host: 'localhost',
    database: 'reviews',
    port: 5432
  });

  const sql = `SELECT * from reviews INNER JOIN diners on (reviews.diner = diners.id) where reviews.restaurant = ${restaurantId}`;

  makeQuery(client, sql, callback);
};

module.exports.getSummary = (restaurantId, callback) => {
  // get restaurant summary info from restaurant table
  const client = new Client({
    user: localRole,
    host: 'localhost',
    database: 'reviews',
    port: 5432
  });
  const sql = squel.select()
    .from('restaurants')
    .field('restaurants.location')
    .field('restaurants.noise')
    .field('restaurants.recommendpercent', 'recommendPercent')
    .field('restaurants.valuerating', 'valueRating')
    .field('restaurants.averageoverall', 'averageOverall')
    .field('restaurants.averagefood', 'averageFood')
    .field('restaurants.averageambience', 'averageAmbience')
    .field('restaurants.averageservice', 'averageService')
    .where(`id = ${restaurantId}`)
    .toString();

  makeQuery(client, sql, callback);
};
