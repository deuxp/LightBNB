-- SELECT reservations.id, title, start_date, cost_per_night, foo.average_rating

-- -- mine

SELECT reservations.id, title, cost_per_night, start_date, avg(rating) as avg_rating, property_reviews.guest_id
-- SELECT *

FROM property_reviews
JOIN reservations ON property_reviews.reservation_id = reservations.id
JOIN properties ON property_reviews.property_id = properties.id

where reservations.guest_id = 12
group by properties.id, reservations.id, property_reviews.id
order by start_date
limit 10;



-- -- correct

-- SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating

-- FROM reservations
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON properties.id = property_reviews.property_id

-- WHERE reservations.guest_id = 1
-- GROUP BY properties.id, reservations.id
-- ORDER BY reservations.start_date
-- LIMIT 10;





-- when using lots of joins start to specify where all the info is coming from using dot notation