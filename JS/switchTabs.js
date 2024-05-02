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
//let exerciseDictionary;
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
function сhangeDailyWorkout(cardId, counter, maxCounter, sign, level)
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
    if(1 <= counter && counter <= 3)
        level = 1;
    else if (4 <= counter && counter <= 6)
        level = 2;
    else
        level = 3;
    let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
    xhr.open("POST", "../PHP/сhangeDailyWorkout.php", true); 
    // Отправляем запрос на сервер
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhr.send("counter=" + encodeURIComponent(counter) + "&cardId=" + encodeURIComponent(cardId) + "&minute=" + encodeURIComponent(minute) + "&level=" + encodeURIComponent(level));
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
            сhangeDailyWorkout(jsonData[iterator].cardId, jsonData[iterator].counter, jsonData[iterator].maxCounter, "+", jsonData[iterator].level);
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
// Создаём словарь упражнений и добавляем в него функцию для создания тренировки "Напиши слово"
let exerciseDictionary = {  "Напиши слово" : function createWriteTheWord(jsonData, wordIterator, showPicture)
{
    let writeTheWord = document.createElement("div");
    writeTheWord.id = "writeTheWord"
    let picture = document.createElement('img');
    picture.className = "exercisePicture";
    picture.src = jsonData[wordIterator].linkToPicture;
    picture.alt = '';
    if(String(showPicture) == "true")
        picture.style.display = "block";
    let nativeWord = document.createElement("div"); // Слово на родном языке
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[wordIterator].wordsInNativeLanguage;
    let targetWord = document.createElement("input"); // Слово на изучаемом языке
    targetWord.id = "targetWord";
    targetWord.name = "targetWord";
    targetWord.autocomplete = "Off";
    targetWord.textContent = "";
    let incorrectAnswer = document.createElement("div");
    incorrectAnswer.id = "incorrectAnswer";
    let correctAnswer = document.createElement("div");
    correctAnswer.id = "correctAnswer";
    let buttonCheck = document.createElement("button");
    buttonCheck.id = "buttonCheck";
    buttonCheck.textContent = "Проверить";
    buttonCheck.onclick = function()
    {
        if(jsonData[wordIterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase())
        {
            targetWord.style.border = "1px solid #718A66";
            correctAnswer.textContent = jsonData[wordIterator].wordsInTheTargetLanguage;
            correctAnswer.style.display = "block";
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }
        else
        {
            targetWord.style.border = "1px solid #8A666A";
            incorrectAnswer.textContent = targetWord.value;
            incorrectAnswer.style.display = "block";
            correctAnswer.textContent = jsonData[wordIterator].wordsInTheTargetLanguage;
            correctAnswer.style.display = "block";
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }
    }
    writeTheWord.appendChild(picture);
    writeTheWord.appendChild(nativeWord);
    writeTheWord.appendChild(targetWord);
    writeTheWord.appendChild(incorrectAnswer);
    writeTheWord.appendChild(correctAnswer);
    writeTheWord.appendChild(buttonCheck);
    return writeTheWord;
}};
// Добавляем в словарь функцию для создания тренировки "Сопоставление слов"
exerciseDictionary["Сопоставление слов"] = function createMatchingWords(jsonData, wordIterator, showPicture)
{
    let matchingWords = document.createElement("div");
    matchingWords.id = "matchingWords";
    let picture = document.createElement('img');
    picture.className = "exercisePicture";
    picture.src = jsonData[wordIterator].linkToPicture;
    picture.alt = '';
    if(String(showPicture) == "true")
        picture.style.display = "block";
    matchingWords.appendChild(picture);
    let nativeWord = document.createElement("div"); // Слово на родном языке
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[wordIterator].wordsInNativeLanguage;
    matchingWords.appendChild(nativeWord);
    let containerForTargetWord = document.createElement("div");
    containerForTargetWord.id = "containerForTargetWord";
    lengthWord = jsonData[wordIterator].wordsInTheTargetLanguage.length;
    let arrayContainerForTargetLetters = containerForTargetWord.getElementsByClassName("containerForTargetLetters"); // Создаём массив контейнеров для букв изучаемого слова
    let indexArrayContainerForTargetLetters = 0; // Создаём индекс для массива контейнеров для букв изучаемого слова
    for(let i = 0; i < lengthWord; i++)
    {
        let containerForLetter = document.createElement("div");
        containerForLetter.className = "containerForTargetLetters";
        containerForLetter.onclick = function()
        {
            if(containerForLetter.textContent != "")
            {
                indexArrayContainerForTargetWordWithLetters = 0;
                if(arrayContainerForTargetWordWithLetters[indexArrayContainerForTargetWordWithLetters].textContent != "")
                {
                    while(arrayContainerForTargetWordWithLetters[indexArrayContainerForTargetWordWithLetters].textContent != "")
                    {
                        if(indexArrayContainerForTargetWordWithLetters == lengthWord)
                            indexArrayContainerForTargetWordWithLetters = 0;
                        indexArrayContainerForTargetWordWithLetters++;
                    }
                }
                arrayContainerForTargetWordWithLetters[indexArrayContainerForTargetWordWithLetters].textContent = containerForLetter.textContent;
                containerForLetter.textContent = "";
                indexArrayContainerForTargetWordWithLetters++;
            }
        }
        containerForTargetWord.appendChild(containerForLetter);
    }
    matchingWords.appendChild(containerForTargetWord);
    let containerForTargetWordWithLetters = document.createElement("div");
    containerForTargetWordWithLetters.id = "containerForTargetWord";
    let shuffledWord = jsonData[wordIterator].wordsInTheTargetLanguage.split('').sort(() => Math.random() - 0.5).join(''); // Разбиваем слово на массив букв, сортируем его случайным образом и объединяет буквы обратно в слово
    let arrayContainerForTargetWordWithLetters = containerForTargetWordWithLetters.getElementsByClassName("containerForTargetLetters"); // Создаём массив контейнеров для букв изучаемого слова
    let indexArrayContainerForTargetWordWithLetters = 0; // Создаём индекс для массива контейнеров для букв изучаемого слова
    for(let i = 0; i < lengthWord; i++)
    {
        let containerForLetter = document.createElement("div");
        containerForLetter.className = "containerForTargetLetters";
        containerForLetter.textContent = shuffledWord[i];
        containerForLetter.onclick = function()
        {
            if(containerForLetter.textContent != "")
            {
                indexArrayContainerForTargetLetters = 0;
                if(arrayContainerForTargetLetters[indexArrayContainerForTargetLetters].textContent != "")
                {
                    while(arrayContainerForTargetLetters[indexArrayContainerForTargetLetters].textContent != "")
                    {
                        if(indexArrayContainerForTargetLetters == lengthWord)
                            indexArrayContainerForTargetLetters = 0;
                        indexArrayContainerForTargetLetters++;
                    }
                }
                arrayContainerForTargetLetters[indexArrayContainerForTargetLetters].textContent = containerForLetter.textContent;
                containerForLetter.textContent = "";
                indexArrayContainerForTargetLetters++;
            }
        }
        containerForTargetWordWithLetters.appendChild(containerForLetter);
    }
    matchingWords.appendChild(containerForTargetWordWithLetters);
    let incorrectAnswer = document.createElement("div");
    incorrectAnswer.id = "incorrectAnswer";
    let correctAnswer = document.createElement("div");
    correctAnswer.id = "correctAnswer";
    matchingWords.appendChild(incorrectAnswer);
    matchingWords.appendChild(correctAnswer);
    let buttonCheck = document.createElement("button");
    buttonCheck.id = "buttonCheck";
    buttonCheck.textContent = "Проверить";
    buttonCheck.onclick = function()
    {
        let answer = true;
        for(let i = 0; i < lengthWord; i++)
        {
            if(jsonData[wordIterator].wordsInTheTargetLanguage[i] != arrayContainerForTargetLetters[i].textContent)
            {
                answer = false;
                break;
            }
        }
        if(answer)
        {
            correctAnswer.textContent = "Правильный ответ";
            correctAnswer.style.display = "block";
            for(let i = 0; i < arrayContainerForTargetLetters.length; i++)
            {
                arrayContainerForTargetLetters[i].style.borderColor = "#718A66";
            }
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }
        else
        {
            incorrectAnswer.textContent = "Не правильный ответ";
            incorrectAnswer.style.display = "block";
            for(let i = 0; i < arrayContainerForTargetLetters.length; i++)
            {
                arrayContainerForTargetLetters[i].style.borderColor = "#8A666A";
            }
            correctAnswer.textContent = jsonData[wordIterator].wordsInTheTargetLanguage;
            correctAnswer.style.display = "block";
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }
    }
    matchingWords.appendChild(buttonCheck);
    return matchingWords;
}
// Функция для создания подвкладки тренировать слова
function createPracticeWords(jsonData)
{
    let bodyContainer = document.getElementById("body__container");
    let practiceWords = document.createElement("div");
    practiceWords.id = "practiceWords";
    bodyContainer.appendChild(practiceWords);
    let counter = document.createElement("div");
    counter.id = "counter"
    let numberSettings = 0;
    arraySettingLabel.forEach(element => {
        if(sessionStorage.getItem("active-setting: " + element) == "true")
            numberSettings++;
    });
    let counterIterator = 0; // Итератор счетчика
    let wordIterator = 0; // Итератор слова
    let exerciseIterator = 0; // Итератор упражнения
    counter.textContent = counterIterator + "/" + (jsonData.length * numberSettings);
    practiceWords.appendChild(counter);
    let exerciseContainer = document.createElement("div");
    practiceWords.appendChild(exerciseContainer);
    for (let i = 0; i < arraySettingLabel.length; i++)
    {
        if(String(sessionStorage.getItem("active-setting: " + arraySettingLabel[i])) == "true")
        {
            exerciseIterator = i;
            exerciseContainer.appendChild(exerciseDictionary[arraySettingLabel[i]](jsonData, wordIterator, sessionStorage.getItem("active-picture: " + arraySettingLabel[i])));
            break;
        }
    }
    let buttonNext = document.createElement("button");
    buttonNext.textContent = "Далее";
    buttonNext.id = "buttonNext";
    buttonNext.onclick = function()
    {
        let next = true;
        counterIterator++; // Увеличиваем значение итератора счетчика
        counter.textContent = counterIterator + "/" + (jsonData.length * numberSettings); // Обновляем значение счетчика
        exerciseContainer.innerHTML = ""; // Отчищаем контейнер для упражнений
        while (next)
        {
            for(let i = ++exerciseIterator; i < arraySettingLabel.length; i++, exerciseIterator++)
            {
                if(String(sessionStorage.getItem("active-setting: " + arraySettingLabel[i])) == "true")
                {
                    buttonNext.style.display = "none";
                    if(wordIterator != jsonData.length)
                        exerciseContainer.appendChild(exerciseDictionary[arraySettingLabel[i]](jsonData, wordIterator, sessionStorage.getItem("active-picture: " + arraySettingLabel[i])));
                    next = false;

                    break;
                }
            }
            if(exerciseIterator == arraySettingLabel.length)
            {
                let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
                xhr.open("POST", "../PHP/deleteTrainingCard.php", true); 
                // Отправляем запрос на сервер
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
                xhr.send("cardId=" + encodeURIComponent(jsonData[wordIterator].cardId));
                exerciseIterator = -1;
                wordIterator++;
            }
        }
        if(wordIterator == jsonData.length)
        {
            practiceWords.innerHTML = ""; // Отчищаем рабочую область
            let endWords = document.createElement("div");
            endWords.textContent = "Слов для повторения больше нет";
            practiceWords.appendChild(endWords);
        }
    }
    practiceWords.appendChild(buttonNext);
}
// Функция для получения данных карточек для тренировки
function getPracticeWords()
{
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let xhrPracticeWords = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrPracticeWords.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта xhr
    {
        if (xhrPracticeWords.readyState === 4 && xhrPracticeWords.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrPracticeWords.responseText); // Разбираем JSON-данные
            if(jsonData.length != 0)
                createPracticeWords(jsonData);
            else
            {
                let practiceWords = document.createElement("div");
                practiceWords.id = "practiceWords";
                let endWords = document.createElement("div");
                endWords.textContent = "Добавьте слова для тренировки";
                practiceWords.appendChild(endWords);
                bodyContainer.appendChild(practiceWords);
            }
        }
    }
    xhrPracticeWords.open("POST", "../PHP/trainCards.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса
    xhrPracticeWords.send(); // Отправляем запрос на сервер
}
practiceWords.onclick = function()
{
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    practiceWords.classList.add("tab_active");
    getPracticeWords();
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