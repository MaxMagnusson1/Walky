/**
 * Fil som visar den första vyn av applikationen. Klassen börjar med att visa över vad som ska finnas i klassen samt instansera klasser som kommer behövas globalt 
 * 
 */

function Start() {
  var setCookie = new Kakor();
  var newScore = new Score();
  var notis = new Notis();
  var geolocation = new Geolocation();
  this.startContainer = null;
  this.loading = null;
  this.navContainer = null;
  this.totalMetersWalked = null;
  this.button = null;
  this.score = null;
  this.lockerBtn = null;
  this.priceBtn = null;
  this.mapBtn = null;
  this.karta = null;
  this.nmrOfpresentsDiv = null;
  this.newLockerPrice = null;
  this.nmrOfpresentsNum = null;
  this.totalDistance = null;
  this.totalPoints = null;
  this.notisValue = null;
  this.errorContainers = null;
  this.lockerContainer = null;
  this.coin = null;
  this.number = null;


/**
 * Metod som skapar elementen, ger dem klassnamn och lägger till dem i domen. Metoden skapar även objekt som behövs för att visa informationen på startsidan.
 
*/
  this.renderMapAndButtons = function () {
   localStorage.clear(); 
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

    this.loading.className = "loadingTheMap";
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
    this.nmrOfpresentsNum.className = "nmrOfpresentsNum";


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

/**
 * Hämtar ut värden från kakorna som ska renderas på startsidan. Kallar även på metoder som ska köras när sidan laddas in från andra klasser.
 * Kör en kontroll för att kolla om några notiser ska visas eller inte. Samt lägger till eventhanterare för att navigera mellan sidorna. Och sätter
 egenskaper såsom att gömma element och uppdatera text när man navigerar 
  */
    this.notisValue = setCookie.getCookie("notis");
    this.totalDistance = setCookie.getCookie("total_dist");

    geolocation.getCurrentLocation(this.button);

    newScore.uppdatedScore(geolocation.distanceInMeters);

    this.totalPoints = setCookie.getCookie("total_points");

    notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

    if (this.notisValue !== "" && this.notisValue > 0 ) {
      this.newLockerPrice.style.visibility = "visible";
      this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
    } else {
      this.newLockerPrice.style.visibility = "hidden";
    }

    //eventhantering för price sidan 

    this.priceBtn.addEventListener("click", function () {


    this.startContainer.style.visibility = "hidden";
   
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


    this.mapBtn.addEventListener("click", function () {
      this.startContainer.style.visibility = "visible";

      this.totalPoints = setCookie.getCookie("total_points");

      this.score.innerHTML =  "Du har " + newScore.totalPoints + " <img src ='./img/coin3-10.png' alt='coin' >" ; //sätter poängen på användaren
      
      var containers = document.body.querySelectorAll(".priceContainer, .lockerContainer, .iconInLocker, .row");

      for (var i = 0; i < containers.length; i++) {
        containers[i].remove();
      }


      this.errorContainers = document.body.querySelectorAll(".deniedDiv, .errorDiv")
      if (this.errorContainers) {
        for (var i = 0; i < this.errorContainers.length; i++) {
          this.errorContainers[i].style.visibility = "visible";
        }
        //  }
      }

    }.bind(this));


      this.lockerBtn.addEventListener("click", function () {


    var y = document.body.querySelectorAll(".iconInLocker, .row");

      for (var i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
      }

      var containers = document.querySelectorAll('.startContainer, .deniedDiv, .errorDiv, .newLockerPrice')
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.visibility = "hidden";
      };


      var containers = document.body.querySelectorAll(".priceContainer, .lockerContainer ");

      for (var i = 0; i < containers.length; i++) {
        containers[i].remove();
      }
      var locker = new Locker();
      locker.renderLocker();


    }.bind(this));


/**
 * Sätter text för knapparna på startsidan, görs med hjälp av kontroller så korrekt text renderas på knapparna.
 */

if (this.totalDistance == "") { //om det inte finns något värde i kakorna, dvs första gången man använder applikationen 

      this.totalMetersWalked.innerHTML = "Du har ännu inte gått något, dags att börja gå!"; //sätter texten på totala sträckan om användaren inte gått innan 

    } else {
      this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";

    }
    if (newScore.totalPoints) {
      this.score.innerHTML = "Du har " + newScore.totalPoints + " <img src ='./img/coin3-10.png' alt='coin' >"; //sätter poängen på användaren

    }
    else {
      this.score.innerHTML = "Du har 0 poäng"; //om användaren inte har några poäng sätts texten till 0 poäng
    }
    this.button.innerHTML = "Tryck på kartan för att hitta en rutt!";

  }



 
}




