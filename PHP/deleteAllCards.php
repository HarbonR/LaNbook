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
        $idCategory = $_POST['idCategory'];
        $sql = "DELETE UserDictionary
            FROM
                UserDictionary
            INNER JOIN DictionaryCategory ON DictionaryCategory.IdDictionary = UserDictionary.IdDictionary
            INNER JOIN Category ON DictionaryCategory.IdCategory = Category.Id
            WHERE
                UserDictionary.IdUser = $userId AND Category.Id = $idCategory"; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>