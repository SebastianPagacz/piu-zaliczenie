class Store {
    #state = {
        searchFilter: '',
        categoryFilter: '',
        selectedRestaurant: null,
        cart: JSON.parse(localStorage.getItem('jedzeniomat-cart')) || [],
        lastVisitedRestaurantId: null,
    };

    #subscribers = new Set();

    setSearch(term) {
        this.#state.searchFilter = term;
        this.#notify();
    }

    setCategory(category) {
        this.#state.categoryFilter = category;
        this.#notify();
    }

    setLastVisitedRestaurantId(id) {
        this.#state.lastVisitedRestaurantId = id;
    }

    getLastVisitedRestaurantId() {
        return this.#state.lastVisitedRestaurantId;
    }

    addToCart(item, quantity, restaurantName) {
        const existingItem = this.#state.cart.find((i) => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            this.#state.cart.push({
                ...item,
                quantity: parseInt(quantity),
                restaurantName: restaurantName,
            });
        }
        this.#saveCart();
        this.#notify();
    }

    decreaseItemQuantity(itemId) {
        const item = this.#state.cart.find((i) => i.id === itemId);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
                return;
            }
            this.#saveCart();
            this.#notify();
        }
    }

    increaseItemQuantity(itemId) {
        const item = this.#state.cart.find((i) => i.id === itemId);
        if (item) {
            item.quantity += 1;
            this.#saveCart();
            this.#notify();
        }
    }

    removeItem(itemId) {
        this.#state.cart = this.#state.cart.filter((i) => i.id !== itemId);
        this.#saveCart();
        this.#notify();
    }

    removeRestaurantGroup(restaurantName) {
        this.#state.cart = this.#state.cart.filter(
            (i) => i.restaurantName !== restaurantName,
        );
        this.#saveCart();
        this.#notify();
    }

    clearCart() {
        this.#state.cart = [];
        this.#saveCart();
        this.#notify();
    }

    getCart() {
        return this.#state.cart;
    }

    getCartTotal() {
        return this.#state.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    }

    getCartItemCount() {
        return this.#state.cart.reduce(
            (count, item) => count + item.quantity,
            0,
        );
    }

    #saveCart() {
        localStorage.setItem(
            'jedzeniomat-cart',
            JSON.stringify(this.#state.cart),
        );
    }

    getState() {
        return this.#state;
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
        return () => this.#subscribers.delete(callback);
    }

    #notify() {
        for (const subscriber of this.#subscribers) {
            subscriber(this.getState());
        }
    }
}

export const store = new Store();
