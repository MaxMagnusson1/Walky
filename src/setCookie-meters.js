/**
 * Klass för att hålla koll på kakor som används till ens totala distans, poängen och notisen för hur många nya priser man har. 
 */
function Kakor() {
    
/**
 * Metod för att sätta kakor. Tar in cookieName, newDistance och exdays som parametrar.
 * Hämtar den befintliga totala sträckan från cookien.
 * Lägger ihop den nya sträckan med den befintliga totala sträckan.
 * Sätter kakan till det uppdaterade totala värdet och kör en date på det för att beräkna hur länge kakan är aktiv
 */
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

/**
 *Metod för att hämta ut kakor. Tar in cookieName som parameter.
    * Hämtar ut kakans namn.
    * Dekodar kakan.
    * Delar upp kakan i en array.
    * Loopar igenom arrayen och kollar om kakan finns.
    * Om kakan finns så hämtas kakan och retuneras.
    * Annars retuneras en tom sträng. 
 */
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
