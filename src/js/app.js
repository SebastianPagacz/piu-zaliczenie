import { dataFetcher } from "./api.js";
import { filterRestaurants } from "./restaurantSearch.js";
import { renderRestaurantsData, showErrorMessage, renderTypesSelect } from "./ui.js";
import { debounce, getRestaurantTypes } from "./helpers.js";
import { store } from "./store.js";


const init = async () =>{
    const restaurantsContainer = document.getElementById("restaurant-list");
    const restaurantSearchBar = document.getElementById("restaurant-search");
    const restaurantTypeSelect = document.getElementById("restaurant-type-select");
    
    try{
        const restaurantData = await dataFetcher.getAllRestaurants();
        
        renderRestaurantsData(restaurantData, restaurantsContainer);
        
        store.subscribe((state) => {
            const filteredData = filterRestaurants(restaurantData, state);
            renderRestaurantsData(filteredData, restaurantsContainer);
        })

        // restaurant type select element
        renderTypesSelect(getRestaurantTypes(restaurantData), restaurantTypeSelect);

        restaurantTypeSelect.addEventListener("change", () => {
            store.setCategory(restaurantTypeSelect.value);
        });
        
        restaurantSearchBar.addEventListener("input", debounce((e) => {
            store.setSearch(e.target.value);
        }, 500));
    }
    catch(error){
        showErrorMessage(error.message, restaurantsContainer);
    }
}

document.addEventListener("DOMContentLoaded", init);