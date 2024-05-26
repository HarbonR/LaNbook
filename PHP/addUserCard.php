<?php
    session_start();
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $userId = $_SESSION['userId'];
        $file = $_FILES['file']; // Получение загруженного файла
        $wordTargetLanguage = $_POST['wordTargetLanguage'];
        $transcription = $_POST['transcription'];
        $wordNativeLanguage = $_POST['wordNativeLanguage'];
        $level = $_POST['level'];
        $counter = 1;
        switch ($level)
        {
            case 1 : $counter = 1; break;
            case 2 : $counter = 4; break;
            case 3 : $counter = 7; break;
        }
        $context = $_POST['context'];
        $idCategory = $_POST['idCategory'];
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION); // Получаем расширение загружаемого файла
        $path = dirname(__DIR__).'/Picture/'.$userId.'/'.$idCategory.'/Words'.'/'.$wordTargetLanguage.'.'.$extension; // Получаем путь до картинки карточки
        // Сохранение файла на сервере
        if(move_uploaded_file($file['tmp_name'], $path))
        { 
            require 'linkDB.php';
            // Создаем подключение
            $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
            // Проверяем подключение
            if (!$Connect)
            {
                die("Ошибка подключения: " . mysqli_connect_error());
            }
            $path = '/Picture/'.$userId.'/'.$idCategory.'/Words'.'/'.$wordTargetLanguage.'.'.$extension; // Получаем путь до картинки карточки для БД
            // Выполнение первого SQL-запроса
            $sql1 = "INSERT INTO Dictionary (Picture, Eng, Transcription, Rus, Context) VALUES ('$path', '$wordTargetLanguage', '$transcription', '$wordNativeLanguage', '$context')";
            if (!mysqli_query($Connect, $sql1))
            {
                echo "Error: " . mysqli_error($Connect);
            }
            else
            {
                // Получаем последний вставленный ID
                $last_id = mysqli_insert_id($Connect);
                // Выполнение второго SQL-запроса
                $sql2 = "INSERT INTO DictionaryCategory(IdDictionary, IdCategory) VALUES ('$last_id', '$idCategory')";
                if (!mysqli_query($Connect, $sql2))
                {
                    echo "Error: " . mysqli_error($Connect);
                }
                // Выполнение третьего SQL-запроса
                $sql3 = "INSERT INTO UserDictionary(IdUser, IdDictionary, Counter, Level) VALUES ('$userId', '$last_id', '$counter', '$level')";
                if (!mysqli_query($Connect, $sql3))
                {
                    echo "Error: " . mysqli_error($Connect);
                }
            }
            // Закрываем соединение с базой данных
            mysqli_close($Connect);
        }
        else
        {
            require 'linkDB.php';
            // Создаем подключение
            $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
            // Проверяем подключение
            if (!$Connect)
            {
                die("Ошибка подключения: " . mysqli_connect_error());
            }
            // Выполнение первого SQL-запроса
            $sql1 = "INSERT INTO Dictionary (Eng, Transcription, Rus, Context) VALUES ('$wordTargetLanguage', '$transcription', '$wordNativeLanguage', '$context')";
            if (!mysqli_query($Connect, $sql1))
            {
                echo "Error: " . mysqli_error($Connect);
            }
            else
            {
                // Получаем последний вставленный ID
                $last_id = mysqli_insert_id($Connect);
                // Выполнение второго SQL-запроса
                $sql2 = "INSERT INTO DictionaryCategory(IdDictionary, IdCategory) VALUES ('$last_id', '$idCategory')";
                if (!mysqli_query($Connect, $sql2))
                {
                    echo "Error: " . mysqli_error($Connect);
                }
                // Выполнение третьего SQL-запроса
                $sql3 = "INSERT INTO UserDictionary(IdUser, IdDictionary, Counter, Level) VALUES ('$userId', '$last_id', '$counter', '$level')";
                if (!mysqli_query($Connect, $sql3))
                {
                    echo "Error: " . mysqli_error($Connect);
                }
            }
            // Закрываем соединение с базой данных
            mysqli_close($Connect);
        }
    }
?>