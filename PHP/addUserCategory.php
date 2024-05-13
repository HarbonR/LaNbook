<?php
    session_start();
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $userId = $_SESSION['userId']; // Id пользователя, author
        $file = $_FILES['file']; // Получение загруженного файла
        $title = $_POST['title']; // Название категории
        require 'linkDB.php'; // Подключаем файл с данными о БД
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName); // Создаем подключение
        if (!$Connect) // Проверяем подключение
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        $sql1 = "INSERT INTO Category (Title, Author) VALUES ('$title', '$userId')"; // SQL запрос
        mysqli_query($Connect, $sql1); // выполнение запроса
        // Создаём в папке пользователя папку с категорией
        $last_id = mysqli_insert_id($Connect); // Получаем последний вставленный ID (Id новой добавленной категории)
        $pathDirCategory = dirname(__DIR__).'\\Picture\\'.$userId.'\\'.$last_id; // Создаём путь к папке пользователя
        mkdir($pathDirCategory); // Создаём папку
        // Создаём в папке с категорией папку со словами
        $pathDirWords = dirname(__DIR__).'\\Picture\\'.$userId.'\\'.$last_id.'\\Words'; // Создаём путь к папке пользователя
        mkdir($pathDirWords); // Создаём папку
        $path = dirname(__DIR__).'\\Picture\\'.$userId.'\\'.$last_id.'\\'.$file['name']; // Создаём путь до картинки категории
        // Сохранение картинки категории на сервере и в БД
        if(move_uploaded_file($file['tmp_name'], $path))
        {
            $picture = '\\Picture\\'.$userId.'\\'.$last_id.'\\'.$file['name'];
            $picture = addslashes($picture);
            $sql2 = "UPDATE Category SET Picture = '$picture' WHERE Id = '$last_id'"; // SQL запрос
            mysqli_query($Connect, $sql2); // выполнение запроса
        }
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>