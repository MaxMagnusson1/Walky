function ImageCookieHandler(cookieName) {
    var self = this;

    this.setCookie = function(imagePath, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = self.cookieName + "=" + imagePath + ";" + expires + ";path=/";
    };

    this.getCookie = function() {
        var name = self.cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    };

    this.cookieName = cookieName;
}
