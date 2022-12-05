//Ajout de la map


let map = L.map('map').setView([46.227638, 2.213749], 3); // Valeur par défaut
let groupmarker = L.featureGroup().addTo(map);
groupmarker.bringToFront();

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(map);

//Demmarage du timer

let timer = 0;

function augmenterTimer(){
    timer++;
	let minutes = Math.trunc(timer/60);
	let secondes = timer - minutes*60;
	document.getElementById('timer').innerText = minutes+" : "+secondes;
    setTimeout(augmenterTimer,1000);
}
augmenterTimer();



//nombre d'objets récupérés
let nb_obj_recup = 0;



//Fonctions


function addToInventory(event, id, marker) {
	event.preventDefault;
	groupmarker.clearLayers();
	nb_obj_recup++;

	let objet_inventaire = document.getElementById('objet'+id);
	objet_inventaire.innerHTML = '<img src="logos_escape/' + id + '.png" alt="objet récupéré" class="objets_inventaire">';

	//Test de fin
	if (nb_obj_recup >= 21) {
		let temps_joueur = timer;
		let pas = temps_joueur/15;
		let score = 3000 - Math.trunc(pas)*10;
		if (score < 0) {score = 0}	//pas de score négatifs

		fetch('joueur.php', {	
			method: 'post',
			body: JSON.stringify({["score"] : score}) //on envoie le score au serveur php qui stock les variables du joueur
		});

		setTimeout(() => {
			window.location.href="hall_of_fame.html";
		}, 500)
		  
	}
}


function afficheRecompenses(event, grpe) {
	event.preventDefault;
	
	fetch('server_objets.php', {
		method: 'post',
		body: JSON.stringify({["groupe_recompenses"] : grpe}) //Doit chercher l'objet de nature clé correspondant au groupe en question, afin d'afficher les récompenses si la clé est dans l'inventaire
		})
	.then(results => results.json())
	.then(results => {
		results.forEach(function (result) {
			addmarkertomap(result.latitude, result.longitude, result.id, result.texte);
		})
	})
}


function clikObjPopUp(event, id) {
	event.preventDefault;

	let popup = window.prompt('Entrez le code à 4 chiffres :');
	while (popup != "1989") {
		if (popup == null) {
			return 'sortie fonction';
		} else {
			popup = window.prompt("Mauvais code, réessayez. Si vous n'avez pas le code, cliquez sur 'Annuler': ");	
		}
	}

	addToInventory(event, id, null);

	fetch('server_objets.php', {
		method: 'post',
		body: JSON.stringify({["objet_a_code"] : "true"}) // va chercher la récompense et l'objet qui doivent s'afficher après l'ouverture du coffre à code
		})
	.then(results => results.json())
	.then(results => {
		results.forEach(function (result) {
			addmarkertomap(result.latitude, result.longitude, result.id, result.texte, result.type_objet, result.nature, result.groupe);
		})
	})
}


function addmarkertomap(lat, lon, id, txt, type=null, nat=null, grpe=null) {
	//personalisation icon markers
	let LeafIcon = L.Icon.extend({
		options: {
		   iconSize:     [100, 100],
		   shadowSize:   [50, 64],
		   iconAnchor:   [50, 50],
		   shadowAnchor: [4, 62],
		   popupAnchor:  [-3, -76]
		}
	});
	let iconperso = new LeafIcon({
		iconUrl: "logos_escape/"+id+".png"
	})

	if (type == 'bloque_objet' && nat =='coffre') { // cas ou on affiche un coffre mais que l'utilisateur n'a pas encore la clé dans son inventaire
		//Marker Leaflet
		let popup = L.popup().setContent(txt + '<div class="button_recup">Recupérez la clé</div>');
		L.marker([lat, lon], {icon: iconperso}).addTo(groupmarker).bindPopup(popup);

	} else if (type == 'bloque_objet' && nat == 'cle_ok') { // cas ou on affiche un coffre et que l'utilisateur à déjà la clé dans son inventaire
		//Marker Leaflet

		let div = document.createElement('div');
		div.className = "button_recup";
		let button = document.createElement('button');
		button.innerText = 'Récupérer';
		let text = document.createElement('p');
		text.innerText = txt;
		div.append(text);
		div.append(button);

		let marker = L.marker([lat, lon], {icon: iconperso}).addTo(groupmarker).bindPopup(div);

		button.addEventListener('click', function(){
			addToInventory(event, id, null);
			afficheRecompenses(event, grpe);
		});

	} else if (type == 'bloque_code' && nat == 'coffre') { // cas ou on affiche un coffre et que l'utilisateur à déjà la clé dans son inventaire
		//Marker Leaflet

		let div = document.createElement('div');
		div.className = "button_recup";
		let button = document.createElement('button');
		button.innerText = 'Récupérer';
		let text = document.createElement('p');
		text.innerText = txt;
		div.append(text);
		div.append(button);

		L.marker([lat, lon], {icon: iconperso}).addTo(groupmarker).bindPopup(div);

		button.addEventListener('click', function(){
			clikObjPopUp(event, id);
		});

	} else { // cas le plus classique, pour un objet qui n'a pas (ou plus) de lien avec un ou plusieurs autres objets
		//Marker Leaflet

		let div = document.createElement('div');
		div.className = "button_recup";
		let button = document.createElement('button');
		button.innerText = 'Récupérer';
		let text = document.createElement('p');
		text.innerText = txt;
		div.append(text);
		div.append(button);

		let marker = L.marker([lat, lon], {icon: iconperso}).addTo(groupmarker).bindPopup(div);

		button.addEventListener('click', addToInventory.bind(null, marker, id));
	}
}








//Requètes


function zoomLevel(event) {
	event.preventDefault; // permet de prévenir d'éventuels effets par défaut indésirable
	groupmarker.clearLayers();
	let zoomMap = map.getZoom();
	
	fetch('server_objets.php', {
		method: 'post',
		body: JSON.stringify({["initialisation"] : true}) //Renvoi l'intégralité de la table pour faire tourner la fonction principale en analysant chacune des lignes
	})
	.then(results => results.json())
	.then(results => {
		results.forEach(function (result) {
			
			let minZoom = result.zoom;
			let id = result.id;
			let div_id = document.getElementById('objet'+id);

			if (zoomMap >= minZoom && div_id.children.length == 0) {	//si le niveau de zoom est supérieur à celui nécessaire pour afficher le marker + l'objet n'est pas déjà dans l'inventaire

				if (result.type_objet == "bloque_code"){	

					if (result.nature == "coffre") {
					
						let lat = result.latitude;	//latitude du coffre, qui s'affiche directement bien que bloqué par le pop-up code
						let lon = result.longitude;
						let txt = result.texte;
						let type = result.type_objet;
						let nat = result.nature;
						let grpe = result.groupe;

						addmarkertomap(lat, lon, id, txt, type, nat, grpe);

					
					} else if (result.nature == "recompense") { // permet de ré-afficher la récompense qui a été clear par la clear groupmarker, alors que le coffre à code est bien ouvert
						
						let lat = result.latitude;
						let lon = result.longitude;
						let txt = result.texte;
						let grpe = result.groupe;


						fetch('server_objets.php', {
							method: 'post',
							body: JSON.stringify({["recompense_stay"] : grpe}) // on va chercher le coffre associé à la récompense pour savoir si il a déjà été ouvert
						})
						.then(results2 => results2.json())
						.then(results2 => {
							results2.forEach(function (result2) {
								let id_coffre_corresp = result2.id;
								let div_id_coffre_corresp = document.getElementById('objet'+id_coffre_corresp);

								if (div_id_coffre_corresp.children.length != 0) {
									addmarkertomap(lat, lon, id, txt);
								}
							})
						})

					} else if (result.nature == "objet") { // permet de ré-afficher l'objet qui a été clear par la clear groupmarker, alors que le coffre à code est bien ouvert
						
						let lat = result.latitude;
						let lon = result.longitude;
						let txt = result.texte;
						let grpe = result.groupe;

							
						fetch('server_objets.php', {
							method: 'post',
							body: JSON.stringify({["recompense_stay"] : grpe}) // on va chercher le coffre associé à la récompense pour savoir si il a déjà été ouvert
						})
						.then(results3 => results3.json())
						.then(results3 => {
							results3.forEach(function (result3) {
								let id_coffre_corresp = result3.id;
								let div_id_coffre_corresp = document.getElementById('objet'+id_coffre_corresp);

								if (div_id_coffre_corresp.children.length != 0) {
									addmarkertomap(lat, lon, id, txt);
								}
							})
						})
					}

				} else if (result.type_objet == "bloque_objet"){

					if (result.nature == "coffre") {

						let lat = result.latitude;	//latitude du coffre, qui s'affiche directement bien que bloqué par le pop-up code
						let lon = result.longitude;
						let txt = result.texte;
						let type = result.type_objet;
						let nat = result.nature;
						let grpe = result.groupe;

						// faire un test pour savoir si le coffre est cliquable (clé dans l'inventaire) ou non (clé n'est pas dans l'inventaire)
						// en prenant pour base le bout de code ci-dessous jusqu'à la fin de la boucle "if (result.feature.nature == "coffre")"

							
						fetch('server_objets.php', {
							method: 'post',
							body: JSON.stringify({["groupe"] : grpe}) //Doit chercher l'objet de nature clé correspondant au coffre du groupe en question, afin de tester si elle est déjà dans l'inventaire
						})
						.then(results2 => results2.json())
						.then(results2 => {
							results2.forEach(function (result2) {
								let id_cle = result2.id;
								let div_cle_id = document.getElementById('objet'+id_cle);

								if (div_cle_id.children.length != 0) {

									//alors clé dans inventaire donc coffre récupérable avec bouton
									//Une fois le bouton cliqué, fetch pour recup récompenses associées et les balancer dans addmarker to map
									nat = 'cle_ok';
									addmarkertomap(lat, lon, id, txt, type, nat, grpe);

								} else {
									//alors pas de clé, donc le bouton est juste un texte non clicable "chercher la clé"
									addmarkertomap(lat, lon, id, txt, type, nat);
								}
							})
						})

					} else if (result.nature == "recompense") { // permet de ré-afficher la récompense qui a été clear par la clear groupmarker
						
						let lat = result.latitude;
						let lon = result.longitude;
						let txt = result.texte;
						let grpe = result.groupe;

							
						fetch('server_objets.php', {
							method: 'post',
							body: JSON.stringify({["recompense_stay"] : grpe}) // on va chercher le coffre associé à la récompense pour savoir si il a déjà été ouvert
						})
						.then(results3 => results3.json())
						.then(results3 => {
							results3.forEach(function (result3) {
								let id_coffre_corresp = result3.id;
								let div_id_coffre_corresp = document.getElementById('objet'+id_coffre_corresp);

								if (div_id_coffre_corresp.children.length != 0) {
									addmarkertomap(lat, lon, id, txt);
								}
							})
						})
					}

				} else if (result.type_objet == "code" || result.type_objet == "recuperable") {
					// les objets de type "recuperable" et "code" sont affichable et cliquable directement sans aucune condition
					let lat = result.latitude;	//latitude du code qui est une clé donc affichable directement
					let lon = result.longitude;
					let txt = result.texte;

					addmarkertomap(lat, lon, id, txt);

				}
			}
		})
	})
}

//addEventListener

map.addEventListener('zoom', zoomLevel);