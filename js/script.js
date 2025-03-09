// Загрузка структуры разделов из внешнего JSON-файла
let sections = {};

fetch('sections.json')
    .then(response => response.json())
    .then(data => {
        sections = data;
        renderSidebar();
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));

const testData = (directoryName) => {
    const data = [];
    for (let i = 1; i <= 5; i++) {
        data.push({ id: i, name: `${directoryName} ${i}`, note: `Примечание ${i}` });
    }
    return data;
};

let openedDirectories = {};
let activeDirectory = null;

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (let sectionKey in sections) {
        const section = sections[sectionKey];
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = section.title;
        link.onclick = () => openSection(sectionKey);
        sidebar.appendChild(link);
    }
}

function openSection(sectionKey) {
    const section = sections[sectionKey];
    const content = document.getElementById('content');

    let html = `<h2>${section.title}</h2><div class="directory-buttons" id="directory-buttons">`;
    section.items.forEach(item => {
        html += `<button class="directory-btn" onclick="openDirectory('${item}')">${item}</button>`;
    });
    html += '</div><div id="directory-content"></div>';

    content.innerHTML = html;
}

function openDirectory(directoryName) {
    if (!openedDirectories[directoryName]) {
        openedDirectories[directoryName] = testData(directoryName);
    }

    activeDirectory = directoryName;

    document.getElementById('content').innerHTML = '<div id="directory-content"></div>';

    renderTabs();
    renderDirectoryContent(directoryName);
}

function renderTabs() {
    const statusBar = document.getElementById('status-bar');
    statusBar.innerHTML = '';
    statusBar.style.display = 'flex';

    Object.keys(openedDirectories).forEach(dirName => {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.textContent = dirName;
        if (dirName === activeDirectory) tab.classList.add('active-tab');

        const closeBtn = document.createElement('span');
        closeBtn.className = 'tab-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            closeTab(dirName);
        };

        tab.onclick = () => {
            activeDirectory = dirName;
            renderDirectoryContent(dirName);
            renderTabs();
        };

        tab.appendChild(closeBtn);
        statusBar.appendChild(tab);
    });

    if (Object.keys(openedDirectories).length === 0) {
        document.getElementById('content').innerHTML = '';
        renderDashboard();
    }
}

function renderDirectoryContent(directoryName) {
    const dirContent = document.getElementById('directory-content');
    const data = openedDirectories[directoryName];

    let html = `<h3>${directoryName}</h3><table class="styled-table"><thead><tr><th>ID</th><th>${directoryName}</th><th>Примечание</th></tr></thead><tbody>`;

    data.forEach(row => {
        html += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.note}</td></tr>`;
    });

    html += `</tbody></table>`;

    dirContent.innerHTML = html;
}

function closeTab(directoryName) {
    delete openedDirectories[directoryName];
    if (activeDirectory === directoryName) {
        activeDirectory = Object.keys(openedDirectories)[0] || null;
    }
    renderTabs();
}

function renderDashboard() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card"><h3>🚗 Автомобили</h3><p>32</p></div>
            <div class="dashboard-card"><h3>🚚 Активные маршруты</h3><p>4</p></div>
            <div class="dashboard-card"><h3>📅 Заказы на сегодня</h3><p>15</p></div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderTopMenu('Николаенко Юрий');
    renderDashboard();
});
