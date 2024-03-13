


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



    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    this.getCurrentLocation = function () {//kontrollera knappen, eller vet den redan?
        this.removeLoader = document.querySelector(".loadingTheMap");
        this.button = document.querySelector(".newPositionBtn")



        for (let i = 0; i < 5; i++) {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(this.showPosition, this.deniedAccess.bind(this));
                console.log("geolocation")
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
        this.deniedImg.src = "./img/treemedtext-03.png";
        this.deniedImg.className = "deniedDiv";
        document.body.appendChild(this.deniedImg);
        this.errorText = document.createElement("p");
        this.errorText.innerHTML = "Hjälp paketet att hitta genom att aktivera platsinformationen!";
        this.deniedImg.appendChild(this.errorText);
        this.errorText.className = "errorText";


    }


    this.showPosition = function (position) {
      console.log(this.target); 
        if(this.target != null){
            console.log(this.target); 
            console.log("uppdaterar"); 

          //  (target.latitude === crd.latitude && target.longitude === crd.longitude)
            const crd = position.coords;

  if (this.target.latitude === crd.latitude && this.target.longitude === crd.longitude) {
    console.log("Congratulations, you reached the target");
   // navigator.geolocation.clearWatch(id);
  }
}
else {
    console.log("HEJ");
    this.goingPos = position.coords;
    //   this.position = position; 
    //     console.log(this.position)
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var yourPos = new google.maps.LatLng(lat, lng);

    console.log("ELSE")
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
        console.log("getmap"); 
        this.position = yourPos;
        this.goingPos = goingPos;
        var lat = this.position.lat(); // Hämta latitud från yourPos
        var lng = this.position.lng(); // Hämta longitud från yourPos
       if (!this.karta) {
            console.log("karta finns inte än!")
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

        this.removeLoader.remove();

        this.karta.addListener('click', function (event) {
            this.addmarker(event, this.goingPos);
        }.bind(this));

    }

    this.addmarker = function (event, goingPos) {
 
        this.goingPos = goingPos;
        if (this.markerArray.length == 0) {
            
        
            this.marker = new google.maps.Marker({
                position: event.latLng,
                map: this.karta

            })
            this.markerArray.push(this.marker);
        } else {
            for (let i = 0; i < this.markerArray.length; i++) {
                this.markerArray[i].setMap(null);

            }
            directionsRenderer.setMap(null);

            this.target = {
               latitude:  event.latLng.lat(), 
               longitude: event.latLng.lng(),
            }
            
            console.log(this.target, "hej");
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
        console.log(destination); 
        console.log(origin)
        console.log("drawroute");
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
      //  this.controll(destination, this.goingPos);
      //this.controll(); 
        return this.distanceInMeters;
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



    this.clearRoute = function () {
        // Rensa DirectionsRenderer från kartan
        directionsRenderer.setMap(null);

        // Ta bort alla markörer från kartan
        for (let i = 0; i < this.markerArray.length; i++) {
            this.markerArray[i].setMap(null);
        }

        // Rensa markerArray
        this.markerArray = [];
    }

}


