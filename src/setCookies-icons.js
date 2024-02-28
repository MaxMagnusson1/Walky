function BildKakor() {
    this.setCookie = function(cookieName, newImageData, exdays) {
        // Hämta den befintliga datan från cookien
        var existingData = this.getCookie(cookieName);
        var imageDataArray = existingData ? existingData : [];

        // Lägg till den nya bilden i arrayen
        imageDataArray.push(newImageData);

        // Konvertera till JSON och lagra i cookien
        var jsonImageData = JSON.stringify(imageDataArray);
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + jsonImageData + ";" + expires + ";path=/";
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
                try {
                    // Försök att parsa JSON-data
                    var jsonData = JSON.parse(cookieValue);
                    // Om parsningslyckat, returnera JSON-data
                    return jsonData;
                } catch (error) {
                    // Om något går fel, logga felet och returnera en tom array eller objekt
                    console.error("Error parsing JSON from cookie:", error);
                    return Array.isArray(cookieValue) ? [] : {};
                }
            }
        }
        return null; // Returnera null om ingen matchande cookie hittas
    }
    
    
}    