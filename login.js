function checkEmail() {
    let emailInput = document.getElementById('email-input');
    let emailError = document.getElementById('email-error');
    
    // Регулярное выражение для проверки формата email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value === '') {
        emailError.innerHTML = "The field cannot be empty";
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.innerHTML = "Please enter the right format email such sample@gmail.com";
    } else {
        emailError.innerHTML = "";
        sendEmailToServer(emailInput.value);
        showSuccessfulLogin();
    }
}

function showSuccessfulLogin() {
    let login_container = document.getElementById('login-container');
    let successful_container = document.getElementById('successful-login-container');

    login_container.style.display = 'none';
    successful_container.style.display = 'flex';
}

function openGmail() {
    window.open('https://mail.google.com', '_blank');
}

function sendEmailToServer(email) {
    const apiUrl = 'https://example.com/api/send-email';

    // ключ API, если он необходим
    const apiKey = 'your-api-key';

    const data = {
        email: email,
        apiKey: apiKey
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}