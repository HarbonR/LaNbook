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
    $sql = "SELECT IdGroupCategory, Title, Picture FROM Category"; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных

    if (mysqli_num_rows($result) > 0) 
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'groupCategory' => $row['IdGroupCategory'],
                'title' => $row['Title'],
                'linkToPicture' => $row['Picture']);
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
?>