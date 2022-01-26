const { Pool } = require('pg');
require('dotenv').config({path: '../.env'}) // pool config alias
const properties = require('./json/properties.json');
// const users = require('./json/users.json');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: 5432,
});


/////////////
/// Users ///
/////////////

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then(user => {
      if (!user.rows.length) {
        return null
      }
      return user.rows[0];
    })
    .catch(err => {
      return console.error('#getUserWithEmail Error:', err)
    })
}
exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query('SELECT * FROM users WHERE id = $1', [id])
    .then(user => {
      if (!user.rows.length) {
        return null
      }
      return user.rows[0];
    })
    .catch(err => {
      return console.error('#getUserWithId Error:', err)
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user;
  return pool
    .query(`INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *`, [name, email, password])
    .then(user => {
      return user.rows[0]
    })
    .catch(err => {
      console.error('#addUser Error:', err)
    })
  
}
exports.addUser = addUser;


///////////////////
/// Reservations //
///////////////////

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
      SELECT reservations.*, title, number_of_bathrooms, number_of_bedrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url
      FROM property_reviews
      JOIN reservations ON property_reviews.reservation_id = reservations.id
      JOIN properties ON property_reviews.property_id = properties.id
      WHERE reservations.guest_id = $1
      LIMIT $2
    `, [guest_id, limit])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.error('#getAllReservations Error: ', err)
    })
}
exports.getAllReservations = getAllReservations;


//////////////////
/// Properties ///
//////////////////

/**
 * Get all properties filtering by search conditions.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit=10) {
  // form submission
  const {
    city, 
    owner_id, 
    minimum_price_per_night,
    maximum_price_per_night,
    minimum_rating
  } = options;

  // parts for the query builder
  const queryParams = [];
  const wheel = ['WHERE', 'AND', 'AND']
  let index = 0;

  // Query Builder: empty search fields --> return all properties
  // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
  // 1. Selection Skeleton -- works on its own
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;
  // 2. The query suffix, appended to any combination of the query
  let querySuffix = `
  ORDER BY cost_per_night
  LIMIT ${limit};
  `;

  // 3. Search options:
  if (city) {
    queryParams.push(`%${city}%`)
    queryString += `${wheel[index]} city LIKE $${queryParams.length} `
    index++
  }

  if (maximum_price_per_night) {
    queryParams.push(maximum_price_per_night)
    queryString += `${wheel[index]} cost_per_night < $${queryParams.length} `
    index++
  }
  
  if (minimum_price_per_night) {
    queryParams.push(minimum_price_per_night)
    queryString += `${wheel[index]} cost_per_night > $${queryParams.length} `
    index++
  }

  if (minimum_rating) {
    queryParams.push(minimum_rating)
    queryString += `
    GROUP BY properties.id
    HAVING avg(rating) >= $${queryParams.length} 
    ${querySuffix}`;
  } else {
    queryString += `
    GROUP BY properties.id 
    ${querySuffix}`;
  }

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return console.error('#getAllProperties: ', err)
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
 
  const queryParams = []; // populate
  let columns = `` // populate w $1's +=
  let values = ``

  // populate the column, values template, and queryParams 
  for (const key in property) {
    if (Object.hasOwnProperty.call(property, key)) {
      const elem = property[key];

      if ( elem ) {
        // queryParams.push(key)
        columns += `${key}, `
        queryParams.push(elem.toString())
        values += `$${queryParams.length}, `
      }
    }
  }
  
  // remove trailing comma
  columns = columns.slice(0, -2)
  values = values.slice(0, -2)
  
  // query skeleton -- implement colu_valu builder 
  let queryString = `INSERT INTO properties (${columns})
  VALUES (${values})
  RETURNING *;
  `;
  
  return pool
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('#addPropery: ', err))
}
exports.addProperty = addProperty;
