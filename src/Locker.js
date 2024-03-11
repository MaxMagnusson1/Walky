function Locker() {
    this.lockerContainer = null;

    this.renderLocker = function () {
        
        this.lockerContainer = document.querySelector('.lockerContainer');

        var setCookieIcon = new Kakor();

        this.currentValue = setCookieIcon.getCookie("notis");
        this.newValue = parseInt(this.currentValue);
        setCookieIcon.setCookie("notis", -this.newValue, 365);

        this.currentValue = setCookieIcon.getCookie("notis");
        this.newValue = parseInt(this.currentValue);
        setCookieIcon.setCookie("notis", --this.newValue, 365);

        
        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");

        if (imageArray != null ) {
            // Skapar en ny div för varje rad
            var rowDiv;
            for (var i = 0; i < imageArray.length; i++) {
                // Skapar en ny rad efter varje par av bilder
                if (i % 2 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.className = "row";
                    this.lockerContainer.appendChild(rowDiv);
                }
                // Skapar en bild och lägger till den i den nuvarande raden
                this.img = document.createElement('img');
                this.img.className = "iconInLocker";
                this.img.src = imageArray[i];

                rowDiv.appendChild(this.img);
            }
        
        


                 // Skapar div för locker-sidan

       /* this.lockerContainer = document.createElement("div");
        this.locker = document.createElement("img");
        this.locker.src = './img/lockerImg.png';*/

        // Sätter classnamn på element för locker-sidan

        /*this.locker.className = "locker";
        this.lockerContainer.className = "lockerContainer";*/

        // Lägger till elementen i domen för locker-sidan

        /*document.body.appendChild(this.lockerContainer);
        this.lockerContainer.appendChild(this.locker);*/


            // Skapar en ny div för varje rad
           /* var rowDiv;
            for (var i = 0; i < imageArray.length; i++) {
                 
                // Skapar en ny rad efter varje par av bilder
                if (i % 2 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.className = "row";
                    this.lockerContainer.appendChild(rowDiv);
                }
                // Skapar en bild och lägger till den i den nuvarande raden
                this.img = document.createElement('img');
                this.img.className = "iconInLocker";
                this.img.src = imageArray[i];

                rowDiv.appendChild(this.img);
            }
        
    
        }*/
    }}
}

