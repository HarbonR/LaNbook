/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
let viewCards = document.getElementById("view-cards");
let arraySettingLabel = ["Сопоставление слов", "Напиши слово", "Проверка слов на изучаемом языке", "Узнай слово на слух",
    "Проверка слов на родном языке", "Напиши, что услышал", "Составление слова"];
/* ==================================================================================================== */
// Функция для смены класса выбрать, выбранная кнопка
function switchButtonClass(buttonClass)
{
    if (buttonClass.classList.contains("enter-button"))
    {
        buttonClass.classList.add("entered-button");
        buttonClass.classList.remove("enter-button");
    }
    else
    {
        buttonClass.classList.add("enter-button");
        buttonClass.classList.remove("entered-button");
    }
}
// Функция для озвучки слов
function speakWord(word) {
    // Проверяем, поддерживается ли Web Speech API
    if ('speechSynthesis' in window) {
        // Создаем новый объект SpeechSynthesisUtterance
        let utterance = new SpeechSynthesisUtterance(word);
        
        // Устанавливаем язык на английский
        utterance.lang = 'en-US';

        // Устанавливаем параметры (по желанию)
        utterance.pitch = 1; // Устанавливаем высоту голоса "Тональность" (1 - стандартное значение)
        utterance.rate = 1; // Устанавливаем скорость речи (1 - стандартное значение)
        utterance.volume = 1; // Устанавливаем громкость (1 - максимум)

        // Воспроизводим звук
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Ваш браузер не поддерживает Web Speech API');
    }
}
/* ==================================================================================================== */
/* -----------------------------------------------Создание--------------------------------------------- */
// Создаём функцию для создания книг
function createBook(idBook, title, bookFile){
    let book = document.createElement('div');
    book.classList.add('book');
    book.id = "idBook: " + idBook;
    book.onclick = function(){
        if(bookFile != null){
            let bodyContainer = document.getElementById("body__container");
            bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
            let titleCategory = document.createElement("p");
            titleCategory.id = "title-category";
            titleCategory.textContent = title;
            viewCards.prepend(titleCategory);
            // Получение данных о книгах
            let xhrBooks = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
            xhrBooks.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
            {
                if (xhrBooks.readyState === 4 && xhrBooks.status === 200) // Проверяем, что запрос завершен и успешен
                {
                    bodyContainer.innerHTML = this.responseText;
                }
            };
            xhrBooks.open("POST", bookFile); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
            xhrBooks.send(); // Отправляем запрос на сервер
        }
    }

    let binding = document.createElement('div');
    binding.classList.add('binding');

    let container = document.createElement('div');
    container.classList.add('body__categories');

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "bookmark");
    svg.setAttribute("width", "42");
    svg.setAttribute("height", "43");
    svg.setAttribute("viewBox", "0 0 42 43");
    svg.style.fill = "#B58686";

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svg.appendChild(path);
    book.appendChild(svg);

    let bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = title;

    container.appendChild(svg);
    container.appendChild(bookTitle);

    book.appendChild(binding);
    book.appendChild(container);

    return book;
}
//==================================================
// Создаём функцию для создания категорий
function createCategory(idCategory, title, linkToPicture)
{
    
    let category = document.createElement('div');
    category.classList.add('category');
    category.id = "idCategory: " + idCategory;
    category.onclick = function()
    {
        document.getElementById("body__container").innerHTML = "";   
        let titleCategory = document.createElement("p");
        titleCategory.id = "title-category";
        titleCategory.textContent = title;
        viewCards.prepend(titleCategory);
        getCards("../PHP/cards.php", "Card", idCategory);
    }

    let categoryPicture = document.createElement('div');
    categoryPicture.classList.add('category-picture');

    let pictureImg = document.createElement('img');
    pictureImg.src = linkToPicture;
    pictureImg.classList.add('category-picture');
    categoryPicture.appendChild(pictureImg);

    let categoryTitle = document.createElement('div');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = title;

    let categoryButton = document.createElement('div');
    categoryButton.classList.add('category-button');
    categoryButton.textContent = 'Добавить';
    categoryButton.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
    }

    // Добавление элементов в DOM
    category.appendChild(categoryPicture);
    category.appendChild(categoryTitle);
    category.appendChild(categoryButton);

    return category;
}
// Создаём функцию для создания формы для создания пользователем пользовательских категорий
function createFormUserCustomCategories()
{
    let backgroundModalWindow = document.createElement("div");
    backgroundModalWindow.className = "backgroundModalWindow";

    let form = document.createElement("form");
    form.className = "formUserCustomCategories";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "exitFormUserCustomCategories";
    svg.setAttribute("width", "36");
    svg.setAttribute("height", "36");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.onclick = function()
    {
        backgroundModalWindow.remove();
    }

    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M3 3.44705L32.8484 33");
    path1.setAttribute("stroke", "#333333");
    path1.setAttribute("stroke-width", "5");
    path1.setAttribute("stroke-linecap", "round");

    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M3.15161 32.5529L33 3.00001");
    path2.setAttribute("stroke", "#333333");
    path2.setAttribute("stroke-width", "5");
    path2.setAttribute("stroke-linecap", "round");

    svg.appendChild(path1);
    svg.appendChild(path2);

    let label = document.createElement("label");
    label.className = "labelFormUserCustomCategories";
    label.textContent = "Картинка";

    let inputPicture = document.createElement("input");
    inputPicture.className = "inputPictureFormUserCustomCategories";
    inputPicture.setAttribute("type", "file");

    // Функция заменяет задний фон элемента label на выбранную картинку
    inputPicture.addEventListener("change", function()
    {
        let file = inputPicture.files[0];
        let reader = new FileReader();
        reader.onload = function(e)
        {
          label.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    });

    let inputTitle = document.createElement("input");
    inputTitle.className = "inputTitleFormUserCustomCategories";
    inputTitle.setAttribute("type", "text");
    inputTitle.placeholder = "Название";

    let button = document.createElement("button");
    button.className = "buttonFormUserCustomCategories";
    button.textContent = "Добавить";
    button.onclick = function(event)
    {
        event.preventDefault(); // Отмена действий по отправки формы
        // Проверка на валидацию
        if(inputTitle.value)
        {
            let file = inputPicture.files[0]; // Получение выбранного файла
            let formData = new FormData(); // Создание объекта FormData для отправки файла
            formData.append('file', file); // Добавление файла в объект FormData
            formData.append('title', inputTitle.value); // Добавление файла в объект FormData
            let xhr = new XMLHttpRequest(); // Создание объекта XMLHttpRequest
            xhr.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта xhr
            {
                if (xhr.readyState === 4 && xhr.status === 200) // Проверяем, что запрос завершен и успешен
                {
                    backgroundModalWindow.remove();
                    dictionary.click();
                }
            }
            xhr.open('POST', '../PHP/addUserCategory.php', true); // Настройка запроса
            xhr.send(formData); // Отправка запроса
        }
        else
        {
            let errorMessages = document.querySelectorAll(".error-message");
            errorMessages.forEach(function (errorMessage)
            {
                errorMessage.remove();
            });
            inputTitle.style.borderColor = "#8A666A";
            inputTitle.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        }
    }

    form.appendChild(svg);
    form.appendChild(label);
    form.appendChild(inputPicture);
    form.appendChild(inputTitle);
    form.appendChild(button);

    backgroundModalWindow.appendChild(form);

    document.body.prepend(backgroundModalWindow);
}
// Создаём функцию для создания пользователем пользовательских категорий
function createUserCustomCategories()
{
    let customCategory = document.createElement('div');
    customCategory.classList.add('customCategory');
    customCategory.onclick = function()
    {
        createFormUserCustomCategories();
    }
    let buttonCustomCategory = document.createElement('div');
    buttonCustomCategory.classList.add('buttonCustomCategory');
    buttonCustomCategory.textContent = "Добавить";

    customCategory.appendChild(buttonCustomCategory);
    return customCategory;
}
// Создаём функцию для создания пользовательских категорий
function createUserCategory(idCategory, title, linkToPicture, author)
{
    let category = document.createElement('div');
    category.classList.add('category');
    category.id = "idCategory: " + idCategory;
    category.onclick = function()
    {
        document.getElementById("body__container").innerHTML = "";   
        let titleCategory = document.createElement("p");
        titleCategory.id = "title-category";
        titleCategory.textContent = title;
        titleCategory.value = idCategory;
        viewCards.prepend(titleCategory);
        getCards("../PHP/userCards.php", "User", idCategory, author);
    }

    let categoryPicture = document.createElement('div');
    categoryPicture.classList.add('category-picture');

    let pictureImg = document.createElement('img');
    if(linkToPicture != null)
        pictureImg.src = linkToPicture;
    pictureImg.classList.add('category-picture');
    categoryPicture.appendChild(pictureImg);

    let categoryTitle = document.createElement('div');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = title;
    
    let containerForButton = document.createElement('div');
    containerForButton.classList.add('containerForButton');

    let buttonTrain = document.createElement('div');
    buttonTrain.classList.add('buttonTrain');
    buttonTrain.textContent = 'Тренировать';
    buttonTrain.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
        xhr.open("POST", "../PHP/trainAll.php", true); 
        // Отправляем запрос на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
        xhr.send("idCategory=" + encodeURIComponent(idCategory));
    }

    let buttonDelete = document.createElement('div');
    buttonDelete.classList.add('buttonDelete');
    buttonDelete.textContent = 'Удалить';
    buttonDelete.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        category.remove(); // Удаляем категорию
        // Если эта категория создана пользователем, сначала удаляем все картинки из папки Words созданные пользователем, 
        // затем данные из базы данных о данных карточках, после удаляем картинку и папку с сервера и информацию из базы данных о данной категории
        if(author != null) 
        {
            // Удаляем картинки, папку и данные из базы данных о карточках которые находятся в данной категории
            let xhrCard = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhrCard.open("POST", "../PHP/deleteAllUserCards.php", true); 
            xhrCard.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhrCard.send("idCategory=" + encodeURIComponent(idCategory));

            // Удаляем картинку категории и папку с этой категорией
            let xhrCategory = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhrCategory.open("POST", "../PHP/deleteUserCategory.php", true); 
            xhrCategory.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhrCategory.send("idCategory=" + encodeURIComponent(idCategory) + "&linkToPicture=" + encodeURIComponent(linkToPicture));
        }
        else if(author == null) // Иначе удаляем все карточки из таблицы пользовательские карточки этой категории
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteAllCards.php", true); 
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("idCategory=" + encodeURIComponent(idCategory));
        }
    }

    // Добавление элементов в DOM
    category.appendChild(categoryPicture);
    category.appendChild(categoryTitle);
    containerForButton.appendChild(buttonTrain);
    containerForButton.appendChild(buttonDelete);
    category.appendChild(containerForButton);

    return category;
}
//==================================================
// Создаём функцию для создания формы для создания пользователем пользовательских карточек
function createFormUserCustomCard()
{
    let backgroundModalWindow = document.createElement("div");
    backgroundModalWindow.className = "backgroundModalWindow";

    let form = document.createElement("form");
    form.className = "formUserCustomCard";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "exitFormUserCustomCategories";
    svg.setAttribute("width", "36");
    svg.setAttribute("height", "36");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.onclick = function()
    {
        backgroundModalWindow.remove();
    }

    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M3 3.44705L32.8484 33");
    path1.setAttribute("stroke", "#333333");
    path1.setAttribute("stroke-width", "5");
    path1.setAttribute("stroke-linecap", "round");

    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M3.15161 32.5529L33 3.00001");
    path2.setAttribute("stroke", "#333333");
    path2.setAttribute("stroke-width", "5");
    path2.setAttribute("stroke-linecap", "round");

    svg.appendChild(path1);
    svg.appendChild(path2);

    let label = document.createElement("label");
    label.className = "labelFormUserCustomCard";
    label.textContent = "Картинка";

    let inputPicture = document.createElement("input");
    inputPicture.className = "inputPictureFormUserCustomCard";
    inputPicture.setAttribute("type", "file");

    // Функция заменяет задний фон элемента label на выбранную картинку
    inputPicture.addEventListener("change", function()
    {
        let file = inputPicture.files[0];
        let reader = new FileReader();
        reader.onload = function(e)
        {
          label.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    });

    let wordTargetLanguage = document.createElement("input");
    wordTargetLanguage.className = "inputTitleFormUserCustomCategories";
    wordTargetLanguage.setAttribute("type", "text");
    wordTargetLanguage.placeholder = "Слово на изучаемом языке";

    let transcription = document.createElement("input");
    transcription.className = "inputTitleFormUserCustomCategories";
    transcription.setAttribute("type", "text");
    transcription.placeholder = "[Транскрипция]";

    let wordNativeLanguage = document.createElement("input");
    wordNativeLanguage.className = "inputTitleFormUserCustomCategories";
    wordNativeLanguage.setAttribute("type", "text");
    wordNativeLanguage.placeholder = "Слово на родном языке";

    let containerForLevel = document.createElement("div");
    containerForLevel.className = "containerForLevelFormUserCustomCard";
    
    let titleLevel = document.createElement("input");
    titleLevel.className = "titleLevelFormUserCustomCard";
    titleLevel.placeholder = "1 Уровень";
    titleLevel.disabled = true;
    let level = 1;
    
    let levelOne = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    levelOne.setAttribute("width", "42");
    levelOne.setAttribute("height", "43");
    levelOne.setAttribute("viewBox", "0 0 42 43");
    levelOne.style.fill = "#B58686";
    levelOne.onclick = function()
    {
        titleLevel.placeholder = "1 Уровень";
        level = 1;
    }

    let pathLevelOne = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLevelOne.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    levelOne.appendChild(pathLevelOne);

    let levelTwo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    levelTwo.setAttribute("width", "42");
    levelTwo.setAttribute("height", "43");
    levelTwo.setAttribute("viewBox", "0 0 42 43");
    levelTwo.style.fill = "#8693B5";
    levelTwo.onclick = function()
    {
        titleLevel.placeholder = "2 Уровень";
        level = 2;
    }

    let pathLevelTwo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLevelTwo.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    levelTwo.appendChild(pathLevelTwo);

    let levelThree = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    levelThree.setAttribute("width", "42");
    levelThree.setAttribute("height", "43");
    levelThree.setAttribute("viewBox", "0 0 42 43");
    levelThree.style.fill = "#87B586";
    levelThree.onclick = function()
    {
        titleLevel.placeholder = "3 Уровень";
        level = 3;
    }

    let pathLevelThree = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLevelThree.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    levelThree.appendChild(pathLevelThree);

    containerForLevel.appendChild(titleLevel);
    containerForLevel.appendChild(levelOne);
    containerForLevel.appendChild(levelTwo);
    containerForLevel.appendChild(levelThree);

    let context = document.createElement("textarea");
    context.className = "contextFormUserCustomCard";
    context.setAttribute("type", "text");
    context.placeholder = "Контекст  (предложение с этим словом на изучаемом языке)";

    let button = document.createElement("button");
    button.className = "buttonFormUserCustomCategories";
    button.textContent = "Добавить";
    button.onclick = function(event)
    {
        event.preventDefault(); // Отмена действий по отправки формы
        // Проверка на валидацию
        let errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function (errorMessage)
        {
            errorMessage.remove();
        });
        wordTargetLanguage.removeAttribute("style");
        wordNativeLanguage.removeAttribute("style");
        if(wordTargetLanguage.value == "")
        {  
            wordTargetLanguage.style.borderColor = "#8A666A";
            wordTargetLanguage.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        }
        if(wordNativeLanguage.value == "")
        {
            wordNativeLanguage.style.borderColor = "#8A666A";
            wordNativeLanguage.insertAdjacentHTML("afterend", "<p class='error-message' style='margin: 0; color: #333333;'>Поле не заполнено</p>");
        }
        if(wordTargetLanguage.value && wordNativeLanguage.value)
        {
            let file = inputPicture.files[0]; // Получение выбранного файла
            let formData = new FormData(); // Создание объекта FormData для отправки файла
            formData.append('file', file); // Добавление файла в объект FormData
            formData.append('wordTargetLanguage', wordTargetLanguage.value); // Добавление файла в объект FormData
            formData.append('transcription', transcription.value); // Добавление файла в объект FormData
            formData.append('wordNativeLanguage', wordNativeLanguage.value); // Добавление файла в объект FormData
            formData.append('level', level); // Добавление файла в объект FormData
            formData.append('context', context.value); // Добавление файла в объект FormData
            let idCategory = document.getElementById("title-category");
            formData.append('idCategory', idCategory.value); // Добавление файла в объект FormData

            let xhr = new XMLHttpRequest(); // Создание объекта XMLHttpRequest
            xhr.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта xhr
            {
                if (xhr.readyState === 4 && xhr.status === 200) // Проверяем, что запрос завершен и успешен
                {
                    backgroundModalWindow.remove();
                    dictionary.click();
                }
            }
            xhr.open('POST', '../PHP/addUserCard.php', true); // Настройка запроса
            xhr.send(formData); // Отправка запроса
        }
    }

    form.appendChild(svg);
    form.appendChild(label);
    form.appendChild(inputPicture);
    form.appendChild(wordTargetLanguage);
    form.appendChild(transcription);
    form.appendChild(wordNativeLanguage);
    form.appendChild(containerForLevel);
    form.appendChild(context);
    form.appendChild(button);

    backgroundModalWindow.appendChild(form);

    document.body.prepend(backgroundModalWindow);
}
//==================================================
// Создаём функцию для создания пользователем пользовательских карточек
function createUserCustomCard()
{
    let customCard = document.createElement('div');
    customCard.classList.add('customCard');
    customCard.onclick = function()
    {
        createFormUserCustomCard();
    }
    
    let buttonCustomCard = document.createElement('div');
    buttonCustomCard.classList.add('buttonCustomCard');
    buttonCustomCard.textContent = "Добавить";

    customCard.appendChild(buttonCustomCard);
    return customCard;
}
//==================================================
// Создаем функцию для создания открытой карточки
function createOpenCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, added, level, transcriptionContent, contextContent, type)
{
    let backgroundModalWindow = document.createElement("div");
    backgroundModalWindow.className = "backgroundModalWindow";

    let openCard = document.createElement("div");
    openCard.className = "openCard";

    var svgExit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgExit.id = "exitFormUserCustomCategories";
    svgExit.setAttribute("width", "36");
    svgExit.setAttribute("height", "36");
    svgExit.setAttribute("viewBox", "0 0 36 36");
    svgExit.onclick = function()
    {
        backgroundModalWindow.remove();
    }

    var path1Exit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1Exit.setAttribute("d", "M3 3.44705L32.8484 33");
    path1Exit.setAttribute("stroke", "#333333");
    path1Exit.setAttribute("stroke-width", "5");
    path1Exit.setAttribute("stroke-linecap", "round");

    var path2Exit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2Exit.setAttribute("d", "M3.15161 32.5529L33 3.00001");
    path2Exit.setAttribute("stroke", "#333333");
    path2Exit.setAttribute("stroke-width", "5");
    path2Exit.setAttribute("stroke-linecap", "round");

    svgExit.appendChild(path1Exit);
    svgExit.appendChild(path2Exit);

    openCard.appendChild(svgExit);

    let cardPicture = document.createElement('div');
    cardPicture.className = 'pictureForOpenCard';

    let picture = document.createElement('img');
    if(linkToPicture != null)
        picture.src = linkToPicture;
    picture.alt = '';
    cardPicture.appendChild(picture);

    let svgLevel = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgLevel.setAttribute("class", "card-level");
    svgLevel.setAttribute("width", "42");
    svgLevel.setAttribute("height", "43");
    svgLevel.setAttribute("viewBox", "0 0 42 43");
    switch(Number(level))
    {
        case 1: svgLevel.style.fill = "#B58686"; break;
        case 2: svgLevel.style.fill = "#8693B5"; break;
        case 3: svgLevel.style.fill = "#87B586"; break;
    }

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svgLevel.appendChild(path);
    cardPicture.appendChild(svgLevel);
    openCard.appendChild(cardPicture);

    // Создание div для слова
    let cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.textContent = wordsInTheTargetLanguage;
    openCard.appendChild(cardWord);

    // Создание div для перевода
    let cardTranslate = document.createElement('div');
    cardTranslate.className = 'card-translate';
    cardTranslate.textContent = wordsInNativeLanguage;
    openCard.appendChild(cardTranslate);

    // Создание div для кнопок
    let cardButtons = document.createElement('div');
    cardButtons.className = 'cardButtonsForOpenCard';

    // Если открытая карточка для тренировки или личного кабинета то добавить кнопку для тренировки
    if(type == "User" || type == "Train")
    {
        // Создание div для кнопки "Тренировать"
        let buttonTrain = document.createElement('div');
        buttonTrain.className = "cardButtonAddForOpenCard";
        buttonTrain.textContent = 'T';
        cardButtons.appendChild(buttonTrain);
        if (added == 1)
        {
            buttonTrain.classList.add("entered-button");
            buttonTrain.classList.remove("enter-button");
        }
        else
        {
            buttonTrain.classList.add("enter-button");
            buttonTrain.classList.remove("entered-button");
        }
        buttonTrain.onclick = function(event)
        {
            event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
            if(type == "Train") // Если тип карточки для тренировки
            {
                document.getElementById(cardId).remove(); // Удалить карточку
                backgroundModalWindow.remove();
            }
            if(buttonTrain.classList.contains("enter-button")) // Если карточка не добавлена, добавить
                added = 1;
            else
                added = 0;
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/trainCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId) + "&train=" + encodeURIComponent(added));
            switchButtonClass(buttonTrain);
            if(type == "User")
            {
                switchButtonClass(document.getElementById(cardId).getElementsByClassName("card-button-train")[0]);
                document.getElementById(cardId).getElementsByClassName("card-button-train")[0].value = added;
            }
        }
    }
    else
    {
        // Создание div для кнопки "Добавить"
        let cardButtonAdd = document.createElement('div');
        cardButtonAdd.className = 'cardButtonAddForOpenCard';
        cardButtonAdd.innerText = '+';
        cardButtons.appendChild(cardButtonAdd);
        if (added == 1)
        {
            cardButtonAdd.classList.add("entered-button");
            cardButtonAdd.classList.remove("enter-button");
        }
        else
        {
            cardButtonAdd.classList.add("enter-button");
            cardButtonAdd.classList.remove("entered-button");
        }
        cardButtonAdd.onclick = function(event)
        {
            event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
            if(cardButtonAdd.classList.contains("enter-button")) // Если карточка не добавлена, добавить
            {
                added = 1;
                let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
                xhr.open("POST", "../PHP/addCard.php", true);
                // Отправляем запрос на сервер
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
                xhr.send("cardId=" + encodeURIComponent(cardId));
            }
            else // Иначе удалить
            {
                added = 0;
                let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
                xhr.open("POST", "../PHP/deleteCard.php", true); 
                // Отправляем запрос на сервер
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
                xhr.send("cardId=" + encodeURIComponent(cardId));
            }
            switchButtonClass(cardButtonAdd);
            switchButtonClass(document.getElementById(cardId).getElementsByClassName("card-button-add")[0]);
            document.getElementById(cardId).getElementsByClassName("card-button-add")[0].value = added;
        }
    }
    
    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.onclick = function(){
        speakWord(wordsInTheTargetLanguage);
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
    cardButtons.appendChild(cardButtonSound);

    openCard.appendChild(cardButtons);

    // Транскрипция
    let transcription = document.createElement("div");
    transcription.className = 'transcription';
    if(transcriptionContent != null)
        transcription.textContent = transcriptionContent;

    // Контекст
    let context = document.createElement("div");
    context.className = 'context';
    if(contextContent != null)
        context.textContent = contextContent;

    openCard.appendChild(transcription);
    openCard.appendChild(context);

    backgroundModalWindow.appendChild(openCard);

    document.body.prepend(backgroundModalWindow);
}
// Создаем функцию для создания карточки
function createCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, added, level, transcriptionContent, contextContent)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;
    card.onclick = function()
    {
        createOpenCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, cardButtonAdd.value, level, transcriptionContent, contextContent, "Card");
    }

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
    if(linkToPicture != null)
        picture.src = linkToPicture;
    picture.alt = '';
    cardPicture.appendChild(picture);

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "card-level");
    svg.setAttribute("width", "42");
    svg.setAttribute("height", "43");
    svg.setAttribute("viewBox", "0 0 42 43");
    switch(Number(level))
    {
        case 1: svg.style.fill = "#B58686"; break;
        case 2: svg.style.fill = "#8693B5"; break;
        case 3: svg.style.fill = "#87B586"; break;
    }

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svg.appendChild(path);
    cardPicture.appendChild(svg);
    card.appendChild(cardPicture);

    // Создание div для слова
    let cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.textContent = wordsInTheTargetLanguage;
    card.appendChild(cardWord);

    // Создание div для перевода
    let cardTranslate = document.createElement('div');
    cardTranslate.className = 'card-translate';
    cardTranslate.textContent = wordsInNativeLanguage;
    card.appendChild(cardTranslate);

    // Создание div для кнопок
    let cardButtons = document.createElement('div');
    cardButtons.className = 'card-buttons';

    // Создание div для кнопки "Добавить"
    let cardButtonAdd = document.createElement('div');
    cardButtonAdd.className = 'card-button-add';
    cardButtonAdd.innerText = '+';
    cardButtonAdd.value = added;
    cardButtons.appendChild(cardButtonAdd);
    if (added == 1) // Если карточка выбрана
    {
        cardButtonAdd.classList.add("entered-button");
        cardButtonAdd.classList.remove("enter-button");
    }
    else // Если карточка не выбрана
    {
        cardButtonAdd.classList.add("enter-button");
        cardButtonAdd.classList.remove("entered-button");
    }
    cardButtonAdd.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        if(cardButtonAdd.classList.contains("enter-button")) // Если карточка не добавлена, добавить
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/addCard.php", true);
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
            cardButtonAdd.value = 1;
        }
        else // Иначе удалить
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
            cardButtonAdd.value = 0;
        }
        switchButtonClass(cardButtonAdd);
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.onclick = function(event){
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        speakWord(wordsInTheTargetLanguage);
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
    cardButtons.appendChild(cardButtonSound);
    card.appendChild(cardButtons);

    return card;
}
//==================================================
// Создаем функцию для создания карточки для тренировки
function createCardForTrain(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train, level, transcriptionContent, contextContent)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;
    card.onclick = function()
    {
        createOpenCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train, level, transcriptionContent, contextContent, "Train");
    }

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
    if(linkToPicture != null)
        picture.src = linkToPicture;
    picture.alt = '';
    cardPicture.appendChild(picture);

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "card-level");
    svg.setAttribute("width", "42");
    svg.setAttribute("height", "43");
    svg.setAttribute("viewBox", "0 0 42 43");
    switch(Number(level))
    {
        case 1: svg.style.fill = "#B58686"; break;
        case 2: svg.style.fill = "#8693B5"; break;
        case 3: svg.style.fill = "#87B586"; break;
    }

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svg.appendChild(path);
    cardPicture.appendChild(svg);
    card.appendChild(cardPicture);

    // Создание div для слова
    let cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.textContent = wordsInTheTargetLanguage;
    card.appendChild(cardWord);

    // Создание div для перевода
    let cardTranslate = document.createElement('div');
    cardTranslate.className = 'card-translate';
    cardTranslate.textContent = wordsInNativeLanguage;
    card.appendChild(cardTranslate);

    // Создание div для кнопок
    let cardButtons = document.createElement('div');
    cardButtons.className = 'card-buttons';

    // Создание div для кнопки "Тренировать"
    let buttonTrain = document.createElement('div');
    buttonTrain.className = "card-button-train";
    buttonTrain.textContent = 'T';
    cardButtons.appendChild(buttonTrain);
    if (train == 1)
    {
        buttonTrain.classList.add("entered-button");
        buttonTrain.classList.remove("enter-button");
    }
    else
    {
        buttonTrain.classList.add("enter-button");
        buttonTrain.classList.remove("entered-button");
    }
    buttonTrain.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        document.getElementById(cardId).remove();
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
        xhr.open("POST", "../PHP/trainCard.php", true); 
        // Отправляем запрос на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
        xhr.send("cardId=" + encodeURIComponent(cardId) + "&train=" + encodeURIComponent(0));
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.onclick = function(event){
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        speakWord(wordsInTheTargetLanguage);
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
    cardButtons.appendChild(cardButtonSound);

    card.appendChild(cardButtons);

    return card;
}
//==================================================
// Создаем функцию для создания модулей во вкладке упражнения
function createModule(idModule, title){
    let module = document.createElement('div');
    module.classList.add('module');
    module.id = "idModule: " + idModule;
    module.onclick = function()
    {
        document.getElementById("body__container").innerHTML = "";   
        let titleModule = document.createElement("p");
        titleModule.id = "title-category";
        titleModule.textContent = title;
        viewCards.prepend(titleModule);
        getGroupExercise(idModule);
    }

    let moduleInside = document.createElement('div');
    moduleInside.classList.add('module-inside');

    let moduleTitle = document.createElement('div');
    moduleTitle.classList.add('category-title');
    moduleTitle.textContent = title;

    // Добавление элементов в DOM
    module.appendChild(moduleInside);
    moduleInside.appendChild(moduleTitle);

    return module;
}
//==================================================
// Создаем функцию для создания групп упражнений во вкладке упражнения
function createGroupExercise(idGroupExercise, task, title, grade){
    let groupExercise = document.createElement('div');
    groupExercise.classList.add('groupExercise');
    groupExercise.id = "idGroupExercise: " + idGroupExercise;
    groupExercise.onclick = function()
    {
        document.getElementById("title-category").textContent = title;
        getExercise(idGroupExercise);
    }

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "groupExercise-level");
    svg.setAttribute("width", "42");
    svg.setAttribute("height", "43");
    svg.setAttribute("viewBox", "0 0 42 43");
    let level;
    if(grade != null)
    {
        if (grade >= 0 && grade <= 33)
            level = 1;
        else if (grade > 33 && grade <= 66)
            level = 2;
        else if (grade > 66 && grade <= 100)
            level = 3;
    }
    switch(Number(level))
    {
        case 1: svg.style.fill = "#B58686"; break;
        case 2: svg.style.fill = "#8693B5"; break;
        case 3: svg.style.fill = "#87B586"; break;
    }

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svg.appendChild(path);

    let groupExerciseTask = document.createElement('div');
    groupExerciseTask.classList.add('groupExercise-title');
    groupExerciseTask.textContent = task;

    let groupExerciseButton = document.createElement('div');
    groupExerciseButton.classList.add('category-button');
    groupExerciseButton.textContent = title;

    // Добавление элементов в DOM
    groupExercise.appendChild(svg);
    groupExercise.appendChild(groupExerciseTask);
    groupExercise.appendChild(groupExerciseButton);
    
    return groupExercise;
}
//==================================================
// Создаем функцию для создания упражнений во вкладке упражнения
function createExercise(jsonData, idGroupExercise){
    let exercise = document.createElement("div");
    exercise.id = "practiceWords";
    let counter = document.createElement("div"); // Счетчик для отображения сколько из скольки пройдено упражнений
    counter.id = "counter"
    let exerciseIterator = 0; // Итератор упражнения
    let numberOfCorrectAnswers = 0; // Количество правильных ответов
    // Кол-бэк функция для обновления количества правильных ответов
    function updateCorrectAnswers() {
        numberOfCorrectAnswers++;
    }
    counter.textContent = exerciseIterator + "/" + jsonData.length;
    let exerciseContainer = document.createElement("div"); // Контейнер для самого упражнения
    exerciseContainer.appendChild(grammarVocabularyExercises[jsonData[exerciseIterator].exerciseType](jsonData, exerciseIterator, updateCorrectAnswers));
    let buttonNext = document.createElement("button"); // Кнопка для переключения на следующее упражнение
    buttonNext.textContent = "Далее";
    buttonNext.id = "buttonNext";
    buttonNext.onclick = function(){
        exerciseIterator++; // Увеличиваем значение итератора упражнения
        counter.textContent = exerciseIterator + "/" + jsonData.length; // Обновляем значение счетчика
        exerciseContainer.innerHTML = ""; // Отчищаем контейнер для упражнений
        if(exerciseIterator != jsonData.length)
        {
            buttonNext.style.display = "none";
            exerciseContainer.appendChild(grammarVocabularyExercises[jsonData[exerciseIterator].exerciseType](jsonData, exerciseIterator, updateCorrectAnswers));
        }    
        else{
            exercise.innerHTML = ""; // Отчищаем рабочую область
            let endWords = document.createElement("div");
            endWords.textContent = "Упражнений больше нет. Правильных ответов " + numberOfCorrectAnswers + " из " + jsonData.length + ".";
            // Запрос на создание или обновление оценки за тест.
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/addUserExercises.php", true);
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("grade=" + encodeURIComponent(numberOfCorrectAnswers * 100 / jsonData.length) + "&idGroupExercise=" + encodeURIComponent(idGroupExercise));
            exercise.appendChild(endWords);
        }
    }

    exercise.appendChild(counter);
    exercise.appendChild(exerciseContainer);
    exercise.appendChild(buttonNext);

    return exercise;
}
//--------------------------------------------------
// Создаём "грамматика, словарь упражнений" и добавляем в него функцию для создания упражнения "Write"
let grammarVocabularyExercises = {"Write" : function createExerciseWrite(jsonData, exerciseIterator, updateCorrectAnswers){
        let exerciseWrite =  document.createElement("div");
        exerciseWrite.id = "writeTheWord";

        let task = document.createElement("div"); // Задание
        task.classList.add('task');
        task.textContent = jsonData[exerciseIterator].task;

        let sentence = document.createElement("div"); // Предложение
        sentence.classList.add('sentence');
        sentence.textContent = jsonData[exerciseIterator].sentence;

        let variableCorrectAnswer = jsonData[exerciseIterator].correctAnswer;
        let arrayWordsCorrectAnswer = variableCorrectAnswer.split(" "); // Создаем массив из правильного ответа
        let variableIncorrectAnswer = jsonData[exerciseIterator].incorrectAnswer;
        let arrayWordsIncorrectAnswer = variableIncorrectAnswer.split(" "); // Создаем массив из не правильного ответа
        let arrayWords = arrayWordsCorrectAnswer.concat(arrayWordsIncorrectAnswer); // Создаем общий массив из правильного и не правильного ответа
        arrayWords.sort(() => Math.random() - 0.5); // Перемешиваем общий массив
        
        let containerForWords = document.createElement("div");
        containerForWords.id = "containerForTargetWord";
        arrayWords.forEach(element => {
            let containerForWord = document.createElement("div");
            containerForWord.classList.add('containerForWord');
            containerForWord.textContent = element;
            containerForWords.appendChild(containerForWord);
        });

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
        buttonCheck.onclick = function(){
            if(jsonData[exerciseIterator].correctAnswer.toUpperCase() == targetWord.value.toUpperCase().trim())
                {
                    correctAnswer.textContent = "Правильный ответ: " + jsonData[exerciseIterator].correctAnswer;
                    correctAnswer.style.display = "block";
                    targetWord.style.boxShadow = "inset 0 0 0 3px #718A66";
                    buttonCheck.style.display = "none";
                    document.getElementById("buttonNext").style.display = "block";
                    updateCorrectAnswers(); // Обновляем количество правильных ответов
                    speakWord(jsonData[exerciseIterator].correctAnswer);
                }
                else
                {
                    targetWord.style.boxShadow = "inset 0 0 0 3px #8A666A";
                    incorrectAnswer.textContent = "Не правильный ответ";
                    incorrectAnswer.style.display = "block";
                    correctAnswer.textContent = "Правильный ответ: " + jsonData[exerciseIterator].correctAnswer;
                    correctAnswer.style.display = "block";
                    buttonCheck.style.display = "none";
                    document.getElementById("buttonNext").style.display = "block";
                    speakWord(jsonData[exerciseIterator].correctAnswer);
                }
        }

        exerciseWrite.appendChild(task);
        exerciseWrite.appendChild(sentence);
        exerciseWrite.appendChild(containerForWords);
        exerciseWrite.appendChild(targetWord);
        exerciseWrite.appendChild(incorrectAnswer);
        exerciseWrite.appendChild(correctAnswer);
        exerciseWrite.appendChild(buttonCheck);

        return exerciseWrite;
    }
}
//==================================================
// Создаем функцию для создания карточки для пользователя
function createCardForUser(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train, level, author, transcriptionContent, contextContent)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;
    card.onclick = function()
    {
        createOpenCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, buttonTrain.value, level, transcriptionContent, contextContent, "User");
    }

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
    if(linkToPicture != null)
        picture.src = linkToPicture;
    picture.alt = '';
    cardPicture.appendChild(picture);

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "card-level");
    svg.setAttribute("width", "42");
    svg.setAttribute("height", "43");
    svg.setAttribute("viewBox", "0 0 42 43");
    switch(Number(level))
    {
        case 1: svg.style.fill = "#B58686"; break;
        case 2: svg.style.fill = "#8693B5"; break;
        case 3: svg.style.fill = "#87B586"; break;
    }
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1 1H41V41.5L21 30L1 41V1Z");
    svg.appendChild(path);
    cardPicture.appendChild(svg);
    card.appendChild(cardPicture);

    // Создание div для слова
    let cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.textContent = wordsInTheTargetLanguage;
    card.appendChild(cardWord);

    // Создание div для перевода
    let cardTranslate = document.createElement('div');
    cardTranslate.className = 'card-translate';
    cardTranslate.textContent = wordsInNativeLanguage;
    card.appendChild(cardTranslate);

    // Создание div для кнопок
    let cardButtons = document.createElement('div');
    cardButtons.className = 'card-buttons';

    // Создание div для кнопки "Тренировать"
    let buttonTrain = document.createElement('div');
    buttonTrain.className = "card-button-train";
    buttonTrain.textContent = 'T';
    buttonTrain.style.width = "60px";
    buttonTrain.value = train;
    cardButtons.appendChild(buttonTrain);
    if (train == 1)
    {
        buttonTrain.classList.add("entered-button");
        buttonTrain.classList.remove("enter-button");
    }
    else
    {
        buttonTrain.classList.add("enter-button");
        buttonTrain.classList.remove("entered-button");
    }
    buttonTrain.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        if(buttonTrain.classList.contains("enter-button")) // Если карточка не добавлена, добавить
        {
            train = 1;
            buttonTrain.value = 1;
        }
        else
        {
            train = 0;
            buttonTrain.value = 0;
        }
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
        xhr.open("POST", "../PHP/trainCard.php", true); 
        // Отправляем запрос на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
        xhr.send("cardId=" + encodeURIComponent(cardId) + "&train=" + encodeURIComponent(train));
        switchButtonClass(buttonTrain);
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.style.width = "60px";
    cardButtonSound.onclick = function(event){
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        speakWord(wordsInTheTargetLanguage);
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
    cardButtons.appendChild(cardButtonSound);

    // Создание div для кнопки "Удалить"
    let buttonDelete = document.createElement('div');
    buttonDelete.className = "card-button-delete";
    buttonDelete.textContent = 'X';
    buttonDelete.style.width = "60px";
    buttonDelete.onclick = function(event)
    {
        event.stopPropagation(); // Функция останавливает выполнение функции по нажатию на категорию
        document.getElementById(cardId).remove();
        if(author == null) // Если карточка не пользовательская тогда выполнить запрос на удаления слова только из таблицы UserDictionary
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
        }
        else if(author != null) // Если карточка пользовательская тогда выполнить запрос на удаления слова из таблиц UserDictionary, DictionaryCategory, Dictionary
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteUserCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId) + "&linkToPicture=" + encodeURIComponent(linkToPicture));
        }
    }
    cardButtons.appendChild(buttonDelete);

    card.appendChild(cardButtons);

    return card;
}
//==================================================
// Функция создания для создания карточек настроек
function createSettingCards(settingLabel)
{
    // Создаем основной элемент div с классом "settings__card"
    let settingsCard = document.createElement("div");
    settingsCard.classList.add("settings__card");

    // Создаем элемент div с классом "active-picture"
    let activePicture = document.createElement("div");
    activePicture.classList.add("active-picture");

    // Создаем элемент label с классом "switch"
    let label = document.createElement("label");
    label.classList.add("switch-settings");

    // Создаем элемент input с атрибутом type равным "checkbox"
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = "checkbox id: " + settingLabel;
    checkbox.name = "checkbox name: " + settingLabel;
    checkbox.autocomplete = "Off";
        
    if(sessionStorage.getItem("active-picture: " + settingLabel) == "true")
        checkbox.checked = true;
    else
        checkbox.checked = false;

    checkbox.onclick = function()
    {
        if(checkbox.checked)
            sessionStorage.setItem("active-picture: " + settingLabel, "true");
        else
            sessionStorage.setItem("active-picture: " + settingLabel, "false");
    }

    // Создаем элемент span с классом "slider"
    let slider = document.createElement("span");
    slider.classList.add("slider-settings");

    if(settingLabel == "Сопоставление слов") // Блокируем кнопку включения, выключения картинки для упражнения "Сопоставление слов"
    {
        label.style.pointerEvents = "none"; // Отключаем все события мыши
        label.style.opacity = "0.5"; // Делаем элемент полупрозрачным
    }

    // Добавляем элементы checkbox и slider внутрь элемента label
    label.appendChild(checkbox);
    label.appendChild(slider);

    // Создаем элемент div с классом "active-picture__picture"
    let activePicturePicture = document.createElement("div");
    activePicturePicture.classList.add("active-picture__picture");
    activePicturePicture.textContent = "Карточка";

    // Добавляем элементы label и activePicturePicture внутрь элемента activePicture
    activePicture.appendChild(label);
    activePicture.appendChild(activePicturePicture);

    // Создаем элемент div с классом "active-setting"
    let activeSetting = document.createElement("div");
    activeSetting.classList.add("active-setting");

    // Создаем элемент div с классом "active-setting__button"
    let activeSettingButton = document.createElement("div");
    activeSettingButton.classList.add("active-setting__button");
    activeSettingButton.setAttribute("value", sessionStorage.getItem("active-setting: " + settingLabel));
    activeSettingButton.textContent = "+";
    if(activeSettingButton.getAttribute("value") == "true")
    {
        activeSettingButton.classList.add("active-setting__button__entered");
    }
    activeSettingButton.onclick = function()
    {
        if(activeSettingButton.getAttribute("value") == "true")
        {
            activeSettingButton.classList.remove("active-setting__button__entered");
            activeSettingButton.setAttribute("value", "false");
            sessionStorage.setItem("active-setting: " + settingLabel, "false");
        }
        else
        {
            activeSettingButton.classList.add("active-setting__button__entered");
            activeSettingButton.setAttribute("value", "true");
            sessionStorage.setItem("active-setting: " + settingLabel, "true");
        }
    }

    // Создаем элемент div с классом "active-setting__label"
    let activeSettingLabel = document.createElement("div");
    activeSettingLabel.classList.add("active-setting__label");
    activeSettingLabel.textContent = settingLabel;

    // Добавляем элементы activeSettingButton и activeSettingLabel внутрь элемента activeSetting
    activeSetting.appendChild(activeSettingButton);
    activeSetting.appendChild(activeSettingLabel);

    // Добавляем элементы activePicture и activeSetting внутрь элемента settingsCard
    settingsCard.appendChild(activePicture);
    settingsCard.appendChild(activeSetting);

    return settingsCard;
}
/* ==================================================================================================== */
/* ----------------------------------------------Отображение------------------------------------------- */
// Функция для отображения грамматики
function getGrammar(){
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyBooks = document.createElement('div'); // Создаём контейнер для книг
    bodyBooks.classList.add('body__categories');
    bodyContainer.appendChild(bodyBooks);

    // Получение данных о книгах
    let xhrBooks = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrBooks.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrBooks.readyState === 4 && xhrBooks.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrBooks.responseText); // Разбираем JSON-данные
            let groupBookJsonData = jsonData.groupBookData;
            let bookJsonData = jsonData.bookData;
            for (let i = 0; i < groupBookJsonData.length; i++) // Пробегаемся по группе книг и создаем под них контейнеры
            {
                let groupBookData = groupBookJsonData[i];

                let groupBook = document.createElement('div');
                groupBook.classList.add('group-category');
                groupBook.textContent = groupBookData.title;

                let bookContainer = document.createElement('div');
                bookContainer.classList.add('category__container');
                bookContainer.id = "groupBook: " + groupBookData.idGroupBook;

                bodyBooks.appendChild(groupBook);
                bodyBooks.appendChild(bookContainer);
            }

            for (let i = 0; i < bookJsonData.length; i++)
            {
                let bookJson = bookJsonData[i];
                let book = createBook(bookJson.idBook, bookJson.title, bookJson.book);
                let bookContainer = document.getElementById("groupBook: " + bookJson.groupBook);
                bookContainer.appendChild(book);
            }
        }
    };
    xhrBooks.open("POST", "../PHP/books.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrBooks.send(); // Отправляем запрос на сервер
}
//==================================================
// Функция для отображения категорий
function getCategories()
{
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyCategories = document.createElement('div'); // Создаём контейнер для категорий
    bodyCategories.classList.add('body__categories');
    bodyContainer.appendChild(bodyCategories);

    // Получение данных о категориях
    let xhrCategories = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrCategories.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCategories.readyState === 4 && xhrCategories.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrCategories.responseText); // Разбираем JSON-данные
            let groupCategoryJsonData = jsonData.groupCategoryData;
            let categoryJsonData = jsonData.categoryData;
            for (let i = 0; i < groupCategoryJsonData.length; i++) 
            {
                let groupCategoryData = groupCategoryJsonData[i];

                let groupCategory = document.createElement('div');
                groupCategory.classList.add('group-category');
                groupCategory.textContent = groupCategoryData.title;

                let categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category__container');
                categoryContainer.id = "groupCategory: " + groupCategoryData.idGroupCategory;

                bodyCategories.appendChild(groupCategory);
                bodyCategories.appendChild(categoryContainer);
            }

            for (let i = 0; i < categoryJsonData.length; i++)
            {
                let categoryData = categoryJsonData[i];
                let category = createCategory(categoryData.idCategory, categoryData.title, categoryData.linkToPicture);
                let categoryContainer = document.getElementById("groupCategory: " + categoryData.groupCategory);
                categoryContainer.appendChild(category);
            }
        }
    };
    xhrCategories.open("POST", "../PHP/categories.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrCategories.send(); // Отправляем запрос на сервер
}
//==================================================
// Функция для отображения пользовательских категорий
function getUserCategories()
{
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyCategories = document.createElement('div'); // Создаём контейнер для категорий
    bodyCategories.classList.add('category__container');
    bodyContainer.appendChild(bodyCategories);

    // Получение данных о категориях
    let xhrCategories = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrCategories.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCategories.readyState === 4 && xhrCategories.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrCategories.responseText); // Разбираем JSON-данные
            bodyCategories.appendChild(createUserCustomCategories());
            for(let i = 0; i < jsonData.length; i++)
            {
                category = createUserCategory(jsonData[i].idCategory, jsonData[i].title, jsonData[i].linkToPicture, jsonData[i].author);
                bodyCategories.appendChild(category);
            }
        }
    };
    xhrCategories.open("POST", "../PHP/userCategories.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrCategories.send(); // Отправляем запрос на сервер
}
//==================================================
// Функция для отображения карточек
function getCards(path, type, idCategory, author)
{
    // Получение данных о карточках
    document.getElementById("body__container").innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let cardsContainer = document.createElement("div");
    cardsContainer.className = "body__cards-container";
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.appendChild(cardsContainer);
    let xhrCards = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    //--------------------------------------------------
    xhrCards.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCards.readyState === 4 && xhrCards.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrCards.responseText); // Разбираем JSON-данные
            cardsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек

            // Создаем карточки и добавляем их в контейнер
            if(type == "Card")
            {
                let addAll = document.createElement("div");
                addAll.className = "button-all";
                addAll.textContent = "Добавить всё";
                bodyContainer.prepend(addAll);
                bodyContainer.style.paddingTop = "100px";
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    let card = createCard(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.added, cardData.level, cardData.transcription, cardData.context);
                    cardsContainer.appendChild(card);
                }
            }
            else if(type == "User") // Для пользовательских карточек
            {
                let trainAll = document.createElement("div");
                trainAll.className = "button-all";
                trainAll.textContent = "Тренировать все";
                trainAll.onclick = function() // Запрос на добавление в тренировку всех слов в категории
                {
                    let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
                    xhr.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
                    {
                        if (xhr.readyState === 4 && xhr.status === 200) // Проверяем, что запрос завершен и успешен
                        {
                            // Пробегаемся по всему контейнеру и обращение к каждому элементу
                            cardsContainer.childNodes.forEach(element => {
                                element.getElementsByClassName("card-button-train")[0].classList.remove("enter-button");
                                element.getElementsByClassName("card-button-train")[0].classList.add("entered-button");
                            });
                        }
                    }
                    xhr.open("POST", "../PHP/trainAll.php", true); 
                    // Отправляем запрос на сервер
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
                    xhr.send("idCategory=" + encodeURIComponent(idCategory));
                }
                bodyContainer.prepend(trainAll);
                bodyContainer.style.paddingTop = "100px";
                if(author != null) // Если категория создана пользователем добавить возможность добавить пользовательскую карточку в эту категорию
                    cardsContainer.appendChild(createUserCustomCard());
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    let card = createCardForUser(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train, cardData.level, author, cardData.transcription, cardData.context);
                    cardsContainer.appendChild(card);
                }
            }
            else if(type == "Train") // Для карточек во вкладке тренировка
            {
                if(jsonData.length == 0) // Если карточек для тренировки нет тогда вывести надпись
                {
                    let practiceWords = document.createElement("div");
                    practiceWords.id = "practiceWords";
                    let addWordsForTrain = document.createElement("div");
                    addWordsForTrain.textContent = 'Добавьте слова для тренировки во вкладке "Личный кабинет"';
                    practiceWords.appendChild(addWordsForTrain);
                    bodyContainer.appendChild(practiceWords);
                }
                for (let i = 0; i < jsonData.length; i++) // Иначе вывести карточки для тренировки
                {
                    let cardData = jsonData[i];
                    let card = createCardForTrain(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train, cardData.level, cardData.transcription, cardData.context);
                    cardsContainer.appendChild(card);
                }
            }
        }
    };
    xhrCards.open("POST", path); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
    xhrCards.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhrCards.send("idCategory=" + encodeURIComponent(idCategory));
}
//==================================================
// Функция для отображения модулей
function getModule(){
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyModule = document.createElement('div'); // Создаём контейнер для книг
    bodyModule.classList.add('body__categories');
    bodyContainer.appendChild(bodyModule);
    //--------------------------------------------------
    // Получение данных о упражнениях
    let xhrModule = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrModule.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrModule.readyState === 4 && xhrModule.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrModule.responseText); // Разбираем JSON-данные
            let groupModuleJsonData = jsonData.groupModuleData;
            let moduleJsonData = jsonData.moduleData;
            for (let i = 0; i < groupModuleJsonData.length; i++) // Пробегаемся по группе книг и создаем под них контейнеры
            {
                let groupModuleData = groupModuleJsonData[i];

                let groupModule = document.createElement('div');
                groupModule.classList.add('group-category');
                groupModule.textContent = groupModuleData.title;

                let moduleContainer = document.createElement('div');
                moduleContainer.classList.add('category__container');
                moduleContainer.id = "groupModule: " + groupModuleData.idGroupModule;

                bodyModule.appendChild(groupModule);
                bodyModule.appendChild(moduleContainer);
            }

            for (let i = 0; i < moduleJsonData.length; i++)
            {
                let moduleJson = moduleJsonData[i];
                let module = createModule(moduleJson.idModule, moduleJson.title);
                let moduleContainer = document.getElementById("groupModule: " + moduleJson.groupModule);
                moduleContainer.appendChild(module);
            }
        }
    };
    xhrModule.open("POST", "../PHP/module.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrModule.send(); // Отправляем запрос на сервер
}
//==================================================
// Функция для отображения групп упражнений
function getGroupExercise(idModule){
    let bodyContainer = document.getElementById("body__container");
    // Не нужно очищать контейнер т.к. мы его очистили раньше
    let bodyGroupExercise = document.createElement('div'); // Создаём контейнер для книг
    bodyGroupExercise.classList.add('category__container');
    bodyContainer.appendChild(bodyGroupExercise);
    //--------------------------------------------------
    // Получение данных о упражнениях
    let xhrGroupExercise = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrGroupExercise.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrGroupExercise.readyState === 4 && xhrGroupExercise.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrGroupExercise.responseText); // Разбираем JSON-данные
            for (let i = 0; i < jsonData.length; i++)
            {
                let groupExercise = createGroupExercise(jsonData[i].idGroupExercise, jsonData[i].task, jsonData[i].title, jsonData[i].grade);
                bodyGroupExercise.appendChild(groupExercise);
            }
        }
    };
    xhrGroupExercise.open("POST", "../PHP/groupExercise.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrGroupExercise.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhrGroupExercise.send("idModule=" + encodeURIComponent(idModule));
}
//==================================================
// Функция для отображения упражнений
function getExercise(idGroupExercise){
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    //--------------------------------------------------
    // Получение данных о упражнениях
    let xhrExercise = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrExercise.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrExercise.readyState === 4 && xhrExercise.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrExercise.responseText); // Разбираем JSON-данные
            bodyContainer.appendChild(createExercise(jsonData, idGroupExercise));
        }
    };
    xhrExercise.open("POST", "../PHP/exercise.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrExercise.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhrExercise.send("idGroupExercise=" + encodeURIComponent(idGroupExercise));
}
//==================================================
// Функция для отображения карточек настроек
function getSettingCards()
{
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let settingsContainer = document.createElement("div");
    settingsContainer.id = "settings__container";
    bodyContainer.appendChild(settingsContainer);
    settingsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек
    for(let i = 0; i < arraySettingLabel.length; i++)
    {
        let settingCard = createSettingCards(arraySettingLabel[i]);
        settingsContainer.appendChild(settingCard);
    }
}
//==================================================
// Функция для отображения упражнений пользователей
function getUserExercises(){
    let bodyContainer = document.getElementById("body__container");
    bodyContainer.innerHTML = ""; // Отчищаем рабочую область перед добавление групп категорий
    let bodyExercise = document.createElement('div'); // Создаём контейнер для книг
    bodyExercise.classList.add('body__categories');
    bodyContainer.appendChild(bodyExercise);
    //--------------------------------------------------
    // Получение данных о упражнениях
    let xhrUserExercises = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrUserExercises.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrUserExercises.readyState === 4 && xhrUserExercises.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrUserExercises.responseText); // Разбираем JSON-данные
            let moduleAndGroupModuleData = jsonData.moduleAndGroupModuleData;
            let exerciseGradeData = jsonData.exerciseGradeData;

            // Создаем контейнер для название модуля и группы модуля
            for(let i = 0; i < moduleAndGroupModuleData.length; i++){
                let moduleAndGroupModule = document.createElement("div"); // Создаем контейнер для название модуля и группы модуля
                moduleAndGroupModule.classList.add("moduleAndGroupModule");
                moduleAndGroupModule.id = "idModuleAndGroupModule: " + moduleAndGroupModuleData[i].idModule;
                moduleAndGroupModule.textContent = moduleAndGroupModuleData[i].moduleTitle + "( " +
                moduleAndGroupModuleData[i].groupModuleTitle + ")"; // Заполняем название модуля и группы модуля
                bodyExercise.appendChild(moduleAndGroupModule);
            }

            // Создаем строку с упражнением и оценкой и помещаем её в контейнер для название модуля и группы модуля
            for(let i = 0; i < exerciseGradeData.length; i++){
                let exerciseGrade = document.createElement("div"); // Создаем строку с упражнением и оценкой
                exerciseGrade.classList.add("exerciseGrade");
                
                let groupExerciseTitle = document.createElement("div"); // Группа упражнений название
                groupExerciseTitle.textContent = exerciseGradeData[i].groupExerciseTitle;

                let groupExerciseTask = document.createElement("div"); // Группа упражнений задание
                groupExerciseTask.textContent = exerciseGradeData[i].groupExerciseTask;

                let userGroupExerciseGrade = document.createElement("div"); // Группа упражнений оценка
                userGroupExerciseGrade.textContent = exerciseGradeData[i].userGroupExerciseGrade + "%";

                exerciseGrade.appendChild(groupExerciseTitle);
                exerciseGrade.appendChild(groupExerciseTask);
                exerciseGrade.appendChild(userGroupExerciseGrade);

                let moduleAndGroupModule = document.getElementById("idModuleAndGroupModule: " + exerciseGradeData[i].idModule);
                moduleAndGroupModule.appendChild(exerciseGrade);
            }
        }
    };
    xhrUserExercises.open("POST", "../PHP/userExercises.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrUserExercises.send();
}
/* ==================================================================================================== */