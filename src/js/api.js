class DataFetcher{
    async getAllRestaurants(){
        const url1 = "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant";
        const url2 = "http://localhost:3000/restaurants";
        
        const response = await fetch(url2);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        return result;
    }
}

export const dataFetcher = new DataFetcher();