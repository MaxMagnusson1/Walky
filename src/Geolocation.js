
/**
 * Klass för att hålla koll på användarens position och rita ut en rutt på kartan. Inleds med att visa vad som är med i klassen samt 
    skapar objekt som behövs för att visa informationen på startsidan.
 */

function Geolocation() {
    this.position = null;
    this.karta = null;
    this.myLocation = null;
    this.markerArray = [];
    this.marker = null;
    this.distanceInMeters = null;
    this.pointArray = [];
    this.button = null;
    this.apiAttempt = 0;
    var self = this;
    this.goingPos = null;
    this.target = null;
    this.removeLoader = null;
    this.deniedImg = null;
    this.latitude = null;
    this.longitude = null;
    this.errorImg = null;
    this.orgin = null;
    this.destination = null;
    this.points = null;
    this.nmrOfpresentsDiv = null;
    this.totalDistance = null;
    this.totalMetersWalked = null;
    this.totalPoints = null;
    var controll = true;

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();


/**
 * Metod för att hämta användarens position. Börjar med att hämta ut element från domen som kommer behövas. 
 * Sedan kollar den om användaren har tillåtit att använda sin position. Om API:et inte fungerar så visas en bild som visar att det är fel på API:et och kknappen
 får en eventlyssnare kopplad som laddar om sidan. Samma sak händer om användaren nekar tillgång till sin position. 
 * WatchPosition används för att uppdatera användarens position kontinuerligt och kalla på sucsess funktionen showposition varje gång som användarens pos har uppdaterats.
 */
    this.getCurrentLocation = function () {
        this.removeLoader = document.querySelector(".loadingTheMap");
        this.button = document.querySelector(".newPositionBtn")

        for (let i = 0; i < 5; i++) {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(this.showPosition, this.deniedAccess.bind(this));
                break;
            }
            else {
                this.apiAttempt++;
                if (this.apiAttempt === 4) {
                    this.removeLoader.remove();
                    this.errorImg = document.createElement("img");
                    this.errorImg.className = "errorDiv";
                    document.body.appendChild(this.errorImg);
                    this.errorImg.src = "./img/felhanteringklar-04.png";
                    this.button.innerHTML ="Tryck för att testa igen!"
                    console.log(this.button.innerHTML); 
                    this.button.addEventListener("click", function () {
                    location.reload();
                    })
                 
                }
            }
        }
    }

    this.deniedAccess = function () {
        this.removeLoader.remove();
        this.deniedImg = document.createElement("img");
        this.deniedImg.src = "./img/errorfeedback-03.png";
        this.deniedImg.className = "deniedDiv";
        document.body.appendChild(this.deniedImg);
        this.button.innerHTML ="Tryck för att testa igen!"
        this.button.addEventListener("click", function () {
            location.reload();
        })
  
    }

/**
 *  ShowPosition besår av en if och else sats. If satsen kollar om det finns ett värde lagrat i localstorage, vilket görs när användaren har valt en desination att gå till. 
 Showpos kommer alltid triggas när användarens plats uppdateras. Ifall ett värde finns i localstorage så jämförs användarens position med den sparade positionen. Det används 
 även en differnas för att se om användaren är inom en viss radie från sin destination. Om användaren är inom radie så tas rutt och markörer.. Kallar sedan på metoden reachedDestination.. 
 * ifall användaren hamnar i else satsen betyder det att användaren inte har valt en destination och då kommer användarens position skickat till getmap medtoden .
 
 */


    this.showPosition = function (position) {

        if (localStorage.getItem("longitude") != null) {
            var targetlog = localStorage.getItem("longitude");
            var targetLat = localStorage.getItem("latitude");

            const crd = position.coords;

            var aloudDiff = 0.001;
            var latDiff = Math.abs(targetLat - crd.latitude);
            var lonDiff = Math.abs(targetlog - crd.longitude);

            if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
                directionsRenderer.setMap(null);

               for (let i = 0; i < self.markerArray.length; i++) {
                    self.markerArray[i].setMap(null);
                }

                self.markerArray = []; }
                localStorage.clear();
                self.reachedDestination();
           
        }
        else {
            this.goingPos = position.coords;
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var yourPos = new google.maps.LatLng(lat, lng);


            self.getMap(yourPos, this.goingPos);
            self.myLocation.setPosition(yourPos); 
        } 
    }

/**
 * Metod för att rendera ut kartan och sätta markörer på användarens position. Tar in yourPos och goingPos som parametrar som används. 
 * Tar även bort laddikonen. och lägger till en eventlyssnare på kartan som kallar på addmarker metoden.
 */ 
    this.getMap = function (yourPos, goingPos) {

        this.position = yourPos;
        this.goingPos = goingPos;
        var lat = this.position.lat(); 
        var lng = this.position.lng(); 
        if (!this.karta) {
            this.karta = new google.maps.Map(document.getElementById('karta'), {
                zoom: 15,
                center: this.position,
                disableDefaultUI: true, 

            });
            this.myLocation = new google.maps.Marker({
                position: this.postion, 
                map: this.karta,
                title: "Här är jag!"
            });
        }

        if (this.removeLoader) {
            this.removeLoader.remove();

        }        
       
        this.karta.addListener('click', function (event) {
            if(controll){
        
            this.addmarker(event, this.goingPos);     };
        }.bind(this));
    }

    /**
     * Metod för att sätta markörer på kartan. Tar in event och goingPos som parametrar. Kontroller markerArray och om den är tom så sätts en markör på kartan. OM den inte ör tom
     töms arrayen och sedan sätts en ny markör på kartan. Sedan kallas drawRoute metoden med position och event.latLng som parametrar.
     */

    this.addmarker = function (event, goingPos) {
        console.log("addmarker");
        this.goingPos = goingPos;
        if (this.markerArray.length == 0) {
            this.marker = new google.maps.Marker({
                position: event.latLng,
                map: this.karta

            })
            this.latitude = event.latLng.lat()
            this.longitude = event.latLng.lng()
            this.markerArray.push(this.marker);
        } else {
            for (let i = 0; i < this.markerArray.length; i++) {
                this.markerArray[i].setMap(null);

            }
            directionsRenderer.setMap(null);     
            this.latitude = event.latLng.lat()
            this.longitude = event.latLng.lng()
            this.marker = new google.maps.Marker({
                position: event.latLng,
                map: this.karta
            })
            this.markerArray.push(this.marker);
        }

        this.drawRoute(this.position, event.latLng);
    }


/**
 * Metod som används när användaren avbryter sin rutt. Tar då bort markörer och rutter från kartan samt ändrar utseendet på knappen.
 Tar även bort eventlyssnare från knappen för att man inte ska kunna hålla nere knappen och avbryta sin rutt vid fel tillstånd, tömmer sedan localstorage
 */ 
    this.remove = function () {
           this.button.innerHTML ="Tryck på kartan för att hitta en rutt!"; 
           this.button.removeEventListener("mousedown", this.handleMouseDown);
                   for (let i = 0; i < this.markerArray.length; i++) {
            this.markerArray[i].setMap(null);
        }

        // Clear the markerArray
        this.markerArray = [];

        // Clear the directions renderer
        directionsRenderer.setMap(null);
        // Rensa markerArray
        localStorage.clear();

    }

/**
 * Metod för att rendera ut en rutt, tar orgin vilket är vart användaren är och destinationen som är vart användaren ska som parametrar. Om directionserive sätts till ok
 kommer rutten att renderas ut och sträckan omvandlas till meter  och knappens tillstånd uppdaters. 
 * Eventlyssnare kopplas till knappen som kallar på clickHandler metoden.
 */ 

    this.drawRoute = function (origin, destination) {

        this.orgin = origin;
        this.destination = destination;

        var request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, function (result, status) {
            if (status === 'OK') {

                directionsRenderer.setMap(self.karta);
                directionsRenderer.setDirections(result);
                this.distanceInMeters = result.routes[0].legs[0].distance.value;
                this.button.innerHTML = "Denna sträcka motsvarar " + this.distanceInMeters + " meter, tryck för att välja den!";
            }
          
        }.bind(this));

        this.button.addEventListener("click", this.clickHandler);

    }

/**
 * Metod för att hantera klicket och kontroller så att distancein meters inte är null, används istället för anonym funktion för att kunna använda använda removeeventistener
 */ 
    this.clickHandler = function () {
        if (this.distanceInMeters != null) {
            this.endDestination(this.distanceInMeters);
        }
    }.bind(this);

/**
 * Metod för när användaren aktiverat en rutt, tar in distanceInMeters som parameter. Tar bort eventlyssnare från knappen och sätter target till användarens position.
 Lagrar sedan användarnes positon i lokalstorage så att show.postion kan använda det för att jämföra om användaren är framme eller inte. 
 * Uppdaterar sedan knapparna ochlägger till eventlyssnare på knappen som kallar på handlemousedown och handlemouseup metoden
 */
    this.endDestination = function (distanceInMeters) {
        this.button.removeEventListener("click", this.clickHandler);

        this.button.addEventListener
        this.target = {
            latitude: this.latitude,
            longitude: this.longitude,
        };

        localStorage.setItem("latitude", this.target.latitude)
        localStorage.setItem("longitude", this.target.longitude)

     //  this.button.style.cursor = "default"
     this.button.innerHTML = "Du ska gå " + distanceInMeters + " meter <br>(Håll in för att avbryta)";
     this.button.addEventListener("mousedown", this.handleMouseDown);
     this.button.addEventListener("mouseup", this.handleMouseUp);

         }

/**
 * Metod för hantera nedtryckning av knappen, ska tryckas ner i 3 sekunder för att kalla på remove metoden som avbruter rutt.
 */
     this.handleMouseDown = function() {
       this.timeout= setTimeout(function () {   
            self.remove();
        }.bind(this), 3000);
    }

/**
 * Hanterar när man släpper nertryckningen och återställer tiden så man inte kommer in mousedown eventet av misstag. 
 */
    this.handleMouseUp = function() {
        clearTimeout(this.timeout);
    }

/**
 * Metod för när användaren är framme. Tömmer lokalstorage och gör instanser av kakor och notis för att nya poäng och kontrollera om notis ska visas samt vibrerar när användaren är framme
 med vibrate metoden, dock bara om användaren har en telefon som stödjer det.
 Hämtar ut elementen som ska uppdateras i dommen. 
 * 
 */
    this.reachedDestination = function () {
        console.log("Du är framme!");
        localStorage.clear();
        var notis = new Notis();
        var setCookie = new Kakor();
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.score = document.querySelector(".score");
        this.totalPoints = document.querySelector(".totalPoints");
        this.totalMetersWalked = document.querySelector(".totalMetersWalked");
        this.button.innerHTML = " Grattis, du har nått din destination! Du kan nu välja en ny rutt!";

        if (navigator.vibrate) {
            navigator.vibrate(1000);
        }; 
        setCookie.setCookie("total_dist", this.distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist"); //hämtar totala sträckan från kakorna
        this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";//sätter texten på totala sträckan

        setCookie.setCookie("total_points", this.distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points");
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);


        this.score.innerHTML = "Du har " + this.totalPoints + " <img src ='./img/coin3-10.png' alt='coin' >"; //sätter poängen på användaren
    }



}

