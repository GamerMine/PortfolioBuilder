<?php

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

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
        $stmt = $this->connection->prepare("SELECT homecontent FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);

        return $stmt->fetch();
    }

    public function getUserInfo($mail) : array
    {
        $stmt = $this->connection->prepare("SELECT name, surname, mail  FROM info WHERE mail=?");
        $stmt->execute([$mail]);

        return $stmt->fetchAll();
    }

    public function getHomeContent($mail)
    {
        $stmt = $this->connection->prepare("SELECT homecontent FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");

        $stmt->execute([$mail]);

        return $stmt->fetch()[0];
    }

    public function getProjectContent($mail, $id) {
        $stmt = $this->connection->prepare("SELECT content FROM project JOIN account a on a.mail = project.mail WHERE a.mail = ? AND id = ?");
        $stmt->execute([$mail, $id]);

        return $stmt->fetch()[0];
    }

    public function getSkillContent($mail, $id) {
        $stmt = $this->connection->prepare("SELECT content FROM skill JOIN account a on a.mail = skill.mail WHERE a.mail = ? AND id = ?");
        $stmt->execute([$mail, $id]);

        return $stmt->fetch()[0];
    }

    public function getSkillPagesList($mail) {
        $stmt = $this->connection->prepare("SELECT id FROM skill JOIN account a on a.mail = skill.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProjectPagesList($mail) {
        $stmt = $this->connection->prepare("SELECT id FROM project JOIN account a on a.mail = project.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function checkIfPortfolioExist($mail): bool
    {
        $stmt = $this->connection->prepare("SELECT * FROM project JOIN account a on a.mail = project.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) return true;

        $stmt = $this->connection->prepare("SELECT * FROM skill JOIN account a on a.mail = skill.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) return true;

        $stmt = $this->connection->prepare("SELECT * FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0) return true;

        return false;
    }

    public function setUserInfo($title, $name, $surname, $mail): void
    {
        $stmt = $this->connection->prepare("SELECT a.mail FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);
        if (!sizeof($stmt->fetchAll(PDO::FETCH_ASSOC))) {
            $stmt = $this->connection->prepare("INSERT INTO info(mail, content, homecontent, license, cv, name, surname) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$mail, "null", "null", "null", "null", $name, $surname]);
        } else {
            $stmt = $this->connection->prepare("UPDATE info SET name = ?, surname = ? WHERE mail = ?");
            $stmt->execute([$name, $surname, $mail]);
        }
    }

    public function setHomeContent($mail,$content)
    {
        $stmt = $this->connection->prepare("SELECT a.mail FROM info JOIN account a on a.mail = info.mail WHERE a.mail = ?");
        $stmt->execute([$mail]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0)
        {
            $stmt = $this->connection->prepare("UPDATE info SET homecontent=? WHERE mail=?");
            $stmt->execute([$content,$mail]);
        }
    }

    public function setProjectContent($mail,$content,$id)
    {
        $stmt = $this->connection->prepare("SELECT a.mail FROM project JOIN account a on a.mail = info.mail WHERE a.mail = ? AND id=?");
        $stmt->execute([$mail,$id]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0)
        {
            $stmt = $this->connection->prepare("UPDATE project SET content=? WHERE mail=?");
            $stmt->execute([$content,$mail]);
        }
        else
        {
            $stmt = $this->connection->prepare("INSERT INTO project(id,mail,content) VALUES (?, ?, ?)");
            $stmt->execute([$id,$mail,$content]);
        }
    }

    public function setSkillContent($mail,$content,$id)
    {
        $stmt = $this->connection->prepare("SELECT a.mail FROM skill JOIN account a on a.mail = info.mail WHERE a.mail = ? AND id=?");
        $stmt->execute([$mail,$id]);
        if (sizeof($stmt->fetchAll(PDO::FETCH_ASSOC)) > 0)
        {
            $stmt = $this->connection->prepare("UPDATE skill SET content=? WHERE mail=?");
            $stmt->execute([$content,$mail]);
        }
        else
        {
            $stmt = $this->connection->prepare("INSERT INTO skill(id,mail,content) VALUES (?, ?, ?)");
            $stmt->execute([$id,$mail,$content]);
        }
    }
}