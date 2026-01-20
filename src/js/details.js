import { dataFetcher } from "./api.js";
import { renderRestaurantPage } from "./ui.js";

const container = document.getElementById("container");

document.addEventListener("DOMContentLoaded", async () =>{
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(id)
    {
        try
        {
            const restaurant = await dataFetcher.getRestaurantById(id);

            renderRestaurantPage(restaurant, container);
        }
        catch(error)
        {
            console.error(error);
            container.innerHTML = "<h1>Error loading the page</h1>";
        }
    }
    else
    {
        window.location.href = "index.html";
    }
})