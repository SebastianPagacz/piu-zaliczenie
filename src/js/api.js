export class DataFetcher{
    async getAllRestaurants(){
        const url = "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant";
        
        try
        {
            const response = await fetch(url);

            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();

            return result;
        }
        catch(error)
        {
            console.log(error);
            return [];
        }
    }
}