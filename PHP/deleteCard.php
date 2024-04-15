<?php
    session_start();
    if($_SESSION['userEmail'])
    {
        require 'linkDB.php';
        // Создаем подключение
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
        // Проверяем подключение
        if (!$Connect)
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        $userId = $_SESSION['userId'];
        $idCardEngRus = $_POST['cardId'];
        $sql = "DELETE FROM UserDictionary WHERE IdDictionary = $idCardEngRus"; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>