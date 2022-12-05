<?php
    $connexion = new PDO('pgsql:host=localhost;port=5432;dbname=objets_escape', 'postgres', 'postgres');
    $json = json_decode(file_get_contents('php://input'), true);

    
    if (isset($json["initialisation"] ) == true) { //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes

        $sql = "SELECT * FROM extrem_sports_objects ORDER BY id;";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "latitude" => $latitude,
                "longitude" => $longitude,
                "type_objet" => $type_objet,
                "nature" => $nature,
                "groupe" => $groupe,
                "initial" => $initial,
                "groupe" => $groupe,
                "texte" => $texte,
                "zoom" => $zoom
            ];
        }
        echo json_encode($tableau);

    } else if (isset($json["groupe"]) == true) { //Doit chercher l'objet de nature clé correspondant au coffre du groupe en question, afin de tester si elle est déjà dans l'inventaire

        $groupe = $json["groupe"];
        $sql = "SELECT * FROM extrem_sports_objects WHERE groupe = '$groupe' AND nature = 'cle';";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "latitude" => $latitude,
                "longitude" => $longitude,
                "type_objet" => $type_objet,
                "nature" => $nature,
                "groupe" => $groupe,
                "initial" => $initial,
                "groupe" => $groupe,
                "texte" => $texte,
                "zoom" => $zoom
            ];
        }
        echo json_encode($tableau);

    } else if (isset($json["groupe_recompenses"]) == true) { //Doit chercher l'objet de nature clé correspondant au groupe en question, afin d'afficher les récompenses si la clé est dans l'inventaire

        $groupe_recompenses = $json["groupe_recompenses"];
        $sql = "SELECT * FROM extrem_sports_objects WHERE groupe = '$groupe_recompenses' AND nature = 'recompense';";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "latitude" => $latitude,
                "longitude" => $longitude,
                "type_objet" => $type_objet,
                "nature" => $nature,
                "groupe" => $groupe,
                "initial" => $initial,
                "groupe" => $groupe,
                "texte" => $texte,
                "zoom" => $zoom
            ];
        }
        echo json_encode($tableau);

    } else if (isset($json["recompense_stay"]) == true) { // on va chercher le coffre associé à la récompense pour savoir si il a déjà été ouvert

        $recompense_stay = $json["recompense_stay"];
        $sql = "SELECT * FROM extrem_sports_objects WHERE groupe = '$recompense_stay' AND nature = 'coffre';";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();

        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "latitude" => $latitude,
                "longitude" => $longitude,
                "type_objet" => $type_objet,
                "nature" => $nature,
                "groupe" => $groupe,
                "initial" => $initial,
                "groupe" => $groupe,
                "texte" => $texte,
                "zoom" => $zoom
            ];
        }
        echo json_encode($tableau);

    } else if (isset($json["objet_a_code"] ) == true) { // va chercher la récompense et l'objet qui doivent s'afficher après l'ouverture du coffre à code

        $sql = "SELECT * FROM extrem_sports_objects WHERE groupe = 'trail' AND (nature = 'recompense' OR nature = 'objet');";
        $resultset = $connexion->prepare($sql);
        $resultset->execute();
        
        $tableau = [];
        while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) { 
            extract($row);
            $tableau[] = [
                "id" => $id,
                "latitude" => $latitude,
                "longitude" => $longitude,
                "type_objet" => $type_objet,
                "nature" => $nature,
                "groupe" => $groupe,
                "initial" => $initial,
                "groupe" => $groupe,
                "texte" => $texte,
                "zoom" => $zoom
            ];
        }
        echo json_encode($tableau);
    }
?>