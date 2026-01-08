import { DataFetcher } from "./api.js";
import { searchRestaurants, filterRestaurantsByType } from "./restaurantSearch.js";
import { renderRestaurantsData, showErrorMessage, renderTypesSelect } from "./ui.js";
import { debounce, getRestaurantTypes } from "./helpers.js";


const init = async () =>{
    const restaurantsContainer = document.getElementById("restaurant-list");
    const restaurantSearchBar = document.getElementById("restaurant-search");
    const restaurantTypeSelect = document.getElementById("restaurant-type-select");
    
    const fetcher = new DataFetcher();
    try{
        const restaurantData = await fetcher.getAllRestaurants();

        renderRestaurantsData(restaurantData, restaurantsContainer);
        
        // restaurant type select element
        renderTypesSelect(getRestaurantTypes(restaurantData), restaurantTypeSelect);
        
        restaurantTypeSelect.addEventListener("change", () => {
            renderRestaurantsData(filterRestaurantsByType(restaurantData, restaurantTypeSelect.value), restaurantsContainer);
        });

        const updateSearchResults = debounce(() => {
            let filteredData = searchRestaurants(restaurantData, restaurantSearchBar.value);
            renderRestaurantsData(filteredData, restaurantsContainer);
        }, 500);
        
        restaurantSearchBar.addEventListener("input", () => {
            updateSearchResults();
        });
    }
    catch(error){
        showErrorMessage(error.message, restaurantsContainer);
    }
}

document.addEventListener("DOMContentLoaded", init);