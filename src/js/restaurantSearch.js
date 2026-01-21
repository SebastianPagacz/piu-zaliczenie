export function searchRestaurants(restaurantList, searchInput) {
    return restaurantList.filter((restaurant) =>
        restaurant.restaurantName
            .toLowerCase()
            .includes(searchInput.toLowerCase()),
    );
}

export function filterRestaurantsByType(restaurantsList, type) {
    return restaurantsList.filter((restaurant) =>
        restaurant.category.includes(type),
    );
}

export function filterRestaurants(restaurantList, state) {
    const searchTerm = state.searchFilter.trim().toLowerCase();

    const selectedDropdownCategory = state.categoryFilter;

    return restaurantList.filter((restaurant) => {
        const matchesDropdown =
            selectedDropdownCategory === '' ||
            restaurant.category === selectedDropdownCategory;

        const restaurantName = restaurant.restaurantName.toLowerCase();
        const restaurantCategory = restaurant.category.toLowerCase();

        const matchesSearchText =
            restaurantName.includes(searchTerm) ||
            restaurantCategory.includes(searchTerm);

        return matchesDropdown && matchesSearchText;
    });
}
