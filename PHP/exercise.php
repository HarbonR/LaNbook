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
    $idGroupExercise = $_POST['idGroupExercise'];
    $sql = "
        SELECT
            Exercise.Task
            ,Exercise.Sentence
            ,Exercise.CorrectAnswer
            ,Exercise.IncorrectAnswer
            ,Exercise.Explanation
            ,Exercise.ExerciseType
        FROM
            ExerciseGroupExercise
        JOIN Exercise ON ExerciseGroupExercise.IdExercise = Exercise.Id
        WHERE
            ExerciseGroupExercise.IdGroupExercise = '$idGroupExercise'
        "; // SQL запрос
    $result = mysqli_query($Connect, $sql); // выполнение запроса
    $data = array(); // Создаем пустой массив для хранения данных
    if (mysqli_num_rows($result) > 0)
    {
        while($row = mysqli_fetch_assoc($result)) // выводим данные из каждой строки
        {
            $data[] = array(
                'task' => $row['Task'], // Задание
                'sentence' => $row['Sentence'], // Предложение
                'correctAnswer' => $row['CorrectAnswer'], // Правильный ответ
                'incorrectAnswer' => $row['IncorrectAnswer'], // Не правильный ответ
                'explanation' => $row['Explanation'], // Пояснение
                'exerciseType' => $row['ExerciseType'] // Тип
            );
        }
    }
    $jsonData = json_encode($data); // Преобразуем массив в формат JSON
    echo $jsonData; // Отправляем JSON-данные в JavaScript
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>