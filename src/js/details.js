import { dataFetcher } from './api.js';
import { renderRestaurantPage } from './ui.js';
import { initTheme } from './theme.js';
import { store } from './store.js';
import { updateCartBadge } from './ui.js';

const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        try {
            const restaurant = await dataFetcher.getRestaurantById(id);

            store.setLastVisitedRestaurantId(restaurant.id);

            renderRestaurantPage(restaurant, container);
            initTheme();
            updateCartBadge();

            store.subscribe(() => {
                updateCartBadge();
            });

            const addButtons = document.querySelectorAll('.add-to-cart-btn');

            addButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const uniqueId = btn.dataset.id;
                    const itemName = btn.dataset.name;
                    const itemPrice = parseFloat(btn.dataset.price);

                    const qtyInput = document.getElementById(`qty-${uniqueId}`);

                    const quantity = qtyInput ? qtyInput.value : 1;

                    if (quantity > 0) {
                        store.addToCart(
                            {
                                id: uniqueId,
                                name: itemName,
                                price: itemPrice,
                            },
                            quantity,
                            restaurant.restaurantName,
                        );

                        const originalText = btn.innerText;
                        btn.innerText = 'Dodano! ✓';
                        btn.style.backgroundColor = '#10b981';
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.backgroundColor = '';
                        }, 1000);
                    }
                });
            });
        } catch (error) {
            console.error(error);
            container.innerHTML = '<h1>Error loading the page</h1>';
        }
    } else {
        window.location.href = 'index.html';
    }
});
