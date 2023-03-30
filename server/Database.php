<?php

class Database
{
    const PORT   = 5432;
    const HOST   = "woody";
    const DBNAME = "sm211563";
    const LOGIN  = "sm211563";
    const PASS   = "pompier50";

    private static $instance = null;
    private $connection = null;

    private function __construct() {
        try {
            $this->connection = new PDO("pgsql:host=".self::HOST."port=".self::PORT."dbname=".self::DBNAME, self::LOGIN, self::PASS);
        } catch (PDOException $e) {
            echo "Erreur de connexion : ".$e->getMessage();
        }
    }

    public static function getInstance(): ?Database
    {
        if (is_null(self::$instance)) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function checkUserExistence($mail, $pass): int
    {
        $stmt = $this->connection->prepare("SELECT * FROM Account WHERE mail = ? AND pass = ?");
        $stmt->execute([$mail, $pass]);

        return sizeof($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function close() {
        $this->connection = null;
    }
}