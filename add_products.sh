#!/bin/bash

# Define the endpoint
URL="http://localhost:3000/product"

# Define the image URL
IMAGE_URL="https://theme-assets.getbento.com/sensei/5271791.sensei/assets/images/catering-item-placeholder-704x520.png"

# Create an array of dummy product data with crop and poultry product names and the same image URL
products=(
	'{"name":"Corn","description":"Fresh corn harvested from the fields.","type":"Crop","price":5.99,"stock":500,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Wheat","description":"High-quality wheat for baking and cooking.","type":"Crop","price":4.99,"stock":400,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Rice","description":"Premium rice, perfect for every meal.","type":"Crop","price":3.99,"stock":300,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Tomatoes","description":"Juicy, ripe tomatoes for salads and sauces.","type":"Crop","price":2.99,"stock":200,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Carrots","description":"Crunchy, fresh carrots.","type":"Crop","price":1.99,"stock":100,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Potatoes","description":"Versatile potatoes for all your cooking needs.","type":"Crop","price":2.49,"stock":150,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Lettuce","description":"Crisp lettuce, perfect for salads.","type":"Crop","price":1.49,"stock":250,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Spinach","description":"Fresh spinach, rich in vitamins.","type":"Crop","price":2.29,"stock":180,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Apples","description":"Sweet and crunchy apples.","type":"Crop","price":3.49,"stock":220,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Oranges","description":"Citrusy oranges full of flavor.","type":"Crop","price":3.79,"stock":260,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Chicken","description":"Free-range chicken, perfect for roasting.","type":"Poultry","price":10.99,"stock":300,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Duck","description":"Succulent duck meat.","type":"Poultry","price":12.99,"stock":150,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Turkey","description":"Whole turkey, ideal for feasts.","type":"Poultry","price":15.99,"stock":100,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Eggs","description":"Fresh farm eggs.","type":"Poultry","price":2.99,"stock":400,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Quail","description":"Delicate quail meat.","type":"Poultry","price":13.99,"stock":80,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Goose","description":"Rich goose meat for gourmet dishes.","type":"Poultry","price":14.99,"stock":90,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Broilers","description":"Young chicken broilers for tender meat.","type":"Poultry","price":9.99,"stock":120,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Guinea Fowl","description":"Exotic guinea fowl meat.","type":"Poultry","price":16.99,"stock":70,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Pheasant","description":"Game pheasant meat.","type":"Poultry","price":18.99,"stock":60,"img":"'"$IMAGE_URL"'"}'
	'{"name":"Rabbit","description":"Lean rabbit meat.","type":"Poultry","price":8.99,"stock":110,"img":"'"$IMAGE_URL"'"}'
)

# Loop through each product and send a POST request
for product in "${products[@]}"; do
	curl -X POST -H "Content-Type: application/json" -d "$product" $URL
done
