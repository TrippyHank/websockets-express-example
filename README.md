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

##### index.js

```
const express = require('express'),
    app = express(),
    ws = require('express-ws')(app),
    path = require('path');

// expose public folder
app.use(express.static(path.join(__dirname, 'public')));

// optional middleware
app.use(function (req, res, next) {
  console.log("optional middleware");
  next();
});

// create handler / for GET
app.get('/', function(req, res, next){
  res.render("index")
});

// websocket
app.ws('/', function(ws, req) {
  // https://github.com/websockets/ws/blob/master/doc/ws.md#event-message
  ws.on('message', function(msg) {
    console.log(`Data received: ${msg}`);
  });
});

// listen for incoming connections
app.listen(3000, function(){
  console.log("Listening on http://localhost:3000 !");
});
```
___

##### public/index.html

```
<html>
  <head>
    <title>WebSocket Echo Server</title>
    <script type="text/javascript">
      var conn;
      const websocket = {
        open: function() {
          conn = new WebSocket("ws://localhost:3000");
        },
        send: function(msg) {
          conn.send(msg);
        },
        close: function() {
          conn.close();
        }
      };
    </script>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th><button type="button" name="open" onclick="websocket.open()">Connect</button></th>
          <th><button type="button" name="close" onclick="websocket.close()">Disconnect</button></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2"><input type="text" id="message" name="message" value="" placeholder="Type your msg & hit enter" onkeyup="if(event.keyCode==13){ websocket.send(this.value); this.value=''; };" onblur="this.placeholder='Type your msg & hit enter'" style="width: 100%;"></td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

```
___

Le processus ouvrira un nouvel onglet dans votre navigateur par défaut à l'adresse : http://localhost:3000

```
node index.js
```

Tadaaa ! 🎉
