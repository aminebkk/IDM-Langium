# Projet IDM_Langium - Amine Bakhtaoui

## Architecture
Le dépôt est composé de 2 parties principales :
- Le dossier [IDM](./IDM/) contient la partie modèle ECore et la génération en XText et Langium. Ce dossier correspond donc à la partie Eclipse.
- Le dossier [IDM Langium](./IDM%20Langium/) contient la syntaxe concrète Langium effectuée sur Visual Studio Code.

## ECore
Le modèle ECore ressemble se trouve dans le dossier [IDM/robot/](./IDM/robot/) et le diagramme associé ressemble à ceci :
![robot.svg](robot.svg)

## XText 
Le projet Xtext se trouve dans le dossier [IDM/fr.istic/](./IDM/fr.istic/). Il corrrespond à la génération automatique réalisé à partir du projet ECore. Aucune modification n'a été apportée directement sur ce projet, sauf ajouts nécessaires à la transformation Langium.

## Langium
### Grammaire
Le projet Langium se trouve dans le dossier [IDM Langium](./IDM%20Langium/) et contient essentiellement la syntaxe concrète et la grammaire de ce langage.  
Cette syntaxe se trouve dans le fichier [IDMLangium/robot/src/language/Robot.langium](./IDM%20Langium/robot/src/language/Robot.langium).

Il est possible de tester cette syntaxe avec le fichier [test.rob](./IDM%20Langium/test.rob) avec une instance de Visual Studio Code avec l'extension chargée. 

Pour ce faire, il faut lancer les commandes suivantes depuis le dossier [robot](./IDM%20Langium/robot/) :
- `npm run langium:generate`
- `npm run build`
- `code --extensionDevelopmentPath=$PWD`

Dans cette nouvelle instance, il est possible de charger un fichier ou de créer un nouveau fichier pour effectuer des tests sur la syntaxe et la grammaire.

### Interpreter
La partie interpréteur a été partiellement mise en place. 
Les fichiers suivants ont été créés et contiennent les bases de l'implémentation :

- [visitor.ts](./IDM%20Langium/robot/src/semantics/visitor.ts) : Ce fichier contient les constructeurs nécessaires pour implémenter le pattern Visitor. Les classes et méthodes ont été définies, mais certaines fonctionnalités restent à compléter.
- [accept-weaver.ts](./IDM%20Langium/robot/src/semantics/accept-weaver.ts) : Ce fichier sert à intégrer le pattern Visitor dans le processus d'interprétation. Il inclut les bases pour accepter les visiteurs, mais l'implémentation complète est encore en cours.

Malheureusement, je n'ai pas pu finaliser les visiteurs ni leur intégration dans le processus global d'exécution du programme, principalement en raison de contraintes de temps et de certaines difficultés techniques rencontrées lors de l'implémentation.

NB : Il n'y a pas de partie compilation.