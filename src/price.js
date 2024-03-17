
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
    this.value = 1;

    var setCookie = new Kakor();
    const jsConfetti = new JSConfetti()

    this.renderPackage = function () {

        //div för pris-sidan    
        this.priceContainer = document.createElement("div");
        this.scoreContainer = document.createElement("div");
        this.paket = document.createElement("img");
        this.paketText = document.createElement("div");
        this.priceIcon = document.createElement("img");
        this.coin = document.createElement("img");  
        this.currentPoint = document.createElement("div");
          this.coin.src = "./img/coin2-10.png";
    
        //klassnamn för element på prissidan 
        this.priceContainer.className = "priceContainer";
        this.currentPoint.className = "currentPoint";
        this.scoreContainer.className = "priceScore";
        this.paket.className = "paket";
        this.priceIcon.className = "priceIcon";
        this.paketText.className = "paketText";
        this.coin.className = "coinPrice";
        
        //lägger till elementen i domen 
        document.body.appendChild(this.priceContainer);
        this.priceContainer.appendChild(this.scoreContainer);
        this.priceContainer.appendChild(this.paket);
        this.priceContainer.appendChild(this.priceIcon);
        this.priceContainer.appendChild(this.paketText);
        this.priceContainer.appendChild(this.currentPoint);
      

        this.priceContainer.style.visibility ="hidden"; 
        this.paketText.style.visibility = "hidden";
       // this.totalPoints = totalPoints;

        //  lägger till elementen i domen för pris-sidan

        this.priceContainer.appendChild(this.scoreContainer);

        //kontroll på paket 
      //  console.trace();
        if (this.priceIcon !== null) {
            this.priceIcon.removeEventListener("click", this.clickHandler);

        }

   //     this.priceContainer = document.querySelector('.priceContainer');
        this.priceContainer.style.visibility = "visible";
        this.paket = document.querySelector('.paket');
        this.scoreContainer = document.querySelector('.priceScore');
        this.priceIcon = document.querySelector('.priceIcon');
     //   this.paketText = document.querySelector('.paketText');
        this.newLockerPrice = document.querySelector(".newLockerPrice");
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.totalPoints = setCookie.getCookie("total_points");


        if (this.totalPoints > this.value) {
            this.paket.src = './img/correktpaket-05.png';
            this.paket.id = "shake";
            this.paket.addEventListener("click", this.randomPrice);
            // this.priceContainer.appendChild(this.paket);

        } else {
            this.paket.src = "./img/skuggat-06.png";
            this.paket.removeAttribute("id");
                        //  this.priceContainer.appendChild(this.paket)

        }

        this.currentPoint.innerHTML =  this.totalPoints;
        this.currentPoint.appendChild(this.coin);
        this.priceContainer = document.createElement("div");
        this.priceContainer.className = "priceContainer";
        //document.body.appendChild(this.priceContainer);


        //   var elementsWithClassName = document.querySelectorAll('body > .priceContainer');
        //   console.log(elementsWithClassName.length);





    }

    this.randomPrice = () => {
        this.paket.removeEventListener("click", this.randomPrice);
        jsConfetti.addConfetti({
            confettiNumber: 100,
        });
        this.number = this.totalPoints - this.value;
        // setCookie = new Kakor();
        setCookie.setCookie("total_points", -this.value, 365);
        this.currentPoint.innerHTML = this.number;
        this.currentPoint.appendChild(this.coin);

        //   this.totalPoints = this.number;
        this.totalPoints = setCookie.getCookie("total_points");
        var notis = new Notis();
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

        //gömmer elementen som inte ska synas samt array för alla priser
        this.paket.style.visibility = "hidden";
        this.priceArray = [1,2,3,4,5,6,7,8,9,10];
        
        //slumpar fram ett pris som ska användas till switchen
        var priceIndex = Math.floor(Math.random() * this.priceArray.length);
        var priceNumber = this.priceArray[priceIndex];

        //skapar elementet som ska visas baserat på switchen


        switch (priceNumber) {
            case 1:

                this.priceIcon.src = './img/BBQ-12.png';
                this.iconName = "<i>Dags för BBQ</i>";
                break;

            case 2:
                this.priceIcon.src = './img/star-12.png';
                this.iconName = "<i>Du är en stjärna</i>'";
                break;
            case 3:

                this.priceIcon.src = './img/lasersabellila-12.png';
                this.iconName = "<i>Den lila sabeln</i>";

                break;
            case 4:
                this.priceIcon.src = './img/redlasersabel-12.png';
                this.iconName = "<i>Den mörka sidan</i>";

                break;
            case 5:
                this.priceIcon.src = './img/lasersabel-12.png';
                this.iconName = "<i>Den ljusa sidan</i>";

                break;

            case 6:
                this.priceIcon.src = './img/mic-12.png';
                this.iconName = "<i>Dags för kareoke</i>";

                break;
            case 7:
                this.priceIcon.src = './img/disco-12.png';
                this.iconName = "Diskotek hela natten</i>";

                break;
            case 8:
                this.priceIcon.src = './img/munk-12.png';
                this.iconName = "<i>Dags för ett snack</i>";

                break;
            case 9:
                this.priceIcon.src = './img/kompassen-12.png';
                this.iconName = "<i>Helt vilse i världen</i>";

                break;
            case 10:
                this.priceIcon.src = './img/cake-12.png';
                this.iconName = "<i>Fyller någon år</i>";
                break;

        }


        var bildkakor = new BildKakor();
        var imageArray = bildkakor.getCookie("images");
        var foundMatch = false;
        this.iconName.className ="iconName"
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
                this.notisValue = setCookie.getCookie("notis");
                bildkakor.setCookie("images", this.priceIcon.src, 365);
                setCookie.setCookie("notis", 1, 365);
                this.newLockerPrice.style.visibility = "visible";
                this.newLockerPrice.innerHTML = setCookie.getCookie("notis");
            }
        }

        //lägger till elementet i domen
        //this.priceContainer.appendChild(this.priceIcon);


        //sätter texten i elementet som skriver ut vilket pris man vunnit
        this.paketText.innerHTML = "Grattis! Du har vunnit: " + this.iconName + "!";
        //this.priceContainer.appendChild(this.paketText);
        this.priceIcon.style.visibility = "visible";
        this.paketText.style.visibility = "visible ";
        this.priceIcon.id = "shake";

        this.priceIcon.addEventListener("click", this.clickHandler);



    }
    this.clickHandler = () => {
        this.paket.style.visibility = "visible";
        this.priceIcon.style.visibility = "hidden";
        this.paketText.style.visibility = "hidden";
        //this.remove = [this.priceIcon, this.paketText];
        this.priceIcon.style.visibility = "hidden";
        this.paketText.style.visibility = "hidden";
        this.renderPackage();
    }
}

