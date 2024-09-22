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
        $idGroupExercise = $_POST['idGroupExercise'];
        $grade = $_POST['grade'];
        // Убедитесь, что у вас есть уникальный индекс на комбинацию полей IdUser и IdGroupExercise. Это можно сделать с помощью следующего SQL-запроса:
        // ALTER TABLE UserGroupExercise ADD UNIQUE INDEX idx_user_group (IdUser, IdGroupExercise);
        $sql = "
                INSERT INTO UserGroupExercise (IdUser, IdGroupExercise, Grade)
                VALUES ($userId, $idGroupExercise, $grade)
                ON DUPLICATE KEY UPDATE Grade = $grade;
            "; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>  