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
            Category.Id
            ,Category.Title
            ,Category.Picture
            ,Category.Author
        FROM
            Category
        WHERE
            Category.Author = '$userId'
        UNION
        SELECT
            Category.Id
            ,Category.Title
            ,Category.Picture
            ,Category.Author
        FROM
            UserDictionary
            INNER JOIN DictionaryCategory ON DictionaryCategory.IdDictionary = UserDictionary.IdDictionary
            INNER JOIN Category ON DictionaryCategory.IdCategory = Category.Id
        WHERE
            UserDictionary.IdUser = '$userId'"; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных
    if (mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'idCategory' => $row['Id'],
                'title' => $row['Title'],
                'linkToPicture' => $row['Picture'],
                'author' => $row['Author']
            );
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>