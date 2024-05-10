<?php
    session_start();
    if($_SESSION['userEmail'])
    {
        $idCategory = $_POST['idCategory'];
        $linkToPicture = $_POST['linkToPicture'];
        $filename = dirname(__DIR__).$linkToPicture;
        if (file_exists($filename))
            unlink($filename);
        else
            echo 'Error';

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
        $sql = "DELETE FROM Category WHERE Id = $idCategory"; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>