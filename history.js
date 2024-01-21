// для внутренней логики
let curr_menu_pont = 1;
let searsh_active = 0;
let lastSortColumn = null; // Переменная для отслеживания последнего столбца, по которому производилась сортировка
let currentSortOrder = 'asc'; // Переменная для отслеживания порядка сортировки



let info = {tag_color: 'red', date: '17.01.2019', effective_date: '17.01.2019', terms: 'Rent of 1,190 euros per month per sqm plus applicable VAT, with rent escalation of 3% annually', financial_terms: 'Fixed-term contract of 2 years with the option for Tenant to terminate prematurely under specific conditions', penalties: '0.1% delay penalty for each day of delay in payment', rights1: "Use of the leased commercial premises; Receiving rent payments", 
responsibilities1: "Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services", rights2: 'Use of the leased commercial premises; Notification to terminate the contract prematurely (subject to conditions)', responsibilities2: 'Paying rent, Additional Services, and General Services fees; Complying with rules and procedures; Handling waste and packaging waste obligations; Returning the premises in the original condition at the end of the contract'};
// Весь список истории
let history_data = [
    { requestDate: new Date(2023, 10, 15, 11, 47), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Boris Elczin LLC.', contractType: 'DNA', tag: '', actions:'', info}, // индексация месяца начинается с 0 - январь
    { requestDate: new Date(2023, 10, 1, 12, 30), side1: 'Solveig Edbo Berg', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Employment Agreement', tag: 'Employers', actions:'', info},
    { requestDate: new Date(2023, 10, 1, 12, 20), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},
    { requestDate: new Date(2023, 9, 21, 19, 6), side1: 'FedEx', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Shipping Service Contract', tag: 'Shipping', actions:'', info},
    { requestDate: new Date(2023, 11, 9, 18, 3), side1: 'Maynard James Keenan', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'DNA', tag: 'Something', actions:'', info},
    { requestDate: new Date(2023, 0, 1, 12, 10), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},
    { requestDate: new Date(2023, 9, 20, 21, 45), side1: 'Who was that', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Commercial Space Leaserist Group', tag: 'That', actions:'', info},
    { requestDate: new Date(2023, 10, 1, 12, 0), side1: 'Solveig Edbo Berg', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Employment Agreement', tag: 'Employers', actions:'', info},
    { requestDate: new Date(2023, 10, 1, 12, 50), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},
    { requestDate: new Date(2023, 9, 21, 19, 6), side1: 'FedEx', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Shipping Service Contract', tag: 'Shipping', actions:'', info},
    { requestDate: new Date(2023, 10, 15, 11, 47), side1: 'Maynard James Keenan', side2: 'Boris Elczin LLC.', contractType: 'DNA', tag: 'Office', actions:'', info},
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

        // Добавляем класс "expandable-row" к строке для обозначения, что она раскрываема
        row.classList.add('expandable-row');

        // Добавляем слушатель событий click к строке
        row.addEventListener('click', () => toggleInfo(row, item));


        for (const key in item) {
            if (key !== 'info'){
                let cell = document.createElement('td');
                if (key === 'requestDate') {
                    cell.textContent = formatDate(item);
                    cell.style.paddingLeft = '8px';
                    cell.style.borderTopLeftRadius = '8px';
                } else if (key === 'actions') {
                    addActions(cell);
                    cell.style.borderTopRightRadius = '8px';
                } else {
                    cell.textContent = item[key];
                }

                row.appendChild(cell);
            }
        }

        tableBody.appendChild(row);

        // Добавляем элемент для отображения полного описания после строки
        let infoRow = document.createElement('tr');
        let infoCell = document.createElement('td');
        infoCell.classList.add('info-cell');
        infoCell.setAttribute('colspan', '100%');
        infoRow.appendChild(infoCell);
        tableBody.appendChild(infoRow);
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

// Функция для отображения или скрытия полного описания
function toggleInfo(row, item) {
    if (row.classList.contains('processing')) {
        // Если у строки установлен временный класс 'processing', то нажатие блокируется
        return;
    }

    row.classList.add('processing'); // Добавляем временный класс для блокировки
    let infoRow = row.nextSibling; // Получаем следующую строку (элемент с полным описанием)
    let infoCell = infoRow.firstElementChild;

    // Проверяем, существует ли элемент с id 'info-container' внутри infoCell
    let infoContainer = infoCell.querySelector('#info-container');
    
    // Если элемент не существует, создаем его
    if (!infoContainer) {
        infoContainer = document.createElement('div');
        infoContainer.id = 'info-container';
        infoCell.appendChild(infoContainer);
    }

    // Создаем div для отображения полного описания
    let infoDiv = document.createElement('div');
    infoDiv.innerHTML = createInfoMarkup(item.info);
    infoContainer.innerHTML = ''; // Очищаем содержимое перед добавлением нового
    infoContainer.appendChild(infoDiv);

    // Устанавливаем высоту вручную, чтобы избежать задержки
    infoContainer.style.height = infoDiv.clientHeight + 'px';

    // Переключаем класс для управления анимацией
    if (infoRow.classList.contains('expanded')) {
        // Если открыто, закрываем
        infoContainer.style.height = '0';
        setBorderStyle(infoRow, row);
    } else {
        // Если закрыто, открываем
        infoRow.classList.add('expanded');
        row.classList.remove('processing');
        row.classList.add('curr-expanded-row');
    }
}

function setBorderStyle(infoRow, row) {
    setTimeout(function() {
        infoRow.classList.remove('expanded');
        row.classList.remove('processing');
        row.classList.remove('curr-expanded-row');
    }, 800);
}

// Функция для создания разметки полного описания
function createInfoMarkup(info) {
    return `<div>
                <p>${info.tag_color}</p>
                <p>${info.date}</p>
                <p>${info.effective_date}</p>
            </div>
            <div style='height: 28px'></div>`;
}