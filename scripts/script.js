let drop_box = document.getElementById('load-contract-container');
let file_input = document.getElementById('file-input');
let contract_element = document.getElementById('load-contract-container');
let upload_contract_heading = document.getElementById('upload-contract-heading');
let close_file = document.getElementById('close-file-icon');
let progress_file = document.getElementById('progress-container');
let progress_bar_file = document.getElementsByClassName('uploading-progress-bar-file')[0];
let progress_file_img = document.getElementById('file-icon');
let file_extensions = document.getElementById('file-extensions');
let summarize_btn = document.getElementById('summarize-btn');
let text_element = document.getElementById('load-text-container');
let text_input = document.getElementById('text-input');
let switch_text_contract_btn = document.getElementById('btn-text-contract');
let limit_bar = document.getElementById('request-limit-bar');
let limit_text = document.getElementById('request-limit-text');
let response_limit_bar = document.getElementById('response-limit-bar');
let response_limit_text = document.getElementById('response-limit-text');
let limit_warning_text = document.getElementById('limit-warning-text');
let summarize_container = document.getElementById('summarize-container');
let loader_container = document.getElementById('loader-container');
let response_container = document.getElementById('response-container');
let file_downloaded_container = document.getElementById('file-downloaded-container');
let download_file_btn = document.getElementById('download-file-btn');
let history_container = document.getElementById('history-container');

// Добавление: drag and drop на весь экран [
let file_name_upoad = document.getElementById('upload-file-name');
let file_expansion_upoad = document.getElementById('upload-file-expansion');

let file_name_response = document.getElementById('response-file-name');
let file_expansion_response = document.getElementById('response-file-expansion');

let file_name_drop = document.getElementById('drop-file-name');
let file_expansion_drop = document.getElementById('drop-file-expansion');

// Drag and drop
let drag_and_drop_area = document.getElementById('drag-and-drop-area');
let drop_first_part = document.getElementById('drag-and-drop-first-part');
let drop_second_part = document.getElementById('drag-and-drop-second-part');
let drop_progress_bar_file = document.getElementById('drop-progress-bar-file');
let drop_header_text = document.getElementById('drag-and-drop-header-text');
// ]

let limit_plan_text = document.getElementById('limit-plan-text');
let limit_perday_text = document.getElementById('limit-perday-text');
let limit_date_text = document.getElementById('limit-date-text');
// Исправлено 31.01 [
let inf_container = document.getElementById('inf-container');
let resp_inf_container = document.getElementById('response-inf-container');
// ]
let response_limit_plan_text = document.getElementById('response-limit-plan-text');
let response_limit_perday_text = document.getElementById('response-limit-perday-text');
let response_limit_date_text = document.getElementById('response-limit-date-text');

// GENERAL
let general_effective_date = document.getElementById('general-effective-date-text');
let general_date = document.getElementById('general-date-text');
let general_type = document.getElementById('general-type-text');
let general_terms = document.getElementById('general-terms-text');
let general_financial_terms = document.getElementById('general-financial-terms-text');
let general_penalties = document.getElementById('general-penalties-text');

// FIRST PARTY
let first_party_name = document.getElementById('first-party-name-text');
let first_party_rights = document.getElementById('first-party-rights-text');
let first_party_responsibilities = document.getElementById('first-party-responsibilities-text');

// SECOND PARTY
let second_party_name = document.getElementById('second-party-name-text');
let second_party_rights = document.getElementById('second-party-rights-text');
let second_party_responsibilities = document.getElementById('second-party-responsibilities-text');

// флаги
let text_contract_flag = 0; // переключение между вводом текста (1) и загрузкой фала (0)
let close_progress_bar_file_flag = 0; // флаг для удаления загруженного файла
let subscription_ended_flag = 0; // флаг для обозначения окончания подписки

// для внутренней логики
let request_limit_value = 0;
let curr_menu_pont = 0;
let basic_subscription = 1;

// файл загруженный пользователем
let user_file;

// ---- Данные получаемые с сервера ----

// счётчик лимитов запросов
let request_limit_counter;
let max_request_limit_counter;

// данные для лимитов
let plan_text;
let perday_text;
let date_text;

// ---- Response data ----
// GENERAL
let general_effective_date_text;
let general_date_text;
let general_type_text;
let general_terms_text;
let general_financial_terms_text;
let general_penalties_text;

// FIRST PARTY
let first_party_name_text;
let first_party_rights_text;
let first_party_responsibilities_text;

// SECOND PARTY
let second_party_name_text;
let second_party_rights_text;
let second_party_responsibilities_text;



document.addEventListener('DOMContentLoaded', function() {
    getLimitData();
    getRequestLimit();

    if(subscription_ended_flag) subscriptionEnded();

    markFirsElement();
});

// Изменено 10.02 [
function markFirsElement() {
    let first_row = document.getElementsByClassName("expandable-row")[0];

    first_row.classList.add("expandable-first-row");

    setTimeout(function() {
        first_row.classList.remove("expandable-first-row");
    }, 10000);

    function clickCloseMark() {
        first_row.classList.remove("expandable-first-row");
        document.removeEventListener('click', clickCloseMark);
    }

    document.addEventListener('click', clickCloseMark);
}
// ]

// функция для получения информации о подписке у пользователя
function getLimitData() {
    // сервер даёт нам значения plan_text, perday_text, date_text здесь, также здесь определяется subscription_ended_flag
    plan_text = "Light Subscription";
    perday_text = "4 per day";
    date_text = "01.02.2024";

    if (plan_text !== "Light Subscription") basic_subscription = 0;

    updateLimitData();
}

function updateLimitData() {
    limit_plan_text.innerHTML = plan_text;
    limit_date_text.innerHTML = date_text;

    response_limit_plan_text.innerHTML = plan_text;
    response_limit_date_text.innerHTML = date_text;
    
    if (basic_subscription){
        limit_perday_text.innerHTML = perday_text;
        response_limit_perday_text.innerHTML = perday_text;
    } else {
        inf_container.style.display = 'flex';
        resp_inf_container.style.display = 'flex';
    }
}

// функция для получения количества запросов у пользователя
function getRequestLimit(){
    // сервер даёт нам значения request_limit_counter и max_request_limit_counter здесь
    if (basic_subscription){
        request_limit_counter = 0;
        max_request_limit_counter = 4;
    } else {
        request_limit_counter = 0;
        max_request_limit_counter = 31;
    }

    updateRequestLimit();
}

function updateRequestLimit(){
    if (request_limit_counter<=max_request_limit_counter){
        if (basic_subscription){
            limit_text.textContent = request_limit_counter + ' OF ' + max_request_limit_counter + ' USED';
            response_limit_text.textContent = request_limit_counter + ' OF ' + max_request_limit_counter + ' USED';
        } else {
            limit_text.textContent = request_limit_counter + ' FROM ' + max_request_limit_counter + ' DAYS';
            response_limit_text.textContent = request_limit_counter + ' FROM ' + max_request_limit_counter + ' DAYS';
        }

        limit_bar.max = max_request_limit_counter;
        response_limit_bar.max = max_request_limit_counter;

        if (request_limit_counter>0){
            const interval = setInterval(() => {
                request_limit_value += 0.05;
                limit_bar.value = request_limit_value;
                response_limit_bar.value = request_limit_value;
                if (request_limit_value >= request_limit_counter) {
                    clearInterval(interval);
                }
            }, 10);
        }

        if (request_limit_counter>=max_request_limit_counter){
            limit_bar.classList.add('limit-bar-is-max');
            response_limit_bar.classList.add('limit-bar-is-max');
            limit_warning_text.innerHTML = 'Your request limit is exceeded';
            summarize_btn.disabled = true;
        }
        else {
            limit_bar.classList.remove('limit-bar-is-max');
            response_limit_bar.classList.remove('limit-bar-is-max');
            limit_warning_text.innerHTML = '';
        }
    }
}

function setTextContract() {
    if (text_contract_flag){
        backToStartDisplay();
    }
    else {
        switch_text_contract_btn.innerHTML = 'Upload file instead';
        upload_contract_heading.innerHTML = 'Paste contract text';
        text_element.style.display = 'flex';
        contract_element.style.display = 'none';
        // скрытие введённого текста
        text_input.value = '';
        // скрытие прогресс бара и возвращение его в исходное состояние
        recoveryProgressBarFile();

        text_contract_flag = 1;
    }
}

// Добавление: drag and drop на весь экран [
// Change color of the box if something being dragged
const dragging = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // drop_box.style = "border: 1px solid #e4dff2; border-radius: 8px;";
    if (window.getComputedStyle(summarize_container).display !== 'none'){
        drag_and_drop_area.style.display = 'flex';
        drop_first_part.style.display = 'flex';
        drop_second_part.style.display = 'none';
        drop_header_text.innerHTML = 'Upload  your contract';
    }
};
  
  // Back to initial stage when dragging ends
const dragLeft = () => {
    // drop_box.style = "border: none";
    drop_first_part.style.display = 'flex';
    drop_second_part.style.display = 'none';
    drop_header_text.innerHTML = 'Upload  your contract';
};

  // when something is dropped
const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    user_file = files[0];
    
    checkAndUploadFile(files[0]);

    // drop_box.style.border = 'none';
    drop_first_part.style.display = 'none';
    drop_second_part.style.display = 'flex';
    drop_header_text.innerHTML = 'Uploading contract';

    switch_text_contract_btn.innerHTML = 'Paste text instead';
    upload_contract_heading.innerHTML = 'Upload contract';
    text_element.style.display = 'none';

    text_contract_flag = 0;
};
// ]

drop_box.addEventListener('click', () => {
    file_input.click();
});

file_input.addEventListener('change', (e) => {
    const files = e.target.files;
    checkAndUploadFile(files[0]);
});

function checkAndUploadFile(file){
    if (checkFileType(file)){
        changeNameFile(file);
        changeProgressBarFile();
        upoadFiles(file);
    }
}

function upoadFiles(file){
        console.log("Dropped file:", file.name);

        let formData = new FormData();

        formData.append('file', file);
}

// Добавление: drag and drop на весь экран [
function changeProgressBarFile(){
    close_progress_bar_file_flag = 0;
    progress_file.style.display = 'flex';
    contract_element.style.display = 'none';

    let value = 0;
    const interval = setInterval(() => {
        value += 1;
        progress_bar_file.value = value;
        drop_progress_bar_file.value = value;
        if (value >= 100) {
            clearInterval(interval);
            progress_bar_file.classList.add('ready-progress-bar-file');
            progress_file_img.src='./imgs/ready-file.png';
            
            if(request_limit_counter < max_request_limit_counter){
                summarize_btn.disabled = false;
            }
            closeDragDrop();
        }
        if (close_progress_bar_file_flag){
            clearInterval(interval);
            recoveryProgressBarFile();
            closeDragDrop();
        }
    }, 15);
}

function changeNameFile(file){
    let curr_file_name = '';
    let curr_file_extension = '';

    if (window.getComputedStyle(summarize_container).display !== 'none') {
        // Получаем имя без расширения
        curr_file_name = file.name.split('.').slice(0, -1).join('.') + '.';
        file_name_upoad.innerHTML = curr_file_name;
        file_name_response.innerHTML = curr_file_name;
        file_name_drop.innerHTML = curr_file_name;

        // Получаем расширение файла
        curr_file_extension = file.name.split('.').pop();
        file_expansion_upoad.innerHTML = curr_file_extension;
        file_expansion_response.innerHTML = curr_file_extension;
        file_expansion_drop.innerHTML = curr_file_extension;
    }
}

function closeUploadFile() {
    recoveryProgressBarFile();
    contract_element.style.display = 'flex';
    closeDragDrop();
}

function recoveryProgressBarFile(){
    close_progress_bar_file_flag = 1;
    progress_file.style.display = 'none';
    progress_file_img.src='./imgs/uploading-file.png';
    progress_bar_file.classList.remove('ready-progress-bar-file');
    file_extensions.style.color='#808587';
    file_input.value='';

    summarize_btn.disabled = true;
}

function closeDragDrop() {
    drag_and_drop_area.style.display = 'none';
}

function checkFileType(file){
    if (/\.(docx|txt|pdf)$/i.test(file.name)) {
        return 1;
    } else {
        console.log('Файл не соответствует нужным расширениям');
        file_extensions.style.color='#ff1701';
        closeDragDrop();
        return 0;
    }
}

function clearFileName() {
    file_name_upoad.innerHTML = '';
    file_name_response.innerHTML = '';
    file_name_drop.innerHTML = '';

    file_expansion_upoad.innerHTML = 'text';
    file_expansion_response.innerHTML = 'text';
    file_expansion_drop.innerHTML = 'text';
}

function checkTextarea(){
    if (text_input.value.trim() !== '' && request_limit_counter < max_request_limit_counter) {
        summarize_btn.disabled = false;
        clearFileName();
    } else {
        summarize_btn.disabled = true;
    }
}
// ]

// функция срабатывающая при нажатии на кнопку summarize
function summarize(){
    // alert("Данные уходят в бэк");
    activateLoader();

    // сервер даёт нам значения полей response здесь
    getResponseData();

    // когда получен ответ от сервера
    setTimeout(function() { // имитируем задержку ответа сервера
        activateResponseDisplay();

        alignmentDividers();

        if (basic_subscription) request_limit_counter++;

        updateRequestLimit();
    }, 2000);
}

function getResponseData() {
    // GENERAL
    general_effective_date_text = "17.01.2019";
    general_date_text = "17.01.2019";
    general_type_text = "Commercial Space Lease Agreement";
    general_terms_text = "Rent of 1,190 euros per month per sqm plus applicable VAT, with rent escalation of 3% annually";
    general_financial_terms_text = "Fixed-term contract of 2 years with the option for Tenant to terminate prematurely under specific conditions";
    general_penalties_text = "0.1% delay penalty for each day of delay in payment";

    // FIRST PARTY
    first_party_name_text = "Gnnpowder Kinnisvara Oii";
    first_party_rights_text = "<li>Use of the leased commercial</li><li>Receiving rent payments</li>";
    first_party_responsibilities_text = "<li>Providing the leased premises</li><li>Provision of additional services (heating, water, electricity, technical security)</li><li>Handling other services based on Tenant's wishes</li><li>Maintenance of the building and facilities</li><li>Provision of security services</li>";

    // SECOND PARTY
    second_party_name_text = "Asia Drinks D&R OÜ";
    second_party_rights_text = "<li>Use of the leased commercial premises</li><li>Notification to terminate the contract prematurely (subject to conditions)</li>";
    second_party_responsibilities_text = "<li>Paying rent, Additional Services, and General Services fees</li><li>Complying with rules and procedures</li><li>Handling waste and packaging waste obligations</li><li>Returning the premises in the original condition at the end of the contract</li>";

    updateResponseData();
}

function updateResponseData() {
    // GENERAL
    general_effective_date.innerText = general_effective_date_text;
    general_date.innerText = general_date_text;
    general_type.innerText = general_type_text;
    general_terms.innerText = general_terms_text;
    general_financial_terms.innerText = general_financial_terms_text;
    general_penalties.innerText = general_penalties_text;

    // FIRST PARTY
    first_party_name.innerText = first_party_name_text;
    first_party_rights.innerHTML = first_party_rights_text;
    first_party_responsibilities.innerHTML = first_party_responsibilities_text;

    // SECOND PARTY
    second_party_name.innerText = second_party_name_text;
    second_party_rights.innerHTML = second_party_rights_text;
    second_party_responsibilities.innerHTML = second_party_responsibilities_text;

}

function subscriptionEnded() {
    let upload_contract_board = document.getElementById('upload-contract-board');
    let plan_expired_border = document.getElementById('plan-expired-border');

    upload_contract_board.style.display = 'none';
    plan_expired_border.style.display = 'flex';
    summarize_btn.style.display = 'none';
    limit_warning_text.innerHTML = 'Your subscription is expired';

    limit_text.innerHTML = '0 DAYS LEFT';
    limit_bar.classList.add('limit-bar-is-max');
    limit_bar.value=max_request_limit_counter;

    response_limit_text.innerHTML = '0 DAYS LEFT';
    response_limit_bar.classList.add('limit-bar-is-max');
    response_limit_bar.value=max_request_limit_counter;
}

function activateLoader() {
    summarize_container.style.display = 'none';
    history_container.style.display = 'none';
    loader_container.style.display ='flex';
}

function activateResponseDisplay() {
    loader_container.style.display ='none';
    file_downloaded_container.style.display = 'none';
    
    // обновление кнопки Download PDF
    response_container.style.display ='flex';
    download_file_btn.style.display = 'block';
    history_container.style.display = 'flex';
}

function backToSummarize() {
    response_container.style.display ='none';

    activateSummarizeDisplay();
}

function activateSummarizeDisplay() {
    summarize_container.style.display = 'flex'; 
    backToStartDisplay();
}

function backToStartDisplay() {
    recoveryProgressBarFile();
    switch_text_contract_btn.innerHTML = 'Paste text instead';
    upload_contract_heading.innerHTML = 'Upload contract';
    text_element.style.display = 'none';
    contract_element.style.display = 'flex';
    summarize_btn.disabled = true;

    text_contract_flag = 0;
}

function alignmentDividers() {
    let first_rights_divider = document.getElementById('first-parties-rights-divider');
    let first_responsibilities_divider = document.getElementById('first-parties-responsibilities-divider');

    let second_rights_divider = document.getElementById('second-parties-rights-divider');
    let second_responsibilities_divider = document.getElementById('second-parties-responsibilities-divider');

    if (first_rights_divider.clientHeight > second_rights_divider.clientHeight) {
        second_rights_divider.style.height = first_rights_divider.clientHeight + 'px';
    }

    if (first_responsibilities_divider.clientHeight > second_responsibilities_divider.clientHeight) {
        second_responsibilities_divider.style.height = first_responsibilities_divider.clientHeight + 'px';
    }

    if (second_rights_divider.clientHeight > first_rights_divider.clientHeight) {
        first_rights_divider.style.height = second_rights_divider.clientHeight + 'px';
    }

    if (second_responsibilities_divider.clientHeight > first_responsibilities_divider.clientHeight) {
        first_responsibilities_divider.style.height = second_responsibilities_divider.clientHeight + 'px';
    }
}

function downloadResponseFile() { 
    download_file_btn.style.display = 'none';
    file_downloaded_container.style.display = 'flex';

    setTimeout(function() {
        file_downloaded_container.style.display = 'none';
        download_file_btn.style.display = 'block';
    }, 3000);
}

function copyTextToClipboard() {
    let copy_btn = document.getElementById('copy-btn');

    let text = makeTextToClipboard();

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

    copy_btn.disabled = true;
    setTimeout(function() {
        copy_btn.disabled = false;
    }, 5000);
}

function makeTextToClipboard() {
    // GENERAL
    let text = 'GENERAL\nEffective date:\n'+general_effective_date_text+'\nDate:\n'+general_date_text+'\nContract type:\n'+general_type_text+'\nTerms:\n'+general_terms_text+
    '\nFinancial terms:\n'+general_financial_terms_text+'\nPenalties:\n'+general_penalties_text;

    // FIRST PARTY
    text += '\n\nFIRST PARTY\nName:\n'+first_party_name_text+'\nRights:\n'+first_party_rights_text.replace(/<li>/g, '- ').replace(/<\/li>/g, '\n')+'Responsibilities:\n'+
    first_party_responsibilities_text.replace(/<li>/g, '- ').replace(/<\/li>/g, '\n');

    // SECOND PARTY
    text += '\nSECOND PARTY\nName:\n'+second_party_name_text+'\nRights:\n'+second_party_rights_text.replace(/<li>/g, '- ').replace(/<\/li>/g, '\n')+'Responsibilities:\n'+
    second_party_responsibilities_text.replace(/<li>/g, '- ').replace(/<\/li>/g, '\n');

    return text;
}

function loaderError() {
    let error_container = document.getElementById("error-container");
    summarize_container.style.display = 'none';
    loader_container.style.display = 'none';
    history_container.style.display = 'none';
    error_container.style.display = 'flex';
}