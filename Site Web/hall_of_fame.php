<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=objets_escape', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);


//Première requete: ajoute le pseudo du joueur et son score à la BDD hall_of_fame. L'id etant serial il s'incrémente tout seul
    $pseudo = $json["pseudo"];
    $score = $json["score"];
    $sql_1 = "INSERT INTO hall_of_fame (pseudo, score) VALUES ('$pseudo', '$score');";
    $resultset_1 = $connexion->prepare($sql_1);
    $resultset_1->execute();


//Seconde requête: on compte le nombre de joueur (ie le nb de lignes à notre BDD)
    $sql_2 = "SELECT COUNT(*) FROM hall_of_fame;";
    $nb_joueurs = $connexion->prepare($sql_2);
    $nb_joueurs->execute();

    if ($nb_joueurs <= '10') {
        $sql = "SELECT * FROM hall_of_fame ORDER BY score DESC;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "pseudo" => $pseudo,
                "score" => $score
            ];
        }

        echo json_encode($tableau);

    } else {

        $sql = "SELECT * FROM hall_of_fame ORDER BY score DESC LIMIT 10;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "pseudo" => $pseudo,
                "score" => $score
            ];
        }

        echo json_encode($tableau);
    }
?>