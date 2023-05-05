# PROJET MERCADONA
## 1. Les fonctionnalités attendues
Pour le projet Mercadona  nous devons intéresser à trois aspects d’user story :<br>
En tant que client récurrent, il souhaite que la présentation des produits à la gestion de la transaction, en passant par le tunnel d'achat et les fonctionnalités de promotion commerciale (utilisation de coupons de réduction ou gestion des offres spéciales) gestion des stocks, des commandes, et des livraisons soient sauvegardées afin que l’expérience de promotion et paiement soient plus fluide<br>
## 2.  Les éléments à sécurité :  
Se conformer à toutes les contraintes de sécurité et de suivi de la relation client cette solution sera connecter à un système de gestion de contenu (Django administration) permettant de gérer toutes les informations relatives à la relation avec la clientèle et une logique de sécurité est obligatoire pour les utilisateurs qui passent des commandes, mais aussi des formulaires de paiement et la livraison d’utilisateur identifié en utilisant les instructions de contrôle comme : 
- [x] If  
- [x] Else,  
- [x] Try  
- [x] Catch 
- [x] Except …<br> 
En parlant de sécurité technique :  
Le protocole https désigne simplement la version sécurisée de l’habituel http, 
Les accès inutiles fermés : Il faut bien sûr les connaître, savoir si ces possibilités sont ouvertes ou fermées et le cas échéant qui y a accès, vérifier que le login et le mot de passe y a accès

## 3. Les choix techniques:
les développements représentent environ les deux tiers de la charge facturée. La partie ou 
les clients émettent des demandes (les requêtes api) auxquelles répondent le serveur. Pour cette application 
en particulier, on fera en deux familles distinctes : django-rest-framework API côté serveur et reactJs côté 
client et css pour la mise en forme des pages<br>
<a href="(https://github.com/Alioudione12/mecadonastudy)">
    <img src="python+react.jpg" alt="Logo" width="600" height="400">
  </a>
  <br>
- [x] Côté serveur :<br>
qui permettra notamment de générer des pages à la volée à partir des requêtes api des utilisateurs et 
des informations stockées dans des bases de données.<br> 
Django-rest-framework la partie du business logique:
* Les modelés : fournissent une couche d'abstraction pour structurer et manipuler les données  
* Des vues : pour encapsuler la logique responsable du traitement de la demande d'un utilisateur et du retour de la réponse. 
* Url : c'est l'algorithme que le système suit pour déterminer quel code exécuter
#### Rest_framework_api (Interface de programmation d'applications) est un ensemble de méthodes :
* GET<br>
* POST<br>
* PUT<br>
* DELETE...<br> 
En passant par la sérialisation qui définissent comment les données de la base peuvent se connecter et communiquer entre le frontend 
* TokenAuthentication:<br>
qui me permet de gérer la création de compte et inscription des utilisateurs et administrateur du site <br>
<a href="(https://github.com/Alioudione12/mecadonastudy)">
    <img src="user authori.jpg" alt="Logo" width="600" height="400">
  </a>
Postman pour connecter les api<br>

- [x] Côté client :<br>
React JS framework de javascript qui facilite la création d'interface 
React Router une bibliothèque de routage standard dans react.<br>
Il rend l'interface de l'application synchrone avec l'URL du navigateur et de router clairement le flux de données.<br> 
React Redux est une bibliothèque indépendante qui nous aide à gérer notre état en donnant à nos composants l'état dont il a besoin via un store<br> 
<a href="(https://github.com/Alioudione12/mecadonastudy)">
    <img src="redux pater.jpg" alt="Logo" width="600" height="400">
  </a>
