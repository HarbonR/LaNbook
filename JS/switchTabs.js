/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
// let burger = document.getElementById("burger");
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
dailyWorkout.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    dailyWorkout.classList.add("tab_active");
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
// Для открытия и закрытия бургера
// burger.onclick = function()
// {
//     if (header.style.top == "111px")
//         header.style.top = "-1000px";
//     else
//         header.style.top = "111px";
// }