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
let community_menu_ul = document.getElementById('community-menu-ul');
let user_email = document.getElementById('user-email');

let limit_plan_text = document.getElementById('limit-plan-text');
let limit_perday_text = document.getElementById('limit-perday-text');
let limit_date_text = document.getElementById('limit-date-text');

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

// файл загруженный пользователем
let user_file;

// Ссылки на внешние ресурсы из comunity
let linksArray = [
    { title: 'Instagram', url: 'https://example.com/link1' },
    { title: 'GitHub', url: 'https://example.com/link2' },
    { title: 'X/Twitter', url: 'https://example.com/link3' },
    { title: 'Telegram', url: 'https://example.com/link4' },
    { title: 'Medium', url: 'https://example.com/link5' }
];

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
    getRequestLimit();
    getLimitData();

    updateComunityLinks();

    if(subscription_ended_flag) subscriptionEnded();
});

// функция для получения информации о подписке у пользователя
function getLimitData() {
    // сервер даёт нам значения plan_text, perday_text, date_text здесь, также здесь определяется subscription_ended_flag
    plan_text = "Light Subscription";
    perday_text = "4 per day";
    date_text = "01.02.2024";

    updateLimitData();
}

// функция для получения количества запросов у пользователя
function getRequestLimit(){
    // сервер даёт нам значения request_limit_counter и max_request_limit_counter здесь
    request_limit_counter = 0;
    max_request_limit_counter = 4;

    updateRequestLimit();
}

function updateComunityLinks() {
    linksArray.forEach(function(link) {

        let listItem = document.createElement('li');
      
        let linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.title;
      
        listItem.appendChild(linkElement);
      
        community_menu_ul.appendChild(listItem);
    });
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

// Change color of the box if something being dragged
const dragging = (e) => {
    e.preventDefault();
    e.stopPropagation();
    drop_box.style = "border: 1px solid #e4dff2; border-radius: 8px;";
};
  
  // Back to initial stage when dragging ends
const dragLeft = () => {
    drop_box.style = "border: none";
};

  // when something is dropped
const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    user_file = files[0];
    
    checkAndUploadFile(files[0]);

    drop_box.style.border = 'none';
};

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

function changeProgressBarFile(){
    close_progress_bar_file_flag = 0;
    progress_file.style.display = 'flex';
    contract_element.style.display = 'none';

    let value = 0;
    const interval = setInterval(() => {
        value += 1;
        progress_bar_file.value = value;
        if (value >= 100) {
            clearInterval(interval);
            progress_bar_file.classList.add('ready-progress-bar-file');
            progress_file_img.src='./imgs/ready-file.png';
            
            if(request_limit_counter < max_request_limit_counter){
                summarize_btn.disabled = false;
            }
        }
        if (close_progress_bar_file_flag){
            clearInterval(interval);
            recoveryProgressBarFile();
        }
    }, 10);
}

function changeNameFile(file){
    let file_name_upoad = document.getElementById('upload-file-name');
    let file_expansion_upoad = document.getElementById('upload-file-expansion');
    let file_name_response = document.getElementById('response-file-name');
    let file_expansion_response = document.getElementById('response-file-expansion');

    let curr_file_name = '';
    let curr_file_extension = '';

    // Получаем имя без расширения
    curr_file_name = file.name.split('.').slice(0, -1).join('.') + '.';
    file_name_upoad.innerHTML = curr_file_name;
    file_name_response.innerHTML = curr_file_name;

    // Получаем расширение файла
    curr_file_extension = file.name.split('.').pop();
    file_expansion_upoad.innerHTML = curr_file_extension;
    file_expansion_response.innerHTML = curr_file_extension;
}

function closeUploadFile() {
    recoveryProgressBarFile();
    contract_element.style.display = 'flex';
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

function checkFileType(file){
    if (/\.(docx|txt|pdf)$/i.test(file.name)) {
        return 1;
    } else {
        console.log('Файл не соответствует нужным расширениям');
        file_extensions.style.color='#ff1701';
        return 0;
    }
}

function checkTextarea(){
    if (text_input.value.trim() !== '' && request_limit_counter < max_request_limit_counter) {
        summarize_btn.disabled = false;
    } else {
        summarize_btn.disabled = true;
    }
}

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

        request_limit_counter++;
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

function updateRequestLimit(){
    if (request_limit_counter<=max_request_limit_counter){
        limit_text.textContent = request_limit_counter + ' OF ' + max_request_limit_counter + ' USED';
        response_limit_text.textContent = request_limit_counter + ' OF ' + max_request_limit_counter + ' USED';

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

function updateLimitData() {
    limit_plan_text.innerHTML = plan_text;
    limit_perday_text.innerHTML = perday_text;
    limit_date_text.innerHTML = date_text;

    response_limit_plan_text.innerHTML = plan_text;
    response_limit_perday_text.innerHTML = perday_text;
    response_limit_date_text.innerHTML = date_text;
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
    loader_container.style.display ='flex';
}

function activateResponseDisplay() {
    loader_container.style.display ='none';
    file_downloaded_container.style.display = 'none';
    
    // обновление кнопки Download PDF
    response_container.style.display ='flex';
    download_file_btn.style.display = 'block';
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

    // // Создаем объект Blob с содержимым файла
    // const blob = new Blob([user_file], { type: user_file.type });

    // // Создаем элемент <a> для скачивания файла
    // const a = document.createElement('a');
    // a.href = URL.createObjectURL(blob);
    // a.download = user_file.name;

    // // Добавляем элемент <a> в документ и эмулируем клик для начала загрузки
    // document.body.appendChild(a);
    // a.click();

    // // Удаляем элемент <a> после завершения скачивания
    // document.body.removeChild(a);

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

function switchMenuPoint(point){
    let menu_point = document.getElementsByClassName('menu-point');
    let active_rectangle = document.getElementsByClassName('active-rectangle');
    let menu_icon = document.getElementsByClassName('menu-icon');
    
    menu_point[curr_menu_pont].classList.remove('active-menu-point');
    menu_point[point].classList.add('active-menu-point');

    active_rectangle[curr_menu_pont].style.display = "none";
    active_rectangle[point].style.display = "flex";

    menu_icon[curr_menu_pont].src = "./imgs/menu-icons/menu"+curr_menu_pont+".png";
    menu_icon[point].src = "./imgs/menu-icons/active-menu"+point+".png";
    
    setTimeout(function() { // задержка нужня для подгрузки иконки другого цвета в пункт меню
        switch (point) {
            case 0:
                window.location.href = "index.html";
                break;
            case 1:
                window.location.href = "history.html";
                break;
            case 2:
                window.location.href = "payment.html";
                break;
            case 3:
                window.location.href = "my_plan.html";
                break;
            case 4:
                dropDownMenu();
                break;
            default:
                window.location.href = "index.html";
        }
    }, 100);

    curr_menu_pont = point;
}

function dropDownMenu() {
    let ul_height = 0;

    for (let _ of community_menu_ul.children) ul_height += 27;
    community_menu_ul.style.height = ul_height + 'px';

    function clickHandler() {
        community_menu_ul.style.height = '0px';
        document.removeEventListener('click', clickHandler);
    }

    document.addEventListener('click', clickHandler);
}

function activateEmailMenu() {  
   let email_menu = document.getElementById("email-menu");

   email_menu.style.display = "block";
 
   // обработчик события для скрытия меню при клике на любое место в документе
   function hideEmailMenu(event) {
     // Проверяем, был ли клик вне элемента "user-email" и "email-menu"
        if (
            event.target.id !== "user-email" &&
            event.target.id !== "email-menu"
        ) {
            email_menu.style.display = "none";
            // Удаляем обработчик события после первого клика вне меню
            document.removeEventListener("click", hideEmailMenu);
        }
   }
 
   document.addEventListener("click", hideEmailMenu);
}