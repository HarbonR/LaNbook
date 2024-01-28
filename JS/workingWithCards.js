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
function createCategory(title, linkToPicture)
{
    
    let category = document.createElement('div');
    category.classList.add('category');

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

    // Добавление элементов в DOM
    category.appendChild(categoryPicture);
    category.appendChild(categoryTitle);
    category.appendChild(categoryButton);

    return category;
}
//--------------------------------------------------
// Создаем функцию для создания карточки
// function createCard(cardId, linkToPicture, wordsInTheTargetLanguage, wordsInNativeLanguage, added)
// {
//     // Создание основного контейнера карточки
//     let card = document.createElement("div");
//     card.className = "card";
//     card.style.backgroundImage = `url("${linkToPicture}")`;
//     card.id = cardId;

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

//     // Создание div для кнопки "Добавить"
//     let buttonAdd = document.createElement('div');
//     buttonAdd.className = "button-add";
//     buttonAdd.classList.add("enterButton");
//     buttonAdd.textContent = '+';
//     buttonAdd.style.width = "100px"
//     if (added == 1)
//     {
//         buttonAdd.classList.add("enteredButton");
//         buttonAdd.classList.remove("enterButton");
//     }
//     else
//     {
//         buttonAdd.classList.add("enterButton");
//         buttonAdd.classList.remove("enteredButton");
//     }
//     buttonAdd.onclick = function()
//     {
//         if(buttonAdd.classList[1] == "enterButton") // Если карточка не добавлена, добавить
//         {
//             let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
//             xhr.open("POST", "../PHP/addCard.php", true);
//             // Отправляем запрос на сервер
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
//             xhr.send("cardId=" + encodeURIComponent(cardId));
//         }
//         else // Иначе удалить
//         {
//             let xhr = new XMLHttpRequest(); // Создаем новый объект XMLHTTPrequest
//             xhr.open("POST", "../PHP/deleteCard.php", true); 
//             // Отправляем запрос на сервер
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Устанавливаем заголовок Content-Type
//             xhr.send("cardId=" + encodeURIComponent(cardId));
//         }
//         switchButtonClass(buttonAdd);
        
//     }
//     buttons.appendChild(buttonAdd);

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
// function getCards(path, type)
// {
//     // Получение данных о карточках
//     let cardsContainer = document.getElementById("Cards"); // Получаем элемент с ID "Cards"
//     let xhrCards = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
//     //--------------------------------------------------
//     xhrCards.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
//     {
//         if (xhrCards.readyState === 4 && xhrCards.status === 200) // Проверяем, что запрос завершен и успешен
//         {
//             let jsonData = JSON.parse(xhrCards.responseText); // Разбираем JSON-данные

//             cardsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек

//             // Создаем карточки и добавляем их в контейнер
//             if(type == "Card")
//             {
//                 for (let i = 0; i < jsonData.length; i++)
//                 {
//                     let cardData = jsonData[i];
//                     let card = createCard(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.added);
//                     cardsContainer.appendChild(card);
//                 }
//             }
//             else if(type == "User")
//             {
//                 for (let i = 0; i < jsonData.length; i++)
//                 {
//                     let cardData = jsonData[i];
//                     let card = createCardForUser(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train);
//                     cardsContainer.appendChild(card);
//                 }
//             }
//             else if(type == "Train")
//             {
//                 for (let i = 0; i < jsonData.length; i++)
//                 {
//                     let cardData = jsonData[i];
//                     if(cardData.train)
//                     {
//                         let card = createCardForTrain(cardData.cardId, cardData.linkToPicture, cardData.wordsInTheTargetLanguage, cardData.wordsInNativeLanguage, cardData.train);
//                         cardsContainer.appendChild(card);
//                     }
//                 }
//             }
//         }
//     };
//     xhrCards.open("POST", path); // Открываем соединение с сервером с помощью метода "POST" и адреса "cards.php"
//     xhrCards.send(); // Отправляем запрос на сервер
//     //--------------------------------------------------
//     // Стилизуем контейнер
//     cardsContainer.style.maxWidth = "85%";
//     cardsContainer.style.margin = "20px auto";
//     cardsContainer.style.display = "flex";
//     cardsContainer.style.justifyContent = "space-around";
//     cardsContainer.style.flexWrap = "wrap";
// }
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
        }
    };
    xhrGroupCategories.open("POST", "../PHP/groupCategories.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrGroupCategories.send(); // Отправляем запрос на сервер
}
//--------------------------------------------------
// Функция для отображения категорий
function getCategories()
{
    getGroupCategories();
    // Получение данных о категорий
    let xhrCategories = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest
    xhrCategories.onreadystatechange = function() // Устанавливаем функцию, которая будет вызываться при изменении состояния объекта `xhr`
    {
        if (xhrCategories.readyState === 4 && xhrCategories.status === 200) // Проверяем, что запрос завершен и успешен
        {
            let jsonData = JSON.parse(xhrCategories.responseText); // Разбираем JSON-данные

            //bodyContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых карточек

            for (let i = 0; i < jsonData.length; i++)
            {
                let categoryData = jsonData[i];
                let category = createCategory(categoryData.title, categoryData.linkToPicture);
                let categoryContainer = document.getElementById("groupCategory: " + categoryData.groupCategory);
                categoryContainer.appendChild(category);
            }
        }
    };
    xhrCategories.open("POST", "../PHP/categories.php"); // Открываем соединение с сервером с помощью метода "POST" и адреса ""
    xhrCategories.send(); // Отправляем запрос на сервер
}
//==================================================