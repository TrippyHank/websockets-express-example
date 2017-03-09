## WebSockets & Express example

**WebSockets** fournit un nouveau **protocole** entre *client* et *serveur* qui s'exécute sur une connexion TCP persistante. Grâce à cette connexion ouverte, des messages **duplex bidirectionnels** peuvent être envoyés entre la connexion de socket TCP unique (simultanément ou en sens inverse). Parce qu'il s'agit d'un **protocole indépendant** basé sur TCP, il ne nécessite pas de tunneling HTTP (similaire à Netflix et autres services de streaming), permettant une communication simplifiée lors de l'envoi de messages.

## Pourquoi WebSockets ?

Alors pourquoi voudriez-vous utiliser WebSockets (ou quelque chose comme ça) ? Il ne s'agit pas du protocole en lui même, mais de ce que vous essayez d'obtenir sur la couche TCP, d'envoyer et de recevoir de petits paquetages de données et de le rendre fiable et disponible sur un certain nombre de périphériques.

Grâce à la connexion TCP, WebSockets peut être utilisé comme base pour la fonctionnalité bidirectionnelle en temps réel. La capacité de pousser un signal vers un périphérique le plus rapidement possible fait de WebSockets l'une des nombreuses solutions pour transférer des données entre deux périphériques. C'est le plan pour créer des applications en temps réel.

##### C'est quoi un [Socket](https://fr.wikipedia.org/wiki/Berkeley_sockets#Socket_Internet) ? 🌟

> Un socket représente une prise par laquelle une application peut envoyer et recevoir des données. Cette prise permet à l'application de se brancher sur un réseau et communiquer avec d'autres applications qui y sont branchées. Les informations écrites sur une prise depuis une machine sont lues sur la prise d'une autre machine, et inversement. Il existe différents modèles de prises, en fonction des protocoles réseau; le plus fréquent sont les socket TCP/IP. La première interface de programmation (anglais API pour application programming interface) mettant en œuvre les socket a été développée par l'université de Berkeley pour leur Unix, dans les années 1980. C'est un des premiers produits open source de l'histoire.

## Avantages et inconvénients des WebSockets

L'[API WebSockets](https://html.spec.whatwg.org/multipage/comms.html#network) et le [Protocole](https://tools.ietf.org/html/rfc6455) ont été normalisés par l'[IETF](http://ietf.org/) et le [W3C](https://www.w3.org/) et se sont imposés comme une norme pour les fonctionnalités en temps réel dans les applications.
Voici quelques avantages de WebSockets:

* La communication d'origine croisée (qui admet d'ailleurs quelques risques de sécurité)
* Compatibilité entre plates-formes (Web, bureau, mobile)
* Enveloppe de faible poids lors du passage de messages

Cependant, la désignation de WebSockets comme norme pour la transmission de données et la communication en temps réel est quelque peu inappropriée autour du Web tel qu'il est décrit aujourd'hui. Indépendamment de certaines solutions open-source, les WebSockets ne sont qu'une partie du puzzle lors du développement d'applications en temps réel. Il existe une foule de problèmes opérationnels qu'un développeur peut rencontrer lors de l'utilisation de WebSockets en tant que solution en temps réel, d'autant plus que l'application évolue et que la base d'utilisateurs augmente:

* Topologie réseau
* Pare-feu
* Configurations du noyau
* Test de charge
* Sécurité
* Surveillance
* Mise à l'échelle, redondance, équilibrage de charge, réplication

Globalement, les WebSockets sont un outil puissant pour ajouter des fonctionnalités en temps réel à une application Web ou mobile mais ils sont encore naissant alors pas de précipitations.

![WebSockets](http://aurelienperronneau.com/content/images/2017/03/WebSockets2.png)

## Let's Code ! 🔥

___

#### Création du projet

```
cd ~ && mkdir ws-app
cd ws-app
```
___

#### Dépendances

```
npm init
npm i express --save
npm i express-ws --save
```
___

#### Création des fichiers

```
touch index.js && touch index.html
atom .
```
___

##### index.js

```
var express   = require('express'),
    app       = express(),
    expressWs = require('express-ws')(app),
    hbs       = require('express-hbs');

// Use `.html` for extensions
app.use(express.static(__dirname));

// Optional middleware
app.use(function (req, res, next) {
  console.log('middleware');
  return next();
});

// Create handler / for GET
app.get('/', function(req, res, next){
  res.render('index')
});

// WebSocket
app.ws('/', function(ws, req) {

  // Handler
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('Connection opened !');
});

app.listen(3000, function(){
  console.log("~ Listening on http://localhost:3000/ ");
});
```
___

##### index.html

```
<html>
  <head>
    <title>WebSocket Example</title>
    <script charset="utf-8">
    var conn;

    var wS = {
      open: function() {
        conn = new WebSocket("ws://localhost:3000");
      },
      send: function() {
        conn.send(document.getElementById('message').value);
      },
      close: function() {
        conn.send('Closing connection !')
        conn.close();
      }
    };
    </script>
  </head>
  <body>

    <div class="controls">
      <button id="button" onclick="wS.open()">Connect</button>
      <button id="button" onclick="wS.close()">Disconnect</button>
    </div>

    <div class="message">
      <input id="message" type="text" name="message" value="" placeholder="Type your message" onfocus="this.placeholder=''" onblur="this.placeholder='Type your message'">
      <button id="button" onclick="wS.send()">Send</button>
    </div>

  </body>
</html>
```
___

Démarrez le processus avec la commande ci-dessous puis ouvrez votre navigateur à l'adresse : http://localhost:3000

```
node index.js
```

Tadaaa ! 🎉
