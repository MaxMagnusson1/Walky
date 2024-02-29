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


    this.renderPackage = function (navContainer, score) {

         console.log(score)
        this.score = score;
        this.navContainer = navContainer;

        //div för pris-sidan    
        this.scoreContainer = document.createElement("div");
        this.paket = document.createElement("div");
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
        this.priceContainer.appendChild(this.paket);
        this.priceContainer.appendChild(this.paketText);
        this.priceContainer.appendChild(this.scoreContainer);


        //lägger till eventlyssnare
        this.paket.addEventListener("click", this.randomPrice);

        this.scoreContainer.innerHTML = "Du har " + this.score + " poäng!";

        //skapar objekt
      /*  var eventet = new Eventet();
        eventet.handleEvent(this.totalMetersWalked, this.button, this.score, this.totalPoints, this.paket, this.paketText, this.priceIcon);*/
    }


    this.randomPrice = () => {
        
      /*  if (this.totalPoints < 1000) {
           alert("Du har inte tillräckligt med poäng för att hämta ut ett pris");
            return;
       } else {*/
         
            this.number = this.score -1000;
            var setCookie = new Kakor();
            setCookie.setCookie("total_points", -1000, 365);
            console.log(this.number); 
            this.scoreContainer.innerHTML = "Du har " + this.number + " poäng!";
            //   this.totalPoints = this.number;

            //gömmer elementen som inte ska synas samt array för alla priser
            this.paket.style.visibility = "hidden";
            this.priceArray = [1,3,4,5,6,7,8,9,10];

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
            console.log(this.priceIcon.src);
            
            if (imageArray === null) {
                console.log("null");
                bildkakor.setCookie("images", this.priceIcon.src, 365);
            } else {
                // Skapa en flagga för att spåra om en matchning hittas
                console.log(this.priceIcon.src)

                for (var i = 0; i < imageArray.length; i++) {
                    console.log(this.priceIcon.src)
                    if (imageArray[i] === this.priceIcon.src) {
                        // Om det finns en matchning, sätt flaggan till true och avsluta loopen
                        foundMatch = true;
                        break;
                    }
                }
            
                // Om ingen matchning hittas, kör setCookie
                if (!foundMatch) {
                    console.log(this.priceIcon.src)

                    bildkakor.setCookie("images", this.priceIcon.src, 365);
                }
            }
            
        
           
           
            //lägger till elementet i domen
            document.body.appendChild(this.priceIcon);
            //sätter texten i elementet som skriver ut vilket pris man vunnit
            this.paketText.innerHTML = "Grattis! Du har vunnit " + this.iconName + "!";
       //}
    }


}

