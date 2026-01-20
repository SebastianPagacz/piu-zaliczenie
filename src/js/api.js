class DataFetcher{
    constructor(){
        this.baseUrl = "http://localhost:3000";
    }
    async getAllRestaurants(){      
        const response = await fetch(`${this.baseUrl}/restaurants`);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        return result;
    }

    async getRestaurantById(id){
        const response = await fetch(`${this.baseUrl}/restaurants/${id}`);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const result = await response.json();

        return result;
    }
}

export const dataFetcher = new DataFetcher();