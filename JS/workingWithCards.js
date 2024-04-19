/* ==================================================================================================== */
/* ----------------------------------------------Переменные-------------------------------------------- */
let viewCards = document.getElementById("view-cards");
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
/* ==================================================================================================== */
/* -----------------------------------------------Создание--------------------------------------------- */
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
        console.log("Кнопка добавить");
    }

    // Добавление элементов в DOM
    category.appendChild(categoryPicture);
    category.appendChild(categoryTitle);
    category.appendChild(categoryButton);

    return category;
}
//==================================================
// Создаем функцию для создания карточки
function createCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, added, level)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
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
    cardButtonAdd.onclick = function()
    {
        if(cardButtonAdd.classList.contains("enter-button")) // Если карточка не добавлена, добавить
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/addCard.php", true);
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
        }
        else // Иначе удалить
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
        }
        switchButtonClass(cardButtonAdd);
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';

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
// Создаем функцию для создания карточки для пользователя
function createCardForUser(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train, level)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
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
    buttonTrain.onclick = function()
    {
        if(buttonTrain.classList.contains("enter-button")) // Если карточка не добавлена, добавить
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/addTrainingCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
        }
        else
        {
            let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
            xhr.open("POST", "../PHP/deleteTrainingCard.php", true); 
            // Отправляем запрос на сервер
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
            xhr.send("cardId=" + encodeURIComponent(cardId));
        }
        switchButtonClass(buttonTrain);
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';
    cardButtonSound.style.width = "60px";

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
    buttonDelete.onclick = function()
    {
        document.getElementById(cardId).remove();
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
        xhr.open("POST", "../PHP/deleteCard.php", true); 
        // Отправляем запрос на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
        xhr.send("cardId=" + encodeURIComponent(cardId));
    }
    cardButtons.appendChild(buttonDelete);

    card.appendChild(cardButtons);

    return card;
}
//==================================================
// Создаем функцию для создания карточки для тренировки
function createCardForTrain(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train, level)
{
    // Создание основного контейнера карточки
    let card = document.createElement('div');
    card.className = 'card';
    card.id = cardId;

    let cardPicture = document.createElement('div');
    cardPicture.className = 'card-picture';

    let picture = document.createElement('img');
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
    buttonTrain.onclick = function()
    {
        document.getElementById(cardId).remove();
        let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
        xhr.open("POST", "../PHP/deleteTrainingCard.php", true); 
        // Отправляем запрос на сервер
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
        xhr.send("cardId=" + encodeURIComponent(cardId));
    }

    // Создание div для кнопки "Звук"
    let cardButtonSound = document.createElement('div');
    cardButtonSound.className = 'card-button-sound';

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
// Функция создания для создания карточек настроек
function createSettingCards(settingLabel, id)
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
    checkbox.id = "checkbox id: " + id;
    checkbox.name = "checkbox name: " + id;
    checkbox.autocomplete = "Off";

    // Создаем элемент span с классом "slider"
    let slider = document.createElement("span");
    slider.classList.add("slider-settings");

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
    activeSettingButton.textContent = "+";
    activeSettingButton.onclick = function()
    {
        if(activeSettingButton.classList.contains("active-setting__button__entered"))
        {
            activeSettingButton.classList.remove("active-setting__button__entered");
        }
        else
        {
            activeSettingButton.classList.add("active-setting__button__entered");
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
// Функция для отображения карточек
function getCards(path, type, idCategory)
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
                    let card = createCard(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.added, cardData.level);
                    cardsContainer.appendChild(card);
                }
            }
            else if(type == "User")
            {
                let addAll = document.createElement("div");
                addAll.className = "button-all";
                addAll.textContent = "Тренировать все";
                bodyContainer.prepend(addAll);
                bodyContainer.style.paddingTop = "100px";
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    let card = createCardForUser(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train, cardData.level);
                    cardsContainer.appendChild(card);
                }
            }
            else if(type == "Train")
            {
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    if(cardData.train)
                    {
                        let card = createCardForTrain(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train, cardData.level);
                        cardsContainer.appendChild(card);
                    }
                }
            }
        }
    };
    xhrCards.open("POST", path); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
    xhrCards.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
    xhrCards.send("idCategory=" + encodeURIComponent(idCategory));
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
    let arraySettingLabel = ["Сопоставление слов", "Напиши слово", "Проверка слов на изучаемом языке", "Узнай слово на слух",
    "Проверка слов на родном языке", "Напиши, что услышал", "Составление слова"];
    settingsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек
    for(let i = 0; i < arraySettingLabel.length; i++)
    {
        let settingCard = createSettingCards(arraySettingLabel[i], i + 1);
        settingsContainer.appendChild(settingCard);
    }
}
/* ==================================================================================================== */