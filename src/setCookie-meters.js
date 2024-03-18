function Kakor() {
    
    this.setCookie = function(cookieName, newDistance, exdays) {
        // Hämta den befintliga totala sträckan från cookien
        var existingDistance = parseInt(this.getCookie(cookieName)) || 0;

        // Lägg ihop den nya sträckan med den befintliga totala sträckan
        var totalDistance = existingDistance + newDistance;

        // Sätt cookien med det uppdaterade totala värdet
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + totalDistance + ";" + expires + ";path=/";
    }

    this.getCookie = function(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                var cookieValue = cookie.substring(name.length, cookie.length);
                return cookieValue;
            }
        }
        return "";
    }
}
