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
    // IdModule
    $idModule = $_POST['idModule'];
    $sql = "
        SELECT
            GroupExercise.Id
            ,GroupExercise.Title
            ,GroupExercise.Task
        FROM
            GroupExerciseModule
        JOIN GroupExercise ON GroupExerciseModule.IdGroupExercise = GroupExercise.Id
        JOIN Module ON GroupExerciseModule.IdModule = Module.Id
        WHERE
            Module.Id = '$idModule'
        "; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных
    if (mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'idGroupExercise' => $row['Id'],
                'title' => $row['Title'],
                'task' => $row['Task']
            );
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>