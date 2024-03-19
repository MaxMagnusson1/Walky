/**
 * Klass för att lagring av alla ikoner som användaren har vunnit i kakor. Inleds med att visa vad som är med i klassen.
 */

function BildKakor() {
    this.cookieName = null;
    this.newImageData = null;
    this.exdays = null;
    this.existingData = null;
    this.imageDataArray = null;
    this.cookieName = null;
    this.name = null;
/**
 * Metod för att sätta kakor. Tar in cookieName, newImageData och exdays som parametrar.
 * Hämtar den befintliga totala sträckan från cookien.
 * Lägger ihop den nya sträckan med den befintliga totala sträckan.
 * Pushar in den nya sträckan i arrayen.
 * Konventerar arrayen till JSON.
 * Skapar en instans av data och räknar ut hur länge kakan ska vara aktiv.
 * 
 */ 
    this.setCookie = function(cookieName, newImageData, exdays) {
        this.cookieName = cookieName;
        this.newImageData = newImageData;
        this.exdays = exdays;
        this.existingData = this.getCookie(this.cookieName);
         this.imageDataArray = this.existingData ?this.existingData : [];

        this.imageDataArray.push(this.newImageData);

        var jsonImageData = JSON.stringify(this.imageDataArray);
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = this.cookieName + "=" + jsonImageData + ";" + expires + ";path=/";
    }

/**
 * Metod för att hämta ut kakan. Tar in cookieName som parameter.
 * Hämtar ut kakans namn.
 * Dekodar kakan med decodeURIComponent metod. 
 * Delar upp kakan i en array.
 * Loopar igenom arrayen och kollar om kakan finns.
 * Om kakan finns så sätts värdet och den försöker med en try metod att parsa till JSON.
 */ 
    this.getCookie = function(cookieName) {
        this.cookieName = cookieName;
        this.name = this.cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(this.name) == 0) {
                var cookieValue = cookie.substring(this.name.length, cookie.length);
                try {
                    var jsonData = JSON.parse(cookieValue);
                    return jsonData;
                } catch (error) {
                    return Array.isArray(cookieValue) ? [] : {};
                }
            }
        }
        return null; 
    }
    
    
}    