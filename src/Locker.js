function Locker() {

    this.renderLocker = function () {
         
        // Skapar div för locker-sidan
        this.locker = document.createElement("div");
        this.lockerContainer = document.createElement("div");   

        // Sätter classnamn på element för locker-sidan
        this.locker.className = "locker";
        this.lockerContainer.className = "lockerContainer";

        // Lägger till elementen i domen för locker-sidan
        document.body.appendChild(this.lockerContainer);
        this.lockerContainer.appendChild(this.locker);

        var setCookieIcon = new Kakor();
        this.currentValue = setCookieIcon.getCookie("notis");
        this.newValue = parseInt(this.currentValue); 
        setCookieIcon.setCookie("notis", -this.newValue, 365);

        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");
        if (imageArray != null) {
            // Skapar en ny div för varje rad
            var rowDiv;
            for (var i = 0; i < imageArray.length; i++) {
                // Skapar en ny rad efter varje par av bilder
                if (i % 2 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.className = "row";
                    this.locker.appendChild(rowDiv);
                }
                // Skapar en bild och lägger till den i den nuvarande raden
                var img = document.createElement('img');
                img.className = "iconInLocker";
                img.src = imageArray[i];
                rowDiv.appendChild(img);
            }
        }
    }
}

// Exempel på hur du kan använda CSS för att arrangera bilderna med flexbox:
// .locker {
//     display: flex;
//     flex-wrap: wrap;
// }

// .row {
//     display: flex;
// }

// .iconInLocker {
//     /* Stilar för dina bilder */
//     margin: 5px; /* Justera efter behov */
// }
