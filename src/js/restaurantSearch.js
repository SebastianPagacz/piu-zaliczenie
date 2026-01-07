export function searchRestaurants(restaurantList, searchInput){
    return restaurantList.filter((restaurant) => restaurant.restaurantName.toLowerCase().includes(searchInput.toLowerCase()));
}