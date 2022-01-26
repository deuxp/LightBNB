# Tuesday

## Refactor the Following

hard code the params to see of it is just the list in regards to the switch statement.

<!-- - [x] whats up with the duplicates on LighthouseBnB Reservations ?? -->

<!-- 
- [x] const getUserWithId = function (id) {};
  - [] needs to be tested <-- HOW TO TEST -->

<!-- - [x] const addUser = function (user) {}; -->

<!-- - [x] const getUserWithEmail = function (email) {};
  1. Accepts an email address and will return a promise.
  2. The promise should resolve with a user object with the given email address, or null if that user does not exist.

  - Driver:

    {
    id: 1,
    name: 'Jerry Seinfeld',
    email: 'jb555@qmail.com',
    password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  },
  {
    id: 2,
    name: 'Tony Soprano',
    email: 'tony_tony@qmail.com',
    password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  }, -->

id driver:

id       | 101
name     | Matthew Banks
email    | hannahyates@inbox.com
password | $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
-[ RECORD 2 ]----------------------------------------------------------
id       | 102
name     | Gene Burns
email    | danielsargent@outlook.com
password | $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
-[ RECORD 3 ]----------------------------------------------------------
id       | 103
name     | Nicholas Drake
email    | matthewnorman@yahoo.com
password | $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.

\





const getAllProperties = function (options, limit=10) {
  const {
    city, 
    owner_id, 
    minimum_price_per_night,
    maximum_price_per_night,
    minimum_rating
   } = options;

  // const bulgogi = [
  //   `%${city}%`, 
  //   owner_id, 
  //   minimum_price_per_night,
  //   maximum_price_per_night,
  //   minimum_rating
  // ];


  // empty params
  const queryParams = [];
  const wheel = [null, 'WHERE', 'AND', 'AND']
  let enumerate = 1;

  // 1. first frame -- works on its own
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  // 1. check if city is there; if wheel has not over-stayed its welcome (undefined), then add the prefix to the query
   if (city) {
    if (wheel[enumerate]) queryString += `${wheel[enumerate]} `

    queryParams.push(city)
    queryString += `city LIKE $${queryParams.length} ` // dynamic param identifier $1
    enumerate++
   }

   // 
   if () {

   }
  // 2. second frame -- 


      // push query param; concat query string
      // switch (key) {
      //   case 'city':
      //     queryParams.push(`%${city}%`)
      //     // queryString += `city LIKE 'Bohbatev' ` // dynamic param identifier $1
      //     queryString += `city LIKE $${queryParams.length} ` // dynamic param identifier $1
      //     break;
      //   case 'minimum_price_per_night':
      //     if (minimum_price_per_night) {
      //       queryParams.push(`${minimum_price_per_night}`);
      //       // queryString += `cost_per_night > 9 `;
      //       queryString += `cost_per_night > $${queryParams.length} `;
      //     }
      //     break;
      //   case 'maximum_price_per_night':
      //     if (maximum_price_per_night) {
      //       queryParams.push(maximum_price_per_night);
      //       // queryString += `cost_per_night < 99999999999 `;
      //       queryString += `cost_per_night < $${queryParams.length} `;

      
  queryString += `
  GROUP BY properties.id
  LIMIT ${limit}



  `
  console.log(queryString, queryParams)
  
  // EXAMPLE
  // 
  // if (city) {
  //   queryParams.push(`%${city}%`)
  //   queryString += `WHERE city LIKE $${queryParams.length}`
  // }

  // queryParams.push(limit);

  // queryString += `
  // GROUP BY properties.id, property_reviews.id

  // `
  
  // FULL STATEMENT \\
  //     SELECT properties.*, avg(property_reviews.rating) as average_rating
  //     FROM properties
  //     JOIN property_reviews ON property_id = properties.id

  //     WHERE city LIKE $1
  //     AND cost_per_night > $2
  //     AND cost_per_night < $3
      
  //     GROUP BY properties.id, property_reviews.id
  //     HAVING avg(rating) >= $4
  //     ORDER BY cost_per_night
  return pool.query(queryString, queryParams)
    .then(res => {
      console.log(bulgogi)
      // console.log(res.rows)
      return res.rows;
    })
    .catch(err => {
      return console.error('#getAllProperties: ', err, queryParams)
    });
}
exports.getAllProperties = getAllProperties;



# round 1 

const queryParams = [];

  // 1. first frame -- works on its own
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  const wheel = ['WHERE ', 'AND ', 'AND ']
  let enumerate = 0;
  // administer checks 
  for (const key in options) {
    if (Object.hasOwnProperty.call(options, key)) {
      const formElem = options[key];
      if (wheel[enumerate]) {
        queryString += wheel[enumerate] // where || and
      }

      // push query param; concat query string
      switch (key) {
        case 'city':
          queryParams.push(`%${city}%`)
          // queryString += `city LIKE 'Bohbatev' ` // dynamic param identifier $1
          queryString += `city LIKE $${queryParams.length} ` // dynamic param identifier $1
          break;
        case 'minimum_price_per_night':
          if (minimum_price_per_night) {
            queryParams.push(`${minimum_price_per_night}`);
            // queryString += `cost_per_night > 9 `;
            queryString += `cost_per_night > $${queryParams.length} `;
          }
          break;
        case 'maximum_price_per_night':
          queryParams.push(maximum_price_per_night);
          // queryString += `cost_per_night < 99999999999 `;
          queryString += `cost_per_night < $${queryParams.length} `;
          break;
      }
      
      enumerate++;
    }
  }
  queryString += `
  GROUP BY properties.id
  LIMIT ${limit}
  
  
  
  
  `
  console.log(queryString, queryParams)
  
  // EXAMPLE
  // 
  // if (city) {
  //   queryParams.push(`%${city}%`)
  //   queryString += `WHERE city LIKE $${queryParams.length}`
  // }

  // queryParams.push(limit);

  // queryString += `
  // GROUP BY properties.id, property_reviews.id

  // `
  
  // FULL STATEMENT \\
  //     SELECT properties.*, avg(property_reviews.rating) as average_rating
  //     FROM properties
  //     JOIN property_reviews ON property_id = properties.id

  //     WHERE city LIKE $1
  //     AND cost_per_night > $2
  //     AND cost_per_night < $3
      
  //     GROUP BY properties.id, property_reviews.id
  //     HAVING avg(rating) >= $4
  //     ORDER BY cost_per_night
  return pool.query(queryString, queryParams)
    .then(res => {
      console.log(options)
      console.log(res.rows)
      return res.rows;
    })
    .catch(err => {
      return console.error('#getAllProperties: ', err, queryParams)
    });
}
exports.getAllProperties = getAllProperties;