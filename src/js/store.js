class Store{
    #state = {
        searchFilter: "",
        categoryFilter: ""
    };
    
    #subscribers = new Set();
    
    setSearch(term){
        this.#state.searchFilter = term;
        this.#notify();
    }

    setCategory(category){
        this.#state.categoryFilter = category;
        this.#notify();
    }

    getState(){
        return this.#state;
    }

    subscribe(callback){
        this.#subscribers.add(callback);
        callback(this.getState());
        return () => this.#subscribers.delete(callback);
    }

    #notify(){
        for (const subscriber of this.#subscribers){
            subscriber(this.getState());
        }
    }
}

export const store = new Store();
