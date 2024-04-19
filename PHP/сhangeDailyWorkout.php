<?php
    session_start();
    // if($_SESSION['userEmail'])
    // {
        require 'linkDB.php';
        // Создаем подключение
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
        // Проверяем подключение
        if (!$Connect)
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        $userId = $_SESSION['userId'];
        $cardId = $_POST['cardId'];
        $counter = $_POST['counter'];
        $minute = $_POST['minute'];
        $level = $_POST['level'];
        $sql = "UPDATE UserDictionary SET Counter = $counter, Level = $level, DateTime = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL $minute MINUTE) WHERE idUser = $userId AND IdDictionary = $cardId"; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    // }
?>