let drop_box = document.getElementById('load-contract-container');
let file_input = document.getElementById('file-input');
let contract_element = document.getElementById('load-contract-container');
let close_file = document.getElementById('close-file-icon');
let progress_file = document.getElementById('progress-container');
let progress_bar_file = document.getElementsByClassName('uploading-progress-bar-file')[0];
let progress_file_img = document.getElementById('file-icon');
let file_extensions = document.getElementById('file-extensions');
let summarize_btn = document.getElementById('summarize-btn');
let text_input = document.getElementById('text-input');
let limit_warning_text = document.getElementById('limit-warning-text');

let limit_plan_text = document.getElementById('limit-plan-text');
let limit_perday_text = document.getElementById('limit-perday-text');
let limit_date_text = document.getElementById('limit-date-text');

let text_contract_flag = 0;
let close_progress_bar_file_flag = 0;

// счётчик лимитов запросов
let request_limit_counter = 0;
let max_request_limit_counter = 4;

let request_limit_value = 0; // для внутренней логики

// данные для лимитов
let plan_text = "Light Subscription";
let perday_text = "4 per day";
let date_text = "01.02.2024";


document.addEventListener('DOMContentLoaded', function() {
    getRequestLimit();
    getLimitData();
});

function setTextContract() {
    let btn = document.getElementById('btn-text-contract');
    let text_element = document.getElementById('load-text-container');
    let upload_contract_heading = document.getElementById('upload-contract-heading');

    if (text_contract_flag){
        btn.innerHTML = 'Paste text instead';
        upload_contract_heading.innerHTML = 'Upload contract';
        text_element.style.display = 'none';
        contract_element.style.display = 'flex';
        summarize_btn.disabled = true;

        text_contract_flag = 0;
    }
    else {
        btn.innerHTML = 'Upload contract instead';
        text_input.value = '';
        upload_contract_heading.innerHTML = 'Paste contract text';
        text_element.style.display = 'flex';
        contract_element.style.display = 'none';
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

        // загрузка файла на сервер с использованием Fetch API
        const formData = new FormData();
        formData.append('file', file);

        // fetch('url_обработчика', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('File uploaded successfully:', data);
        // })
        // .catch(error => {
        //     console.error('Error uploading file:', error);
        // });
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

            summarize_btn.disabled = false;
        }
        if (close_progress_bar_file_flag){
            clearInterval(interval);
            recoveryProgressBarFile();
        }
    }, 10);
}

function changeNameFile(file){
    let file_name = document.getElementById('upload_file_name');
    file_name.innerHTML = file.name;
}

close_file.addEventListener('click', () => {
    recoveryProgressBarFile();
    contract_element.style.display = 'flex';
});

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
    if (text_input.value.trim() !== '') {
        summarize_btn.disabled = false;
    } else {
        summarize_btn.disabled = true;
    }
}

// функция срабатывающая при нажатии на кнопку summarize
function summarize(){
    // alert("Данные уходят в бэк");
    request_limit_counter++;
    updateRequestLimit();
}

// функция для получения количества запросов у пользователя
function getRequestLimit(){
    // сервер даёт нам значения request_limit_counter и max_request_limit_counter здесь
    updateRequestLimit();
}

function updateRequestLimit(){
    if (request_limit_counter<=max_request_limit_counter){
        let limit_text = document.getElementById('request-limit-text');
        limit_text.textContent = request_limit_counter + ' OF ' + max_request_limit_counter + ' USED';

        let limit_bar = document.getElementById('request-limit-bar');
        limit_bar.max = max_request_limit_counter;

        if (request_limit_counter>0){
            const interval = setInterval(() => {
                request_limit_value += 0.05;
                limit_bar.value = request_limit_value;
                if (request_limit_value >= request_limit_counter) {
                    clearInterval(interval);
                }
            }, 10);
        }

        if (request_limit_counter>=max_request_limit_counter){
            limit_bar.classList.add('limit-bar-is-max');
            limit_warning_text.innerHTML = 'Your request limit is exceeded';
        }
        else {
            limit_bar.classList.remove('limit-bar-is-max');
            limit_warning_text.innerHTML = '';
        }
    }
}

function getLimitData() {
    // сервер даёт нам значения plan_text, perday_text, date_text здесь
    updateLimitData();
}

function updateLimitData() {
    limit_plan_text.innerHTML = plan_text;
    limit_perday_text.innerHTML = perday_text;
    limit_date_text.innerHTML = date_text;
}