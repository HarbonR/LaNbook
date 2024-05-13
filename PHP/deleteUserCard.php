<?php
    session_start();
    if($_SESSION['userEmail'])
    {
        $linkToPicture = $_POST['linkToPicture'];
        $cardId = $_POST['cardId'];
        if($linkToPicture != null)
        {
            $filename = dirname(__DIR__).$linkToPicture; // Получение предыдущей текущей директории и ссылки на картинку
            if (file_exists($filename))
                unlink($filename);
            else
                echo 'Error delete to picture';
        }
        require 'linkDB.php';
        // Создаем подключение
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
        // Проверяем подключение
        if (!$Connect)
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        $userId = $_SESSION['userId'];
        // Выполнение первого SQL-запроса
        $sql1 = "DELETE FROM UserDictionary WHERE IdDictionary = $cardId AND IdUser = $userId"; // Удаляем карточку из таблицы UserDictionary
        if (!mysqli_query($Connect, $sql1))
        {
            echo "Error: " . mysqli_error($Connect);
        }
        else
        {
            // Выполнение второго SQL-запроса
            $sql2 = "DELETE FROM DictionaryCategory WHERE IdDictionary = $cardId";  // Удаляем карточку из таблицы DictionaryCategory
            if (!mysqli_query($Connect, $sql2))
            {
                echo "Error: " . mysqli_error($Connect);
            }
            // Выполнение третьего SQL-запроса
            $sql3 = "DELETE FROM Dictionary WHERE Id = $cardId";  // Удаляем карточку из таблицы Dictionary
            if (!mysqli_query($Connect, $sql3))
            {
                echo "Error: " . mysqli_error($Connect);
            }
        }
        // Закрываем соединение с базой данных
        mysqli_close($Connect);
    }
?>