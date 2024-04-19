/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
// Бургер
let burger = document.getElementById("burger");
let burgerOpen = document.getElementById("burger-open");
let burgerClose = document.getElementById("burger-close");
//--------------------------------------------------
// Вкладки меню
let menuCards = document.getElementById("menu__cards");
let menuTraining = document.getElementById("menu__training");
let menuPersonalArea = document.getElementById("menu__personal-area");
//--------------------------------------------------
// Вкладка тренировки
let bodyTraining = document.getElementById("body__training");
let wordsToPractice = document.getElementById("words-to-practice");
let dailyWorkout = document.getElementById("daily-workout");
let practiceWords = document.getElementById("practice-words");
let settings = document.getElementById("settings");
//--------------------------------------------------
// Вкладка личный кабинет
let bodyUser = document.getElementById("body__user");
let dictionary = document.getElementById("dictionary");
let achievements = document.getElementById("achievements");
let statistics = document.getElementById("statistics");
//--------------------------------------------------
// Массивы активных элементов
let menuActive = menu.getElementsByClassName("menu_active");
let svgActive = menu.getElementsByClassName("svg_active");
let textActive = menu.getElementsByClassName("text_active");
let tabTrainingActive = bodyTraining.getElementsByClassName("tab_active");
let tabUserActive = bodyUser.getElementsByClassName("tab_active");
/* ==================================================================================================== */
/* ---------------------------------------------Вкладки меню------------------------------------------- */
// Вкладка карточки
menuCards.onclick = function()
{
    closeBurger();
    bodyTraining.setAttribute("style", "display: none;");
    bodyUser.setAttribute("style", "display: none;");
    if(document.getElementById("title-category")) // Удаление названия категории
    {
        document.getElementById("title-category").remove();
    }
    document.getElementById("body__container").style.paddingTop = "0";
    for (let i = 0; i < menuActive.length; i++)
    {
        menuActive[i].classList.remove("menu_active");
        svgActive[i].classList.remove("svg_active");
        textActive[i].classList.remove("text_active");
    }
    menuCards.classList.add("menu_active");
    menuCards.getElementsByTagName("svg")[0].classList.add("svg_active");
    menuCards.getElementsByClassName("menu__text")[0].classList.add("text_active");
    getCategories();
};
//--------------------------------------------------
// Вкладка тренировки
menuTraining.onclick = function()
{
    closeBurger();
    bodyUser.setAttribute("style", "display: none;");
    bodyTraining.removeAttribute("style");
    if(document.getElementById("title-category")) // Удаление названия категории
    {
        document.getElementById("title-category").remove();
    }
    document.getElementById("body__container").style.paddingTop = "0";
    for (let i = 0; i < menuActive.length; i++)
    {
        menuActive[i].classList.remove("menu_active");
        svgActive[i].classList.remove("svg_active");
        textActive[i].classList.remove("text_active");
    }
    menuTraining.classList.add("menu_active");
    menuTraining.getElementsByTagName("svg")[0].classList.add("svg_active");
    menuTraining.getElementsByClassName("menu__text")[0].classList.add("text_active");
    wordsToPractice.click();
}
//--------------------------------------------------
// Вкладка личный кабинет
menuPersonalArea.onclick = function()
{
    closeBurger();
    bodyTraining.setAttribute("style", "display: none;");
    bodyUser.removeAttribute("style");
    if(document.getElementById("title-category")) // Удаление названия категории
    {
        document.getElementById("title-category").remove();
    }
    document.getElementById("body__container").style.paddingTop = "0";
    for (let i = 0; i < menuActive.length; i++)
    {
        menuActive[i].classList.remove("menu_active");
        svgActive[i].classList.remove("svg_active");
        textActive[i].classList.remove("text_active");
    }
    menuPersonalArea.classList.add("menu_active");
    menuPersonalArea.getElementsByTagName("svg")[0].classList.add("svg_active");
    menuPersonalArea.getElementsByClassName("menu__text")[0].classList.add("text_active");
    dictionary.click();
}
/* ==================================================================================================== */
/* ---------------------------------------------Вкладки тела------------------------------------------- */
// Вкладка тренировки
wordsToPractice.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    wordsToPractice.classList.add("tab_active");
    getCards("../PHP/trainCards.php", "Train");
}
// Функция для создания окончания слов для интервального повторения
function getEndWordsDailyWorkout()
{
    document.getElementById("body__container").innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyContainer = document.getElementById("body__container");
    let dailyWorkout = document.createElement("div");
    dailyWorkout.id = "dailyWorkout"
    let endWords = document.createElement("div");
    endWords.textContent = "Слов для повторения больше нет";
    dailyWorkout.appendChild(endWords);
    bodyContainer.appendChild(dailyWorkout);
}
// Функция для изменения значения счетчика слова
function сhangeDailyWorkout(cardId, counter, maxCounter, sign)
{
    let minute = 0;
    if(sign == "+")
    {
        switch(Number(counter))
        {
            case 1: minute = 20; break; // 20 минут
            case 2: minute = 60; break; // 1 час
            case 3: minute = 1440; break; // 24 часа
            case 4: minute = 2880; break; // 2 дня
            case 5: minute = 10080; break; // 1 неделя
            case 6: minute = 20160; break; // 2 недели
            case 7: minute = 43200; break; // 1 месяц
            case 8: minute = 129600; break; // 3 месяца
            case 9: minute = 259200; break; // 6 месяцев
        }
        counter++;
        if (counter > maxCounter)
            counter = maxCounter;
    }
    else if(sign == "-")
    {
        counter--;
        if(counter < 1)
            counter = 1;
        switch(counter)
        {
            case 1: minute = 20; break; // 20 минут
            case 2: minute = 60; break; // 1 час
            case 3: minute = 1440; break; // 24 часа
            case 4: minute = 2880; break; // 2 дня
            case 5: minute = 10080; break; // 1 неделя
            case 6: minute = 20160; break; // 2 недели
            case 7: minute = 43200; break; // 1 месяц
            case 8: minute = 129600; break; // 3 месяца
            case 9: minute = 259200; break; // 6 месяцев
        }
    }
    let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
    xhr.open("POST", "../PHP/сhangeDailyWorkout.php", true); 
    // Отправляем запрос на сервер
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhr.send("counter=" + encodeURIComponent(counter) + "&cardId=" + encodeURIComponent(cardId) + "&minute=" + encodeURIComponent(minute));
}
// Функция для создания подвкладки "Интервальное повторение"
function createDailyWorkout(jsonData)
{
    let dailyWorkout = document.createElement("div");
    dailyWorkout.id = "dailyWorkout"
    let counter = document.createElement("div");
    counter.id = "counter"
    let iterator = 0;
    counter.textContent = iterator + "/" + jsonData.length;
    let nativeWord = document.createElement("div");
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[0].wordsInNativeLanguage;
    let targetWord = document.createElement("input");
    targetWord.id = "targetWord";
    targetWord.name = "targetWord";
    targetWord.autocomplete = "Off";
    targetWord.textContent = "";
    let incorrectAnswer = document.createElement("div");
    incorrectAnswer.id = "incorrectAnswer";
    let correctAnswer = document.createElement("div");
    correctAnswer.id = "correctAnswer";
    let buttonFurther = document.createElement("button");
    buttonFurther.textContent = "Проверить";
    let variableAnswer = false;
    buttonFurther.onclick = function()
    {
        if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase() && variableAnswer)
        {
            iterator++;
            buttonFurther.textContent = "Проверить";
            counter.textContent = iterator + "/" + jsonData.length;
            targetWord.value = "";
            incorrectAnswer.textContent = "";
            incorrectAnswer.style.display = "none";
            correctAnswer.textContent = "";
            correctAnswer.style.display = "none";
            variableAnswer = false;
            targetWord.style.border = "none";
            if(iterator != jsonData.length)
                nativeWord.textContent = jsonData[iterator].wordsInNativeLanguage;
            else
                getEndWordsDailyWorkout();
        }
        else if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase())
        {
            variableAnswer = true;
            targetWord.style.border = "1px solid #718A66";
            correctAnswer.style.display = "block";
            correctAnswer.textContent = jsonData[iterator].wordsInTheTargetLanguage;
            buttonFurther.textContent = "Далее";
            сhangeDailyWorkout(jsonData[iterator].cardId, jsonData[iterator].counter, jsonData[iterator].maxCounter, "+");
        }
        else if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() != targetWord.value.toUpperCase() && !variableAnswer)
        {
            variableAnswer = true
            targetWord.style.border = "1px solid #8A666A";
            incorrectAnswer.style.display = "block";
            incorrectAnswer.textContent = targetWord.value;
            correctAnswer.style.display = "block";
            correctAnswer.textContent = jsonData[iterator].wordsInTheTargetLanguage;
            buttonFurther.textContent = "Далее";
            сhangeDailyWorkout(jsonData[iterator].cardId, jsonData[iterator].counter, jsonData[iterator].maxCounter, "-");
        }
        else
        {
            iterator++;
            buttonFurther.textContent = "Проверить";
            variableAnswer = false
            counter.textContent = iterator + "/" + jsonData.length;
            targetWord.value = "";
            incorrectAnswer.textContent = "";
            incorrectAnswer.style.display = "none";
            correctAnswer.textContent = "";
            correctAnswer.style.display = "none";
            targetWord.style.border = "none";
            if(iterator != jsonData.length)
                nativeWord.textContent = jsonData[iterator].wordsInNativeLanguage;
            else
                getEndWordsDailyWorkout();
        }
    }
    buttonFurther.id = "buttonFurther";
    dailyWorkout.appendChild(counter);
    dailyWorkout.appendChild(nativeWord);
    dailyWorkout.appendChild(targetWord);
    dailyWorkout.appendChild(incorrectAnswer);
    dailyWorkout.appendChild(correctAnswer);
    dailyWorkout.appendChild(buttonFurther);
    return dailyWorkout;
}
// Функция для получения и отображения подвкладки "Интервальное повторение"
function getDailyWorkout()
{
    document.getElementById("body__container").innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyContainer = document.getElementById("body__container");
    let xhrDailyWorkout = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrDailyWorkout.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта xhr
    {
        if (xhrDailyWorkout.readyState === 4 && xhrDailyWorkout.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrDailyWorkout.responseText); // Разбираем JSON-данные
            if(jsonData.length > 0)
            {
                let dailyWorkout = createDailyWorkout(jsonData);
                bodyContainer.appendChild(dailyWorkout);
            }
            else
                getEndWordsDailyWorkout();
        }
    }
    xhrDailyWorkout.open("POST", "../PHP/dailyWorkout.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса
    xhrDailyWorkout.send(); // Отправляем запрос на сервер
}
dailyWorkout.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    dailyWorkout.classList.add("tab_active");
    getDailyWorkout();
}
practiceWords.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    practiceWords.classList.add("tab_active");
}
settings.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    settings.classList.add("tab_active");
    getSettingCards();
}
//--------------------------------------------------
// Вкладка личный кабинет
dictionary.onclick = function()
{
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    dictionary.classList.add("tab_active");
    getCards("../PHP/userCards.php", "User");
}
achievements.onclick = function()
{
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    achievements.classList.add("tab_active");
}
statistics.onclick = function()
{
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    statistics.classList.add("tab_active");
}
/* ==================================================================================================== */
// Функция срабатывает при загрузке страницы
window.addEventListener('load', function()
{
    menuCards.click();
});
//==================================================
// Функция для открытия бургера
function openBurger()
{
    bodyTraining.style.bottom = "30%";
    bodyUser.style.bottom = "30%";
    burgerOpen.setAttribute("style", "display: none;");
    burgerClose.removeAttribute("style");
    document.getElementById("exit").style.bottom = "60%";
    document.getElementById("view-cards").style.bottom = "140px";
    document.getElementById("backgroundBurger").style.bottom = "130px"
}
function closeBurger()
{
    bodyTraining.style.bottom = "-500px";
    bodyUser.style.bottom = "-500px";
    burgerOpen.removeAttribute("style");
    burgerClose.setAttribute("style", "display: none;");
    document.getElementById("exit").style.bottom = "-500px";
    document.getElementById("view-cards").style.bottom = "-500px";
    document.getElementById("backgroundBurger").style.bottom = "-500px"
}
// Для открытия и закрытия бургера
burger.onclick = function()
{
    if (bodyTraining.style.bottom == "30%")
    {
        closeBurger();   
    }
    else
    {
        openBurger();
    }
}
//==================================================