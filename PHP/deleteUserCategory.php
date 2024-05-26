<?php
    session_start();
    if($_SESSION['userEmail'])
    {
        $userId = $_SESSION['userId'];
        $idCategory = $_POST['idCategory']; // Получаем Id категории
        $directory = dirname(__DIR__).'/Picture/'.$userId.'/'.$idCategory;
        // Удаление файлов в папке
        $files = glob($directory . '/*'); // Получаем список файлов в папке
        foreach ($files as $file) 
        {
            if (is_file($file))
            {
                unlink($file); // Удаляем файл
            }
        }
        rmdir($directory); // Удаление пустой папки (данная функция может удалить только пустую папку)
        require 'linkDB.php';
        // Создаем подключение
        $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
        // Проверяем подключение
        if (!$Connect)
        {
            die("Ошибка подключения: " . mysqli_connect_error());
        }
        $sql = "DELETE FROM Category WHERE Id = $idCategory"; // SQL запрос
        $result = mysqli_query($Connect, $sql); // выполнение запроса
        mysqli_close($Connect); // Закрываем соединение с базой данных
    }
?>