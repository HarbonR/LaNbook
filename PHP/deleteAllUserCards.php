<?php
    // Удаление всех картинок в папке и самой папки
    session_start();
    $userId = $_SESSION['userId'];
    $idCategory = $_POST['idCategory']; // Получаем Id категории
    $directory = dirname(__DIR__).'\\Picture\\'.$userId.'\\'.$idCategory.'\\Words';
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
    // Удаление данных о пользовательских карточек из БД данной категории
    require 'linkDB.php';
    // Создаем подключение
    $Connect = mysqli_connect($serverName, $userName, $password, $dBName);
    // Проверяем подключение
    if (!$Connect)
    {
        die("Ошибка подключения: " . mysqli_connect_error());
    }
    $userId = $_SESSION['userId'];
    $idCategory = $_POST['idCategory']; // Получаем Id категории
    $sql = "DELETE UserDictionary, DictionaryCategory, Dictionary
            FROM
                UserDictionary
            JOIN Dictionary ON UserDictionary.IdDictionary = Dictionary.Id
            JOIN DictionaryCategory ON DictionaryCategory.IdDictionary = UserDictionary.IdDictionary
            JOIN Category ON DictionaryCategory.IdCategory = Category.Id
            WHERE
                UserDictionary.IdUser = '$userId' AND Category.Id = '$idCategory'"; // SQL запрос
    //$result = mysqli_query($Connect, $sql); // выполнение запроса
    if (!mysqli_query($Connect, $sql))
    {
        echo "Error: " . mysqli_error($Connect);
    }
    mysqli_close($Connect); // Закрываем соединение с базой данных
?>