# Projet_Escape_Game

Nous vous souhaitons la bienvenue dans cet escape game géographique basé sur le thème des Sports Extrêmes. 

Dans ce jeu vous incarnez un passionné de glisse et de sensations fortes qui souhaite ouvrir dans la ville de Champs-sur-Marne un musée des sports extrêmes. Aidez le dans sa tâche en collectant partout autour du monde les évènements qui ont marqués, ces 60 dernières années, le monde des sports extrêmes. 
Vous trouverez dans ce jeu plusieurs types d'objets, certains récupérables directement, d'autres enfermés dans des coffres mystérieux qu'ils vous faudra dévérouiller à l'aide d'objet-clés ou de codes ... 
Alors fartez vos skis, enfilez votre casques, ajustez votre masque, et EN PISTE !


## NOTES POUR L'INSTALLATION DU JEU SUR VOTRE MACHINE PERSONNELLE ##

Pour pouvoir faire tourner le jeu sur votre machine personnelle, il vous faudra suivre un certain nombre d'étapes :
1) Récupérer le fichier de sauvegarde de la BDD PostgreSQL, puis ouvrir PGAdmin4
2) Créer une BDD appelée "objets_escape" dans laquelle vous importerez le fichier de sauvegarde (clique droit sur la BDD > restore)
3) Installer la dernière version de WAMP server (si possible, selectionner Firefox comme navigateur par défault, et notepad++ comme éditeur de texte lors de l'installation)
4) Lancer WAMP server
5) Cliquer sur le W (normalement de couleur verte) > PHP > php.ini > décommenter les lignes ;extension=pgsql et ;extension=pdo_pgsql (chercher par ctrl + F)
6) Cliquer sur le W > Apache > httpd.conf > ctrl+F chercher "DocumentRoot" > modifier le DocumentRoot actuel par le chemin du fichier où vous avez enregistrer le dossier "Projet_Escape_Game" (exemple : C:/Users/Benoit/Documents/COURS_GEOMATIQUE/Github/)
7) Vérifier que le fichier "libpq.dll" (situé au chemin C:\wamp64\bin\php, si plusieurs fichiers correspondants aux différentes versions de php sont présents, aller dans le fichier correspondant à la version utilisée par votre ordinateur) est bien dans une version supérieur à 10 (clic droit > propriétés > détails). Si ce n'est pas le cas, télécharger une version de ce fichier supérieure à la 10 (trouvable sur internet) et copiez la à la place du fichier "libpq.dll" actuel
8) Relancer les services pour prendre en compte les modifications : Sur le W > "Redémarrer les services" => W devient orange, rouge, orange, vert
9) Ouvrir un navigateur, taper 'localhost', vérifier sur la page d'accueil que les extensions pgsql et pdo_pgsql sont activées
10) Ajouter un VirtualHost à WAMP server, qui porte le nom du dossier dans lequel vous avez enregistré "Projet_Escape_Game" (le nom de ce dossier ne doit pas comporter de tiret du bas) et indiquer le chemin de ce dossier (ex : C:/Users/Benoit/Documents/COURS_GEOMATIQUE/Github/)
11) Re-charger virtualhost, et ouvrir le site web par l'intermédiaire du nouveau VirtualHost créé


## NOTES GLOBALES ##

De temps en temps certains markers ne s'affichent pas sans trop de raison, donc en cas de problèmes, si vous voulez quand même "simuler" une fin de jeu nous vous laissons modifier la valeur initial de la variable: "nb_obj_recup" à 20 par exemple, ainsi, dès qu'on trouve un objet, le méchanisme de fin se lance.

Aussi, tous les indices pour faciliter la correction se trouvent dans le fichier "indices_pour_correction.xlsm".

Pour finir, nous avons réalisé un organigramme pour faciliter la compréhension du fonctionnement globale de notre programme. Ce fichier se nomme "Organisation_code.pdf". N'hésitez pas non plus à nous contacter en cas de besoin (benoit.cachard@ensg.eu et louis.steinmetz@ensg.eu).