export function debounce(callback, delay){
    let timeout;

    return(...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

export function getRestaurantTypes(restaurantsData){
    let result = new Set();
    restaurantsData.map((restaurant) => result.add(restaurant.type));

    return result;
}