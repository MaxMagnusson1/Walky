function Price() {
    this.paket = null;
    this.paketText = null;
    this.totalMetersWalked = null;
    this.button = null;
    this.hideMap = null;
    this.priceIcon = null;
    this.iconName = null;
    this.priceArray = null;
    this.priceNumber = null;
    this.priceIndex = null;
    this.value = 1000;

    var setCookie = new Kakor();

    this.renderPackage = function () {

        this.newLockerPrice = document.querySelector(".newLockerPrice"); 
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.totalPoints = setCookie.getCookie("total_points");

        //div för pris-sidan    
        this.scoreContainer = document.createElement("div");
        this.paket = document.createElement("img");
        this.paketText = document.createElement("div");
        this.priceContainer = document.createElement("div");
        this.priceIcon = document.createElement("img");

        //sätta classnamn på element för pris-sidan
        this.priceContainer.className = "priceContainer";
        this.scoreContainer.className = "priceScore";
        this.paket.className = "paket";
        this.priceIcon.className = "priceIcon";
        this.paketText.className = "paketText";
        // this.totalPoints = totalPoints;

        //lägger till elementen i domen för pris-sidan
        document.body.appendChild(this.priceContainer);
        this.priceContainer.appendChild(this.scoreContainer);

        //kontroll på paket 
        if (this.totalPoints > this.value) {
            this.paket.src = './img/paket.png';
            this.paket.addEventListener("click", this.randomPrice);
            this.priceContainer.appendChild(this.paket);



        } else {
            this.paket.src = "./img/skuggpaket.png";
            this.priceContainer.appendChild(this.paket)

        }


        this.scoreContainer.innerHTML = "Du har " + this.totalPoints + " poäng!";
    }

    this.randomPrice = () => {

        this.number = this.totalPoints - this.value;
        // setCookie = new Kakor();
        setCookie.setCookie("total_points", -this.value, 365);
        this.scoreContainer.innerHTML = "Du har " + this.number + " poäng!";
        //   this.totalPoints = this.number;
        this.totalPoints = setCookie.getCookie("total_points");
        var notis = new Notis();
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

        //gömmer elementen som inte ska synas samt array för alla priser
        this.paket.style.visibility = "hidden";
        this.priceArray = [1, 3, 4, 5, 6, 7, 8, 9, 10];

        //slumpar fram ett pris som ska användas till switchen
        var priceIndex = Math.floor(Math.random() * this.priceArray.length);
        var priceNumber = this.priceArray[priceIndex];

        //skapar elementet som ska visas baserat på switchen


        switch (priceNumber) {
            case 1:

                this.priceIcon.src = './img/bild0.png';
                this.iconName = "Howard The Ugly Monster";
                break;

            case 2:
                this.priceIcon.src = './img/bild1.png';
                this.iconName = "Mohammed";
                break;
            case 3:

                this.priceIcon.src = './img/bild2.png';
                this.iconName = "Det lila lsasersvärdet";

                break;
            case 4:
                this.priceIcon.src = './img/bild3.png';
                this.iconName = "Det röda lasersvärdet";

                break;
            case 5:
                this.priceIcon.src = './img/bild4.png';
                this.iconName = "Det blåa lasersvärdet";

                break;

            case 6:
                this.priceIcon.src = './img/bild5.png';
                this.iconName = "Spike wheel";

                break;
            case 7:
                this.priceIcon.src = './img/bild6.png';
                this.iconName = "Den blåa kvadraten";

                break;
            case 8:
                this.priceIcon.src = './img/bild7.png';
                this.iconName = "Den smaskiga donuten";

                break;
            case 9:
                this.priceIcon.src = './img/bild8.png';
                this.iconName = "Kompassen";

                break;
            case 10:
                this.priceIcon.src = './img/bild9.png';
                this.iconName = "Stjärnan";
                break;

        }
        var bildkakor = new BildKakor();
        var imageArray = bildkakor.getCookie("images");
        var foundMatch = false;
        if (imageArray === null) {
            bildkakor.setCookie("images", this.priceIcon.src, 365);
            setCookie.setCookie("notis", 1, 365);
            this.newLockerPrice.style.visibility = "visible";
            this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
        } else {
            // Skapa en flagga för att spåra om en matchning hittas

            for (var i = 0; i < imageArray.length; i++) {
                if (imageArray[i] === this.priceIcon.src) {
                    // Om det finns en matchning, sätt flaggan till true och avsluta loopen
                    foundMatch = true;
                    break;
                }
            }

            // Om ingen matchning hittas, kör setCookie
            if (!foundMatch) {
                bildkakor.setCookie("images", this.priceIcon.src, 365);

                setCookie.setCookie("notis", 1, 365);
                this.newLockerPrice.style.visibility = "visible";
                this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
            }
        }

        //lägger till elementet i domen
        this.priceContainer.appendChild(this.priceIcon);


        //sätter texten i elementet som skriver ut vilket pris man vunnit
        this.paketText.innerHTML = "Grattis! Du har vunnit " + this.iconName + "!";
        this.priceContainer.appendChild(this.paketText);


        this.priceIcon.addEventListener("click", function () {
            this.remove = [this.priceIcon, this.paketText];
            for (var i = 0; i < this.remove.length; i++) {
                this.priceContainer.removeChild(this.remove[i]);
            }
            this.renderPackage();
        }.bind(this));

    }


}

