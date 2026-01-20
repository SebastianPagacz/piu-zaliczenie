export function createRestaurantCard(restaurant){
    const imageUrl = `https://placehold.co/400x400?text=${restaurant.restaurantName}&font=montserrat`;
    let parkingFlag = "";

    if(restaurant.parkingLot){
        parkingFlag = "<p>🚗</p>";
    }

    return `
            <article class="restaurant-card">
                <div class="restaurant-card-header">
                    <img class="restaurant-img" src="${imageUrl}">
                    <h3>${restaurant.restaurantName}</h3>
                </div>
                <div class="restaurant-card-details">
                    <p>${restaurant.category}</p>
                    <p>${restaurant.rating}⭐</p>
                </div>
                <div class="card-transport-info">
                    <p>${restaurant.address}</p>
                    ${parkingFlag}
                </div>
                <a href="restaurant.html?id=${restaurant.id}">więcej</a>
            </article>
        `;
}