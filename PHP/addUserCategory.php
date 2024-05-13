<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $file = $_FILES['file']; // Получение загруженного файла
        $title = $_POST['title'];
        $path = dirname(__DIR__).'\\Picture\\UserCategories\\'.$file['name'];
        // Сохранение файла на сервере
        if(move_uploaded_file($file['tmp_name'], $path))
        {
            session_start();
            require 'linkDB.php';
            // Создаем подключение
            $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
            // Проверяем подключение
            if (!$Connect)
            {
                die("Ошибка подключения: " . mysqli_connect_error());
            }
            $userId = $_SESSION['userId'];
            $path = '\\Picture\\UserCategories\\'.$file['name'];
            $path = addslashes($path);
            $sql = "INSERT INTO Category (Title, Picture, Author) VALUES ('$title', '$path', $userId)"; // SQL запрос
            $result = mysqli_query($Connect, $sql); // выполнение запроса
            mysqli_close($Connect); // Закрываем соединение с базой данных
        }
        else
        {
            session_start();
            require 'linkDB.php';
            // Создаем подключение
            $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
            // Проверяем подключение
            if (!$Connect)
            {
                die("Ошибка подключения: " . mysqli_connect_error());
            }
            $userId = $_SESSION['userId'];
            $sql = "INSERT INTO Category (Title, Author) VALUES ('$title', $userId)"; // SQL запрос
            $result = mysqli_query($Connect, $sql); // выполнение запроса
            mysqli_close($Connect); // Закрываем соединение с базой данных
        }
    }
?>