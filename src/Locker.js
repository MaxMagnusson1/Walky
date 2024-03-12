function Locker() {
    this.lockerContainer = null;
    this.renderLocker = function () {

        this.newLockerPrice = document.querySelector(".newLockerPrice");

        // Skapar div för locker-sidan
        this.lockerContainer = document.createElement("div");
        this.locker = document.createElement("img");
        this.locker.src = './img/lockerImg.png';

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

        this.newLockerPrice.style.visibility = "hidden";    

        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");

        if (imageArray != null ) {
            // Skapar en ny div för varje rad
            this.rowDiv;
            for (var i = 0; i < imageArray.length; i++) {
                if (!document.querySelector(`img[src="${imageArray[i]}"]`)) {
                // Skapar en ny rad efter varje par av bilder
                if (i % 2 === 0) {
                    this.rowDiv = document.createElement("div");
                    this.rowDiv.className = "row";
                    this.lockerContainer.appendChild(this.rowDiv);
                }
                // Skapar en bild och lägger till den i den nuvarande raden
                this.img = document.createElement('img');
                this.img.className = "iconInLocker";
                this.img.src = imageArray[i];

                this.rowDiv.appendChild(this.img);
            }
            }
        
        }
    }
}

