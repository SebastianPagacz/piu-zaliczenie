export function createRestaurantCard(restaurant) {
    const imageUrl = restaurant.image
        ? `src/images/restaurants/${restaurant.image}`
        : `https://placehold.co/400x400?text=${restaurant.restaurantName.replace(/ /g, '+')}`;

    const parkingIcon = restaurant.parkingLot
        ? '<span class="icon" title="Parking dostępny">🚗</span>'
        : '';

    return `
        <article class="restaurant-card">
            <div class="card-image-header">
                <img class="restaurant-img" src="${imageUrl}" alt="${restaurant.restaurantName}">
                <span class="category-badge">${restaurant.category}</span>
            </div>
            
            <div class="card-content">
                <div class="card-title-row">
                    <h3>${restaurant.restaurantName}</h3>
                    <div class="rating-box">
                        <span>${restaurant.rating}</span> <span class="star">⭐</span>
                    </div>
                </div>

                <div class="card-info-row">
                    <p class="address">📍 ${restaurant.address}</p>
                    ${parkingIcon}
                </div>

                <a href="restaurant.html?id=${restaurant.id}" class="btn-details">
                    Zobacz menu →
                </a>
            </div>
        </article>
    `;
}
