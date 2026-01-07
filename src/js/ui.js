import { createRestaurantCard } from "./restaurantCards.js";

export function renderRestaurantsData(allRestaurants, restaurantsContainer){
    const restaurantsHTML = allRestaurants.map(restaurant => {
        return createRestaurantCard(restaurant);
    }).join('');

    restaurantsContainer.innerHTML = restaurantsHTML;
}

export function showErrorMessage(errorMsg, container){
    container.innerHTML = "";

    const errorNote = document.createElement("h1");
    errorNote.innerText = errorMsg;

    container.appendChild(errorNote);
}