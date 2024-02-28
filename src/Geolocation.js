function Geolocation() {
    this.position = null;
    this.karta = null;
    this.myLocation = null;
    this.markerArray = [];
    this.marker = null;
    this.distanceInMeters = null;
    this.pointArray = [];
    var self = this;

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    this.getCurrentLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    this.showPosition = function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var yourPos = new google.maps.LatLng(lat, lng);
        if (self.myLocation) {
            self.myLocation.setPosition(yourPos);
        } else {
            self.getMap(yourPos);
        }
    }

    this.getMap = function (yourPos) {
        this.position = yourPos;
        this.karta = new google.maps.Map(document.getElementById('karta'), {
            zoom: 15,
            center: this.position
        });
        this.myLocation = new google.maps.Marker({
            position: this.position,
            map: this.karta,
            title: "Här är jag!"
        });
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

            } else {
                window.alert('Det gick inte att beräkna rutten på grund av: ' + status);
            }
        }.bind(this));
        return this.distanceInMeters;
    }

}
