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
                    <p>${restaurant.type}</p>
                    <p>${Math.floor(Math.random() * 3)+3}⭐</p>
                </div>
                <div class="card-transport-info">
                    <p>${restaurant.address}</p>
                    ${parkingFlag}
                </div>
            </article>
        `;
}