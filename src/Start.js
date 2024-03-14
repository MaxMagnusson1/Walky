function Start() {
  var setCookie = new Kakor();
  var newScore = new Score();
  var notis = new Notis();
  var geolocation = new Geolocation();

  this.createAllElements = function(){

    //alla element som ska visas på startsidan 
    /*this.loading = document.createElement("div"); 
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

    //klassnamn för alla element på startsidan 
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


    //tillägg till domen för alla element på startsidan 
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
    this.newLockerPrice.style.visibility = "hidden";

    //alla element som ska visas på locker-sidan 
    /*this.lockerContainer = document.createElement("div");
    this.locker = document.createElement("img");
    this.locker.src = './img/lockerImg.png';

    //klassnamn för lockersidan 
    this.locker.className = "locker";
    this.lockerContainer.className = "lockerContainer";
    

    //tillägg till domen på lockersidan
    document.body.appendChild(this.lockerContainer);
    this.lockerContainer.appendChild(this.locker);

    //klassnamn för element på prissidan 
    this.locker.className = "locker";
    this.lockerContainer.className = "lockerContainer";
    this.lockerContainer.style.visibility ="hidden", */


    //alla element för prissidan 
   /* this.priceContainer = document.createElement("div");
    this.scoreContainer = document.createElement("div");
    this.paket = document.createElement("img");
    this.paketText = document.createElement("div");
    this.priceIcon = document.createElement("img");

    //klassnamn för element på prissidan 
    this.priceContainer.className = "priceContainer";
    this.scoreContainer.className = "priceScore";
    this.paket.className = "paket";
    this.priceIcon.className = "priceIcon";
    this.paketText.className = "paketText";

    //lägger till elementen i domen 
    document.body.appendChild(this.priceContainer);
    this.priceContainer.appendChild(this.scoreContainer);
    this.priceContainer.appendChild(this.paket);
    this.priceContainer.appendChild(this.priceIcon);
    this.priceContainer.appendChild(this.paketText);
    this.priceContainer.style.visibility ="hidden"; 
*/
    this.renderMapAndButtons(); 

  }

  this.renderMapAndButtons = function () {
    localStorage.clear();

    localStorage.setItem("priceBtn", false);
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

    

      this.nmrOfpresentsNum = document.createElement("p");

    this.lockerContainer = document.body.querySelector(".lockerContainer");

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
    this.nmrOfpresentsNum.className = "nmrOfpresentsNum";

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
    

    this.notisValue = setCookie.getCookie("notis");

    //skapar objekt som behövs 
    this.totalDistance = setCookie.getCookie("total_dist");
    
    geolocation.getCurrentLocation(this.button);
  
    newScore.uppdatedScore(geolocation.distanceInMeters);

    notis = new Notis();
    this.totalPoints = setCookie.getCookie("total_points");

    notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

    if (this.notisValue !== "" && this.notisValue === 0 && !isNaN(parseFloat(setCookie.getCookie("notis")))) {
      this.newLockerPrice.style.visibility = "visible";
      this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
    } else {
      this.newLockerPrice.style.visibility = "hidden";
    }



    //eventhantering för price sidan 
    
    this.priceBtn.addEventListener("click", function () {
      //if (localStorage.getItem("priceBtn") == "false"){


    this.startContainer.style.visibility = "hidden";
     /* this.paket.style.visibility ="visible"; 
      this.priceIcon.style.visibility ="hidden"; 
      this.paketText.style.visibility="hidden"; */
      var error = document.body.querySelectorAll(".deniedDiv, .errorDiv"); 
      for (var i = 0; i < error.length; i++) {

        error[i].style.visibility = "hidden";
      }
      var containers = document.body.querySelectorAll(".lockerContainer, .iconInLocker, .row, .priceContainer");
      for (var i = 0; i < containers.length; i++) {
        containers[i].remove();
      }
      var price = new Price;
      price.renderPackage(this.priceBtn);
    //  }
    }.bind(this));
  
    //eventhantering för att gå tillbaka till startsidan  
    
    this.mapBtn.addEventListener("click", function () {
    //  if (localStorage.getItem("mapBtn") == "false"){
      this.startContainer.style.visibility = "visible";

      localStorage.setItem("priceBtn", false);
      localStorage.setItem("lockerBtn", false);
      localStorage.setItem("mapBtn", true);
    
      this.totalPoints = setCookie.getCookie("total_points");

      this.score.innerHTML = "Du har " + this.totalPoints + " poäng!"; //sätter poängen på användaren
      
     /* this.priceContainer.style.visibility ="hidden"; 
      this.priceIcon.style.visibility ="hidden"; 
      this.paketText.style.visibility="hidden"; 
      this.paket.style.visibility="hidden"; 
      this.lockerContainer.style.visibility="hidden"; */
      
      var containers = document.body.querySelectorAll(".priceContainer, .lockerContainer, .iconInLocker, .row");

      for (var i = 0; i < containers.length; i++) {
        containers[i].remove(); 
      }
 

      //this.startContainer.style.visibility = "visible"
      this.errorContainers = document.body.querySelectorAll(".deniedDiv, .errorDiv")
      if (this.errorContainers){
        for (var i = 0; i < this.errorContainers.length; i++) {
          this.errorContainers[i].style.visibility = "visible";
        }
    //  }
    }
      
    }.bind(this));

    //eventhantering för att gå tillbaka till lockersidan

      this.lockerBtn.addEventListener("click", function () {
      //  if (localStorage.getItem("lockerBtn") == "false"){

        localStorage.setItem("priceBtn", false);
        localStorage.setItem("lockerBtn", true);
        localStorage.setItem("mapBtn", false);

  //    this.lockerContainer.style.visibility = "visible";
    var y = document.body.querySelectorAll(".iconInLocker, .row");

      for (var i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
      }

      var containers = document.querySelectorAll('.startContainer, .deniedDiv, .errorDiv, .newLockerPrice')
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
      }; 

   /*   this.priceContainer.style.visibility ="hidden"; 
      this.priceIcon.style.visibility ="hidden"; 
      this.paketText.style.visibility="hidden"; 
      this.paket.style.visibility="hidden"; */

      var containers = document.body.querySelectorAll(".priceContainer, .lockerContainer ");
      
      for (var i = 0; i < containers.length; i++) {
       containers[i].remove(); 
      }
      var locker = new Locker();
      locker.renderLocker();
     
  //  }
    
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
    this.button.innerHTML = "Tryck på kartan för att hitta en rutt!";



    //händelselyssnare 

      /*this.button.addEventListener("click", function () {
        if (geolocation.distanceInMeters != null){
          this.endDestination(geolocation.distanceInMeters);
        }
        // Skicka avståndet som parameter
      }.bind(this));*/
    
   
  }



 /*this.lockerHandler = function () {
    this.lockerContainer.style.visibility = "visible";

    var containers = document.querySelectorAll('.startContainer')
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
    }; 

    this.priceContainer.style.visibility ="hidden"; 
    this.priceIcon.style.visibility ="hidden"; 
    this.paketText.style.visibility="hidden"; 
    this.paket.style.visibility="hidden"; 
    this.lockerBtn.removeEventListener("click", this.lockerHandler);
    var locker = new Locker();
    locker.renderLocker();
}.bind(this);

 
/*
this.priceHandler = function () {

  console.log("priceBtn"); 
  this.paket.style.visibility ="visible"; 
  this.priceIcon.style.visibility ="hidden"; 
  this.paketText.style.visibility="hidden"; 

  var containers = document.body.querySelectorAll(".startContainer, .lockerContainer, .priceContainer, .deniedDiv");
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.visibility = "hidden";
  }

  this.priceBtn.removeEventListener("click", this.priceHandler);

  var price = new Price;
  price.renderPackage();
}.bind(this);*/


  //metod för att välja en slutdestination
  this.endDestination = function (distanceInMeters,) {
    //sätta text på knappen för att veta hur långt man ska gå.
    this.button.style.cursor = "default";
    this.button.innerHTML = "Du ska gå " + distanceInMeters + " meter";

    //sätta en timeout för att ändra texten på knappen. Timeout används för att den ska kolla en gång i minuten om användaren är närmare än 100 meter från den valda desutinationen
    setTimeout(function () {
      this.button.innerHTML = "Du har " + distanceInMeters + " meter kvar";

      if (distanceInMeters <= 1000) {
        navigator.vibrate(1000); //vibrerar när användaren är framme
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





