import { store } from './store.js';
import { renderCartPage, showOrderSuccess, updateCartBadge } from './ui.js';
import { initTheme } from './theme.js';

const container = document.getElementById('cart-container');

document.addEventListener('DOMContentLoaded', () => {
    const refreshCart = () => {
        const cartItems = store.getCart();
        renderCartPage(cartItems, container);
        updateCartBadge();
        initTheme();
        attachListeners();
    };

    refreshCart();

    function attachListeners() {
        const cartItems = store.getCart();
        if (cartItems.length === 0) return;

        const clearBtn = document.getElementById('clear-cart-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Czy na pewno chcesz usunąć wszystko?')) {
                    store.clearCart();
                    refreshCart();
                }
            });
        }

        const summarySection = document.querySelector('.cart-summary-section');
        if (summarySection) {
            summarySection.addEventListener('click', (e) => {
                const btn = e.target.closest('.cart-action-btn');
                if (btn) {
                    const id = btn.dataset.id;
                    const action = btn.dataset.action;

                    if (action === 'decrease') store.decreaseItemQuantity(id);
                    if (action === 'increase') store.increaseItemQuantity(id);
                    if (action === 'remove') store.removeItem(id);

                    refreshCart();
                }

                const groupBtn = e.target.closest('.btn-remove-group');
                if (groupBtn) {
                    const groupName = groupBtn.dataset.group;
                    if (confirm(`Usunąć wszystkie dania z ${groupName}?`)) {
                        store.removeRestaurantGroup(groupName);
                        refreshCart();
                    }
                }
            });
        }

        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm()) {
                    const orderData = {
                        name: document.getElementById('name').value,
                        address: document.getElementById('address').value,
                        cardNumber:
                            document.getElementById('card-number').value,
                    };
                    const total = store.getCartTotal();
                    const currentItems = [...store.getCart()];

                    store.clearCart();
                    updateCartBadge();

                    showOrderSuccess(container, orderData, total, currentItems);
                }
            });
        }
    }
});

function validateForm() {
    let isValid = true;
    document
        .querySelectorAll('.error-msg')
        .forEach((el) => (el.innerText = ''));
    const name = document.getElementById('name');
    if (name.value.trim().length < 3) {
        showError('error-name', 'Podaj pełne imię i nazwisko');
        isValid = false;
    }
    const address = document.getElementById('address');
    if (address.value.trim().length < 5) {
        showError('error-address', 'Podaj poprawny adres');
        isValid = false;
    }
    const card = document.getElementById('card-number');
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(card.value.replace(/\s/g, ''))) {
        showError('error-card', 'Musi być 16 cyfr');
        isValid = false;
    }
    const cvv = document.getElementById('cvv');
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv.value)) {
        showError('error-cvv', 'Błędne CVV');
        isValid = false;
    }
    const expiry = document.getElementById('expiry');
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!expiryRegex.test(expiry.value)) {
        showError('error-expiry', 'Format MM/YY');
        isValid = false;
    }
    return isValid;
}
function showError(elementId, msg) {
    document.getElementById(elementId).innerText = msg;
}
