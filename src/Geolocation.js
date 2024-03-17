


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
    this.timer = null;
    var controll = true; 
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    this.getCurrentLocation = function () {//kontrollera knappen, eller vet den redan?
        this.removeLoader = document.querySelector(".loadingTheMap");
        this.button = document.querySelector(".newPositionBtn")



        for (let i = 0; i < 5; i++) {
            if (!navigator.geolocation) {
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
                    break;

                }
            }
        }
    }

    this.deniedAccess = function () {

        this.removeLoader.remove();
        this.deniedImg = document.createElement("img");
        this.deniedImg.src = "./img/wifi-03.png";
        this.deniedImg.className = "deniedDiv";
        document.body.appendChild(this.deniedImg);
        this.errorText = document.createElement("p");
        this.errorText.innerHTML = "Hjälp paketet att hitta genom att aktivera platsinformationen!";
        this.deniedImg.appendChild(this.errorText);
        this.errorText.className = "errorText";


    }


    this.showPosition = function (position) {

        //  console.log(this.target); 
        if (localStorage.getItem("longitude") != null) {
            var targetlog = localStorage.getItem("longitude");
            var targetLat = localStorage.getItem("latitude");


            //  (target.latitude === crd.latitude && target.longitude === crd.longitude)
            var crd = position.coords;

            var aloudDiff = 0.1;
            var latDiff = Math.abs(targetLat - crd.latitude);
            var lonDiff = Math.abs(targetlog - crd.longitude);

            if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
                directionsRenderer.setMap(null);

                // Ta bort alla markörer från kartan
                for (let i = 0; i < self.markerArray.length; i++) {
                    self.markerArray[i].setMap(null);
                }

                // Rensa markerArray
                self.markerArray = [];
                localStorage.clear();
                self.reachedDestination();

            }
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

        // if (){
        /*   const crd = this.goingPos;
           const target = {
               latitude: event.latLng.lat(),
               longitude: event.latLng.lng()
           }
   
           var aloudDiff = 0.0001;
           var latDiff = Math.abs(target.latitude - crd.latitude);
           var lonDiff = Math.abs(target.longitude - crd.longitude);
   
           console.log("innann if sats")
           if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
               alert('Congratulations, you reached the target');
   
           }*/
        //   





        /* if (self.marker) {
             console.log("second if"); 
             //self.drawRoute(self.position, yourPos);
         }*/
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
        console.log('innan 1')
  
        console.log(controll);
        console.log(controll === true); 

        if (controll == true){
            this.karta.addListener('click', function (event) {
                console.log("HEEEEEEEJ"); 
                self.addmarker(event, this.goingPos);
    
            }.bind(this));
    
        }  

        var press;
        this.karta.addListener('mousedown', function (event) {
            press = setTimeout(function () {
                controll = false; 
                console.log(controll);
                console.log('mousedown');
                clearTimeout(press);
        
                // Placera lyssnaren för mouseup inuti mousedown om controll är 1
           
        }.bind(this));

        this.karta.addListener('mouseup', function (event) {
            clearTimeout(press); // Rensa timeout när musknappen släpps
            console.log("clear");
            console.log(controll); 
        }.bind(this));
    }.bind(this), 3000);
    }

 

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

            /*  this.target = {
                 latitude:  event.latLng.lat(), 
                 longitude: event.latLng.lng(),
              }*/
            this.latitude = event.latLng.lat()
            this.longitude = event.latLng.lng()

            //  console.log(this.target,"HHEEJ")
            //     localStorage.setItem("latitude", this.target.latitude)
            //    localStorage.setItem("longitude", this.target.longitude)

            //   console.log(this.target.latitude)

            this.marker = new google.maps.Marker({

                position: event.latLng,
                map: this.karta
            })
            this.markerArray.push(this.marker);
        }


        this.drawRoute(this.position, event.latLng);
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

            else {
                window.alert('Det gick inte att beräkna rutten på grund av: ' + status);
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

        this.target = {
            latitude: this.latitude,
            longitude: this.longitude,
        };

        localStorage.setItem("latitude", this.target.latitude)
        localStorage.setItem("longitude", this.target.longitude)

        this.button.style.cursor = "default";
        this.button.innerHTML = "Du ska gå " + distanceInMeters + " meter";


    }

    this.reachedDestination = function () {

        localStorage.clear();
        var notis = new Notis();
        var setCookie = new Kakor();
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.score = document.querySelector(".score");
        this.totalPoints = document.querySelector(".totalPoints");
        this.totalMetersWalked = document.querySelector(".totalMetersWalked");
        if ("vibrate" in navigator) {
            navigator.vibrate(1000);
        }
        //  navigator.vibrate(1000);
        this.button.innerHTML = " Grattis, du har nått din destination!";

        /*this.button.style.animationName = "jumpAnimation";
        this.button.style.animationDuration = "2s";
        this.button.style.animationIterationCount = "infinite";   
        this.button.style.left = "50%";*/
        // Hoppar 3 gånger

        setTimeout(function () {
            this.button.innerHTML = "Välj en ny destination";
            // Återställ knappens utseende och stoppa animationen
        }.bind(this), 10000);



        setCookie.setCookie("total_dist", this.distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist"); //hämtar totala sträckan från kakorna
        this.totalMetersWalked.innerHTML = "Total sträcka gått någonsin: " + this.totalDistance + " meter";//sätter texten på totala sträckan

        setCookie.setCookie("total_points", this.distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points");
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);


        this.score.innerHTML = "Du har " + this.totalPoints + " <img src ='./img/coin3-10.png' alt='coin' >"; //sätter poängen på användaren
    }



    /* this.controll = function(event, goingPos){
         console.log("HEJ")
         console.log(event); 
         console.log(goingPos); 
 
         const crd = this.goingPos;
             const target = {
                 latitude: event.latLng.lat(),
                 longitude: event.latLng.lng()
             }
     
             var aloudDiff = 0.0001;
             var latDiff = Math.abs(target.latitude - crd.latitude);
             var lonDiff = Math.abs(target.longitude - crd.longitude);
     
             console.log("innann if sats")
             if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
                 alert('Congratulations, you reached the target');
     
     }
     }*/

    /* this.controll = function (){
         console.log("controll"); 
         navigator.geolocation.watchPosition(this.success);
     }
 
     this.success = function (pos){
         const crd = pos.coords; 
         console.log("Success")
         //const crd = this.goingPos;
         const target = {
             latitude: this.destination,
             longitude: this.destination
         }
 
         var aloudDiff = 0.01;
         var latDiff = Math.abs(target.latitude - crd.latitude);
         var lonDiff = Math.abs(target.longitude - crd.longitude);
 
         console.log("innann if sats")
         if (latDiff <= aloudDiff && lonDiff <= aloudDiff) {
             alert('Congratulations, you reached the target');
 
 }
     }*/



    /* this.clearRoute = function () {
         // Rensa DirectionsRenderer från kartan
         directionsRenderer.setMap(null);
 
         // Ta bort alla markörer från kartan
         for (let i = 0; i < this.markerArray.length; i++) {
             this.markerArray[i].setMap(null);
         }
 
         // Rensa markerArray
         this.markerArray = [];
     }*/

}


