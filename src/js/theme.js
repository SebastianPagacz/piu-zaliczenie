export function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');

    const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        updateBtnText(toggleBtn, true);
    } else {
        updateBtnText(toggleBtn, false);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            updateBtnText(toggleBtn, isDark);
        });
    }
}

function updateBtnText(btn, isDark) {
    if (!btn) return;
    btn.innerHTML = isDark ? '☀️ Jasny' : '🌙 Ciemny';
}
