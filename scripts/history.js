let date_filter_menu = document.getElementById("request-date-menu");
let date_filter = document.getElementById('date-filter');
let close_date_filter = document.getElementById('close-date-filter');
let date_filter_text = document.getElementById("date-filter-text");

let side_filter = document.getElementById("side-filter");
let side_menu = document.getElementById("side-menu");
let side_filter_text = document.getElementById("side-filter-text");
let close_side_filter = document.getElementById("close-side-filter");
let input_search_sides = document.getElementById("input-search-sides");

let type_filter = document.getElementById("type-filter");
let type_menu = document.getElementById("type-menu");
let type_filter_text = document.getElementById("type-filter-text");
let close_type_filter = document.getElementById("close-type-filter");
let input_search_type = document.getElementById("input-search-type");

let tag_filter = document.getElementById("tag-filter");
let tag_menu = document.getElementById("tag-menu");
let tag_filter_text = document.getElementById("tag-filter-text");
let close_tag_filter = document.getElementById("close-tag-filter");
let input_search_tag = document.getElementById("input-search-tag");

let new_tag_error = document.getElementById("new-tag-error");

// для внутренней логики
let searsh_active = 0;
let lastSortColumn = null; // Переменная для отслеживания последнего столбца, по которому производилась сортировка
let currentSortOrder = 'asc'; // Переменная для отслеживания порядка сортировки
let searchTerm = '';
let new_tag_color = null;

// флаги фильтров
let filter_active = 0;
let date_filter_active = 0;
let side_filter_active = 0;
let type_filter_active = 0;
let tag_filter_active = 0;

let reverse_date_filter = 0;
let reverse_side_filter = 0;
let reverse_type_filter = 0;
let reverse_tag_filter = 0;

// для фильтров
let to_picker, from_picker;
let fromDate = null; 
let toDate = null;
let selected_sid1 = [];
let selected_sid2 = [];
let selected_types = [];
let selected_tags = [];

let info = {tag_color: 'red', date: '17.01.2019', effective_date: '17.01.2019', terms: 'Rent of 1,190 euros per month per sqm plus applicable VAT, with rent escalation of 3% annually', financial_terms: 'Fixed-term contract of 2 years with the option for Tenant to terminate prematurely under specific conditions', penalties: '0.1% delay penalty for each day of delay in payment', rights1: "Use of the leased commercial premises; Receiving rent payments", 
// responsibilities1: "Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services", 
responsibilities1: "Providing the leased premises; Provision of additional services (heating, water, electricity, technical security); Handling other services based on Tenant's wishes; Maintenance of the building and facilities; Provision of security services",
rights2: 'Use of the leased commercial premises; Notification to terminate the contract prematurely (subject to conditions)', responsibilities2: 'Paying rent, Additional Services, and General Services fees; Complying with rules and procedures; Handling waste and packaging waste obligations; Returning the premises in the original condition at the end of the contract'};
// Весь список истории
let history_data = [
    { requestDate: new Date(2023, 10, 15, 11, 47), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Boris Elczin LLC.', contractType: 'DNA', tag: '', actions:'', info}, // индексация месяца начинается с 0 - январь
    { requestDate: new Date(2023, 10, 1, 12, 30), side1: 'Solveig Edbo Berg', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Employment Agreement', tag: 'Employers', actions:'', info},
    { requestDate: new Date(2023, 10, 1, 12, 20), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},
    { requestDate: new Date(2023, 9, 21, 19, 6), side1: 'FedEx', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Shipping Service Contract', tag: 'Shipping', actions:'', info},
    { requestDate: new Date(2023, 11, 9, 18, 3), side1: 'Maynard James Keenan', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'DNA', tag: 'Something', actions:'', info},
    { requestDate: new Date(2023, 0, 1, 12, 10), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},
    { requestDate: new Date(2024, 0, 11, 21, 45), side1: 'Who was that', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Commercial Space Leaserist Group', tag: 'That', actions:'', info},
    { requestDate: new Date(2024, 0, 10, 12, 0), side1: 'Solveig Edbo Berg', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Employment Agreement', tag: 'Employers', actions:'', info},    
    { requestDate: new Date(2024, 0, 12, 12, 50), side1: 'Gnnpowder Kinnisvara Oii', side2: 'Asia Drinks D&R OÜ', contractType: 'Commercial Space Leaserist Group', tag: 'Office', actions:'', info},   
    { requestDate: new Date(2023, 9, 21, 19, 6), side1: 'FedEx', side2: 'Gnnpowder Kinnisvara Oii', contractType: 'Shipping Service Contract', tag: 'Shipping', actions:'', info},
];

// Изменено 10.02 [
let tag_list = [];
// ]

// Форматированный список истории
let format_data = [];

let filtered_data = [];

// Изменено 10.02 [
document.addEventListener('DOMContentLoaded', function() {
    getHistoryData();

    getTagList();

    initCalend();

    // при пустой history_data
    if (history_data.length === 0) showEmptyHistory();
});
// ]

function getTagList() {
    // Получаем уникальное множество тегов с сервера

    tag_list = [{tag: 'Employers', color: 'red'}, {tag: 'Office', color: 'red'}, {tag: 'Shipping', color: 'red'}, {tag: 'Something', color: 'red'}, {tag: 'That', color: 'red'}];
}

function getHistoryData() {
    // Получаем данные истории с сервера

    // форматируем данные, заменяя '
    history_data = escapeSingleQuotes(history_data);
    sortTable('requestDate');
}

function escapeSingleQuotes(data) {
    if (typeof data === 'string') {
        return data.replace(/'/g, "\\'");
    } else if (Array.isArray(data)) {
        return data.map(escapeSingleQuotes);
    } else if (typeof data === 'object' && data !== null) {
        const result = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // Добавляем проверку на ключ requestDate
                if (key === 'requestDate') {
                    result[key] = data[key];
                } else {
                    result[key] = escapeSingleQuotes(data[key]);
                }
            }
        }
        return result;
    } else {
        return data;
    }
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

// Изменено 10.02 [
function fillTable(data) {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        let row = document.createElement('tr');

        let wrapImage, dotsImage;
        let tagColor = item.info.tag_color;

        // применяем класс expandable-row к строке для обозначения, что она раскрываема
        row.classList.add('expandable-row');

        for (const key in item) {
            if (key !== 'info'){
                let cell = document.createElement('td');
                if (key === 'requestDate') {
                    cell.textContent = formatDate(item);

                    cell.style.paddingLeft = '8px';

                } else if (key === 'tag') {
                    if (item[key] !== '') addTag(cell, item[key], tagColor);
                    else {
                        cell.classList.add('card-text');
                        cell.classList.add('no-tag-text');
                        cell.textContent = 'No Tag';
                    } 
                } else if (key === 'actions') {
                    let images = addActions(cell);

                    wrapImage = images.wrapImage;
                    dotsImage = images.divContainer;
                    downloadImage = images.downloadImage;
                } else {
                    cell.textContent = item[key];
                }

                row.appendChild(cell);
            }
        }

        // слушатель событий click к строке
        row.addEventListener('click', () => toggleInfo(row, item, wrapImage, dotsImage));
        dotsImage.addEventListener('click', () => showActionMenu(item));
        downloadImage.addEventListener('click', () => downloadContract(event.clientX - 225 + window.scrollX, event.clientY + 15 + window.scrollY, item));
        tableBody.appendChild(row);

        // элемент для отображения полного описания после строки
        let infoRow = document.createElement('tr');
        let infoCell = document.createElement('td');
        infoCell.classList.add('info-cell');
        infoCell.setAttribute('colspan', '100%');
        infoRow.appendChild(infoCell);
        tableBody.appendChild(infoRow);
    });
}
// ]

// Изменено 10.02 [
function downloadContract(coordX, coordY, contract) {
    // загрузка контракта выбранного клиентом с сервера
    showUserInfo("The file has been downloaded", coordX, coordY, 255);
}
// ]

function addTag(cell, tag, color) {
    let flexContainer = document.createElement('div');
    flexContainer.classList.add('tag-container');
    flexContainer.classList.add('link-small');

    let dotImage = document.createElement('div');
    dotImage.style.backgroundColor = color;
    dotImage.classList.add('tag-dots');
    flexContainer.appendChild(dotImage);

    let tagName = document.createElement('p');
    tagName.textContent = tag;
    flexContainer.appendChild(tagName);

    cell.appendChild(flexContainer);
}

// Исправлено 09.02 [
function addActions(cell) {
    let flexContainer = document.createElement('div');
    flexContainer.classList.add('action-container');

    let wrapImage = document.createElement('img');
    wrapImage.id = 'actions-wrap';
    wrapImage.src = './imgs/wrap.png';
    wrapImage.alt = 'Wrap icon';
    flexContainer.appendChild(wrapImage);

    let downloadImage = document.createElement('img');
    downloadImage.id = 'actions-download';
    downloadImage.src = './imgs/download-contract.png';
    downloadImage.alt = 'Download icon';
    flexContainer.appendChild(downloadImage);

    let divContainer = document.createElement('div');
    divContainer.id = 'actions-dots-container';

    let dotsImage = document.createElement('img');
    dotsImage.id = 'actions-dots';
    dotsImage.src = './imgs/dots.png';
    dotsImage.alt = 'Dots icon';

    divContainer.appendChild(dotsImage);
    flexContainer.appendChild(divContainer);

    cell.appendChild(flexContainer);

    return { wrapImage, downloadImage, divContainer };
}
// ]

function sortTable(column) {
    let search_data = history_data.slice(0);

    if (filter_active) search_data = filtered_data;

    if (searsh_active) search_data = format_data;

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
    let search_data = filtered_data;
    if (!filter_active){
        search_data = history_data.slice(0);
    }

    format_data = [];

    // Ищем совпадения в исходных данных и добавляем их в результат
    search_data.forEach(item => {
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
    sortTable(column);
    sortTable(column);
}

// Обработчик события для ввода текста в поле поиска
document.getElementById('search-input').addEventListener('input', function() {
    searchTerm = this.value.trim();
    if (searchTerm !== ''){
        searsh_active = 1;
        updateTable(searchTerm);
    }
    else {
        searsh_active = 0;
        let column = lastSortColumn;
        sortTable(column);
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
function toggleInfo(row, item, wrapImage) {
    // Изменено 10.02 [
    if (event.target.id === 'actions-dots' || event.target.id === 'actions-dots-container' || event.target.id === 'actions-download') {
        // Если это dotsImage, ничего не делаем
        return;
    }
    // ]

    if (row.classList.contains('processing')) {
        // Если у строки установлен временный класс processing, то нажатие блокируется
        return;
    }

    row.classList.add('processing'); 
    let infoRow = row.nextSibling; 
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
    infoDiv.innerHTML = createInfoMarkup(item);
    infoContainer.innerHTML = '';
    infoContainer.appendChild(infoDiv);

    // Переключаем класс для управления анимацией
    if (infoRow.classList.contains('expanded')) {
        infoContainer.style.height = infoDiv.clientHeight + 'px';

        // Если открыто, закрываем
        infoContainer.style.height = '0';
        wrapImage.style.transform = 'rotate(0deg)';
        setBorderStyle(infoRow, row);        
    } else {
        // Если закрыто, открываем
        infoRow.classList.add('expanded');
        row.classList.remove('processing');
        row.classList.add('curr-expanded-row');
        wrapImage.style.transform = 'rotate(180deg)'; 
        
        infoContainer.style.height = infoDiv.clientHeight + 'px';
    }
}


function setBorderStyle(infoRow, row) {
    setTimeout(function() {
        infoRow.classList.remove('expanded');
        row.classList.remove('processing');
        row.classList.remove('curr-expanded-row');
    }, 900);
}

// Исправление: Курсор становится пальцем только при наведении на текст или на верхнюю часть [

// Функция для создания разметки полного описания
function createInfoMarkup(item) {
    let all_text = makeAllText(item);

    return `<div id='info-content'>
                <div class='info-title'>
                    <h2 class='bold-title'>General</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Contract type', '${item.contractType}')">Contract type</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Contract type', '${item.contractType}')">${item.contractType}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Date / Effective date', '${item.info.date + ' / ' + item.info.effective_date}')">Date / Effective date</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Date / Effective date', '${item.info.date + ' / ' + item.info.effective_date}')">${item.info.date} / ${item.info.effective_date}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Terms', '${item.info.terms}')">Terms</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Terms', '${item.info.terms}')">${item.info.terms}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Financial Terms', '${item.info.financial_terms}')">Financial Terms</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Financial Terms', '${item.info.financial_terms}')">${item.info.financial_terms}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Penalties', '${item.info.penalties}')">Penalties</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Penalties', '${item.info.penalties}')">${item.info.penalties}</p>
                    </div>
                </div>

                <div class='info-title'>
                    <h2 class='bold-title'>First party</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Name', '${item.side1}')">Name</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Name', '${item.side1}')">${item.side1}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Rights', '${item.info.rights1}')">Rights</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Rights', '${item.info.rights1}')">${item.info.rights1}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Responsibilities', '${item.info.responsibilities1}')">Responsibilities</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Responsibilities', '${item.info.responsibilities1}')">${item.info.responsibilities1}</p>
                    </div>
                </div>

                <div class='info-title'>
                    <h2 class='bold-title'>Second party</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Name', '${item.side2}')">Name</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Name', '${item.side2}')">${item.side2}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Rights', '${item.info.rights2}')">Rights</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Rights', '${item.info.rights2}')">${item.info.rights2}</p>
                    </div>
                    <div class='info-point'>
                        <div class='info-point-title-container'>
                            <p class='title info-point-title' onclick="showCopyMenu('${all_text}', 'Responsibilities', '${item.info.responsibilities2}')">Responsibilities</p>
                        </div>
                        <p class='info-text' onclick="showCopyMenu('${all_text}', 'Responsibilities', '${item.info.responsibilities2}')">${item.info.responsibilities2}</p>
                    </div>
                </div>
            </div>
            <div style='height: 12px'></div>`;
}
// ]

function showActionMenu(curr_element) {
    // Изменено 10.02 [
    let actionsMenu = document.getElementById('actions-menu');
    let tag_container = document.getElementById("edit-tag-container");
    let apply_delete_container = document.getElementById("apply-delete-container");
    let apply_delete_tag_container = document.getElementById("apply-delete-tag-container");
    let edit_tag_open = 0;
    // ]

    tag_container.style.height = "24px";

    // Позиционируем меню абсолютно
    let coordX = event.clientX - 170 + window.scrollX;
    let coordY = event.clientY + 20 + window.scrollY;
    actionsMenu.style.position = 'absolute';
    actionsMenu.style.left = `${coordX}px`;
    actionsMenu.style.top = `${coordY - 5}px`;

    actionsMenu.style.display = 'flex';

    // Изменено 10.02 [
    function clickHandler() {
        if (event.target.id !== "actions-dots"&&
            event.target.id !== "actions-dots-container"&&
            event.target.id !== "actions-menu"&&
            !event.target.classList.contains("action-element")) {
            actionsMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);
        }

        if (event.target.classList.contains("copy-to-clipboard")) {
            let text = makeAllText(curr_element);
            makeCopy(text);
            showUserInfo("Copied to the clipboard", coordX - 28, coordY - 5, 225);

            actionsMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);
        }

        if (event.target.classList.contains("delete")) {
            actionsMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);

            apply_delete_container.style.position = 'absolute';
            apply_delete_container.style.left = `${coordX}px`;
            apply_delete_container.style.top = `${coordY - 5}px`;
            apply_delete_container.style.display = 'flex';

            document.addEventListener('click', clickDelete);
        }

        function clickDelete() { 
            if (!event.target.classList.contains("action-element")) {
                apply_delete_container.style.display = 'none';
                document.removeEventListener('click', clickDelete);
            }

            if (event.target.id === "apply-delete"){
                apply_delete_container.style.display = 'none';
                document.removeEventListener('click', clickDelete);

                history_data = history_data.filter(existingItem => !isObjectEqual(existingItem, curr_element));
                filterPipe();

                showUserInfo("Summary has been deleted", coordX - 58, coordY - 5, 250);
            }

            if (event.target.id === "cancel-delete"){
                apply_delete_container.style.display = 'none';
                document.removeEventListener('click', clickDelete);
            }
        }

        if (event.target.classList.contains("edit-tag")) {
            // Получаем все элементы span внутри tag_container и преобразуем их в массив
            let spanElements = Array.from(tag_container.querySelectorAll("span"));

            // Удаляем каждый элемент span
            spanElements.forEach(span => {
                tag_container.removeChild(span);
            });

            // Изменено 10.02 [
            tag_list.forEach(item => {
                if (item.tag != '') {
                    let spanElement = document.createElement("span");
                    spanElement.innerHTML = `<div class="tag-dots" style="background-color: ${item.color};"></div><p>${item.tag}</p>`;
                    spanElement.classList.add('action-element');
                    tag_container.appendChild(spanElement);

                    spanElement.addEventListener('click', function() {
                        updateHistoryData(item.color, item.tag);
                    });

                    spanElement.addEventListener('contextmenu', function() {
                        event.preventDefault();
                        deleteTag(item.tag, item.color);
                    });
                }
            });

            function deleteTag(tag, color) {
                actionsMenu.style.display = 'none';
                document.removeEventListener('click', clickHandler);

                apply_delete_tag_container.style.position = 'absolute';
                apply_delete_tag_container.style.left = `${coordX}px`;
                apply_delete_tag_container.style.top = `${coordY - 5}px`;
                apply_delete_tag_container.style.display = 'flex';

                function clickDeleteTag() { 
                    if (!event.target.classList.contains("action-element")) {
                        apply_delete_tag_container.style.display = 'none';
                        document.removeEventListener('click', clickDeleteTag);
                    }
        
                    if (event.target.id === "apply-delete-tag"){
                        apply_delete_tag_container.style.display = 'none';
                        document.removeEventListener('click', clickDeleteTag);

                        deleteTagHistory(tag, color);
                        deleteTagList(tag, color);

                        showUserInfo("Tag has been deleted", coordX - 58, coordY - 5, 250);
                        
                        filterPipe();
                    }
                }

                document.addEventListener('click', clickDeleteTag);
            }

            // ]

            function updateHistoryData(color, tag) {

                // тут данные об обновлении тега отправляются на сервер

                if (curr_element) {
                    curr_element.info.tag_color = color;
                    curr_element.tag = tag;
                }
                filterPipe();
                actionsMenu.style.display = 'none';
                document.removeEventListener('click', clickHandler);
            }

            let spanElement = document.createElement("span");
            spanElement.id = "new-tag";
            spanElement.className = "action-element";
            spanElement.innerHTML = "New Tag"
            tag_container.appendChild(spanElement);

            spanElement.addEventListener('click', function() {
                let new_tag_menu = document.getElementById("new-tag-menu");
                let new_tag_input = document.getElementById("new-tag-input");
                new_tag_input.value = '';
                clearAllColors();

                actionsMenu.style.display = 'none';
                document.removeEventListener('click', clickHandler);

                // Изменено 10.02 [
                new_tag_menu.style.position = 'absolute';
                new_tag_menu.style.left = `${coordX}px`;
                new_tag_menu.style.top = `${coordY - 5}px`;
                new_tag_menu.style.display = 'flex';
                // ]

                function clickNewTag() {
                    if (!event.target.classList.contains("action-element")) {
                        new_tag_menu.style.display = 'none';
                        document.removeEventListener('click', clickNewTag);
                    }

                    // Изменено 10.02 [
                    if (event.target.id === "apply-new-tag") {
                        let tag_arr = tag_list.map(function(item) {
                            return item.tag;
                        });

                        if (new_tag_input.value === '') {
                            new_tag_error.innerText = 'The tag name is not defined';
                        } else if (new_tag_color === null) {
                            new_tag_error.innerText = 'The color of the tag is not defined';
                        } else if (tag_arr.includes(new_tag_input.value)){
                            new_tag_error.innerText = 'This tag name is already defined';
                        } else {
                            new_tag_menu.style.display = 'none';
                            document.removeEventListener('click', clickNewTag);
                            updateHistoryData(new_tag_color, new_tag_input.value);
                            addTagList(new_tag_input.value, new_tag_color);
                        }
                    }
                    // ]
                }

                document.addEventListener('click', clickNewTag);
            });

            // Получаем высоту всех span элементов
            let totalHeight = tag_container.scrollHeight;

            if (!edit_tag_open) {
                tag_container.style.height = `${totalHeight}px`;
                edit_tag_open = 1;
            } else {
                tag_container.style.height = "24px";
                edit_tag_open = 0;
            }
            
        }
    }
    // ]

    document.addEventListener('click', clickHandler);
}

// Изменено 10.02 [
function addTagList(tag, color){
    let new_tag = {tag: tag, color: color};
    tag_list.push(new_tag);

    // Данные о новом шаблоне тега отправляются на сервер
}

function deleteTagList(tag, color) {
    tag_list = tag_list.filter(function(item) {
        return item.tag !== tag;
    });

    // Данные об удалении соответвующего шаблона тега с его названием отправляются на сервер
}

function deleteTagHistory(tag, color) {
    history_data.forEach(function(item) {
        if (item.tag === tag) {
            item.tag = '';
        }
    });

    // Данные об удалении соответвующего тега с его названием отправлются на сервер
}
// ]

// Изменено 10.02 [
function showUserInfo(text, coordX, coordY, width) {
    let info_text = document.getElementById("text-info-copy-download");
    let info_text_container = document.getElementById("info-copy-download");
    let stop_timeout = 1;

    info_text_container.style.width = width + 'px';
    info_text.innerText = text;

    info_text_container.style.position = 'absolute';
    info_text_container.style.left = `${coordX}px`;
    info_text_container.style.top = `${coordY}px`;
    info_text_container.style.display = 'flex';

    setTimeout(function() {
        if (stop_timeout) {
            info_text_container.style.display = 'none';
        }
    }, 3000);

    function clickCloseInfo() {
        if (event.target.id !== "actions-download" && 
        event.target.id !== "apply-delete" && 
        event.target.id !== "apply-delete-tag") {
            info_text_container.style.display = 'none';
            document.removeEventListener('click', clickCloseInfo);
            stop_timeout = 0;
        }
    }

    document.addEventListener('click', clickCloseInfo);
}
// ]

function clearAllColors() {
    let tag_color_btn = document.getElementsByClassName("tag-color");
    new_tag_error.innerText = '';
    new_tag_color = null;

    for (const item of tag_color_btn) {
        item.classList.remove("selected-new-tag");
    }
}

function changeNewTagColor(element, color) {
    let tag_color_btn = document.getElementsByClassName("tag-color");
    clearAllColors();
    setTimeout(function() {
        tag_color_btn[element].classList.add("selected-new-tag");
    }, 10);
    new_tag_color = color;
}


function isObjectEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

function showCopyMenu(all_text, part_name, part_text) {
    let copyMenu = document.getElementById('copy-menu');

    // Позиционируем меню абсолютно
    let coordX = event.clientX - 60 + window.scrollX;
    let coordY = event.clientY + 8 + window.scrollY;
    copyMenu.style.position = 'absolute';
    copyMenu.style.left = `${coordX}px`;
    copyMenu.style.top = `${coordY}px`;

    copyMenu.style.display = 'flex';

    // Создаем функцию обработчика события
    function clickHandler(event) {
        if (!event.target.classList.contains("info-text") &&
            !event.target.classList.contains("info-point-title") &&
            event.target.id !== "copy" &&
            event.target.id !== "copy-all" &&
            event.target.id !== "copy-menu") {
            copyMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);
        } else if (event.target.id === "copy") {
            copyPart(part_name, part_text);
            copyMenu.style.display = 'none'; // Скрываем меню после копирования
            document.removeEventListener('click', clickHandler);
        } else if (event.target.id === "copy-all") {
            makeCopy(all_text);
            copyMenu.style.display = 'none'; // Скрываем меню после копирования
            document.removeEventListener('click', clickHandler);
        }
    }

    document.addEventListener('click', clickHandler);
}

function copyPart(part_name, part_text) {
    let text = part_name + ': ' + part_text;

    makeCopy(text);
}

function makeAllText(item) {
    // GENERAL
    let text = 'GENERAL\\nContract type: '+item.contractType+'\\nDate / Effective date: '+item.info.date+' / '+item.info.effective_date+'\\nTerms: '+item.info.terms+
    '\\nFinancial terms: '+item.info.financial_terms+'\\nPenalties: '+item.info.penalties;

    // FIRST PARTY
    text += '\\n\\nFIRST PARTY\\nName: '+item.side1+'\\nRights: '+item.info.rights1+'\\nResponsibilities: '+item.info.responsibilities1;

    // SECOND PARTY
    text += '\\n\\nSECOND PARTY\\nName: '+item.side2+'\\nRights: '+item.info.rights2+'\\nResponsibilities: '+item.info.responsibilities2;

    return text;
}

function makeCopy(text) {
    let textArea = document.createElement('textarea');
    textArea.value = text;
  
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function initCalend() {
    from_picker = new Pikaday({
        field: document.getElementById('from-datepicker-container'),
        bound: false,
        format: 'YYYY-MM-DD',  // Формат даты
        showYearDropdown: true, // Опциональные настройки
        yearRange: [1900, 2050],
        showDaysInNextAndPreviousMonths: true,
        i18n: {
            previousMonth: 'Prev',
            nextMonth: 'Next',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        },
        onSelect: function(date) {
            updatePikaTitleClasses();
            highlightDateRange();
        },
        onDraw: function() {
            updatePikaTitleClasses();
        },
        onYearChange: function() {
            updatePikaTitleClasses();
        }
    });
    
    from_picker.show();
    
    to_picker = new Pikaday({
        field: document.getElementById('to-datepicker-container'),
        bound: false,
        format: 'YYYY-MM-DD',  // Формат даты
        showYearDropdown: true, // Опциональные настройки
        yearRange: [1900, 2050],
        showDaysInNextAndPreviousMonths: true,
        i18n: {
            previousMonth: 'Prev',
            nextMonth: 'Next',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        },
        onSelect: function(date) {
            updatePikaTitleClasses();
            highlightDateRange();
        },
        onDraw: function() {
            updatePikaTitleClasses();
        },
        onYearChange: function() {
            updatePikaTitleClasses();
        }
    });
    
    to_picker.show();

    // Добавление текста в title
    let pika_title = document.getElementsByClassName('pika-title');

    pika_title[0].classList.add('pika-title-from');
    pika_title[1].classList.add('pika-title-to');
}

function updatePikaTitleClasses() {
    let pikaTitles = document.getElementsByClassName('pika-title');

    if (pikaTitles.length >= 2) {
        pikaTitles[0].classList.add('pika-title-from');
        pikaTitles[1].classList.add('pika-title-to');
    }
}

function highlightDateRange() {
    fromDate = from_picker.getDate();
    toDate = to_picker.getDate();

    console.log(fromDate + " " + toDate);

    // Удаление предыдущих выделений
    document.querySelectorAll('.pika-day').forEach(function(day) {
        day.classList.remove('highlighted-date', 'left-select-date', 'right-select-date', 'select-date');
    });

    // Если даты не выбраны, выходим
    if (!fromDate && !toDate) {
        return;
    }

    // Если выбрана только одна дата, добавляем класс select-date
    if (fromDate && !toDate) {
        document.querySelectorAll('.pika-day[data-pika-year="' + fromDate.getFullYear() + '"][data-pika-month="' + fromDate.getMonth() + '"][data-pika-day="' + fromDate.getDate() + '"]').forEach(function(dayElement) {
            dayElement.classList.add('select-date');
        });
        return;
    }

    if (!fromDate && toDate) {
        document.querySelectorAll('.pika-day[data-pika-year="' + toDate.getFullYear() + '"][data-pika-month="' + toDate.getMonth() + '"][data-pika-day="' + toDate.getDate() + '"]').forEach(function(dayElement) {
            dayElement.classList.add('select-date');
        });
        return;
    }

    // Если from-дата > to-дата, меняем их местами
    if (fromDate > toDate) {
        [fromDate, toDate] = [toDate, fromDate];
    }

    // Получаем все даты между from-датой и to-датой
    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
        // Используем querySelectorAll, чтобы обработать все совпадения в обеих таблицах
        document.querySelectorAll('.pika-day[data-pika-year="' + currentDate.getFullYear() + '"][data-pika-month="' + currentDate.getMonth() + '"][data-pika-day="' + currentDate.getDate() + '"]').forEach(function(dayElement) {
            
            dayElement.classList.add('highlighted-date');

            // Определение, является ли дата левой или правой выбранной
            if (currentDate.getTime() === fromDate.getTime()) {
                dayElement.classList.add('left-select-date');
            } else if (currentDate.getTime() === toDate.getTime()) {
                dayElement.classList.add('right-select-date');
            }

            // Если выбрана одна и та же дата в обеих таблицах
            if (fromDate.getTime() === toDate.getTime()) {
                dayElement.classList.add('select-date');
            }
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// Изменено 10.02 [
function showDateFilter() {
    closeOtherMenuFilter();

    let coordX = event.clientX - 30 + window.scrollX;
    let coordY = event.clientY + 20 + window.scrollY;
    date_filter_menu.style.position = 'absolute';
    date_filter_menu.style.left = `${coordX}px`;
    date_filter_menu.style.top = `${coordY}px`;

    date_filter_menu.style.display = 'flex';
}
// ]

function closeDateFilter() {
    date_filter_menu.style.display = 'none';
    close_date_filter.style.display = 'none';
    date_filter.classList.remove('active-filter');
    date_filter_text.innerText = 'Date';


    date_filter_active = 0;
    filterPipe();
}

function filterRequestDate(curr_data) {
    if (fromDate === null && toDate === null){
        closeDateFilter();
        return;
    }

    let text = '';
    if (reverse_date_filter) text += "No ";

    let toDateAdded = new Date(toDate);
    if (toDate !== null) toDateAdded.setDate(toDate.getDate() + 1);

    if (fromDate !== null && toDate === null) {
        let tmp_date = new Date(fromDate);
        tmp_date.setDate(fromDate.getDate() + 1);
        curr_data = curr_data.filter(function(item) {
            if (reverse_date_filter) {
                // Исключаем числа из промежутка
                return item.requestDate < fromDate || item.requestDate > tmp_date;
            } else {
                // Включаем числа из промежутка
                return item.requestDate >= fromDate && item.requestDate <= tmp_date;
            }
        });
        text += formatReqDate(fromDate);
    } else if (fromDate === null && toDate !== null) {
        let tmp_date = new Date(toDate);
        curr_data = curr_data.filter(function(item) {
            if (reverse_date_filter) {
                return item.requestDate < tmp_date || item.requestDate > toDateAdded;
            } else {
                return item.requestDate >= tmp_date && item.requestDate <= toDateAdded;
            }
        });
        text += formatReqDate(toDate);
    } else {
        curr_data = curr_data.filter(function(item) {
            if (reverse_date_filter) {
                return item.requestDate < fromDate || item.requestDate > toDateAdded;
            } else {
                return item.requestDate >= fromDate && item.requestDate <= toDateAdded;
            }
        });
        text += formatReqDate(fromDate) + ' - ' + formatReqDate(toDate);
    }

    date_filter_active = 1;
    date_filter_menu.style.display = 'none';

    changeFilterButton(date_filter, close_date_filter, date_filter_text, text);

    return curr_data;
}

function formatReqDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
}

function changeFilterButton(object, close, filter_text, text) {
    object.classList.add('active-filter');
    close.style.display = 'block';

    filter_text.innerText = text;
}

date_filter.addEventListener('click', (event) => {
    if (event.target.id !== "close-date-filter") showDateFilter();
  });

side_filter.addEventListener('click', (event) => {
    if (event.target.id !== "close-side-filter") showSideFilter();
});

// Изменено 10.02 [
function showSideFilter() {
    closeOtherMenuFilter();

    let coordX = event.clientX - 30 + window.scrollX;
    let coordY = event.clientY + 20 + window.scrollY;
    side_menu.style.position = 'absolute';
    side_menu.style.left = `${coordX}px`;
    side_menu.style.top = `${coordY}px`;

    side_menu.style.display = 'flex';

    addAllSides();
}
// ]

function closeOtherMenuFilter() {
    date_filter_menu.style.display = 'none';
    side_menu.style.display = 'none';
    type_menu.style.display = 'none';
    tag_menu.style.display = 'none';
}

function closeSideFilter() {
    side_menu.style.display = 'none';
    close_side_filter.style.display = 'none';
    side_filter.classList.remove('active-filter');
    side_filter_text.innerText = 'Sides';

    selected_sid1 = [];
    selected_sid2 = [];

    side_filter_active = 0;
    filterPipe();
}

function addAllSides() {
    let side1_filter_ul = document.getElementById("side1-filter-ul");
    let side2_filter_ul = document.getElementById("side2-filter-ul");

    side1_filter_ul.innerHTML = "";
    side2_filter_ul.innerHTML = "";

    input_search_sides.value = "";

    let side1_arr = [...new Set(history_data.map(item => item.side1))];
    let side2_arr = [...new Set(history_data.map(item => item.side2))];

    side1_arr.forEach(item => {
        let liElement = document.createElement("li");

        liElement.textContent = item;

        if (selected_sid1.includes(item)) {
            liElement.classList.add("selected-filter");
        }

        liElement.addEventListener("click", function() {
            toggleSelectedSide(liElement, item, "side1");
        });

        side1_filter_ul.appendChild(liElement);
    });

    side2_arr.forEach(item => {
        let liElement = document.createElement("li");

        liElement.textContent = item;

        if (selected_sid2.includes(item)) {
            liElement.classList.add("selected-filter");
        }

        liElement.addEventListener("click", function() {
            toggleSelectedSide(liElement, item, "side2");
        });

        side2_filter_ul.appendChild(liElement);
    });
}

function toggleSelectedSide(element, item, side) {
    const index = side === "side1" ? selected_sid1.indexOf(item) : selected_sid2.indexOf(item);

    if (index === -1) {
        if (side === "side1") {
            selected_sid1.push(item);
        } else {
            selected_sid2.push(item);
        }
    } else {
        if (side === "side1") {
            selected_sid1.splice(index, 1);
        } else {
            selected_sid2.splice(index, 1);
        }
    }

    element.classList.toggle("selected-filter");
}

function filterSides(curr_data) {
    if (selected_sid1.length === 0 && selected_sid2.length === 0) {
        closeSideFilter();
        return;
    }

    if (reverse_side_filter) {
        // Если reverse_side_filter равен 1, выбираем элементы, которые не входят в списки selected_sid1 и selected_sid2
        if (selected_sid1.length === 0 || selected_sid2.length === 0){
            curr_data = curr_data.filter(item => {
                let isSide1NotMatch = selected_sid1.length !== 0 && !selected_sid1.includes(item.side1);
                let isSide2NotMatch = selected_sid2.length !== 0 && !selected_sid2.includes(item.side2);

                return isSide1NotMatch || isSide2NotMatch;
            });
        } else {
            curr_data = curr_data.filter(item => {
                let isSide1NotMatch = selected_sid1.length !== 0 && !selected_sid1.includes(item.side1);
                let isSide2NotMatch = selected_sid2.length !== 0 && !selected_sid2.includes(item.side2);

                return isSide1NotMatch && isSide2NotMatch;
            });
        }
    } else {
        // Иначе выбираем элементы, которые входят в списки selected_sid1 и selected_sid2
        curr_data = curr_data.filter(item => {
            let isSide1Match = selected_sid1.length === 0 || selected_sid1.includes(item.side1);
            let isSide2Match = selected_sid2.length === 0 || selected_sid2.includes(item.side2);

            return isSide1Match && isSide2Match;
        });
    }

    side_filter_active = 1;
    side_menu.style.display = 'none';

    let text = formatArrayToText(selected_sid1, selected_sid2);
    text = truncateText(text, 20);

    changeFilterButton(side_filter, close_side_filter, side_filter_text, text);

    return curr_data;
}

function formatArrayToText(...arrays) {
    let text = "";

    if (reverse_side_filter) text+="No ";

    if (arrays[0].length >= 2) {
        text += arrays[0][0] + ", " + arrays[0][1] + ", ";
    } else if (arrays[0].length === 1) {
        text += arrays[0][0] + ", ";
        if (arrays[1].length > 0) {
            text += arrays[1][0] + ", ";
        }
    } else if (arrays[1].length >= 2) {
        text += arrays[1][0] + ", " + arrays[1][1] + ", ";
    } else if (arrays[1].length === 1) {
        text += arrays[1][0] + ", ";
    }

    return text.slice(0, -2);
}

function addSearchSides() {
    let side1_filter_ul = document.getElementById("side1-filter-ul");
    let side2_filter_ul = document.getElementById("side2-filter-ul");
    let searchInput = document.getElementById("input-search-sides");

    side1_filter_ul.innerHTML = "";
    side2_filter_ul.innerHTML = "";

    let side1_arr = [...new Set(history_data.map(item => item.side1))];
    let side2_arr = [...new Set(history_data.map(item => item.side2))];

    function addToFilterList(ulElement, array, side, selected_side) {
        array.forEach(item => {
            if (item.toLowerCase().includes(searchInput.value.toLowerCase())) {
                let liElement = document.createElement("li");

                liElement.textContent = item;

                if (selected_side.includes(item)) {
                    liElement.classList.add("selected-filter");
                }

                liElement.addEventListener("click", function() {
                    toggleSelectedSide(liElement, item, side);
                });

                ulElement.appendChild(liElement);
            }
        });
    }

    addToFilterList(side1_filter_ul, side1_arr, "side1", selected_sid1);
    addToFilterList(side2_filter_ul, side2_arr, "side2", selected_sid2);
}

input_search_sides.addEventListener("input", addSearchSides);


type_filter.addEventListener('click', (event) => {
    if (event.target.id !== "close-type-filter") showTypeFilter();
});

// Изменено 10.02 [
function showTypeFilter() {
    closeOtherMenuFilter();

    let coordX = event.clientX - 30 + window.scrollX;
    let coordY = event.clientY + 20 + + window.scrollY;
    type_menu.style.position = 'absolute';
    type_menu.style.left = `${coordX}px`;
    type_menu.style.top = `${coordY}px`;

    type_menu.style.display = 'flex';

    addAllTypes();
}
// ]

function closeTypeFilter() {
    type_menu.style.display = 'none';
    close_type_filter.style.display = 'none';
    type_filter.classList.remove('active-filter');
    type_filter_text.innerText = 'Contract Types';

    selected_types = [];
    type_filter_active = 0;
    filterPipe();
}

function addAllTypes() {
    let type_filter_ul = document.getElementById("type-filter-ul");

    type_filter_ul.innerHTML = "";

    input_search_type.value = "";

    let type_arr = [...new Set(history_data.map(item => item.contractType))];

    type_arr.forEach(item => {
        let liElement = document.createElement("li");
        let truncatedText = truncateText(item, 30);

        liElement.textContent = truncatedText;
        liElement.title = item;

        if (selected_types.includes(item)) {
            liElement.classList.add("selected-filter");
        }

        liElement.addEventListener("click", function() {
            toggleSelectedType(liElement, item);
        });

        type_filter_ul.appendChild(liElement);
    });
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + "...";
    }
    return text;
}

function addSearchTypes() {
    let searchInput = document.getElementById("input-search-type");
    let type_filter_ul = document.getElementById("type-filter-ul");

    type_filter_ul.innerHTML = "";

    let type_arr = [...new Set(history_data.map(item => item.contractType))];

    function addToFilterList(ulElement, array) {
        array.forEach(item => {
            if (item.toLowerCase().includes(searchInput.value.toLowerCase())) {
                let liElement = document.createElement("li");
                let truncatedText = truncateText(item, 30);

                liElement.textContent = truncatedText;
                liElement.title = item;

                if (selected_types.includes(item)) {
                    liElement.classList.add("selected-filter");
                }

                liElement.addEventListener("click", function() {
                    toggleSelectedType(liElement, item);
                });

                ulElement.appendChild(liElement);
            }
        });
    }

    addToFilterList(type_filter_ul, type_arr);
}

input_search_type.addEventListener("input", addSearchTypes);


function toggleSelectedType(element, item) {
    const index = selected_types.indexOf(item);

    if (index === -1) {
        selected_types.push(item);
    } else {
        selected_types.splice(index, 1);
    }

    element.classList.toggle("selected-filter");
}

function filterType(curr_data) {
    if (selected_types.length === 0) {
        closeTypeFilter();
        return;
    }

    if (reverse_type_filter) {
        // Если reverse_type_filter равен 1, выбираем элементы, которые не входят в список selected_types
        curr_data = curr_data.filter(item => !selected_types.includes(item.contractType));
    } else {
        // Иначе выбираем элементы, которые входят в список selected_types
        curr_data = curr_data.filter(item => selected_types.includes(item.contractType));
    }

    type_filter_active = 1;
    type_menu.style.display = 'none';

    let text="";
    if (reverse_type_filter) text+="No ";
    selected_types.forEach(item => {text+=item+", "});
    text = text.slice(0, -2);
    text = truncateText(text, 20);
    changeFilterButton(type_filter, close_type_filter, type_filter_text, text);

    return curr_data;
}

// Функции для фильтра по тегу 
tag_filter.addEventListener('click', (event) => {
    if (event.target.id !== "close-tag-filter") showTagFilter();
});

// Изменено 10.02 [
function showTagFilter() {
    closeOtherMenuFilter();

    let coordX = event.clientX - 30 + window.scrollX;
    let coordY = event.clientY + 20 + window.scrollY;
    tag_menu.style.position = 'absolute';
    tag_menu.style.left = `${coordX}px`;
    tag_menu.style.top = `${coordY}px`;

    tag_menu.style.display = 'flex';

    addAllTags();
}
// ]

function closeTagFilter() {
    tag_menu.style.display = 'none';
    close_tag_filter.style.display = 'none';
    tag_filter.classList.remove('active-filter');
    tag_filter_text.innerText = 'Tag';

    selected_tags = [];
    tag_filter_active = 0;
    filterPipe();
}

function addAllTags() {
    let tag_filter_ul = document.getElementById("tag-filter-ul");

    tag_filter_ul.innerHTML = "";

    input_search_tag.value = "";

    let tag_arr = [...new Set(history_data.map(item => item.tag))];

    tag_arr.forEach(item => {
        if (item !== ""){
            let liElement = document.createElement("li");
            let divElement = document.createElement("div"); // Создаем элемент div
            let truncatedText = truncateText(item, 30);

            // Устанавливаем стили для div
            divElement.className = "filtered-tag";
            divElement.innerHTML = `<div class="tag-dots" style="background-color: ${getTagColor(item)};"></div>${truncatedText}`;

            liElement.appendChild(divElement); // Добавляем div внутрь li
            liElement.title = item;

            // Проверяем, есть ли текущий тег в списке selected_tags
            if (selected_tags.includes(item)) {
                liElement.classList.add("selected-filter");
            }

            liElement.addEventListener("click", function() {
                toggleSelectedTag(liElement, item);
            });

            tag_filter_ul.appendChild(liElement);
        }
    });
}


// Функция для получения цвета тега
function getTagColor(tag) {
    return history_data.find(item => item.tag === tag)?.info.tag_color || 'default_color';
}

function addSearchTags() {
    let searchInput = document.getElementById("input-search-tag");
    let tag_filter_ul = document.getElementById("tag-filter-ul");

    tag_filter_ul.innerHTML = "";

    let tag_arr = [...new Set(history_data.map(item => item.tag))];

    function addToFilterList(ulElement, array) {
        array.forEach(item => {
            if (item.toLowerCase().includes(searchInput.value.toLowerCase())) {
                if (item !== ""){
                    let liElement = document.createElement("li");
                    let divElement = document.createElement("div"); // Создаем элемент div
                    let truncatedText = truncateText(item, 30);

                    // Устанавливаем стили для div
                    divElement.className = "filtered-tag";
                    divElement.innerHTML = `<div class="tag-dots" style="background-color: ${getTagColor(item)};"></div>${truncatedText}`;

                    liElement.appendChild(divElement); // Добавляем div внутрь li
                    liElement.title = item;

                    // Проверяем, есть ли текущий тег в списке selected_tags
                    if (selected_tags.includes(item)) {
                        liElement.classList.add("selected-filter");
                    }

                    liElement.addEventListener("click", function() {
                        toggleSelectedTag(liElement, item);
                    });

                    tag_filter_ul.appendChild(liElement);
                }
            }
        });
    }

    addToFilterList(tag_filter_ul, tag_arr);
}

input_search_tag.addEventListener("input", addSearchTags);

function toggleSelectedTag(element, item) {
    const index = selected_tags.indexOf(item);

    if (index === -1) {
        selected_tags.push(item);
    } else {
        selected_tags.splice(index, 1);
    }

    element.classList.toggle("selected-filter");
}

function filterTag(curr_data) {
    if (selected_tags.length === 0) {
        closeTagFilter();
        return;
    }

    if (reverse_tag_filter) {
        // Если reverse_tag_filter равен 1, выбираем элементы, которые не входят в список selected_tags
        curr_data = curr_data.filter(item => !selected_tags.includes(item.tag));
    } else {
        // Иначе выбираем элементы, которые входят в список selected_tags
        curr_data = curr_data.filter(item => selected_tags.includes(item.tag));
    }

    tag_filter_active = 1;
    tag_menu.style.display = 'none';

    let text="";
    if (reverse_tag_filter) text+="No ";
    selected_tags.forEach(item => {text+=item+", "});
    text = text.slice(0, -2);
    text = truncateText(text, 20);
    changeFilterButton(tag_filter, close_tag_filter, tag_filter_text, text);

    return curr_data;
}

function filterPipe() {
    filtered_data = history_data.slice(0);

    if (tag_filter_active) filtered_data = filterTag(filtered_data);

    if (type_filter_active) filtered_data = filterType(filtered_data);

    if (side_filter_active) filtered_data = filterSides(filtered_data);   

    if (date_filter_active) filtered_data = filterRequestDate(filtered_data);

    if (tag_filter_active || type_filter_active || side_filter_active || date_filter_active) filter_active = 1;
    else filter_active = 0;

// Исправлено: После удаления всех контрактов пустая история [

    if (history_data.length === 0) showEmptyHistory();

// ]

    updateTable(searchTerm);
}

function applyFilter(selected_filter) {
    switch (selected_filter) {
        case 'tag':
            tag_filter_active = 1;
            break;
        case 'type':
            type_filter_active = 1;
            break;
        case 'side':
            side_filter_active = 1;
            break;
        case 'date':
            date_filter_active = 1;
            break;
        default:
            break;
    }

    filterPipe();
}

// Исправлено 30.01 [
function includeSwitch(filter) {
    switch (filter) {
        case 'tag':
            reverse_tag_filter = 0;
            break;
        case 'type':
            reverse_type_filter = 0;
            break;
        case 'side':
            reverse_side_filter = 0;
            break;
        case 'date':
            reverse_date_filter = 0;
            break;
        default:
            break;
    }
    let include = document.getElementById("include-"+filter+"-btn"); 
    let exclude = document.getElementById("exclude-"+filter+"-btn");

    include.classList.add("active-switch-btn");
    exclude.classList.remove("active-switch-btn");
}

function excludeSwitch(filter) {
    switch (filter) {
        case 'tag':
            reverse_tag_filter = 1;
            break;
        case 'type':
            reverse_type_filter = 1;
            break;
        case 'side':
            reverse_side_filter = 1;
            break;
        case 'date':
            reverse_date_filter = 1;
            break;
        default:
            break;
    }
    let include = document.getElementById("include-"+filter+"-btn"); 
    let exclude = document.getElementById("exclude-"+filter+"-btn");

    include.classList.remove("active-switch-btn");
    exclude.classList.add("active-switch-btn");
}
// ]
