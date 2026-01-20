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

export function renderTypesSelect(typesList, selectElem){
    typesList.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.innerText = type;
        selectElem.appendChild(option);
    });
}

export function renderRestaurantPage(restaurant, container){
    if(!container) return;

    const menuHtml = createMenuHtml(restaurant.menu);
    const reviewsHtml = createReviewsHtml(restaurant.reviews);

    container.innerHTML = `<div class="restaurant-hero">
            <img src="https://placehold.co/400x400?text=${restaurant.restaurantName}&font=montserrat" alt="${restaurant.restaurantName}">
            <h1>${restaurant.restaurantName}</h1>
            <p class="rating">Ocena: ${restaurant.rating} ⭐</p>
        </div>
        ${menuHtml}
        ${reviewsHtml}
        <a href="index.html" class="back-btn">← Wróć do listy</a>
    `;
}

function createMenuHtml(menuItems){
    if(!menuItems || menuItems.lentgh === 0) return "<p>Brak pozycji</p>";

    return menuItems.map(item => `
        <div class="menu-item">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price} PLN</span>
            <span class="item-desc">${item.description}</span>
            </div>
    `).join('');
}

function createReviewsHtml(reviews){
        if(!reviews || reviews.lentgh === 0) return "<p>Brak recenzji</p>";

        return reviews.map(review => `
        <div class="review-card">
            <strong>${review.user}</strong>
            <span>${review.rating}/5 ⭐</span>
            <p>"${review.comment}"</p>
        </div>
            `).join('');
}