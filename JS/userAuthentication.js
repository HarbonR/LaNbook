/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
let enterRegister = document.getElementById("enter-register"); //
//--------------------------------------------------
let formRegister = document.getElementById('form-register'); //
let buttonFormRegister = document.getElementById("button-form-register"); //
//--------------------------------------------------
let formEnter = document.getElementById("form-enter"); //
let buttonFormEnter = document.getElementById("button-form-enter"); //
let createAccount = document.getElementById("create-account"); //
//--------------------------------------------------
let menu = document.getElementById("menu"); //
let menuEnterRegister = document.getElementById('menu__enter-register'); //
//--------------------------------------------------
let body = document.getElementById("body"); //
let enterRegisterExitEnter = document.getElementById("enter-register_exit-enter"); //
let enterRegisterExitRegister = document.getElementById("enter-register_exit-register"); // 
//--------------------------------------------------
let user = document.getElementById("user"); //
let exit = document.getElementById("exit"); // 
//--------------------------------------------------
let emailInput = document.getElementById("email-input"); //
let passwordInput = document.getElementById("password-input"); // 
//--------------------------------------------------
let nameRegister = document.getElementById("name-register"); // Имя пользователя при регистрации
let emailRegister = document.getElementById("email-register"); // Емайл при регистрации
let passwordRegister = document.getElementById("password-register"); // Пароль при регистрации
let repeatPasswordRegister = document.getElementById("repeat-password-register"); // Повторный пароль при регистрации
/* ==================================================================================================== */
menuEnterRegister.onclick = function() // Функция для открытия формы входа
{
    closeBurger(); // Закрываем бургер
    menu.setAttribute("style","display:none;"); // Выключаем меню
    body.setAttribute("style","display:none;"); // Выключаем всё тело
    enterRegister.removeAttribute("style"); // Включаем форму входа
}
createAccount.onclick = function() // Функция для открытия формы регистрации
{
    formEnter.setAttribute("style","display:none;");
    formRegister.removeAttribute("style");
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
//==================================================
// Функция для проверки валидации формы регистрации
function validateFormForRegister()
{
    let isValid = true;
    let errorMessages = document.querySelectorAll(".error-message");
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
        nameRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        isValid = false;
    }

    if (emailRegister.value === "")
    {
        emailRegister.style.borderColor = "#8A666A";
        emailRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        isValid = false;
    }

    if (passwordRegister.value === "")
    {
        passwordRegister.style.borderColor = "#8A666A";
        passwordRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        isValid = false;
    }

    if (passwordRegister.value != repeatPasswordRegister.value) // Проверка на совпадение паролей
    {
        passwordRegister.style.borderColor = "#8A666A";
        repeatPasswordRegister.style.borderColor = "#8A666A";
        repeatPasswordRegister.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Пароли не совпадают</p>");
        isValid = false;
    }

    return isValid;
}
//--------------------------------------------------
buttonFormRegister.onclick = function(event)
{
    if(validateFormForRegister())
    {
        event.preventDefault();
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
        let formData = new FormData(document.getElementById("form-form-register"));
        xhr.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
        {
            if (xhr.readyState === 4 && xhr.status === 200) // Проверяем, что запрос завершен и успешен
            {
                let data = JSON.parse(xhr.responseText);
                if(data.answer == "Пользователь успешно зарегистрирован")
                {
                    formEnter.removeAttribute("style");
                    formRegister.setAttribute("style","display:none;");
                    document.getElementById("form-form-enter").insertAdjacentHTML("beforebegin", "<p class='error-message' style='margin: 0 0 10px 0; color: #333333;'>Пользователь успешно зарегистрирован</p>");
                }
                else if(data.answer == "Такой пользователь уже существует")
                {
                    emailRegister.style.borderColor = "#8A666A";
                    document.getElementById("form-form-register").insertAdjacentHTML("beforebegin", "<p class='error-message' style='margin: 0 0 10px 0; color: #333333;'>Такой пользователь уже существует</p>");
                }
                else
                {
                    console.log(data.answer);
                }
            }
        }
        xhr.open("POST", "../PHP/registration.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
        xhr.send(formData);
    }
    else
    {
        event.preventDefault();
    }
}
//==================================================
// Функция для проверки валидации формы входа
function validateFormForEnter()
{
    let isValid = true;
    let errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (errorMessage)
    {
        errorMessage.remove();
    });
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    if (emailInput.value === "")
    {
        emailInput.style.borderColor = "#8A666A";
        emailInput.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        isValid = false;
    }

    if (passwordInput.value === "")
    {
        passwordInput.style.borderColor = "#8A666A";
        passwordInput.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        isValid = false;
    }
    return isValid;
}
//--------------------------------------------------
buttonFormEnter.onclick = function(event)
{
    if(validateFormForEnter())
    {
        event.preventDefault();
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
        let formData = new FormData(document.getElementById("form-form-enter"));
        xhr.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
        {
            if (xhr.readyState === 4 && xhr.status === 200) // Проверяем, что запрос завершен и успешен
            {
                let data = JSON.parse(xhr.responseText);
                if(data.answer == "Правильный логин и пароль")
                {
                    menu__cards.click();
                    menu.removeAttribute("style");
                    body.removeAttribute("style");
                    enterRegister.setAttribute("style","display:none;");
                    exit.removeAttribute("style");
                    user.textContent = data.userName;
                    menuEnterRegister.style.display = "none";
                    menuPersonalArea.removeAttribute("style");
                }
                else if(data.answer == "Не правильный пароль")
                {
                    passwordInput.style.borderColor = "#8A666A";
                    document.getElementById("form-form-enter").insertAdjacentHTML("beforebegin", "<p class='error-message' style='margin: 0 0 10px 0; color: #333333;'>Не правильный пароль</p>");
                }
                else if(data.answer == "Не правильный логин и пароль")
                {
                    emailInput.style.borderColor = "#8A666A";
                    passwordInput.style.borderColor = "#8A666A";
                    document.getElementById("form-form-enter").insertAdjacentHTML("beforebegin", "<p class='error-message' style='margin: 0 0 10px 0; color: #333333;'>Не правильный логин и пароль</p>");
                }
                else
                {
                    console.log(data.answer);
                }
            }
        }
        xhr.open("POST", "../PHP/enter.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
        xhr.send(formData);
    }
    else
    {
        event.preventDefault();
    }
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
            user.removeAttribute("style");
            menuEnterRegister.style.display = "none";
            menuPersonalArea.removeAttribute("style");
            user.textContent = userData.userName;
        }
    }
};
xhrData.open("POST", "../PHP/registrationDate.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
xhrData.send(); // Отправляем запрос на сервер
//==================================================
// Функция для обработки кнопки выход
exit.onclick = function()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../PHP/exit.php'); // Установлен параметр async в true
    xhr.send();
    exit.style.display = "none";
    menuEnterRegister.removeAttribute("style");
    menuPersonalArea.style.display = "none";
    menu__cards.click();
}
//==================================================