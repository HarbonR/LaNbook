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
        $cardId = $_POST['cardId'];

        $sqlOne = "SELECT Train FROM UserDictionary WHERE IdUser = $userId AND IdDictionary = $cardId"; // Получаем значение столбца Train
        $resultOne = mysqli_query($Connect, $sqlOne); // выполнение запроса
        $trainValue = mysqli_fetch_assoc($resultOne);
        if($trainValue['Train'] == 0)
            $valueForTrain = 1;
        else
            $valueForTrain = 0;
        $sqlTwo = "UPDATE UserDictionary SET Train = $valueForTrain WHERE IdUser = $userId AND IdDictionary = $cardId"; // SQL запрос
        $resultTwo = mysqli_query($Connect, $sqlTwo); // выполнение запроса
        // Закрытие соединения
        mysqli_close($Connect);
    }
?>