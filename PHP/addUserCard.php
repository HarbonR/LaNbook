<?php
    // В MySQL, mysqli_query по умолчанию не поддерживает выполнение нескольких запросов за один раз, если только не используется специальная функция mysqli_multi_query.
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $file = $_FILES['file']; // Получение загруженного файла
        $wordTargetLanguage = $_POST['wordTargetLanguage'];
        $transcription = $_POST['transcription'];
        $wordNativeLanguage = $_POST['wordNativeLanguage'];
        $level = $_POST['level'];
        $context = $_POST['context'];
        $idCategory = $_POST['idCategory'];
        $path = dirname(__DIR__).'\\Picture\\UserWords\\'.$file['name'];
        // Сохранение файла на сервере
        if(move_uploaded_file($file['tmp_name'], $path))
        {
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
            $path = '\\Picture\\UserWords\\'.$file['name'];
            $path = addslashes($path);
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
                $sql3 = "INSERT INTO UserDictionary(IdUser, IdDictionary, Level) VALUES ('$userId', '$last_id', '$level')";
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
                $sql3 = "INSERT INTO UserDictionary(IdUser, IdDictionary, Level) VALUES ('$userId', '$last_id', '$level')";
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