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
    // Запрос к первой таблице
    $sql1 = "
        SELECT
            GroupModule.Title AS groupModuleTitle
            ,Module.Id AS idModule
            ,Module.Title AS moduleTitle
        FROM
            UserGroupExercise
        JOIN GroupExercise ON UserGroupExercise.IdGroupExercise = GroupExercise.Id
        JOIN GroupExerciseModule ON GroupExercise.Id = GroupExerciseModule.IdGroupExercise
        JOIN Module ON GroupExerciseModule.IdModule = Module.Id
        JOIN GroupModule ON Module.IdGroupModule = GroupModule.Id
        WHERE
            UserGroupExercise.IdUser = '$userId'
        GROUP BY
            groupModuleTitle
            ,idModule
            ,moduleTitle
    "; 
    $result1 = mysqli_query($Connect, $sql1); 
    $data1 = array(); 
    if (mysqli_num_rows($result1) > 0) 
    {
        while($row1 = mysqli_fetch_assoc($result1)) 
        {
            $data1[] = array(
                'groupModuleTitle' => $row1['groupModuleTitle'],
                'idModule' => $row1['idModule'],
                'moduleTitle' => $row1['moduleTitle']
            );
        }
    }
    // Запрос ко второй таблице
    $sql2 = "
        SELECT
            Module.Id AS idModule
            ,GroupExercise.Title AS groupExerciseTitle
            ,GroupExercise.Task AS groupExerciseTask
            ,UserGroupExercise.Grade AS userGroupExerciseGrade
        FROM
            UserGroupExercise
        JOIN GroupExercise ON UserGroupExercise.IdGroupExercise = GroupExercise.Id
        JOIN GroupExerciseModule ON GroupExercise.Id = GroupExerciseModule.IdGroupExercise
        JOIN Module ON GroupExerciseModule.IdModule = Module.Id
        JOIN GroupModule ON Module.IdGroupModule = GroupModule.Id
        WHERE
            UserGroupExercise.IdUser = '$userId'
        "; // SQL запрос"; 
    $result2 = mysqli_query($Connect, $sql2); 
    $data2 = array(); 
    if (mysqli_num_rows($result2) > 0) 
    {
        while($row2 = mysqli_fetch_assoc($result2)) 
        {
            $data2[] = array(
                'idModule' => $row2['idModule'],
                'groupExerciseTitle' => $row2['groupExerciseTitle'],
                'groupExerciseTask' => $row2['groupExerciseTask'],
                'userGroupExerciseGrade' => $row2['userGroupExerciseGrade']
            );
        }
    }
    // Объединяем данные из двух таблиц в один массив
    $data = array(
        'moduleAndGroupModuleData' => $data1,
        'exerciseGradeData' => $data2
    );
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>