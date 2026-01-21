import { dataFetcher } from './api.js';
import { filterRestaurants } from './restaurantSearch.js';
import {
    renderRestaurantsData,
    showErrorMessage,
    renderTypesSelect,
} from './ui.js';
import { debounce, getRestaurantTypes } from './helpers.js';
import { store } from './store.js';
import { initTheme } from './theme.js';
import { updateCartBadge } from './ui.js';

const init = async () => {
    initTheme();
    updateCartBadge();
    const restaurantsContainer = document.getElementById('restaurant-list');
    const restaurantSearchBar = document.getElementById('restaurant-search');

    const customSelectContainer = document.getElementById(
        'custom-category-select',
    );

    try {
        const restaurantData = await dataFetcher.getAllRestaurants();

        renderRestaurantsData(restaurantData, restaurantsContainer);

        store.subscribe((state) => {
            const filteredData = filterRestaurants(restaurantData, state);
            renderRestaurantsData(filteredData, restaurantsContainer);
            updateCartBadge();
        });

        renderTypesSelect(
            getRestaurantTypes(restaurantData),
            customSelectContainer,
            (selectedCategory) => {
                store.setCategory(selectedCategory);
            },
        );

        restaurantSearchBar.addEventListener(
            'input',
            debounce((e) => {
                store.setSearch(e.target.value);
            }, 500),
        );
    } catch (error) {
        showErrorMessage(error.message, restaurantsContainer);
    }
};

document.addEventListener('DOMContentLoaded', init);
