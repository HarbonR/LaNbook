<?php
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
    $sql = "
        SELECT
            Picture
            ,IdDictionary
            ,Eng
            ,Rus
            ,Train
        FROM
            UserDictionary
        JOIN User ON UserDictionary.IdUser = User.Id
        JOIN Dictionary ON UserDictionary.IdDictionary = Dictionary.Id
        WHERE
            User.Id = '$userId'"; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных

    if (mysqli_num_rows($result) > 0) 
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'cardId' => $row['IdDictionary'],
                'linkToPicture' => $row['Picture'],
                'wordsInTheTargetLanguage' => $row['Eng'],
                'wordsInNativeLanguage' => $row['Rus'],
                'train' => $row['Train']);
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>