//==================================================
// Функция для смены класса выбрать, выбранная кнопка
// function switchButtonClass(buttonClass)
// {
//     if (buttonClass.classList.contains("enterButton"))
//     {
//         buttonClass.classList.add("enteredButton");
//         buttonClass.classList.remove("enterButton");
//     }
//     else
//     {
//         buttonClass.classList.add("enterButton");
//         buttonClass.classList.remove("enteredButton");
//     }
// }
//--------------------------------------------------
// Создаём функцию для создания групп категорий
function createGroupCategory(idGroupCategory, titleGroup)
{
    let groupCategory = document.createElement('div');
    groupCategory.classList.add('group-category');
    groupCategory.textContent = titleGroup;

    let categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category__container');
    categoryContainer.id = "groupCategory: " + idGroupCategory;
    
    return [groupCategory, categoryContainer];
}
//--------------------------------------------------
// Создаём функцию для создания категорий
function createCategory(idCategory, title, linkToPicture)
{
    
    let category = document.createElement('div');
    category.classList.add('category');
    category.id = "idCategory: " + idCategory;
    category.onclick = function()
    {
        document.getElementById("body__container").innerHTML = "";
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
//--------------------------------------------------
// Создаем функцию для создания карточки
function createCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, added)
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
        if(cardButtonAdd.classList[1] == "enter-button") // Если карточка не добавлена, добавить
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
        // switchButtonClass(cardButtonAdd);
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
//--------------------------------------------------
// Создаем функцию для создания карточки для пользователя
// function createCardForUser(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train)
// {
//     // Создание основного контейнера карточки
//     let card = document.createElement("div");
//     card.className = "card";
//     card.style.backgroundImage = `url("${linkToPicture}")`;
//     card.id = cardId;

//     // Создание основного контейнера уровней
//     let level = document.createElement('div');
//     level.className = "level";

//     // Создание контейнера уровней
//     const levelContainer = document.createElement("div");
//     levelContainer.classList.add("level-container");

//     // Создание div для уровня one
//     let levelOne = document.createElement('div');
//     levelOne.className = "level-one";
//     levelContainer.appendChild(levelOne);

//     // Создание div для уровня two
//     let levelTwo = document.createElement('div');
//     levelTwo.className = "level-two";
//     levelContainer.appendChild(levelTwo);

//     // Создание div для уровня three
//     let levelThree = document.createElement('div');
//     levelThree.className = "level-three";
//     levelContainer.appendChild(levelThree);

//     // Добавление контейнера уровней в основной контейнер уровней
//     level.appendChild(levelContainer);

//     // Добавление основного контейнера уровней в основной контейнер карточки
//     card.appendChild(level);

//     // Создание div для слова
//     let wordDiv = document.createElement('div');
//     wordDiv.className = "word";
//     wordDiv.textContent = wordsInTheTargetLanguage;
//     card.appendChild(wordDiv);

//     // Создание div для перевода
//     let translateDiv = document.createElement('div');
//     translateDiv.className = "translate";
//     translateDiv.textContent = wordsInNativeLanguage;
//     card.appendChild(translateDiv);

//     // Создание div для кнопок
//     let buttons = document.createElement('div');
//     buttons.className = "buttons";

//     // Создание div для кнопки "Тренировка"
//     let buttonTrain = document.createElement('div');
//     buttonTrain.className = "button-train";
//     buttonTrain.textContent = 'T';
//     if (train == 1)
//     {
//         buttonTrain.classList.add("enteredButton");
//         buttonTrain.classList.remove("enterButton");
//     }
//     else
//     {
//         buttonTrain.classList.add("enterButton");
//         buttonTrain.classList.remove("enteredButton");
//     }
//     buttonTrain.onclick = function()
//     {
//         switchButtonClass(buttonTrain);
//         let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
//         xhr.open("POST", "../PHP/trainCard.php", true); 
//         // Отправляем запрос на сервер
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
//         xhr.send("cardId=" + encodeURIComponent(cardId));
//     }
//     buttons.appendChild(buttonTrain);

//     // Создание div для кнопки "Звук"
//     let buttonSound = document.createElement('div');
//     buttonSound.className = "button-sound";
//     let soundImage = document.createElement('img');
//     soundImage.src = "Pictures/button-sound.svg";
//     buttonSound.appendChild(soundImage);
//     buttons.appendChild(buttonSound);

//     // Создание div для кнопки "Удалить"
//     let buttonDelete = document.createElement('div');
//     buttonDelete.className = "button-delete";
//     buttonDelete.textContent = 'X';
//     buttonDelete.onclick = function()
//     {
//         document.getElementById(cardId).remove();
//         let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
//         xhr.open("POST", "../PHP/deleteCard.php", true); 
//         // Отправляем запрос на сервер
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
//         xhr.send("cardId=" + encodeURIComponent(cardId));
//     }
//     buttons.appendChild(buttonDelete);

//     // Добавление div с кнопками в основной контейнер карточки
//     card.appendChild(buttons);

//     // Создание div для градиента
//     let gradient = document.createElement('div');
//     gradient.className = "gradient";
//     card.appendChild(gradient);

//     // Возвращаем созданную карточку
//     return card;
// }
//--------------------------------------------------
// Создаем функцию для создания карточки для тренировки
// function createCardForTrain(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, train)
// {
//     // Создание основного контейнера карточки
//     let card = document.createElement("div");
//     card.className = "card";
//     card.style.backgroundImage = `url("${linkToPicture}")`;
//     card.id = cardId;

//     // Создание основного контейнера уровней
//     let level = document.createElement('div');
//     level.className = "level";

//     // Создание контейнера уровней
//     const levelContainer = document.createElement("div");
//     levelContainer.classList.add("level-container");

//     // Создание div для уровня one
//     let levelOne = document.createElement('div');
//     levelOne.className = "level-one";
//     levelContainer.appendChild(levelOne);

//     // Создание div для уровня two
//     let levelTwo = document.createElement('div');
//     levelTwo.className = "level-two";
//     levelContainer.appendChild(levelTwo);

//     // Создание div для уровня three
//     let levelThree = document.createElement('div');
//     levelThree.className = "level-three";
//     levelContainer.appendChild(levelThree);

//     // Добавление контейнера уровней в основной контейнер уровней
//     level.appendChild(levelContainer);

//     // Добавление основного контейнера уровней в основной контейнер карточки
//     card.appendChild(level);

//     // Создание div для слова
//     let wordDiv = document.createElement('div');
//     wordDiv.className = "word";
//     wordDiv.textContent = wordsInTheTargetLanguage;
//     card.appendChild(wordDiv);

//     // Создание div для перевода
//     let translateDiv = document.createElement('div');
//     translateDiv.className = "translate";
//     translateDiv.textContent = wordsInNativeLanguage;
//     card.appendChild(translateDiv);

//     // Создание div для кнопок
//     let buttons = document.createElement('div');
//     buttons.className = "buttons";

//     // Создание div для кнопки "Тренировка"
//     let buttonTrain = document.createElement('div');
//     buttonTrain.className = "button-add";
//     buttonTrain.classList.add("enteredButton");
//     buttonTrain.textContent = 'T';
//     buttonTrain.style.width = "100px"
//     if (train == 1)
//     {
//         buttonTrain.classList.add("enteredButton");
//         buttonTrain.classList.remove("enterButton");
//     }
//     else
//     {
//         buttonTrain.classList.add("enterButton");
//         buttonTrain.classList.remove("enteredButton");
//     }
//     buttonTrain.onclick = function()
//     {
//         document.getElementById(cardId).remove();
//         let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
//         xhr.open("POST", "../PHP/trainCard.php", true); 
//         // Отправляем запрос на сервер
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
//         xhr.send("cardId=" + encodeURIComponent(cardId));
//     }
//     buttons.appendChild(buttonTrain);

//     // Создание div для кнопки "Звук"
//     let buttonSound = document.createElement('div');
//     buttonSound.className = "button-sound";
//     buttonSound.style.width = "100px"
//     let soundImage = document.createElement('img');
//     soundImage.src = "Pictures/button-sound.svg";
//     buttonSound.appendChild(soundImage);
//     buttons.appendChild(buttonSound);

//     // Добавление div с кнопками в основной контейнер карточки
//     card.appendChild(buttons);

//     // Создание div для градиента
//     let gradient = document.createElement('div');
//     gradient.className = "gradient";
//     card.appendChild(gradient);

//     // Возвращаем созданную карточку
//     return card;
// }
//--------------------------------------------------
// Функция для отображения карточек
function getCards(path, type, idCategory)
{
    // Получение данных о карточках
    let cardsContainer = document.createElement("div");
    cardsContainer.className = "body__cards-container";
    document.getElementById("body__container").appendChild(cardsContainer);

    let xhrCards = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    //--------------------------------------------------
    xhrCards.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCards.readyState === 4 && xhrCards.status === 200) // Проверяем, что запрос завершен и успешен
        {
            // console.log(xhrCards.responseText);
            let jsonData = JSON.parse(xhrCards.responseText); // Разбираем JSON-данные
            // console.log(jsonData);
            cardsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек

            // Создаем карточки и добавляем их в контейнер
            if(type == "Card")
            {
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    let card = createCard(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.added);
                    cardsContainer.appendChild(card);
                }
            }
            else if(type == "User")
            {
                for (let i = 0; i < jsonData.length; i++)
                {
                    let cardData = jsonData[i];
                    let card = createCardForUser(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train);
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
                        let card = createCardForTrain(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train);
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
//--------------------------------------------------
// Функция для отображения групп категорий
function getGroupCategories()
{
    let bodyContainer = document.getElementById("body__container");
    let bodyCategories = document.createElement('div');
    bodyCategories.classList.add('body__categories');
    bodyContainer.appendChild(bodyCategories);
    let xhrGroupCategories = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrGroupCategories.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrGroupCategories.readyState === 4 && xhrGroupCategories.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrGroupCategories.responseText); // Разбираем JSON-данные

            bodyCategories.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек

            for (let i = 0; i < jsonData.length; i++)
            {
                let groupCategoryData = jsonData[i];
                let groupCategory = createGroupCategory(groupCategoryData.idGroupCategory, groupCategoryData.title);
                bodyCategories.appendChild(groupCategory[0]);
                bodyCategories.appendChild(groupCategory[1]);
            }
            getCategories();
        }
    };
    xhrGroupCategories.open("POST", "../PHP/groupCategories.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrGroupCategories.send(); // Отправляем запрос на сервер
}
//--------------------------------------------------
// Функция для отображения категорий
function getCategories()
{
    // Получение данных о категорий
    let xhrCategories = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrCategories.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCategories.readyState === 4 && xhrCategories.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrCategories.responseText); // Разбираем JSON-данные

            for (let i = 0; i < jsonData.length; i++)
            {
                let categoryData = jsonData[i];
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