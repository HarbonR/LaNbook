/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
// Бургер
let burger = document.getElementById("burger");
let burgerOpen = document.getElementById("burger-open");
burgerOpen.value = false;
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
    if(burgerOpen.style.display == "none")
        closeBurger();
    bodyTraining.setAttribute("style", "display: none;");
    bodyUser.setAttribute("style", "display: none;");
    bodyTraining.value = false; // Назначаем значение вкладки тренировка "Не активная"
    bodyUser.value = false; // Назначаем значение вкладки личный кабинет "Не активная"
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
    if(burgerOpen.style.display == "none")
        closeBurger();
    bodyUser.setAttribute("style", "display: none;");
    bodyTraining.removeAttribute("style");
    bodyTraining.value = true; // Вкладка тренировки "Активная"
    bodyUser.value = false;
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
};
//--------------------------------------------------
// Вкладка личный кабинет
menuPersonalArea.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    bodyTraining.setAttribute("style", "display: none;");
    bodyUser.removeAttribute("style");
    bodyTraining.value = false; 
    bodyUser.value = true; // Вкладка личный кабинет "Активная"
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
};
/* ==================================================================================================== */
/* ---------------------------------------------Вкладки тела------------------------------------------- */
// Вкладка тренировки
wordsToPractice.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    wordsToPractice.classList.add("tab_active");
    getCards("../PHP/trainCards.php", "Train");
};
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
};
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
};
// Функция для создания подвкладки "Интервальное повторение"
function createDailyWorkout(jsonData)
{
    let dailyWorkout = document.createElement("div"); // Контейнер для интервального повторения
    dailyWorkout.id = "dailyWorkout"
    let counter = document.createElement("div"); // Счетчик который считает пройденные слова
    counter.id = "counter"
    let iterator = 0;
    counter.textContent = iterator + "/" + jsonData.length;
    let nativeWord = document.createElement("div"); // Слово на родном языке
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[0].wordsInNativeLanguage;
    let context = document.createElement("div");
    context.className = "context";
    if (jsonData[0].context != "")
        context.textContent = jsonData[0].context;
    let targetWord = document.createElement("input"); // Слово на изучаемом языке
    targetWord.id = "targetWord";
    targetWord.name = "targetWord";
    targetWord.autocomplete = "Off";
    targetWord.textContent = "";
    targetWord.placeholder = "Количество букв в слове: " + jsonData[iterator].wordsInTheTargetLanguage.length; // Добавляем количество букв в слове как подсказку
    let incorrectAnswer = document.createElement("div"); // Неправильный ответ
    incorrectAnswer.id = "incorrectAnswer";
    let correctAnswer = document.createElement("div"); // Правильный ответ
    correctAnswer.id = "correctAnswer";
    let buttonFurther = document.createElement("button"); // Кнопка для продолжения тренировки
    buttonFurther.textContent = "Проверить";
    let variableAnswer = false;
    buttonFurther.onclick = function()
    {
        // Если пользователь нажал на кнопку во второй раз и ответ был правильным
        if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase().trim() && variableAnswer)
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
            {
                nativeWord.textContent = jsonData[iterator].wordsInNativeLanguage;
                context.textContent = jsonData[iterator].context;
                targetWord.placeholder = "Количество букв в слове: " + jsonData[iterator].wordsInTheTargetLanguage.length;
            }
            else
                getEndWordsDailyWorkout();
        }
        // Если пользователь нажал на кнопку проверить в первый раз и ответ оказался правильным
        else if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase().trim())
        {
            variableAnswer = true;
            targetWord.style.border = "1px solid #718A66";
            correctAnswer.style.display = "block";
            correctAnswer.textContent = jsonData[iterator].wordsInTheTargetLanguage;
            buttonFurther.textContent = "Далее";
            сhangeDailyWorkout(jsonData[iterator].cardId, jsonData[iterator].counter, jsonData[iterator].maxCounter, "+", jsonData[iterator].level);
        }
        // Если пользователь нажал на кнопку проверить в первый раз и ответ оказался не правильным
        else if(jsonData[iterator].wordsInTheTargetLanguage.toUpperCase() != targetWord.value.toUpperCase().trim() && !variableAnswer)
        {
            variableAnswer = true
            targetWord.style.border = "1px solid #8A666A";
            incorrectAnswer.style.display = "block";
            incorrectAnswer.textContent = targetWord.value;
            correctAnswer.style.display = "block";
            correctAnswer.textContent = jsonData[iterator].wordsInTheTargetLanguage;
            buttonFurther.textContent = "Далее";
            сhangeDailyWorkout(jsonData[iterator].cardId, jsonData[iterator].counter, jsonData[iterator].maxCounter, "-");
            // Отправляем запрос на добавление карточки для тренировки
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "../PHP/trainCard.php", true); 
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(jsonData[iterator].cardId) + "&train=" + encodeURIComponent(1));
        }
        // Если пользователь нажал на кнопку во второй раз и ответ был не правильным
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
            {
                nativeWord.textContent = jsonData[iterator].wordsInNativeLanguage;
                context.textContent = jsonData[iterator].context;
                targetWord.placeholder = "Количество букв в слове: " + jsonData[iterator].wordsInTheTargetLanguage.length;
            }
            else
                getEndWordsDailyWorkout();
        }
    }
    buttonFurther.id = "buttonFurther";
    dailyWorkout.appendChild(counter);
    dailyWorkout.appendChild(nativeWord);
    dailyWorkout.appendChild(context);
    dailyWorkout.appendChild(targetWord);
    dailyWorkout.appendChild(incorrectAnswer);
    dailyWorkout.appendChild(correctAnswer);
    dailyWorkout.appendChild(buttonFurther);
    return dailyWorkout;
};
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
};
// 
dailyWorkout.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    dailyWorkout.classList.add("tab_active");
    getDailyWorkout();
};
//--------------------------------------------------
// Создаём словарь упражнений и добавляем в него функцию для создания тренировки "Напиши слово"
let exerciseDictionary = {"Напиши слово" : function createWriteTheWord(jsonData, wordIterator, showPicture){
    let writeTheWord = document.createElement("div");
    writeTheWord.id = "writeTheWord"
    let picture = document.createElement('img');
    picture.className = "exercisePicture";
    if(jsonData[wordIterator].linkToPicture != null)
        picture.src = jsonData[wordIterator].linkToPicture;
    picture.alt = '';
    if(String(showPicture) == "true")
        picture.style.display = "block";
    let nativeWord = document.createElement("div"); // Слово на родном языке
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[wordIterator].wordsInNativeLanguage;
    let context = document.createElement("div"); // Контекст
    context.className = "context";
    context.textContent = jsonData[wordIterator].context;
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
        if(jsonData[wordIterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase().trim())
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
    writeTheWord.appendChild(context);
    writeTheWord.appendChild(targetWord);
    writeTheWord.appendChild(incorrectAnswer);
    writeTheWord.appendChild(correctAnswer);
    writeTheWord.appendChild(buttonCheck);
    return writeTheWord;
    }
};
// Добавляем в словарь функцию для создания тренировки "Составление слова"
exerciseDictionary["Составление слова"] = function createFormationOfAWord(jsonData, wordIterator, showPicture){

    let matchingWords = document.createElement("div");
    matchingWords.id = "matchingWords";
    let picture = document.createElement('img');
    picture.className = "exercisePicture";
    if(jsonData[wordIterator].linkToPicture != null)
        picture.src = jsonData[wordIterator].linkToPicture;
    picture.alt = '';
    if(String(showPicture) == "true")
        picture.style.display = "block";
    matchingWords.appendChild(picture);
    let nativeWord = document.createElement("div"); // Слово на родном языке
    nativeWord.id = "nativeWord";
    nativeWord.textContent = jsonData[wordIterator].wordsInNativeLanguage;
    matchingWords.appendChild(nativeWord);
    let context = document.createElement("div"); // Контекст
    context.className = "context";
    context.textContent = jsonData[wordIterator].context;
    matchingWords.appendChild(context);
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
    let shuffledWord = jsonData[wordIterator].wordsInTheTargetLanguage
    while(shuffledWord == jsonData[wordIterator].wordsInTheTargetLanguage) // Цикл пока перемешанное слово равно изначальному слову
    {
        shuffledWord = jsonData[wordIterator].wordsInTheTargetLanguage.split('').sort(() => Math.random() - 0.5).join(''); // Разбиваем слово на массив букв, сортируем его случайным образом и объединяет буквы обратно в слово
    }
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
};
// Добавляем в словарь функцию для создания тренировки "Сопоставление слов"
exerciseDictionary["Сопоставление слов"] = function createMatchingWords(jsonData, wordIterator){
    let formationOfAWord = document.createElement("div")
    formationOfAWord.id = "formationOfAWord";

    if(jsonData.length < 3){
        formationOfAWord.textContent = "Для того чтобы выполнять упражнение \"Сопоставление слов\" нужно добавить ещё слов для тренировки: " + (3 - jsonData.length);
    }
    else{
        // Создаем массив слов на родном языке
        let wordsInNativeLanguage = [];
        for(let i = wordIterator, j = 0; i != jsonData.length && j < 3; i++, j++){
            wordsInNativeLanguage.push(jsonData[i].wordsInNativeLanguage);
            if(i == jsonData.length - 1) // Если слова закончились начать брать их сначала
                i = -1;
        }
        // Создаём массив с перемешанными элементами (Слова на родном языке)
        let shuffledArray = wordsInNativeLanguage.slice();
        // Пока массив совпадает с оригиналом, продолжаем его перемешивать
        while (JSON.stringify(shuffledArray) === JSON.stringify(wordsInNativeLanguage)) {
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
        }
        // Создаём слова на изучаемом языке, стрелки вниз и слова на родном языке
        for(let i = wordIterator, j = 0; i != jsonData.length && j < 3; i++, j++){
            let row = document.createElement("div"); // Ряд
            row.className = "rowFormationOfAWord";
            let targetWord = document.createElement("div"); // Слово на изучаемом языке
            targetWord.className = "targetWordFormationOfAWord";
            targetWord.textContent = jsonData[i].wordsInTheTargetLanguage
            let buttonDown = document.createElement("div"); // Кнопка вниз
            // Создаем новый элемент SVG
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '35');
            svg.setAttribute('height', '35');
            svg.setAttribute('viewBox', '0 0 35 35');
            svg.setAttribute('fill', 'none');
            // Создаем прямоугольник
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', '35');
            rect.setAttribute('height', '35');
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', '#C7B198');
            svg.appendChild(rect);
            // Создаем путь
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M17.5 30.5L30.5 8H4.5L17.5 30.5Z');
            path.setAttribute('fill', '#E8DDD2');
            svg.appendChild(path);
            buttonDown.appendChild(svg); // Добавляем SVG элемент
            buttonDown.onclick = function(){
                let svgFormationOfAWord = formationOfAWord.getElementsByTagName("svg"); // Массив элементов svg картинок
                let rowFormationOfAWord = formationOfAWord.getElementsByClassName("rowFormationOfAWord"); // Массив элементов рядов
                let nativeWordFormationOfAWord = formationOfAWord.getElementsByClassName("nativeWordFormationOfAWord"); // Массив элементов родных слов
                let indexNativeWord; // Индекс текущего элемента родного слова
                let nextIndexNativeWord; // Индекс следующего элемента родного слова
                for (let i = 0; i < svgFormationOfAWord.length; i++) {
                    if (svgFormationOfAWord[i] == svg) {
                        indexNativeWord = i;
                        if(i + 1 == svgFormationOfAWord.length)
                            nextIndexNativeWord = 0;
                        else
                            nextIndexNativeWord = i + 1;
                        break; // Выход из цикла, если элемент найден
                    }
                }
                let element1 = nativeWordFormationOfAWord[indexNativeWord];
                let element2 = nativeWordFormationOfAWord[nextIndexNativeWord];
                // Сохранение начальных позиций элементов
                let rect1 = element1.getBoundingClientRect();
                let rect2 = element2.getBoundingClientRect();
                let deltaX = rect2.left - rect1.left;
                let deltaY = rect2.top - rect1.top;
                // Добавление анимации смещения
                element1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                element2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
                // Дожидаемся завершения анимации
                setTimeout(() => {
                    // Убираем стили анимации и меняем элементы местами в DOM
                    element1.style.transform = '';
                    element2.style.transform = '';
                    rowFormationOfAWord[indexNativeWord].appendChild(element2);
                    rowFormationOfAWord[nextIndexNativeWord].appendChild(element1);
                }, 400); // Длительность анимации 500ms
            }
    
            let nativeWord = document.createElement("div"); // Слово на родном языке
            nativeWord.className = "nativeWordFormationOfAWord";
            nativeWord.textContent = shuffledArray[j];
    
            row.appendChild(targetWord);
            row.appendChild(buttonDown);
            row.appendChild(nativeWord);
            formationOfAWord.appendChild(row);
            if(i == jsonData.length - 1) // Если слова закончились начать брать их сначала
                i = -1;
        }
        let incorrectAnswer = document.createElement("div");
        incorrectAnswer.id = "incorrectAnswer";
        incorrectAnswer.textContent = "Не правильный ответ";

        let correctAnswer = document.createElement("div");
        correctAnswer.id = "correctAnswer";
        correctAnswer.textContent = "Правильный ответ";

        formationOfAWord.appendChild(incorrectAnswer);
        formationOfAWord.appendChild(correctAnswer);

        let buttonCheck = document.createElement("button");
        buttonCheck.id = "buttonCheck";
        buttonCheck.textContent = "Проверить";
        buttonCheck.onclick = function(){
            let nativeWordFormationOfAWord = formationOfAWord.getElementsByClassName("nativeWordFormationOfAWord"); // Массив элементов родных слов
            let isCorrect = true;
            for(let i = 0; i < nativeWordFormationOfAWord.length; i++){
                if(nativeWordFormationOfAWord[i].textContent != wordsInNativeLanguage[i]){
                    nativeWordFormationOfAWord[i].style.border = "1px solid #8A666A";
                    isCorrect = false
                }
                else
                    nativeWordFormationOfAWord[i].style.border = "1px solid #718A66";
            }
            if(isCorrect)
                correctAnswer.style.display = "block";
            else
                incorrectAnswer.style.display = "block";
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }
    
        formationOfAWord.appendChild(buttonCheck);
    }

    return formationOfAWord
};
// Добавляем в словарь функцию для создания тренировки "Проверка слов на изучаемом языке"
exerciseDictionary["Проверка слов на изучаемом языке"] = function createCheckingWordsInTheLanguageBeingStudied(jsonData, wordIterator, showPicture){
    let checkingWordsInTheLanguageBeingStudied = document.createElement("div");
    checkingWordsInTheLanguageBeingStudied.id = "checkingWordsInTheLanguageBeingStudied";

    if(jsonData.length < 3){
        checkingWordsInTheLanguageBeingStudied.textContent = "Для того чтобы выполнять упражнение \"Проверка слов на изучаемом языке\" нужно добавить ещё слов для тренировки: " 
        + (3 - jsonData.length);
    }
    else{
        let picture = document.createElement('img');
        picture.className = "exercisePicture";
        if(jsonData[wordIterator].linkToPicture != null)
            picture.src = jsonData[wordIterator].linkToPicture;
        picture.alt = '';
        if(String(showPicture) == "true")
            picture.style.display = "block";

        let targetWord = document.createElement("div"); // Слово на изучаемом языке
        targetWord.id = "nativeWord";
        targetWord.textContent = jsonData[wordIterator].wordsInTheTargetLanguage;

        checkingWordsInTheLanguageBeingStudied.appendChild(picture);
        checkingWordsInTheLanguageBeingStudied.appendChild(targetWord);

        // Создаем массив слов на родном языке
        let wordsInNativeLanguage = [];
        for(let i = wordIterator, j = 0; i != jsonData.length && j < 3; i++, j++){
            wordsInNativeLanguage.push(jsonData[i].wordsInNativeLanguage);
            if(i == jsonData.length - 1) // Если слова закончились начать брать их сначала
                i = -1;
        }
        // Создаём массив с перемешанными элементами (Слова на родном языке)
        let shuffledArray = wordsInNativeLanguage.slice();
        // Пока массив совпадает с оригиналом, продолжаем его перемешивать
        while (JSON.stringify(shuffledArray) === JSON.stringify(wordsInNativeLanguage)) {
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        }
        
        for(let i = 0; i < shuffledArray.length; i++){
            let nativeWord = document.createElement("div"); // Слово на родном языке
            nativeWord.className = "nativeWordFormationOfAWord";
            nativeWord.textContent = shuffledArray[i];
            nativeWord.onclick = function(){
                let arrayNativeWord = checkingWordsInTheLanguageBeingStudied.getElementsByClassName("nativeWordFormationOfAWord");
                // Обнуляем задний фон
                for(let i = 0; i < arrayNativeWord.length; i++){
                    arrayNativeWord[i].removeAttribute("style");
                    arrayNativeWord[i].value = false;
                }
                nativeWord.style.backgroundColor = "rgba(51, 51, 51, 0.5)"; // Выделяем выбранный элемент
                nativeWord.value = true;
            }
            checkingWordsInTheLanguageBeingStudied.appendChild(nativeWord);
        }

        let incorrectAnswer = document.createElement("div");
        incorrectAnswer.id = "incorrectAnswer";
        incorrectAnswer.textContent = "Не правильный ответ";

        let correctAnswer = document.createElement("div");
        correctAnswer.id = "correctAnswer";
        correctAnswer.textContent = "Правильный ответ: " + jsonData[wordIterator].wordsInNativeLanguage;

        let buttonCheck = document.createElement("button");
        buttonCheck.id = "buttonCheck";
        buttonCheck.textContent = "Проверить";
        buttonCheck.onclick = function(){
            let arrayNativeWord = checkingWordsInTheLanguageBeingStudied.getElementsByClassName("nativeWordFormationOfAWord");
            for(let i = 0; i < arrayNativeWord.length; i++){
                if(arrayNativeWord[i].value == true){
                    if(arrayNativeWord[i].textContent == jsonData[wordIterator].wordsInNativeLanguage){ // Если ответ правильный
                        arrayNativeWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayNativeWord[i].style.border = "1px solid #718A66";
                    }
                    else{ // Если ответ не правильный
                        arrayNativeWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayNativeWord[i].style.border = "1px solid #8A666A";
                        incorrectAnswer.style.display = "block";
                        correctAnswer.style.display = "block";
                    }
                }
            }
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }

        checkingWordsInTheLanguageBeingStudied.appendChild(incorrectAnswer);
        checkingWordsInTheLanguageBeingStudied.appendChild(correctAnswer);
        checkingWordsInTheLanguageBeingStudied.appendChild(buttonCheck);
    }
    
    return checkingWordsInTheLanguageBeingStudied;
};
// Добавляем в словарь функцию для создания тренировки "Проверка слов на родном языке"
exerciseDictionary["Проверка слов на родном языке"] = function createCheckWordsInYourNativeLanguage(jsonData, wordIterator, showPicture){
    let checkWordsInYourNativeLanguage = document.createElement("div");
    checkWordsInYourNativeLanguage.id = "checkingWordsInTheLanguageBeingStudied";

    if(jsonData.length < 3){
        checkWordsInYourNativeLanguage.textContent = "Для того чтобы выполнять упражнение \"Проверка слов на родном языке\" нужно добавить ещё слов для тренировки: " 
        + (3 - jsonData.length);
    }
    else{
        let picture = document.createElement('img');
        picture.className = "exercisePicture";
        if(jsonData[wordIterator].linkToPicture != null)
            picture.src = jsonData[wordIterator].linkToPicture;
        picture.alt = '';
        if(String(showPicture) == "true")
            picture.style.display = "block";

        let nativeWord = document.createElement("div"); // Слово на родном языке
        nativeWord.id = "nativeWord";
        nativeWord.textContent = jsonData[wordIterator].wordsInNativeLanguage;

        checkWordsInYourNativeLanguage.appendChild(picture);
        checkWordsInYourNativeLanguage.appendChild(nativeWord);

        // Создаем массив слов на изучаемом языке
        let wordsInTheTargetLanguage = [];
        for(let i = wordIterator, j = 0; i != jsonData.length && j < 3; i++, j++){
            wordsInTheTargetLanguage.push(jsonData[i].wordsInTheTargetLanguage);
            if(i == jsonData.length - 1) // Если слова закончились начать брать их сначала
                i = -1;
        }
        // Создаём массив с перемешанными элементами (Слова на родном языке)
        let shuffledArray = wordsInTheTargetLanguage.slice();
        // Пока массив совпадает с оригиналом, продолжаем его перемешивать
        while (JSON.stringify(shuffledArray) === JSON.stringify(wordsInTheTargetLanguage)) {
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        }
        
        for(let i = 0; i < shuffledArray.length; i++){
            let targetWord = document.createElement("div"); // Слово на изучаемом языке
            targetWord.className = "nativeWordFormationOfAWord";
            targetWord.textContent = shuffledArray[i];
            targetWord.onclick = function(){
                let arrayTargetWord = checkWordsInYourNativeLanguage.getElementsByClassName("nativeWordFormationOfAWord");
                // Обнуляем задний фон
                for(let i = 0; i < arrayTargetWord.length; i++){
                    arrayTargetWord[i].removeAttribute("style");
                    arrayTargetWord[i].value = false;
                }
                targetWord.style.backgroundColor = "rgba(51, 51, 51, 0.5)"; // Выделяем выбранный элемент
                targetWord.value = true;
            }
            checkWordsInYourNativeLanguage.appendChild(targetWord);
        }

        let incorrectAnswer = document.createElement("div");
        incorrectAnswer.id = "incorrectAnswer";
        incorrectAnswer.textContent = "Не правильный ответ";

        let correctAnswer = document.createElement("div");
        correctAnswer.id = "correctAnswer";
        correctAnswer.textContent = "Правильный ответ: " + jsonData[wordIterator].wordsInTheTargetLanguage;

        let buttonCheck = document.createElement("button");
        buttonCheck.id = "buttonCheck";
        buttonCheck.textContent = "Проверить";
        buttonCheck.onclick = function(){
            let arrayTargetWord = checkWordsInYourNativeLanguage.getElementsByClassName("nativeWordFormationOfAWord");
            for(let i = 0; i < arrayTargetWord.length; i++){
                if(arrayTargetWord[i].value == true){
                    if(arrayTargetWord[i].textContent == jsonData[wordIterator].wordsInTheTargetLanguage){ // Если ответ правильный
                        arrayTargetWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayTargetWord[i].style.border = "1px solid #718A66";
                    }
                    else{ // Если ответ не правильный
                        arrayTargetWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayTargetWord[i].style.border = "1px solid #8A666A";
                        incorrectAnswer.style.display = "block";
                        correctAnswer.style.display = "block";
                    }
                }
            }
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }

        checkWordsInYourNativeLanguage.appendChild(incorrectAnswer);
        checkWordsInYourNativeLanguage.appendChild(correctAnswer);
        checkWordsInYourNativeLanguage.appendChild(buttonCheck);
    }
    
    return checkWordsInYourNativeLanguage;
};
// Добавляем в словарь функцию для создания тренировки "Напиши, что услышал"
exerciseDictionary["Напиши, что услышал"] = function createWriteWhatYouHeard(jsonData, wordIterator, showPicture){ 
    let writeTheWord = document.createElement("div");
    writeTheWord.id = "writeTheWord"
    let picture = document.createElement('img');
    let cardButtonSound = document.createElement('div'); // Создание div для кнопки "Звук"
    picture.className = "exercisePicture";
    if(jsonData[wordIterator].linkToPicture != null)
        picture.src = jsonData[wordIterator].linkToPicture;
    picture.alt = '';
    if(String(showPicture) == "true")
        picture.style.display = "block";
    else
        cardButtonSound.style.margin = "10px 0 0 0";
    // Создание div для кнопки "Звук"
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.onclick = function(event){
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        speakWord(jsonData[wordIterator].wordsInTheTargetLanguage);
    }
    let soundSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    soundSvg.setAttribute("width", "29");
    soundSvg.setAttribute("height", "25");
    soundSvg.setAttribute("viewBox", "0 0 29 25");
    let soundPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    soundPath1.setAttribute("d", "M21.8125 3.45654C25.0701 9.15209 25.0841 15.0339 21.8125 20.7395");
    soundPath1.setAttribute("fill", "rgba(0,0,0,0)");
    soundPath1.setAttribute("stroke", "black");
    let soundPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    soundPath2.setAttribute("d", "M26.709 2.30432C28.3378 7.32484 28.3448 16.8623 26.709 21.8917");
    soundPath2.setAttribute("fill", "rgba(0,0,0,0)");
    soundPath2.setAttribute("stroke", "black");
    let soundPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    soundPath3.setAttribute("d", "M1 16.0796V8.11651C1 7.56422 1.44772 7.11651 2 7.11651H7.98428C8.21762 7.11651 8.44363 7.0349 8.62315 6.88582L15.2761 1.36098C15.9277 0.819834 16.9149 1.28326 16.9149 2.1303V22.0658C16.9149 22.9129 15.9277 23.3763 15.2761 22.8351L8.62315 17.3103C8.44363 17.1612 8.21762 17.0796 7.98428 17.0796H2C1.44772 17.0796 1 16.6319 1 16.0796Z");
    soundPath3.setAttribute("fill", "rgba(0,0,0,0)");
    soundPath3.setAttribute("stroke", "black");
    soundSvg.appendChild(soundPath1);
    soundSvg.appendChild(soundPath2);
    soundSvg.appendChild(soundPath3);
    cardButtonSound.appendChild(soundSvg);
    // Создание div для контекста
    let context = document.createElement("div");
    context.className = "context";
    context.textContent = jsonData[wordIterator].context;
    // Слово на изучаемом языке
    let targetWord = document.createElement("input"); 
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
        if(jsonData[wordIterator].wordsInTheTargetLanguage.toUpperCase() == targetWord.value.toUpperCase().trim())
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
    writeTheWord.appendChild(cardButtonSound);
    writeTheWord.appendChild(context);
    writeTheWord.appendChild(targetWord);
    writeTheWord.appendChild(incorrectAnswer);
    writeTheWord.appendChild(correctAnswer);
    writeTheWord.appendChild(buttonCheck);
    return writeTheWord;
};
// Добавляем в словарь функцию для создания тренировки "Узнай слово на слух"
exerciseDictionary["Узнай слово на слух"] = function createLearnTheWordByEar(jsonData, wordIterator, showPicture){
    let checkingWordsInTheLanguageBeingStudied = document.createElement("div");
    checkingWordsInTheLanguageBeingStudied.id = "checkingWordsInTheLanguageBeingStudied";

    if(jsonData.length < 3){
        checkingWordsInTheLanguageBeingStudied.textContent = "Для того чтобы выполнять упражнение \"Проверка слов на изучаемом языке\" нужно добавить ещё слов для тренировки: " 
        + (3 - jsonData.length);
    }
    else{
        let picture = document.createElement('img');
        let cardButtonSound = document.createElement('div');
        picture.className = "exercisePicture";
        if(jsonData[wordIterator].linkToPicture != null)
            picture.src = jsonData[wordIterator].linkToPicture;
        picture.alt = '';
        if(String(showPicture) == "true"){
            picture.style.display = "block";
            cardButtonSound.style.margin = "5px 0 10px 0";
        }
        else
            cardButtonSound.style.margin = "10px 0 10px 0";
        // Создание div для кнопки "Звук"
        cardButtonSound.className = 'card-button-sound';
        cardButtonSound.onclick = function(event){
            event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
            speakWord(jsonData[wordIterator].wordsInTheTargetLanguage);
        }
        let soundSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        soundSvg.setAttribute("width", "29");
        soundSvg.setAttribute("height", "25");
        soundSvg.setAttribute("viewBox", "0 0 29 25");
        let soundPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        soundPath1.setAttribute("d", "M21.8125 3.45654C25.0701 9.15209 25.0841 15.0339 21.8125 20.7395");
        soundPath1.setAttribute("fill", "rgba(0,0,0,0)");
        soundPath1.setAttribute("stroke", "black");
        let soundPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        soundPath2.setAttribute("d", "M26.709 2.30432C28.3378 7.32484 28.3448 16.8623 26.709 21.8917");
        soundPath2.setAttribute("fill", "rgba(0,0,0,0)");
        soundPath2.setAttribute("stroke", "black");
        let soundPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        soundPath3.setAttribute("d", "M1 16.0796V8.11651C1 7.56422 1.44772 7.11651 2 7.11651H7.98428C8.21762 7.11651 8.44363 7.0349 8.62315 6.88582L15.2761 1.36098C15.9277 0.819834 16.9149 1.28326 16.9149 2.1303V22.0658C16.9149 22.9129 15.9277 23.3763 15.2761 22.8351L8.62315 17.3103C8.44363 17.1612 8.21762 17.0796 7.98428 17.0796H2C1.44772 17.0796 1 16.6319 1 16.0796Z");
        soundPath3.setAttribute("fill", "rgba(0,0,0,0)");
        soundPath3.setAttribute("stroke", "black");
        soundSvg.appendChild(soundPath1);
        soundSvg.appendChild(soundPath2);
        soundSvg.appendChild(soundPath3);
        cardButtonSound.appendChild(soundSvg);

        checkingWordsInTheLanguageBeingStudied.appendChild(picture);
        checkingWordsInTheLanguageBeingStudied.appendChild(cardButtonSound);

        // Создаем массив слов на родном языке
        let wordsInNativeLanguage = [];
        for(let i = wordIterator, j = 0; i != jsonData.length && j < 3; i++, j++){
            wordsInNativeLanguage.push(jsonData[i].wordsInNativeLanguage);
            if(i == jsonData.length - 1) // Если слова закончились начать брать их сначала
                i = -1;
        }
        // Создаём массив с перемешанными элементами (Слова на родном языке)
        let shuffledArray = wordsInNativeLanguage.slice();
        // Пока массив совпадает с оригиналом, продолжаем его перемешивать
        while (JSON.stringify(shuffledArray) === JSON.stringify(wordsInNativeLanguage)) {
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        }
        
        for(let i = 0; i < shuffledArray.length; i++){
            let nativeWord = document.createElement("div"); // Слово на родном языке
            nativeWord.className = "nativeWordFormationOfAWord";
            nativeWord.textContent = shuffledArray[i];
            nativeWord.onclick = function(){
                let arrayNativeWord = checkingWordsInTheLanguageBeingStudied.getElementsByClassName("nativeWordFormationOfAWord");
                // Обнуляем задний фон
                for(let i = 0; i < arrayNativeWord.length; i++){
                    arrayNativeWord[i].removeAttribute("style");
                    arrayNativeWord[i].value = false;
                }
                nativeWord.style.backgroundColor = "rgba(51, 51, 51, 0.5)"; // Выделяем выбранный элемент
                nativeWord.value = true;
            }
            checkingWordsInTheLanguageBeingStudied.appendChild(nativeWord);
        }

        let incorrectAnswer = document.createElement("div");
        incorrectAnswer.id = "incorrectAnswer";
        incorrectAnswer.textContent = "Не правильный ответ";

        let correctAnswer = document.createElement("div");
        correctAnswer.id = "correctAnswer";
        correctAnswer.textContent = "Правильный ответ: " + jsonData[wordIterator].wordsInNativeLanguage;

        let buttonCheck = document.createElement("button");
        buttonCheck.id = "buttonCheck";
        buttonCheck.textContent = "Проверить";
        buttonCheck.onclick = function(){
            let arrayNativeWord = checkingWordsInTheLanguageBeingStudied.getElementsByClassName("nativeWordFormationOfAWord");
            for(let i = 0; i < arrayNativeWord.length; i++){
                if(arrayNativeWord[i].value == true){
                    if(arrayNativeWord[i].textContent == jsonData[wordIterator].wordsInNativeLanguage){ // Если ответ правильный
                        arrayNativeWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayNativeWord[i].style.border = "1px solid #718A66";
                    }
                    else{ // Если ответ не правильный
                        arrayNativeWord[i].removeAttribute("style"); // Удаляем выделение
                        arrayNativeWord[i].style.border = "1px solid #8A666A";
                        incorrectAnswer.style.display = "block";
                        correctAnswer.style.display = "block";
                    }
                }
            }
            buttonCheck.style.display = "none";
            document.getElementById("buttonNext").style.display = "block";
        }

        checkingWordsInTheLanguageBeingStudied.appendChild(incorrectAnswer);
        checkingWordsInTheLanguageBeingStudied.appendChild(correctAnswer);
        checkingWordsInTheLanguageBeingStudied.appendChild(buttonCheck);
    }
    
    return checkingWordsInTheLanguageBeingStudied;
};
//--------------------------------------------------
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
                xhr.open("POST", "../PHP/trainCard.php", true); 
                // Отправляем запрос на сервер
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
                xhr.send("cardId=" + encodeURIComponent(jsonData[wordIterator].cardId) + "&train=" + encodeURIComponent(0));
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
};
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
};
//
practiceWords.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    practiceWords.classList.add("tab_active");
    // Определяем количество упражнений которые выбрал пользователь
    let numberSettings = 0;
    arraySettingLabel.forEach(element => {
        if(sessionStorage.getItem("active-setting: " + element) == "true")
            numberSettings++;
    });
    if(numberSettings != 0)
        getPracticeWords();
    else
    {
        let bodyContainer = document.getElementById("body__container");
        bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
        let practiceWords = document.createElement("div");
        practiceWords.id = "practiceWords";
        let endWords = document.createElement("div");
        endWords.textContent = "Выберите упражнения для тренировки слов во вкладке настройки";
        practiceWords.appendChild(endWords);
        bodyContainer.appendChild(practiceWords);
    }
};
//
settings.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabTrainingActive.length; i++)
    {
        tabTrainingActive[i].classList.remove("tab_active");
    }
    settings.classList.add("tab_active");
    getSettingCards();
};
//--------------------------------------------------
// Вкладка личный кабинет
// 
dictionary.onclick = function()
{
    document.getElementById("body__container").style.paddingTop = "0"; // Удаляет отступ создаваемый кнопкой тренировать всё
    if(document.getElementById("title-category")) // Удаление названия категории
    {
        document.getElementById("title-category").remove();
    }
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    dictionary.classList.add("tab_active");
    getUserCategories();
};
//
achievements.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    achievements.classList.add("tab_active");
};
//
statistics.onclick = function()
{
    if(burgerOpen.style.display == "none")
        closeBurger();
    for (let i = 0; i < tabUserActive.length; i++)
    {
        tabUserActive[i].classList.remove("tab_active");
    }
    statistics.classList.add("tab_active");
};
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
    document.getElementById("backgroundBurger").style.display = "block"; // Делаем видимым задний фон бургера
    document.getElementById("view-cards").style.display = "flex";
    if(sessionStorage.getItem("exit") == "true")
        document.getElementById("exit").style.display = "flex";
    if(bodyTraining.value) // Если активна вкладка тренировка
        document.getElementById("body__training").style.display = "flex"; // Показываем подвкладки для тренировки
    if(bodyUser.value)
        document.getElementById("body__user").style.display = "flex";
    burgerOpen.setAttribute("style", "display: none;");
    burgerOpen.value = true;
    burgerClose.removeAttribute("style");
};
// Функция для закрытия бургера
function closeBurger()
{
    burgerOpen.removeAttribute("style");
    burgerOpen.value = false;
    burgerClose.setAttribute("style", "display: none;");
    document.getElementById("backgroundBurger").style.display = "none";
    document.getElementById("view-cards").style.display = "none";
    document.getElementById("exit").style.display = "none";
    document.getElementById("body__training").style.display = "none";
    document.getElementById("body__user").style.display = "none";
};
// Для открытия и закрытия бургера
burger.onclick = function()
{
    if (burgerOpen.value)
        closeBurger();
    else
        openBurger();
};
//==================================================