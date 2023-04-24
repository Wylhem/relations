<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Installation et configuration

Ouvrez un terminal à l'endroit où vous voulez placer le projet et clonez le code depuis GitHub à l'aide de la commande suivante :

```shell
git clone https://github.com/Wylhem/relations.git
```

## Installation des dépendances

Assurez vous de vous être placer dans le dossier du projet.

Ouvrez un terminal et tapez les commandes suivantes

```shell
npm install
```

## Fichiers à modifier

Dans le dossier ".env", vous trouverez le code suivant :

```javascript

DATABASE_URL="postgresql://postgres:root@localhost:5432/relation?schema=public"

SECRET_TOKEN="àDefinir"
SECRET_TOKEN="àDefinir"

PORT: 4490

```

Modifiez la variable ```DATABASE_URL```  database URL pour qu'elle corresponde à la base de données que vous utilisez, cette url suit le format suivant:

![image](https://user-images.githubusercontent.com/85617567/234087727-1633c2a3-3ea3-4b4c-bb6d-5be3dee93c5d.png)

Définissez un ```SECRET_TOKEN et SECRET_TOKEN```

Notre application utilise prisma pour requêter la base de données, pour le bon fonctionnement vous devez dans un premier temps créer une migration de la base 
de données, puis la synchroniser avec votre base.

Exécutez les commandes suivantes: 

```shall

npx prisma migrate dev

npx prisma db push

```

# Lancement de l'application

Dans le terminal, n'oubliez pas de vérifier que vous êtes toujours sur le projet puis tapez: 

```shell
nest start
```
Votre application est maintenant lancée, comme affichez sur le terminal vous pourrez accéder à la documentation Swagger qui vous pemettra de tester les différentes fonctionnalités: http://localhost:4490/docs

La plupart des routes étant privées, vous devrez d'abord récupérer un access_token avec la route ```shell /auth ``` puis vous enregistrer avec la route ```shell /auth/login ```, reportez le dans la section Authorize  ![image](https://user-images.githubusercontent.com/85617567/234094332-be037cd2-5f9a-4f34-a7fc-9e333c11d4f5.png)

Connectez votre nouvel utilisateur avec la route /auth/login et profitez de l'applciation !

