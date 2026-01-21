import { createRestaurantCard } from './restaurantCards.js';
import { store } from './store.js';

export function updateCartBadge() {
    const count = store.getCartItemCount();
    const badges = document.querySelectorAll('.cart-badge');

    badges.forEach((badge) => {
        if (count > 0) {
            badge.style.display = 'flex';
            badge.innerText = count > 99 ? '99+' : count;
        } else {
            badge.style.display = 'none';
        }
    });
}

export function renderRestaurantsData(allRestaurants, restaurantsContainer) {
    const restaurantsHTML = allRestaurants
        .map((restaurant) => {
            return createRestaurantCard(restaurant);
        })
        .join('');

    restaurantsContainer.innerHTML = restaurantsHTML;
}

export function showErrorMessage(errorMsg, container) {
    container.innerHTML = '';
    const errorNote = document.createElement('h2');
    errorNote.style.color = 'red';
    errorNote.style.textAlign = 'center';
    errorNote.innerText = `Błąd: ${errorMsg}`;
    container.appendChild(errorNote);
}

export function renderTypesSelect(typesList, container, onSelectCallback) {
    container.innerHTML = '';
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerText = 'Wszystkie kategorie';
    const optionsList = document.createElement('div');
    optionsList.className = 'custom-options-list';
    const allOption = document.createElement('div');
    allOption.className = 'custom-option selected';
    allOption.innerText = 'Wszystkie kategorie';
    allOption.dataset.value = '';
    allOption.addEventListener('click', () =>
        handleOptionClick(allOption, '', 'Wszystkie kategorie'),
    );
    optionsList.appendChild(allOption);
    typesList.forEach((type) => {
        const option = document.createElement('div');
        option.className = 'custom-option';
        option.innerText = type;
        option.dataset.value = type;
        option.addEventListener('click', () =>
            handleOptionClick(option, type, type),
        );
        optionsList.appendChild(option);
    });
    function handleOptionClick(optionElement, value, text) {
        trigger.innerText = text;
        const allOptions = optionsList.querySelectorAll('.custom-option');
        allOptions.forEach((opt) => opt.classList.remove('selected'));
        optionElement.classList.add('selected');
        container.classList.remove('open');
        if (onSelectCallback) onSelectCallback(value);
    }
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) container.classList.remove('open');
    });
    container.appendChild(trigger);
    container.appendChild(optionsList);
}

export function renderRestaurantPage(restaurant, container) {
    if (!container) return;

    const menuHtml = createMenuHtml(restaurant.menu, restaurant.id);
    const reviewsHtml = createReviewsHtml(restaurant.reviews);
    const imageUrl = restaurant.image
        ? `src/images/restaurants/${restaurant.image}`
        : `https://placehold.co/800x400?text=${restaurant.restaurantName}`;

    container.innerHTML = `
        <div class="details-wrapper">
             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div style="display:flex; gap: 1rem;">
                    <a href="index.html" class="back-link" style="margin-bottom: 0;">← Lista</a>
                    <a href="cart.html" class="cart-icon-btn" style="margin-bottom: 0;">
                        🛒 <span class="cart-badge" style="display: none;">0</span>
                    </a>
                </div>
                <button id="theme-toggle" class="theme-toggle-btn">🌙 Ciemny</button>
            </div>

            <header class="details-header">
                <div class="details-image-box"><img src="${imageUrl}" alt="${restaurant.restaurantName}" class="details-img"></div>
                <div class="details-info">
                    <h1>${restaurant.restaurantName}</h1>
                    <div class="details-meta">
                        <span class="meta-badge category">${restaurant.category}</span>
                        <span class="meta-badge rating">⭐ ${restaurant.rating}/5</span>
                    </div>
                    <p class="details-address">📍 ${restaurant.address}</p>
                </div>
            </header>
            <hr class="divider">
            <section class="menu-section">
                <h2>🍴 Menu</h2>
                <div class="menu-grid">${menuHtml}</div>
            </section>
            <hr class="divider">
            <section class="reviews-section">
                <h2>💬 Opinie klientów</h2>
                <div class="reviews-list">${reviewsHtml}</div>
            </section>
        </div>
    `;
}

function createMenuHtml(menuItems, restaurantId) {
    if (!menuItems || menuItems.length === 0)
        return "<p class='empty-msg'>Brak pozycji w menu</p>";

    return menuItems
        .map((item, index) => {
            const uniqueId = `res-${restaurantId}-item-${index}`;

            const dishImage = item.image
                ? `src/images/menu/${item.image}`
                : 'https://placehold.co/100x100?text=Food';

            return `
        <div class="menu-item-card">
            <div class="menu-img-container">
                <img src="${dishImage}" alt="${item.name}" class="menu-item-img">
            </div>

            <div class="menu-info">
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-desc">${item.description || 'Brak opisu'}</p>
                <div class="menu-price">${item.price} PLN</div>
            </div>
            
            <div class="menu-actions">
               <input type="number" min="1" value="1" class="qty-input" id="qty-${uniqueId}">
               <button class="add-to-cart-btn" 
                    data-id="${uniqueId}" 
                    data-name="${item.name}" 
                    data-price="${item.price}">
                    Dodaj +
                </button>
            </div>
        </div>
    `;
        })
        .join('');
}

function createReviewsHtml(reviews) {
    if (!reviews || reviews.length === 0)
        return "<p class='empty-msg'>Brak recenzji</p>";
    return reviews
        .map(
            (review) => `
        <div class="review-item">
            <div class="review-header"><strong>${review.user}</strong><span class="review-stars">${'⭐'.repeat(Math.round(review.rating))}</span></div>
            <p class="review-comment">"${review.comment}"</p>
        </div>
    `,
        )
        .join('');
}

export function renderCartPage(cartItems, container) {
    const lastRestId = store.getLastVisitedRestaurantId();
    const backLinkUrl = lastRestId
        ? `restaurant.html?id=${lastRestId}`
        : 'index.html';
    const backLinkText = lastRestId
        ? '← Wróć do restauracji'
        : '← Wróć na stronę główną';

    if (cartItems.length === 0) {
        container.innerHTML = `
            <div class="details-wrapper" style="text-align: center; padding: 4rem;">
                <h1>Twój koszyk jest pusty 🛒</h1>
                <p style="color: var(--text-light); margin-top: 10px;">Nie wybrałeś jeszcze żadnych dań.</p>
                <a href="${backLinkUrl}" class="btn-details" style="display:inline-block; width:auto; padding: 10px 20px; margin-top: 20px;">${backLinkText}</a>
            </div>`;
        return;
    }

    const groupedItems = {};
    cartItems.forEach((item) => {
        if (!groupedItems[item.restaurantName])
            groupedItems[item.restaurantName] = [];
        groupedItems[item.restaurantName].push(item);
    });

    let cartListHTML = '';
    let totalSum = 0;

    for (const [restaurantName, items] of Object.entries(groupedItems)) {
        let restaurantSubtotal = 0;

        const itemsHtml = items
            .map((item) => {
                const itemTotal = item.price * item.quantity;
                restaurantSubtotal += itemTotal;
                return `
                <div class="cart-item" style="align-items: center;">
                    <div class="cart-item-info" style="flex-grow: 1;">
                        <strong>${item.name}</strong>
                        <div style="font-size: 0.9rem; color: var(--text-light);">
                            ${item.price} PLN / szt.
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; margin-right: 15px;">
                        
                        <button class="cart-action-btn btn-decrease" data-action="decrease" data-id="${item.id}" title="Zmniejsz ilość">
                            -
                        </button>
                        
                        <span style="font-weight: bold; margin: 0 8px; min-width: 40px; text-align: center;">
                            ${item.quantity} szt.
                        </span>

                        <button class="cart-action-btn btn-increase" data-action="increase" data-id="${item.id}" title="Zwiększ ilość">
                            +
                        </button>

                        <button class="cart-action-btn btn-remove" data-action="remove" data-id="${item.id}" title="Usuń z koszyka">
                            🗑️
                        </button>
                    </div>

                    <div class="cart-item-price" style="min-width: 80px; text-align: right;">
                        ${itemTotal.toFixed(2)} PLN
                    </div>
                </div>
            `;
            })
            .join('');

        cartListHTML += `
            <div class="cart-group">
                <div style="overflow: hidden; margin-bottom: 10px;">
                    <h3 class="cart-group-title" style="float: left; border: none; margin: 0;">${restaurantName}</h3>
                    <button class="btn-remove-group" data-group="${restaurantName}">Usuń zamówienie ❌</button>
                </div>
                <div style="clear: both; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 10px;"></div>
                
                <div class="cart-items-list">
                    ${itemsHtml}
                </div>
                <div class="cart-group-total">Suma z lokalu: ${restaurantSubtotal.toFixed(2)} PLN</div>
            </div>
        `;
        totalSum += restaurantSubtotal;
    }

    container.innerHTML = `
        <div class="details-wrapper">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <a href="${backLinkUrl}" class="back-link">${backLinkText}</a>
                <button id="theme-toggle" class="theme-toggle-btn">🌙 Ciemny</button>
            </div>
            
            <h1>Twój Koszyk 🛒</h1>
            
            <div class="cart-container">
                <div class="cart-summary-section">
                    ${cartListHTML}
                    <div class="cart-total-banner">
                        Do zapłaty łącznie: <span>${totalSum.toFixed(2)} PLN</span>
                    </div>
                    <button id="clear-cart-btn" class="clear-cart-btn">Wyczyść cały koszyk 🗑️</button>
                </div>

                <div class="checkout-form-section">
                    <h2>Dane do dostawy</h2>
                    <form id="checkout-form">
                        <div class="form-group"><label>Imię i Nazwisko</label><input type="text" id="name" required placeholder="Jan Kowalski"><span class="error-msg" id="error-name"></span></div>
                        <div class="form-group"><label>Adres (Ulica i numer)</label><input type="text" id="address" required placeholder="ul. Długa 5/12"><span class="error-msg" id="error-address"></span></div>
                        <div class="form-group"><label>Numer Karty (16 cyfr)</label><input type="text" id="card-number" maxlength="16" placeholder="XXXX XXXX XXXX XXXX"><span class="error-msg" id="error-card"></span></div>
                        <div class="form-row">
                            <div class="form-group"><label>Data ważności (MM/YY)</label><input type="text" id="expiry" placeholder="12/25" maxlength="5"><span class="error-msg" id="error-expiry"></span></div>
                            <div class="form-group"><label>CVV (3 cyfry)</label><input type="text" id="cvv" maxlength="3" placeholder="123"><span class="error-msg" id="error-cvv"></span></div>
                        </div>
                        <button type="submit" class="btn-details order-btn">ZAMÓW I ZAPŁAĆ</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

export function showOrderSuccess(container, orderData, total, cartItems) {
    const itemsSummary = cartItems
        .map(
            (item) =>
                `<li style="margin-bottom: 5px;">${item.name} x ${item.quantity} <span style="color: var(--text-light);">(${item.restaurantName})</span></li>`,
        )
        .join('');

    container.innerHTML = `
        <div class="details-wrapper" style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem;">✅</div>
            <h1>Dziękujemy za zamówienie!</h1>
            <p class="subtitle">Jedzenie jest już w drodze na adres: <strong>${orderData.address}</strong></p>
            
            <div style="margin: 2rem auto; padding: 1.5rem; background: var(--bg-secondary); border-radius: 12px; max-width: 500px; text-align: left;">
                <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">Co zamówiłeś:</h3>
                <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px;">
                    ${itemsSummary}
                </ul>

                <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;">
                
                <p><strong>Zamawiający:</strong> ${orderData.name}</p>
                <p style="font-size: 1.5rem; font-weight: bold; margin-top: 1rem; color: var(--primary); text-align: center;">Zapłacono: ${total.toFixed(2)} PLN</p>
            </div>
            
            <a href="index.html" class="btn-details">Wróć na stronę główną</a>
        </div>
    `;
}
