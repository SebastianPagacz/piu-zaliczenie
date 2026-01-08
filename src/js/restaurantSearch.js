export function searchRestaurants(restaurantList, searchInput){
    return restaurantList.filter((restaurant) => restaurant.restaurantName.toLowerCase().includes(searchInput.toLowerCase()));
}

export function filterRestaurantsByType(restaurantsList, type){
    return restaurantsList.filter((restaurant) => restaurant.type.includes(type));
}