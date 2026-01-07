import { DataFetcher } from "./api.js";
import { searchRestaurants } from "./restaurantSearch.js";
import { renderRestaurantsData, showErrorMessage } from "./ui.js";
import { debounce } from "./helpers.js";


const init = async () =>{
    const restaurantsContainer = document.getElementById("restaurant-list");
    const restaurantSearchBar = document.getElementById("restaurant-search");
    
    const fetcher = new DataFetcher();
    try{
        const restaurantData = await fetcher.getAllRestaurants();

        renderRestaurantsData(restaurantData, restaurantsContainer);

        const updateSearchResults = debounce(() => {
            let filteredData = searchRestaurants(restaurantData, restaurantSearchBar.value);
            renderRestaurantsData(filteredData, restaurantsContainer);
        }, 500)
        
        restaurantSearchBar.addEventListener("input", () => {
            updateSearchResults();
        });
    }
    catch(error){
        showErrorMessage(error.message, restaurantsContainer);
    }
}

document.addEventListener("DOMContentLoaded", init);