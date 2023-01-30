"use strict";

//ETAPE 1 Construire mon API, faire une requête, mettre mes donner en JSON
//Je veux que mes données soit dynamique

const villeDeDepart = document.querySelector(".title h1");

const stationDonnees = (ville, nb) => {
  fetch(
    `http://transport.opendata.ch/v1/stationboard?station=${ville}&limit=${nb}`
  )
    .then((resultat) => resultat.json())
    //.then((data) => console.log(data))

    // METTRE DES MOUSTACHE POUR FAIRE UN TRAITEMENT DESSUS
    .then((data) => {
      console.log(data);

      //pourquoi change la structure du forEach en enlevant les moustache
      data.stationboard.forEach((element) => afficheTableauxGares(element));
    });

  // attention bien faire cette ligne dans la fonction si non marche pas
  villeDeDepart.innerHTML = ville;
};

stationDonnees("Morges", 5);

// ETAPE 2 je veux afficher mes départs

const tableauxDepart = document.querySelector("#board");

const afficheTableauxGares = (train) => {
  //jolie syntaxe heures (copier/coller)
  const time = new Date(train.stop.departure);
  const minute = time.getMinutes().toString().padStart(2, "0");
  const heure = time.getHours();

  const html = `<article>
    <div class="time">${heure + ":" + minute}</div>
    <div class="category" data-category="${train.category}">${
    train.category
  }</div>
    <div class="destination">${train.to}</div>
    </article>`;

  tableauxDepart.insertAdjacentHTML("beforebegin", html);
};
