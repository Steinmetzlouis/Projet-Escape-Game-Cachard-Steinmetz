function getValue() {
    let pseudo = document.getElementById("pseudo").value;
    //alert(pseudo);
    openPageGame(pseudo);
    sendPseudoPHP(pseudo);
}

function openPageGame(pseudo) {
    if (pseudo != "") {
        window.location.href="jeu.html"; //si on a un pseudo, on lance la page du jeu
    } else {
        alert ("Vous devez entrer un pseudo pour lancer le jeu !"); //si on a pas de pseudo, on alerte l'utilisateur
    }
}

function sendPseudoPHP(pseudo) {
    if (pseudo != "") {
        fetch('joueur.php', {	
            method: 'post',
            body: JSON.stringify({["pseudo"] : pseudo}) //on envoie le pseudo au serveur php qui stock les variables du joueur
        });
    }
}