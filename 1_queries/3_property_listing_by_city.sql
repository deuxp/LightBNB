-- Show specific details about properties located in Vancouver including their average rating.

SELECT properties.id, title, cost_per_night, avg(rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE CITY LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
