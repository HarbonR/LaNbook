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
    $sql1 = "SELECT Id, Title FROM GroupBook"; 
    $result1 = mysqli_query($Connect, $sql1); 
    $data1 = array(); 
    if (mysqli_num_rows($result1) > 0) 
    {
        while($row1 = mysqli_fetch_assoc($result1)) 
        {
            $data1[] = array(
                'idGroupBook' => $row1['Id'],
                'title' => $row1['Title']
            );
        }
    }
    // Запрос ко второй таблице
    $sql2 = "SELECT Id, IdGroupBook, Title, Book FROM Book WHERE IdGroupBook IS NOT NULL"; 
    $result2 = mysqli_query($Connect, $sql2); 
    $data2 = array(); 
    if (mysqli_num_rows($result2) > 0) 
    {
        while($row2 = mysqli_fetch_assoc($result2)) 
        {
            $data2[] = array(
                'idBook' => $row2['Id'],
                'groupBook' => $row2['IdGroupBook'],
                'title' => $row2['Title'],
                'book' => $row2['Book']
            );
        }
    }
    // Объединяем данные из двух таблиц в один массив
    $data = array(
        'groupBookData' => $data1,
        'bookData' => $data2
    );
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>