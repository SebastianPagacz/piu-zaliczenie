import { createRestaurantCard } from './restaurantCards.js';

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

    allOption.addEventListener('click', () => {
        handleOptionClick(allOption, '', 'Wszystkie kategorie');
    });
    optionsList.appendChild(allOption);

    typesList.forEach((type) => {
        const option = document.createElement('div');
        option.className = 'custom-option';
        option.innerText = type;
        option.dataset.value = type;

        option.addEventListener('click', () => {
            handleOptionClick(option, type, type);
        });

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
        if (!container.contains(e.target)) {
            container.classList.remove('open');
        }
    });

    container.appendChild(trigger);
    container.appendChild(optionsList);
}

export function renderRestaurantPage(restaurant, container) {
    if (!container) return;

    const menuHtml = createMenuHtml(restaurant.menu);
    const reviewsHtml = createReviewsHtml(restaurant.reviews);

    const imageUrl = `https://placehold.co/800x400?text=${restaurant.restaurantName.replace(/ /g, '+')}&font=montserrat`;

    container.innerHTML = `
    <div class="details-wrapper">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <a href="index.html" class="back-link" style="margin-bottom: 0;">← Wróć do listy</a>
            <button id="theme-toggle" class="theme-toggle-btn">🌙 Ciemny</button>
        </div>

            <header class="details-header">
                <div class="details-image-box">
                    <img src="${imageUrl}" alt="${restaurant.restaurantName}" class="details-img">
                </div>
                
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
                <div class="menu-grid">
                    ${menuHtml}
                </div>
            </section>

            <hr class="divider">

            <section class="reviews-section">
                <h2>💬 Opinie klientów</h2>
                <div class="reviews-list">
                    ${reviewsHtml}
                </div>
            </section>
        </div>
    `;
}

function createMenuHtml(menuItems) {
    if (!menuItems || menuItems.length === 0)
        return "<p class='empty-msg'>Brak pozycji w menu</p>";

    return menuItems
        .map(
            (item) => `
        <div class="menu-item-card">
            <div class="menu-info">
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-desc">${item.description || 'Brak opisu'}</p>
            </div>
            <div class="menu-price">
                ${item.price} PLN
            </div>
        </div>
    `,
        )
        .join('');
}

function createReviewsHtml(reviews) {
    if (!reviews || reviews.length === 0)
        return "<p class='empty-msg'>Brak recenzji</p>";

    return reviews
        .map(
            (review) => `
        <div class="review-item">
            <div class="review-header">
                <strong>${review.user}</strong>
                <span class="review-stars">${'⭐'.repeat(Math.round(review.rating))}</span>
            </div>
            <p class="review-comment">"${review.comment}"</p>
        </div>
    `,
        )
        .join('');
}
