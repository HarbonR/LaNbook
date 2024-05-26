<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') // Проверяем является ли метод запроса POST
    {
        require 'linkDB.php'; // Шаблон данных для подключения к БД
        // Подключение к базе данных
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
        // Проверка соединения
        if (!$Connect)
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        // Получение данных из формы
        $userName = $_POST['userName']; // Записываем в переменную $userName данные из массива запроса $_POST['userName']
        $userEmail = $_POST['userEmail']; // Записываем в переменную $userEmail данные из массива запроса $_POST['userEmail']
        $userEmail = mb_strtolower($userEmail, 'UTF-8'); // Переводим email в нижний регистр
        $userPassword = $_POST['userPassword']; // Записываем в переменную $userPassword данные из массива запроса $_POST['userPassword']

        $userName = mysqli_real_escape_string($Connect, $userName); // SQL-инъекции. Экранируем специальные символы в строке
        $userEmail  = mysqli_real_escape_string($Connect, $userEmail);  // SQL-инъекции. Экранируем специальные символы в строке
        $userPassword  = mysqli_real_escape_string($Connect, $userPassword);  // SQL-инъекции. Экранируем специальные символы в строке
        $userPassword = password_hash($userPassword, PASSWORD_DEFAULT); // Хэшируем пароль

        $sql1 = 'SELECT Email FROM User'; // SQL-запрос на выборку имени, е-мейла и пароля из таблицы пользователей
        $result1 = mysqli_query($Connect, $sql1); // Выполнение SQL-запроса
        if ($result1) // Проверка на успешность выполнения запроса
        {
            while ($row = mysqli_fetch_assoc($result1)) // Перебираем результаты запроса
            {
                if($row['Email'] == $userEmail) // Проверка на совпадение е-мейла
                {
                    $data = ['answer' => 'Такой пользователь уже существует'];
                    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
                    echo $jsonData; // Отправляем JSON-данные в JavaScript
                    exit;
                }
            }
        }
        else
        {
            $data = ['answer' => 'Ошибка: ' . mysqli_error($Connect)];
            $jsonData = json_encode($data); // Преобразуем массив в формат JSON
            echo $jsonData; // Отправляем JSON-данные в JavaScript
            exit;
        }
        // Подготовка и выполнение SQL-запроса
        $sql2 = "INSERT INTO User (Name, Email, Password) VALUES ('$userName', '$userEmail', '$userPassword')";
        if (mysqli_query($Connect, $sql2)) // Проверяем, успешно ли выполнен SQL запрос
        {
            $data = ['answer' => 'Пользователь успешно зарегистрирован'];
            $jsonData = json_encode($data); // Преобразуем массив в формат JSON
            echo $jsonData; // Отправляем JSON-данные в JavaScript
            // Добавляем папку для хранения картинок категорий и карточек пользователя
            $last_id = mysqli_insert_id($Connect); // Получаем последний вставленный ID
            $path = dirname(__DIR__).'/Picture/'.$last_id; // Создаём путь к папке пользователя
            mkdir($path);
            exit;
        }
        else
        {
            $data = ['answer' => 'Ошибка: ' . mysqli_error($Connect)];
            $jsonData = json_encode($data); // Преобразуем массив в формат JSON
            echo $jsonData; // Отправляем JSON-данные в JavaScript
            exit;
        }
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>