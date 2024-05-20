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
        $sql = "
            SELECT
                Dictionary.Picture
                ,UserDictionary.IdDictionary
                ,Dictionary.Eng
                ,Dictionary.Transcription
                ,Dictionary.Rus
                ,Dictionary.Context
                ,UserDictionary.Train
                ,UserDictionary.Level
            FROM
                UserDictionary
            JOIN Dictionary ON UserDictionary.IdDictionary = Dictionary.Id
            JOIN DictionaryCategory ON DictionaryCategory.IdDictionary = UserDictionary.IdDictionary
            JOIN Category ON DictionaryCategory.IdCategory = Category.Id
            WHERE
                UserDictionary.IdUser = '$userId' AND Category.Id = '$idCategory'"; // SQL запрос
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
                    'train' => $row['Train'],
                    'level' => $row['Level'],
                    'transcription' => $row['Transcription'],
                    'context' => $row['Context']
                );
            }
        }
        $jsonData = json_encode($data); // Преобразуем массив в формат JSON
        echo $jsonData; // Отправляем JSON-данные в JavaScript
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>