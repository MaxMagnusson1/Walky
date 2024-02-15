
function Geolocation () {
self = this;
    this.getCurrentLocation= function () {
        console.log("Geolocation");
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.ShowPosition);
            
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    this.ShowPosition = function (position) {
        console.log("position")
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat, this.lng);
        self.getMap(this.lat, this.lng);
    } 
    this.getMap = function (latitude, longitude) {
        var position = { lat: latitude, lng: longitude }; // Startposition (t.ex. Stockholm)
        var karta = new google.maps.Map(document.getElementById('karta'), { zoom: 12, center: position });
        var markör = new google.maps.Marker({ position: position, map: karta })
}
}


   /*     console.log("Geolocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    this.showPosition = function (position) {
        console.log("Geolocation2")

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude, longitude);
        self.getMap(latitude, longitude);
    };

    this.showError = function (error) {
        console.warn(`ERROR(${error.code}): ${error.message}`);
    };

    this.getMap = function (latitude, longitude) {
        var position = { lat: latitude, lng: longitude }; // Startposition (t.ex. Stockholm)
        var karta = new google.maps.Map(document.getElementById('karta'), { zoom: 12, center: position });
        var markör = new google.maps.Marker({ position: position, map: karta });*/
  


   /*     const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };
          
          function success(pos) {
            const crd = pos.coords;
          
            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
          */
