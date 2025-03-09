function renderTopMenu(username) {
    const topMenu = document.querySelector('.top-menu');

    topMenu.innerHTML = `
        <div class="top-menu-left">
            <h1>🛻 Система автоматизации учета</h1>
        </div>

        <div class="top-menu-right">
            <span class="user-info">👤 Пользователь: ${username}</span>
            <span class="user-menu-btn" onclick="toggleUserMenu()">&#9881;</span>
            <div class="user-menu" id="userMenu">
                <a href="#" onclick="openHelp()">Справка</a>
                <a href="#" onclick="openAbout()">О программе</a>
            </div>
        </div>
    `;
}


function toggleUserMenu() {
    document.getElementById('userMenu').classList.toggle('visible');
}

function openHelp() {
    alert('Справка находится в разработке.');
}

function openAbout() {
    alert('Автоматизированная система управления, версия 1.0');
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('userMenu');
        const menuBtn = document.querySelector('.user-menu-btn');

        if (userMenu && menuBtn && !userMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            userMenu.classList.remove('visible');
        }
    });
});
