


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
    //this.errorContainer 
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

    this.getCurrentLocation = function () {//kontrollera knappen, eller vet den redan?
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
                    this.button.innerHTML ="Tryck för att ladda om appen!"; 
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
        this.deniedImg.src = "./img/treemedtext-03.png";
        this.deniedImg.className = "deniedDiv";
        document.body.appendChild(this.deniedImg);
        this.button.innerHTML ="Tryck för att ladda om appen!"
        this.button.addEventListener("click", function () {
            location.reload();
        })
  
    }


    this.showPosition = function (position) {


        //  console.log(this.target); 
        if (localStorage.getItem("longitude") != null) {
            var targetlog = localStorage.getItem("longitude");
            var targetLat = localStorage.getItem("latitude");


            //  (target.latitude === crd.latitude && target.longitude === crd.longitude)
            const crd = position.coords;

            var aloudDiff = 0.0001;
            var latDiff = Math.abs(targetLat - crd.latitude);
            var lonDiff = Math.abs(targetlog - crd.longitude);

            if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
                directionsRenderer.setMap(null);

                // Ta bort alla markörer från kartan
               for (let i = 0; i < self.markerArray.length; i++) {
                    self.markerArray[i].setMap(null);
                }

                // Rensa markerArray
                self.markerArray = []; }
                localStorage.clear();
                self.reachedDestination();

           
        }
        else {
            this.goingPos = position.coords;
            //   this.position = position; 
            //     console.log(this.position)
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var yourPos = new google.maps.LatLng(lat, lng);


            self.getMap(yourPos, this.goingPos);
            self.myLocation.setPosition(yourPos);
        }

          
    }


    this.getMap = function (yourPos, goingPos) {

        this.position = yourPos;
        this.goingPos = goingPos;
        var lat = this.position.lat(); // Hämta latitud från yourPos
        var lng = this.position.lng(); // Hämta longitud från yourPos
        if (!this.karta) {
            this.karta = new google.maps.Map(document.getElementById('karta'), {
                zoom: 15,
                center: this.position,
                disableDefaultUI: true, // Inaktivera standardkontrollerna (zoomkontroll, karttypkontroll etc.)

            });
            this.myLocation = new google.maps.Marker({
                position: this.postion, // this.currentPos, //, yourpos , this.postion
                map: this.karta,
                title: "Här är jag!"
            });
        }

        if (this.removeLoader) {
            this.removeLoader.remove();

        }        
       
        this.karta.addListener('click', function (event) {
            if(controll){
            console.log(controll);
            console.log("click");
            this.addmarker(event, this.goingPos);     };
        }.bind(this));
    }


    this.addmarker = function (event, goingPos) {
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



    this.remove = function () {
    console.log("remove"); 
           // Remove all markers from the map
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

                if (this.pointArray.length <= 0) {
                    this.points = document.createElement("span");
                    this.points.className = "points";
                    this.pointArray.push(this.points);
                    this.button.innerHTML = "Denna sträcka motsvarar " + this.distanceInMeters + " meter, tryck för att välja den!";
                    return this.text;
                }

                else if (this.pointArray.length >= 1) {

                    this.button.innerHTML = "Denna sträcka motsvarar " + this.distanceInMeters + " meter, tryck för att välja den!";
                }

            }

          
        }.bind(this));

        this.button.addEventListener("click", this.clickHandler);


        // Lägger till händelsehanteraren


    }

    this.clickHandler = function () {
        if (this.distanceInMeters != null) {
            this.endDestination(this.distanceInMeters);
        }
    }.bind(this);

    this.endDestination = function (distanceInMeters) {
        this.button.removeEventListener("click", this.clickHandler);

        this.button.addEventListener("mousedown", this.handleMouseDown);
        this.button.addEventListener
        this.target = {
            latitude: this.latitude,
            longitude: this.longitude,
        };

        localStorage.setItem("latitude", this.target.latitude)
        localStorage.setItem("longitude", this.target.longitude)

     //  this.button.style.cursor = "default"
     this.button.innerHTML = "Du ska gå " + distanceInMeters + " meter <br>(Håll in för att avbryta)";
         }

     this.handleMouseDown = function() {
        setTimeout(function () {
            console.log("mousedown");
            self.remove();
        }.bind(this), 3000);
    }

    this.reachedDestination = function () {

        localStorage.clear();
        var notis = new Notis();
        var setCookie = new Kakor();
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.score = document.querySelector(".score");
        this.totalPoints = document.querySelector(".totalPoints");
        this.totalMetersWalked = document.querySelector(".totalMetersWalked");
        this.button.innerHTML = " Grattis, du har nått din destination!";

        if (navigator.vibrate) {
            navigator.vibrate(1000);
        }; 

        setTimeout(function () {
            this.button.innerHTML = "Välj en ny destination";
        }.bind(this), 10000);



        setCookie.setCookie("total_dist", this.distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist"); //hämtar totala sträckan från kakorna
        this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";//sätter texten på totala sträckan

        setCookie.setCookie("total_points", this.distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points");
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);


        this.score.innerHTML = "Du har " + this.totalPoints + " <img src ='./img/coin3-10.png' alt='coin' >"; //sätter poängen på användaren
    }



}

