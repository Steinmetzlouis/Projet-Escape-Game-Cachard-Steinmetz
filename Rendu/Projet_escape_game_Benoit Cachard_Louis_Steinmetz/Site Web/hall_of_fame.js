//Déclaration des variables
let tableau = document.getElementById('tableau');
let joueur = document.getElementById('joueur');


//Récupération des données du joueur (pseudo + score)
fetch('joueur.php', {
    method: 'post',
    body: JSON.stringify({["fin"] : true}) //Doit chercher le pseudo et le score du joueur
    })
.then(results => results.json())
.then(results => {
    results.forEach(function (result) {
    let pseudo = result.pseudo;
    let score = result.score;

    joueur.innerText = "Félicitation "+ pseudo +", vous avez completé votre musée des sports extrèmes avec un score de "+ score+" points !";

    fetch('hall_of_fame.php', {
        method: 'post',
        body: JSON.stringify({["pseudo"] : pseudo, ["score"] : score}) //On envoie pseudo et score du joueur pour l'ajouter à la table hall_of_fame et on récupère le top 10
        })
    .then(results2 => results2.json())
    .then(results2 => {
        results2.forEach(function (result2) {
            console.log(result2.pseudo)
            let new_line = tableau.appendChild(document.createElement('tr'));
            let colonne_1 = new_line.appendChild(document.createElement('td'));
            let colonne_2 = new_line.appendChild(document.createElement('td'));
            colonne_1.appendChild(document.createTextNode(result2.pseudo));
            colonne_2.appendChild(document.createTextNode(result2.score));
        })
    })
    })
})


//Fonctions

function retour() {
    window.location.href="index.html";
}