// для внутренней логики
let curr_menu_pont = 1;
let searsh_active = 0;
let lastSortColumn = null; // Переменная для отслеживания последнего столбца, по которому производилась сортировка
let currentSortOrder = 'asc'; // Переменная для отслеживания порядка сортировки


// Весь список истории
let history_data = [
    { requestDate: new Date(2024, 0, 20, 14, 30), side1: 'Company A', side2: 'Company B', contractType: 'Sale', tag: 'Tag1', actions:''}, // индексация месяца начинается с 0 - январь
    { requestDate: new Date(2024, 0, 20, 15, 30), side1: 'Company B', side2: 'Company C', contractType: 'Purchase', tag: 'Tag2', actions:''},
    { requestDate: new Date(2024, 0, 20, 16, 30), side1: 'Company C', side2: 'Company D', contractType: 'Sale', tag: 'Tag3', actions:''},
    { requestDate: new Date(2023, 0, 20, 16, 30), side1: 'Company D', side2: 'Company E', contractType: 'Purchase', tag: 'Tag4', actions:''},
    { requestDate: new Date(2024, 1, 20, 16, 30), side1: 'Company E', side2: 'Company F', contractType: 'Sale', tag: 'Tag5', actions:''},
];

// Форматированный список истории
let format_data = [];

document.addEventListener('DOMContentLoaded', function() {
    getHistoryData();

    // при пустой history_data
    if (history_data.length === 0) showEmptyHistory();
});

function getHistoryData() {
    // Получаем данные истории с сервера
    sortTable('requestDate');
}

function formatDate(item) {
    if (item && item.requestDate instanceof Date) {
        let day = item.requestDate.getDate();
        let month = item.requestDate.getMonth() + 1;
        let year = item.requestDate.getFullYear();
        let hours = item.requestDate.getHours();
        let minutes = item.requestDate.getMinutes();

        return `${(day < 10 ? '0' : '')}${day}.${(month < 10 ? '0' : '')}${month}.${year} ${(hours < 10 ? '0' : '')}${hours}:${(minutes < 10 ? '0' : '')}${minutes}`;
    } else {
        return ''; // или другое значение по умолчанию, если requestDate не определено
    }
}

function fillTable(data) {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        let row = document.createElement('tr');
        for (const key in item) {
            let cell = document.createElement('td');
            if (key === 'requestDate') {
                cell.textContent = formatDate(item);
            } else if (key === 'actions') {
                addActions(cell);
            } else {
                cell.textContent = item[key];
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });
}

function addActions(cell) {
    // Добавляем блок div с флекс-дисплеем
    let flexContainer = document.createElement('div');
    flexContainer.style.display = 'flex';
    flexContainer.style.alignItems = 'center';
    flexContainer.style.gap = '12px';
    flexContainer.style.padding = '0 0 0 12px';

    // Добавляем изображение wrap
    let wrapImage = document.createElement('img');
    wrapImage.src = './imgs/wrap.png';
    wrapImage.alt = 'Wrap icon';
    flexContainer.appendChild(wrapImage);

    // Добавляем изображение dots
    let dotsImage = document.createElement('img');
    dotsImage.src = './imgs/dots.png';
    dotsImage.alt = 'Dots icon';
    flexContainer.appendChild(dotsImage);

    cell.appendChild(flexContainer);
}

function sortTable(column) {
    let search_data = format_data;
    if (!searsh_active){
        search_data = history_data.slice(0);
    }

    // Проверяем наличие столбца "formattedDate" и удаляем его
    // if (search_data[0].hasOwnProperty('formattedDate')) {
    //     search_data.forEach(item => delete item.formattedDate);
    // }

    // Определение порядка сортировки
    let sortOrder = currentSortOrder;

    if (lastSortColumn === column) {
        sortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
        // Если сортируется новый столбец, устанавливаем порядок по умолчанию
        sortOrder = 'asc';
    }

    // Обновление классов в заголовке столбца
    resetSortClasses(); // Сбрасываем классы во всех заголовках столбцов
    updateSortClass(column, sortOrder); // Обновляем класс для текущего столбца

    search_data.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        if (typeof valueA === 'string') {
            return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (valueA instanceof Date) {
            return sortOrder === 'asc' ? valueB - valueA : valueA - valueB;
        } else {
            return sortOrder === 'asc' ? valueB - valueA : valueA - valueB;
        }
    });

    // Обновление переменных
    lastSortColumn = column;
    currentSortOrder = sortOrder;

    fillTable(search_data);
}

function resetSortClasses() {
    // Сброс классов во всех заголовках столбцов
    let headers = document.getElementsByClassName('table-header');
    for (let header of headers) {
        header.classList.remove('sort-top', 'sort-bottom');
    }
}

function updateSortClass(column, sortOrder) {
    // Обновление класса для текущего столбца
    let header = document.getElementById(`${column}-header`);
    if (sortOrder === 'asc') {
        header.classList.add('sort-top');
    } else {
        header.classList.add('sort-bottom');
    }
}

function updateTable(searchTerm) {
    // Очищаем предыдущий результат поиска
    format_data = [];

    // Ищем совпадения в исходных данных и добавляем их в результат
    history_data.forEach(item => {
        // Форматируем requestDate
        let formattedDate = formatDate(item);

        // Проводим поиск по всем значениям
        for (const key in item) {
            if (key === 'requestDate') {
                if (formattedDate.toLowerCase().includes(searchTerm.toLowerCase())) {
                    format_data.push(item);
                    break;
                }
            } else if (item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                format_data.push(item);
                break;
            }
        }
    });

    let column = lastSortColumn;
    lastSortColumn = null;
    sortTable(column);
    // Обновляем таблицу с результатами поиска
    // fillTable(format_data);
}

// Обработчик события для ввода текста в поле поиска
document.getElementById('search-input').addEventListener('input', function() {
    let searchTerm = this.value.trim();
    if (searchTerm !== ''){
        searsh_active = 1;
        updateTable(searchTerm);
    }
    else {
        searsh_active = 0;
        let column = lastSortColumn;
        lastSortColumn = null;
        sortTable(column);
    }
});

function showEmptyHistory() {
    let empty_history_container = document.getElementById('empty-history-container');
    let table_container = document.getElementById('table-container');
    table_container.style.display = 'none';
    empty_history_container.style.display = 'flex';
}

