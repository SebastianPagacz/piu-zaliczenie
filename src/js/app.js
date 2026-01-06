import { DataFetcher } from "./api.js";
import { createRestaurantCard } from "./restaurantCards.js";

const init = async () =>{
    const restaurantsContainer = document.getElementById("restaurant-list");
    const fetcher = new DataFetcher();

    const restaurantData = await fetcher.getAllRestaurants();

    const restauranstsHTML = restaurantData.map(restaurant => {
        return createRestaurantCard(restaurant);
    }).join('');

    restaurantsContainer.innerHTML = restauranstsHTML;
}

document.addEventListener("DOMContentLoaded", init);