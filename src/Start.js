function Start() {
  var setCookie = new Kakor();
  var newScore = new Score();
  var notis = new Notis();
  var geolocation = new Geolocation();

  this.renderMapAndButtons = function () {
    
    //skapande av element för startsidan
    this.loading = document.createElement("div"); 
    this.startContainer = document.createElement("div");
    this.navContainer = document.createElement("div");
    this.totalMetersWalked = document.createElement("div");
    this.button = document.createElement("div");
    this.score = document.createElement("div");
    this.lockerBtn = document.createElement("div");
    this.priceBtn = document.createElement("div");
    this.mapBtn = document.createElement("div");
    this.karta = document.getElementById("karta");
    this.nmrOfpresentsDiv = document.createElement("div");
    this.newLockerPrice = document.createElement("div");

    

    //  this.nmrOfpresentsNum = document.createElement("p");

    //this.lockerContainer = document.body.querySelector(".lockerContainer");

    //sätta classnamn på element för startsidan
    this.loading.className="loadingTheMap"; 
    this.startContainer.className = "startContainer";
    this.navContainer.className = "navContainer";
    this.totalMetersWalked.className = "totalMetersWalked";
    this.button.className = "newPositionBtn";
    this.score.className = "score";
    this.priceBtn.className = "priceBtn";
    this.lockerBtn.className = "lockerBtn";
    this.mapBtn.className = "mapBtn";
    this.nmrOfpresentsDiv.className = "nmrOfpresents";
    this.newLockerPrice.className = "newLockerPrice";

    this.newLockerPrice.style.visibility = "hidden";
    // this.nmrOfpresentsNum.className = "nmrOfpresentsNum";

    //this.nmrOfpresents.className = "nmrOfpresents";

    //lägga till element i body för startsidan
    
    document.body.appendChild(this.startContainer);
    document.body.appendChild(this.navContainer);
    this.startContainer.appendChild(this.loading); 
    this.navContainer.appendChild(this.lockerBtn);
    this.navContainer.appendChild(this.mapBtn);
    this.navContainer.appendChild(this.priceBtn);

    this.startContainer.appendChild(this.totalMetersWalked);
    this.startContainer.appendChild(this.button);
    this.startContainer.appendChild(this.score);
    this.startContainer.appendChild(this.karta);
    this.priceBtn.appendChild(this.nmrOfpresentsDiv);
    this.lockerBtn.appendChild(this.newLockerPrice);
    

    this.lockerBtnClicked = false;
    this.notisValue = setCookie.getCookie("notis");

    //skapar objekt som behövs 
    this.totalDistance = setCookie.getCookie("total_dist");
    
    geolocation.getCurrentLocation(this.button);
  
    newScore.uppdatedScore(geolocation.distanceInMeters);

    notis = new Notis();
    this.totalPoints = setCookie.getCookie("total_points");

    notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);


    //eventhantering för price sidan 
    this.priceBtn.addEventListener("click", function () {

      var containers = document.body.querySelectorAll(".startContainer, .lockerContainer, .priceContainer, .deniedDiv");
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
      }

      var price = new Price();
      price.renderPackage(this.newLockerPrice);

    }.bind(this));

    //eventhantering för att gå tillbaka till startsidan  

    this.mapBtn.addEventListener("click", function () {

      this.totalPoints = setCookie.getCookie("total_points");

      this.score.innerHTML = "Du har " + this.totalPoints + " poäng!"; //sätter poängen på användaren

      var containers = document.body.querySelectorAll(".priceContainer, .lockerContainer");
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
      }
      var remove = document.body.querySelector(".lockerContainer");
      if (remove) {
        remove.remove();
      }

      this.startContainer.style.visibility = "visible"
      if (document.body.querySelector(".deniedDiv")){
        document.body.querySelector(".deniedDiv").style.visibility = "visible";

      }
      
    }.bind(this));

    //eventhantering för att gå tillbaka till lockersidan

    this.lockerBtn.addEventListener("click", function clickHandler () {
      var containers = document.body.querySelectorAll(".priceContainer, .startContainer, .newLockerPrice, .deniedDiv ");
    
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
      }
      var locker = new Locker();
      locker.renderLocker();
      this.lockerBtn.removeEventListener("click", clickHandler);
 
    
    }.bind(this));


    //sätta text på element för startsidany

    if (this.totalDistance == "") { //om det inte finns något värde i kakorna, dvs första gången man använder applikationen 

      this.totalMetersWalked.innerHTML = "Du har ännu inte gått något, dags att börja gå!"; //sätter texten på totala sträckan om användaren inte gått innan 

    } else {
      this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";

    }
    if (newScore.totalPoints) {

      this.score.innerHTML = "Du har " + newScore.totalPoints + " poäng!"; //sätter poängen på användaren

    }
    else {
      this.score.innerHTML = "Du har 0 poäng";
    }
    this.button.innerHTML = "Tryck på kartan för att hitta en rutt!!";



    //händelselyssnare 

      this.button.addEventListener("click", function () {
        if (geolocation.distanceInMeters != null){
          this.endDestination(geolocation.distanceInMeters);
        }
        // Skicka avståndet som parameter
      }.bind(this));
    
 

    if (this.notisValue !== "" && this.notisValue === 0 && !isNaN(parseFloat(setCookie.getCookie("notis")))) {
      this.newLockerPrice.style.visibility = "visible";
      this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
    } else {
      this.newLockerPrice.style.visibility = "hidden";
    }

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
        geolocation.clearRoute(); 
        this.button.innerHTML = "Du är framme! Interagera med kartan för att gå igen";//ändrar texten på knappen när användaren är framme

        setCookie.setCookie("total_dist", distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist"); //hämtar totala sträckan från kakorna
        this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";//sätter texten på totala sträckan

        setCookie.setCookie("total_points", distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points");
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

        this.score.innerHTML = "Du har " + this.totalPoints + " poäng!"; //sätter poängen på användaren
      }
    }.bind(this), 3000);
  }
}





