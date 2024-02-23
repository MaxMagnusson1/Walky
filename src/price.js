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


    this.renderPackage = function (totalMetersWalked, button, score, totalPoints) {

        this.totalMetersWalked = totalMetersWalked;
        this.button = button;
        this.score = score;

        //div för pris-sidan    
        this.paket = document.createElement("div");
        this.paketText = document.createElement("div");
        this.priceIcon = document.createElement("img");

        //sätta classnamn på element för pris-sidan
        this.paketText.className = "paketText";
        this.paket.className = "paket";
        this.priceIcon.className = "priceIcon";
        this.totalPoints = totalPoints;

        //lägger till elementen i domen för pris-sidan
        document.body.appendChild(this.paket);
        document.body.appendChild(this.paketText);

        //sätter rätt egenskaper till rätt värden
        /*    this.score = score;
            this.totalPoints = totalPoints;
            this.paket = paket;
            this.paketText = paketText;
            this.priceIcon = priceIcon;
            this.button = button;
            this.totalMetersWalked = totalMetersWalked;
            this.locker = locker;   
         
            this.paket.style.visibility = "visible";
            this.paketText.style.visibility = "visible";*/

        //sätter texten i elementet
        this.paketText.innerHTML = "Du har valt att hämta ut ett paket, tryck på paketet för att se vad du har vunnit!";

        //lägger till eventlyssnare
        this.paket.addEventListener("click", this.randomPrice);

        //skapar objekt
        var eventet = new Eventet();
        eventet.handleEvent(this.totalMetersWalked, this.button, this.score, this.totalPoints, this.paket, this.paketText, this.priceIcon);
    }


    this.randomPrice = () => {

        if (this.totalPoints < 1000) {
            alert("Du har inte tillräckligt med poäng för att hämta ut ett pris");
            return;
        } else {
            this.number = parseInt(this.totalPoints);
            this.number -= 1000;
            var setCookie = new Kakor();
            setCookie.setCookie("total_points", -1000, 365);

            this.score.innerHTML = "Du har " + this.number + " poäng!";
            //   this.totalPoints = this.number;

            //gömmer elementen som inte ska synas samt array för alla priser
            this.paket.style.visibility = "hidden";
            this.priceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            //slumpar fram ett pris som ska användas till switchen
            var priceIndex = Math.floor(Math.random() * this.priceArray.length);
            var priceNumber = this.priceArray[priceIndex];

            //skapar elementet som ska visas baserat på switchen


            switch (priceNumber) {
                case 1:

                    this.priceIcon.src = './img/Asset 6@2x.png';
                    this.iconName = "Howard The Ugly Monster";

                    break;
                case 2:
                    this.priceIcon.src = '../img/Asset 7@2x.png';
                    this.iconName = "Mohammed";
                    break;
                case 3:

                    this.priceIcon.src = '../img/Asset 8@2x.png';
                    this.iconName = "Det lila lasersvärdet";

                    break;
                case 4:
                    this.priceIcon.src = '../img/Asset 9@2x.png';
                    this.iconName = "Det röda lasersvärdet";

                    break;
                case 5:
                    this.priceIcon.src = '../img/Asset 10@2x.png';
                    this.iconName = "Det blå lasersvärdet";


                case 6:
                    this.priceIcon.src = '../img/Asset 11@2x.png';
                    this.iconName = "Spike wheel";

                    break;
                case 7:
                    this.priceIcon.src = '../img/Asset 13@2x.png';
                    this.iconName = "Stjärnan";

                    break;
                case 8:
                    this.priceIcon.src = '../img/Asset 14@2x.png';
                    this.iconName = "Den blå kvadraten";

                    break;
                case 9:
                    this.priceIcon.src = '../img/Asset 15@2x.png';
                    this.iconName = "Munken";

                    break;
                case 10:
                    this.priceIcon.src = '../img/Asset 16@2x.png';
                    this.iconName = "Kompassen";
                    break;

            }
            //lägger till elementet i domen
            document.body.appendChild(this.priceIcon);
            //sätter texten i elementet som skriver ut vilket pris man vunnit
            this.paketText.innerHTML = "Grattis! Du har vunnit " + this.iconName + "!";
        }
    }


}


