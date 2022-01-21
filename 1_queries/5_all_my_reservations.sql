
SELECT reservations.id, title, cost_per_night, start_date, avg(rating) as avg_rating, property_reviews.guest_id

FROM property_reviews
JOIN reservations ON property_reviews.reservation_id = reservations.id
JOIN properties ON property_reviews.property_id = properties.id

where reservations.guest_id = 12
group by properties.id, reservations.id, property_reviews.id
order by start_date
limit 10;





-- when using lots of joins start to specify where all the info is coming from using dot notation and make sure you reference the ERD to make sure that everything is joined by the proper id's