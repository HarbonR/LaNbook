//==================================================
// Создаём переменные для блока кода
let enterRegister = document.getElementById("enter-register");
let formRegister = document.getElementById('form-register');
let formEnter = document.getElementById("form-enter");
let createAccount = document.getElementById("create-account");
let menu = document.getElementById("menu");
let menu__personalArea = document.getElementById('menu__personal-area');
let body = document.getElementById("body");
let enterRegisterExitEnter = document.getElementById("enter-register_exit-enter");
let enterRegisterExitRegister = document.getElementById("enter-register_exit-register");
let user = document.getElementById("user");
let exit = document.getElementById("exit");
//--------------------------------------------------
menu__personalArea.onclick = function() // Функция для появления форм вход \ регистрация
{
    menu.setAttribute("style","display:none;");
    body.setAttribute("style","display:none;");
    enterRegister.removeAttribute("style");
}
enterRegisterExitEnter.onclick = function() // Функция для выхода из формы входа
{
    menu.removeAttribute("style");
    body.removeAttribute("style");
    enterRegister.setAttribute("style","display:none;");
}
enterRegisterExitRegister.onclick = function() // Функция для выхода из формы регистрации
{
    formEnter.removeAttribute("style");
    formRegister.setAttribute("style","display:none;");
}
createAccount.onclick = function()
{
    formEnter.setAttribute("style","display:none;");
    formRegister.removeAttribute("style");
}
//==================================================
// Функция для проверки валидации формы регистрации
function validateFormForRegister()
{
    var nameRegister = document.getElementById("name-register");
    var emailRegister = document.getElementById("email-register");
    var passwordRegister = document.getElementById("password-register");
    var isValid = true;
    var errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (errorMessage)
    {
        errorMessage.remove();
    });
    nameRegister.style.borderColor = "";
    emailRegister.style.borderColor = "";
    passwordRegister.style.borderColor = "";

    if (nameRegister.value === "")
    {
        nameRegister.style.borderColor = "#8A666A";
        nameRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0'>Поле не заполнено</p>");
        isValid = false;
    }

    if (emailRegister.value === "")
    {
        emailRegister.style.borderColor = "#8A666A";
        emailRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0'>Поле не заполнено</p>");
        isValid = false;
    }

    if (passwordRegister.value === "")
    {
        passwordRegister.style.borderColor = "#8A666A";
        passwordRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0'>Поле не заполнено</p>");
        isValid = false;
    }
    return isValid;
}
//==================================================
// Функция для проверки валидации формы входа
function validateFormForEnter()
{
    var emailInput = document.getElementById("email-input");
    var passwordInput = document.getElementById("password-input");
    var isValid = true;
    var errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (errorMessage)
    {
        errorMessage.remove();
    });
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    if (emailInput.value === "")
    {
        emailInput.style.borderColor = "#8A666A";
        emailInput.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0'>Поле не заполнено</p>");
        isValid = false;
    }

    if (passwordInput.value === "")
    {
        passwordInput.style.borderColor = "#8A666A";
        passwordInput.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0'>Поле не заполнено</p>");
        isValid = false;
    }
    return isValid;
}
//==================================================
// Функция для отправки данных о пользователе
let xhrData = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
xhrData.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
{
    if (xhrData.readyState === 4 && xhrData.status === 200) // Проверяем, что запрос завершен и успешен
    {
        if (xhrData.responseText)
        {
            let userData = JSON.parse(xhrData.responseText);
            exit.removeAttribute("style");
            user.textContent = userData[0];
        }
    }
};
xhrData.open("POST", "../PHP/registrationDate.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
xhrData.send(); // Отправляем запрос на сервер
//==================================================
// Функция для обработки кнопки выход
exit.onclick = function()
{
    exit.style.display = "none";
    menu__cards.click();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../PHP/exit.php', true); // Установлен параметр async в true
    xhr.send();
}
//==================================================