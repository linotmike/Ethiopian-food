USE ethiopians_db;

SELECT food_name,review FROM reviews
JOIN foods 
ON reviews.food_id=foods.id;
