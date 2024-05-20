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
    $idCategory = $_POST['idCategory'];
    $sql = "
        SELECT
            Dictionary.Id
            ,Dictionary.Picture
            ,Dictionary.Eng
            ,Dictionary.Transcription
            ,Dictionary.Rus
            ,Dictionary.Context
            ,UserDictionary.Level
            ,CASE WHEN UserDictionary.IdUser IS NOT NULL THEN 1 ELSE 0 END AS added
        FROM
            Dictionary
        INNER JOIN DictionaryCategory ON DictionaryCategory.IdDictionary = Dictionary.Id
        LEFT JOIN UserDictionary ON Dictionary.Id = UserDictionary.IdDictionary AND UserDictionary.IdUser = '$userId'
        WHERE
            DictionaryCategory.IdCategory = '$idCategory'"; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных
    if (mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'cardId' => $row['Id'],
                'linkToPicture' => $row['Picture'],
                'wordsInTheTargetLanguage' => $row['Eng'],
                'wordsInNativeLanguage' => $row['Rus'],
                'added' => $row['added'],
                'level' => $row['Level'],
                'transcription' => $row['Transcription'],
                'context' => $row['Context']
            );
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>