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
    // Запрос к первой таблице
    $sql1 = "SELECT Id, Title FROM GroupCategory"; 
    $result1 = mysqli_query($Connect, $sql1); 
    $data1 = array(); 
    if (mysqli_num_rows($result1) > 0) 
    {
        while($row1 = mysqli_fetch_assoc($result1)) 
        {
            $data1[] = array(
                'idGroupCategory' => $row1['Id'],
                'title' => $row1['Title']
            );
        }
    }
    // Запрос ко второй таблице
    $sql2 = "SELECT Id, IdGroupCategory, Title, Picture FROM Category WHERE IdGroupCategory IS NOT NULL"; 
    $result2 = mysqli_query($Connect, $sql2); 
    $data2 = array(); 
    if (mysqli_num_rows($result2) > 0) 
    {
        while($row2 = mysqli_fetch_assoc($result2)) 
        {
            $data2[] = array(
                'idCategory' => $row2['Id'],
                'groupCategory' => $row2['IdGroupCategory'],
                'title' => $row2['Title'],
                'linkToPicture' => $row2['Picture']
            );
        }
    }
    // Объединяем данные из двух таблиц в один массив
    $data = array(
        'groupCategoryData' => $data1,
        'categoryData' => $data2
    );
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>