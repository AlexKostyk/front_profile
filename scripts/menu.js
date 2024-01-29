let community_menu_ul = document.getElementById('community-menu-ul');
let user_email = document.getElementById('user-email');

// Ссылки на внешние ресурсы из comunity
let linksArray = [
    { title: 'Instagram', url: 'https://example.com/link1' },
    { title: 'GitHub', url: 'https://example.com/link2' },
    { title: 'X/Twitter', url: 'https://example.com/link3' },
    { title: 'Telegram', url: 'https://example.com/link4' },
    { title: 'Medium', url: 'https://example.com/link5' }
];

document.addEventListener('DOMContentLoaded', function() {
    updateComunityLinks();
});

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

// Изменено 29.01 [

function dropDownMenu() {
    let ul_height = 0;
    let community_menu_ul = document.getElementById("community-menu-ul");

    for (let _ of community_menu_ul.children) ul_height += 27;

    // Проверяем текущую высоту и устанавливаем соответствующее значение
    if (community_menu_ul.style.height === '' || community_menu_ul.style.height === '0px') {
        community_menu_ul.style.height = ul_height + 'px';

        // обработчик события для скрытия меню при клике на любое место в документе
        function clickHandler(event) {
            if (
                event.target.id !== "community-menu-icon" &&
                event.target.id !== "community-menu-text" &&
                event.target.id !== "community-menu-point"
            ) {
                community_menu_ul.style.height = '0px';
                document.removeEventListener('click', clickHandler);
            }
        }

        document.addEventListener('click', clickHandler);
    } else {
        community_menu_ul.style.height = '0px';
    }
}

// ]

// Изменено 29.01 [

function activateEmailMenu() {  
    let email_menu = document.getElementById("email-menu");

    if (email_menu.style.display === 'none') {
        email_menu.style.display = 'block';
 
        // обработчик события для скрытия меню при клике на любое место в документе
        function hideEmailMenu(event) {
            if (
                event.target.id !== "user-email" &&
                event.target.id !== "email-menu"
            ) {
                email_menu.style.display = 'none';
                // Удаляем обработчик события после каждого клика вне меню
                document.removeEventListener("click", hideEmailMenu);
            }
        }
 
        document.addEventListener("click", hideEmailMenu);
    } else {
        email_menu.style.display = 'none';
    }
}

// ]