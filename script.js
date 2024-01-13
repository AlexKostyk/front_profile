let drop_box = document.getElementById('load-contract-container');
let file_input = document.getElementById('file-input');
let contract_element = document.getElementById('load-contract-container');
let close_file = document.getElementById('close-file-icon');
let progress_file = document.getElementById('progress-container');
let progress_bar_file = document.getElementsByClassName('uploading-progress-bar-file')[0];
let progress_file_img = document.getElementById('file-icon');

let text_contract_flag = 0;

function setTextContract() {
    let btn = document.getElementById('btn-text-contract');
    let text_element = document.getElementById('load-text-container');
    let upload_contract_heading = document.getElementById('upload-contract-heading');
    let text_input = document.getElementById('text-input');

    if (text_contract_flag){
        btn.innerHTML = 'Paste text instead';
        upload_contract_heading.innerHTML = 'Upload contract';
        text_element.style.display = 'none';
        contract_element.style.display = 'flex';
        text_contract_flag = 0;
    }
    else {
        btn.innerHTML = 'Upload contract instead';
        text_input.value = '';
        upload_contract_heading.innerHTML = 'Paste contract text';
        text_element.style.display = 'flex';
        contract_element.style.display = 'none';
        // скрытие прогресс бара и возвращение его в исходное состояние
        progress_file.style.display = 'none';
        progress_file_img.src='./imgs/uploading-file.png';
        progress_bar_file.classList.remove('ready-progress-bar-file');
        file_input.value='';
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
    changeNameFile(files[0]);
    changeProgressBarFile();
    upoadFiles(files);

    drop_box.style.border = 'none';
};

drop_box.addEventListener('click', () => {
    file_input.click();
});

file_input.addEventListener('change', (e) => {
    const files = e.target.files;
    changeNameFile(files[0]);
    changeProgressBarFile();
    upoadFiles(files);
});

function upoadFiles(files){
    if (files.length > 0) {
        const file = files[0];
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
}

function changeProgressBarFile(){
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
        }
    }, 10);
}

function changeNameFile(file){
    let file_name = document.getElementById('upload_file_name');
    file_name.innerHTML = file.name;
}

close_file.addEventListener('click', () => {
    progress_file.style.display = 'none';
    contract_element.style.display = 'flex';
    progress_bar_file.classList.remove('ready-progress-bar-file');
    progress_file_img.src='./imgs/uploading-file.png';
    file_input.value='';
});