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


    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
   
    this.getCurrentLocation = function () {//kontrollera knappen, eller vet den redan?
        this.removeLoader = document.querySelector(".loadingTheMap"); 
        this.infoDiv = document.createElement("div"); 
        this.button =document.querySelector(".newPositionBtn")
        this.yesBtn = document.createElement("div"); 
        document.body.appendChild(this.infoDiv);

   
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
            break; 

        }
    }
}}

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
        this.position = position; 
        console.log(this.position)
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        var yourPos = new google.maps.LatLng(lat, lng);
        if (self.myLocation) {
            self.myLocation.setPosition(yourPos);
        } else {
            self.getMap(yourPos);
        }

        if (self.startMarker) {
            self.startMarker.setPosition(yourPos);
        }
        if (self.marker) {
            self.drawRoute(self.position, yourPos);
        }
    }


    this.getMap = function (yourPos) {
        this.position = yourPos;
        var lat = this.position.lat(); // Hämta latitud från yourPos
        var lng = this.position.lng(); // Hämta longitud från yourPos

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
        this.removeLoader.remove(); 

     this.karta.addListener('click', this.addmarker.bind(this));
       
    }

    this.addmarker = function (event) {
 
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
            this.marker = new google.maps.Marker({
                position: event.latLng,
                map: this.karta
            })
            this.markerArray.push(this.marker);
        }
        this.drawRoute(this.position, event.latLng);
    }


    this.drawRoute = function (origin, destination) {
            console.log(this.position)
        /*navigator.geolocation.watchPosition(uppdatePosition());

        function uppdatePosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var yourPos = new google.maps.LatLng(lat, lng);
            self.position = yourPos;

            
        }
*/

        var request = {
            origin: this.position,
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
        return this.distanceInMeters;
    }

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
