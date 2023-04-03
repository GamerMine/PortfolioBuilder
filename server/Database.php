<?php

class Database
{
    const PORT   = 5432;
    const HOST   = "woody";
    const DBNAME = "sm211563";
    const LOGIN  = "sm211563";
    const PASS   = "pompier50";

    private static ?Database $instance = null;
    private ?PDO $connection = null;

    private function __construct() {
        try {
            $this->connection = new PDO("pgsql:host=".self::HOST." port=".self::PORT." dbname=".self::DBNAME, self::LOGIN, self::PASS);
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

    public function checkUserExistence($mail): int
    {
        $stmt = $this->connection->prepare("SELECT * FROM Account WHERE mail = ?");
        $stmt->execute([$mail]);

        return sizeof($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function getPassword($mail): string {
        $stmt = $this->connection->prepare("SELECT pass FROM Account WHERE mail = ?");
        $stmt->execute([$mail]);

        return $stmt->fetch()[0];
    }

    public function getAllUserHome(): array
    {
        $stmt = $this->connection->prepare("SELECT homecontent, info.mail, name, surname  FROM info JOIN account a on a.mail = info.mail");
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function addAccount($mail, $pass)
    {
        $stmt = $this->connection->prepare(" INSERT INTO account(mail,pass) VALUES(?,?)");
        $values = array($mail,$pass);
        $stmt->execute($values);
    }

    public function close() {
        $this->connection = null;
    }

    public function getUserHome($mail)
    {
        $stmt = $this->connection->prepare("SELECT homecontent  FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);

        return $stmt->fetch();
    }

    public function getHomeContent($mail)
    {
        $stmt = $this->connection->prepare("SELECT homecontent FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");

        $stmt->execute([$mail]);

        return $stmt->fetch()[0];
    }
}