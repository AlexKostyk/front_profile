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

        let wrapImage, dotsImage;
        let tagColor = item.info.tag_color;

        // Добавляем класс "expandable-row" к строке для обозначения, что она раскрываема
        row.classList.add('expandable-row');


        for (const key in item) {
            if (key !== 'info'){
                let cell = document.createElement('td');
                if (key === 'requestDate') {
                    cell.textContent = formatDate(item);

                    cell.style.paddingLeft = '8px';
                    cell.style.borderTopLeftRadius = '8px';
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
                    dotsImage = images.dotsImage;

                    cell.style.borderTopRightRadius = '8px';
                } else {
                    cell.textContent = item[key];
                }

                row.appendChild(cell);
            }
        }

        // Добавляем слушатель событий click к строке
        row.addEventListener('click', () => toggleInfo(row, item, wrapImage, dotsImage));
        dotsImage.addEventListener('click', () => showActionMenu(item));

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

function addActions(cell) {
    let flexContainer = document.createElement('div');
    flexContainer.classList.add('action-container');

    let wrapImage = document.createElement('img');
    wrapImage.src = './imgs/wrap.png';
    wrapImage.alt = 'Wrap icon';
    flexContainer.appendChild(wrapImage);

    let dotsImage = document.createElement('img');
    dotsImage.id = 'actions-dots';
    dotsImage.src = './imgs/dots.png';
    dotsImage.alt = 'Dots icon';
    flexContainer.appendChild(dotsImage);

    cell.appendChild(flexContainer);

    return { wrapImage, dotsImage };
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
function toggleInfo(row, item, wrapImage, dotsImage) {
    if (event.target === dotsImage) {
        // Если это dotsImage, ничего не делаем
        return;
    }

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
    infoDiv.innerHTML = createInfoMarkup(item);
    infoContainer.innerHTML = ''; // Очищаем содержимое перед добавлением нового
    infoContainer.appendChild(infoDiv);

    // Устанавливаем высоту вручную, чтобы избежать задержки
    infoContainer.style.height = infoDiv.clientHeight + 'px';

    // Переключаем класс для управления анимацией
    if (infoRow.classList.contains('expanded')) {
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
    }
}

function setBorderStyle(infoRow, row) {
    setTimeout(function() {
        infoRow.classList.remove('expanded');
        row.classList.remove('processing');
        row.classList.remove('curr-expanded-row');
    }, 900);
}

// Функция для создания разметки полного описания
function createInfoMarkup(item) {
    return `<div id='info-content'>
                <div class='info-title'>
                    <h2 class='bold-title'>General</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <p class='title info-point-title' onclick="showCopyMenu('${item}', 'Contract type', '${item.contractType}')">Contract type</p>
                        <p class='info-text' onclick="showCopyMenu('${item}', 'Contract type', '${item.contractType}')">${item.contractType}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Date / Effective date</p>
                        <p class='info-text'>${item.info.date} / ${item.info.effective_date}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Terms</p>
                        <p class='info-text'>${item.info.terms}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Financial Terms</p>
                        <p class='info-text'>${item.info.financial_terms}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Penalties</p>
                        <p class='info-text'>${item.info.penalties}</p>
                    </div>
                </div>

                <div class='info-title'>
                    <h2 class='bold-title'>First party</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <p class='title info-point-title'>Name</p>
                        <p class='info-text'>${item.side1}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Rights</p>
                        <p class='info-text'>${item.info.rights1}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Responsibilities</p>
                        <p class='info-text'>${item.info.responsibilities1}</p>
                    </div>
                </div>

                <div class='info-title'>
                    <h2 class='bold-title'>Second party</h2>
                    <hr class='info-hr'>
                </div>
                <div class='info-text-container'>
                    <div class='info-point'>
                        <p class='title info-point-title'>Name</p>
                        <p class='info-text'>${item.side2}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Rights</p>
                        <p class='info-text'>${item.info.rights2}</p>
                    </div>
                    <div class='info-point'>
                        <p class='title info-point-title'>Responsibilities</p>
                        <p class='info-text'>${item.info.responsibilities2}</p>
                    </div>
                </div>
            </div>
            <div style='height: 12px'></div>`;
}

function showActionMenu(item) {
    let actionsMenu = document.getElementById('actions-menu');

    // Позиционируем меню абсолютно
    let coordX = event.clientX - 195;
    let coordY = event.clientY + 3;
    actionsMenu.style.position = 'absolute';
    actionsMenu.style.left = `${coordX}px`;
    actionsMenu.style.top = `${coordY}px`;

    actionsMenu.style.display = 'flex';

    function clickHandler() {
        if (event.target.id !== "actions-dots"&&
            event.target.id !== "actions-menu"&&
            !event.target.classList.contains("action-element")) {
            console.log(event.target.id);
            actionsMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);
        }
    }

    document.addEventListener('click', clickHandler);
}

function showCopyMenu(item, part_name, part_text) {
    let copyMenu = document.getElementById('copy-menu');
    let copy = document.getElementById('copy');

    // Позиционируем меню абсолютно
    let coordX = event.clientX - 60;
    let coordY = event.clientY + 8;
    copyMenu.style.position = 'absolute';
    copyMenu.style.left = `${coordX}px`;
    copyMenu.style.top = `${coordY}px`;

    copyMenu.style.display = 'flex';

    function clickHandler() {
        if (!event.target.classList.contains("info-text")&&
            !event.target.classList.contains("info-point-title")&&
            event.target.id !== "copy"&&
            event.target.id !== "copy-all"&&
            event.target.id !== "copy-menu") {
            console.log(event.target.id);
            copyMenu.style.display = 'none';
            document.removeEventListener('click', clickHandler);
        }
    }

    document.addEventListener('click', clickHandler);
    copy.addEventListener('click', () => copyPart(part_name, part_text));
}

function copyPart(part_name, part_text) {
    let text = part_name + ': ' + part_text;

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