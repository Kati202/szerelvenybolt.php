<?php
//Adatbázis kapcsolat beállítása
$host = 'localhost';
$dbname = 'szerelvenybolt';
$username ='root';
$password='mysql';

try
{
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e)
{
    die("Hiba: " . $e->getMessage());
}
