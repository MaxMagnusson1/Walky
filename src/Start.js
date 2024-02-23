function Start() {
  var setCookie;
  var newScore

  this.renderMapAndButtons = function () {

    //skapande av element för startsidan
    this.totalMetersWalked = document.createElement("div");
    this.button = document.createElement("div");
    this.score = document.createElement("div");

    //sätta classnamn på element för startsidan 
    this.totalMetersWalked.className = "totalMetersWalked";
    this.button.className = "newPositionBtn";
    this.score.className = "score";

    //lägga till element i body för startsidan
    document.body.appendChild(this.totalMetersWalked);
    document.body.appendChild(this.button);
    document.body.appendChild(this.score);


    //skapar objekt som behövs 
    setCookie = new Kakor();
    this.totalDistance = setCookie.getCookie("total_dist");

    var geolocation = new Geolocation();
    geolocation.getCurrentLocation(this.button);

    newScore = new Score();
    newScore.uppdatedScore(geolocation.distanceInMeters);

    var eventet = new Eventet();
    eventet.handleEvent(this.totalMetersWalked, this.button, this.score, newScore.totalPoints);


    //sätta text på element

    if (this.totalDistance == "") { //om det inte finns något värde i kakorna, dvs första gången man använder applikationen 

      this.totalMetersWalked.innerHTML = "Du har ännu inte gått något, dags att börja gå!"; //sätter texten på totala sträckan om användaren inte gått innan 

    } else {
      this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";

    }

    this.button.innerHTML = "Tryck på kartan för att hitta en rutt!";
    this.score.innerHTML = "Du har " + newScore.totalPoints + " poäng!"; //sätter poängen på användaren

    // this.paketPoints = newScore.totalPoints;

    //händelselyssnare 
    this.button.addEventListener("click", function () {
      this.endDestination(geolocation.distanceInMeters); // Skicka avståndet som parameter
    }.bind(this));

    // this.price(this.totalMetersWalked, this.button, this.score, newScore.totalPoints, this.mapBtn, locker.locker);

  }



  //metod för att välja en slutdestination
  this.endDestination = function (distanceInMeters,) {
    //sätta text på knappen för att veta hur långt man ska gå.
    this.button.style.cursor = "default";
    this.button.innerHTML = "Du ska gå " + distanceInMeters + " meter";

    //sätta en timeout för att ändra texten på knappen. Timeout används för att den ska kolla en gång i minuten om användaren är närmare än 100 meter från den valda desutinationen
    setTimeout(function () {
      this.button.innerHTML = "Du har " + distanceInMeters + " meter kvar";

      if (distanceInMeters <= 1000) {
        this.button.innerHTML = "Du är framme! Interagera med kartan för att gå igen";//ändrar texten på knappen när användaren är framme

        setCookie.setCookie("total_dist", distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist"); //hämtar totala sträckan från kakorna
        this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";//sätter texten på totala sträckan

        //  newScore.uppdatedScore(distanceInMeters);
        setCookie.setCookie("total_points", distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points");
        this.score.innerHTML = "Du har " + this.totalPoints + " poäng!"; //sätter poängen på användaren
      }
    }.bind(this), 3000);

  }

 /* this.price = function (totalMetersWalked, button, score, totalPoints, mapBtn) {
    this.totalPoints = totalPoints;
    this.totalMetersWalked = totalMetersWalked;
    this.button = button;
    this.score = score;
    this.mapBtn = mapBtn;

    var price = new Price();
    price.renderPackage(this.totalMetersWalked, this.button, this.score, this.totalPoints, this.mapBtn);
  }

  this.locker = function () {
    var locker = new Locker();
    locker.renderLocker(this.totalMetersWalked, this.button, this.score, newScore.totalPoints, this.mapBtn, this.score);
  }
*/
}





