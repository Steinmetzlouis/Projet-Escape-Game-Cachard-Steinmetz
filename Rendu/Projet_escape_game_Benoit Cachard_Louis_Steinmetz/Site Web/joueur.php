<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=objets_escape', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);



    if (isset($json["pseudo"] ) == true) {

        $sql = "DELETE FROM joueur;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $pseudo = $json["pseudo"];
        $sql_2 = "INSERT INTO joueur (pseudo, id) VALUES ('$pseudo', '1');";
        $resultset_2 = $connexion->prepare($sql_2);
        $resultset_2->execute();

    } else if (isset($json["score"] ) == true) {

        $score_joueur = $json["score"];
        $sql = "UPDATE joueur SET score = $score_joueur WHERE id = 1;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();
    } else {

        $sql = "SELECT * FROM joueur;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "pseudo" => $pseudo,
                "score" => $score
            ];
        }
        echo json_encode($tableau);
    }
?>