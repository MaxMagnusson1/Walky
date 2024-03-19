/**
 * Klassen som ansvarar för att skapa prissidan. Klassen inleds med en mall för vad som ska finnas i klassen samt instanser av klasser som behövs globalt.
 */
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
    this.currentPoint = null;
    this.priceContainer = null;
    this.scoreContainer = null;
    this.coin = null;
    this.newLockerPrice = null;
    this.totalPoints = null;
    this.number = null;
    this.nmrOfpresentsDiv = null;
    this.notisValue = null;


    var setCookie = new Kakor();
    const jsConfetti = new JSConfetti()

    /**
     * Metod för att rendera ut paketen på prissidan. 
     * Inleds med att skapa elementen som ska visas på prissidan.
     * Sätter klassnamn på elementen och lägger till dem i domen.
     * Lägger elementen i domen för prissidan.
     * Hämtar ut elment from domen med querySelector för senare användning.
     */
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
        this.priceContainer.appendChild(this.scoreContainer);

    /**
     * Vad som ska vara synligt och inte synligt på prissidan.
     */
        this.paketText.style.visibility = "hidden";
        this.priceContainer.style.visibility = "visible";

    /**
     * Kontroll på vilken eventhanterare som ska vara aktikv
     */
        if (this.priceIcon !== null) {
            this.priceIcon.removeEventListener("click", this.clickHandler);

        this.paket = document.querySelector('.paket');
        this.newLockerPrice = document.querySelector(".newLockerPrice");
        this.nmrOfpresentsDiv = document.querySelector(".nmrOfpresents");
        this.totalPoints = setCookie.getCookie("total_points");

/** 
 * Kontroll på om det finns några poäng att använda för att öppna paketet. Ifall tillräckligt med poäng finns renderas paketet ut och eventhanterare sätts tillsammans med id för animering
* I else satsen renderas ett skuggat paket ut och id för animering tas bort.
*/
        if (this.totalPoints > this.value) {
            this.paket.src = './img/correktpaket-05.png';
            this.paket.id = "shake";
            this.paket.addEventListener("click", this.randomPrice);

        } else {
            this.paket.src = "./img/skuggat-06.png";
            this.paket.removeAttribute("id");

        }

/**
 * Ansvarar för att skapa elementen tillsammans med korrekt poäng som visas i högra hörnet. 
 */
        this.currentPoint.innerHTML =  this.totalPoints;
        this.currentPoint.appendChild(this.coin);
        this.priceContainer = document.createElement("div");
        this.priceContainer.className = "priceContainer";

    }
    }; 
    /**
     * Metod för att slumpa fram ett pris som ska visas på prissidan ifall användaren välje att öppna paketet.
     * Inleds med att ta bort eventhanteraren för att inte kunna klicka på paketet igen.
     * Lägger till konfetti som ska visas när användaren vunnit ett pris.
     * Räknar ut hur många poäng användaren har kvar efter att ha öppnat paketet.
     * Sparar poängen i kakor.
     * Skapar en instans av Notis och kallar på metoden checkNotis för att kolla om några notiser ska visas eller inte.
     * Gömmer elementen som inte ska synas samt skapar en array för alla priser.
     * Slumpar fram en siffra ur arrayn som ska användas i switch satsen för att bestämma vilket pris som ska visas.
     */
    this.randomPrice = () => {
        this.paket.removeEventListener("click", this.randomPrice);
        jsConfetti.addConfetti({
            confettiNumber: 100,
        });
        this.number = this.totalPoints - this.value;
        setCookie.setCookie("total_points", -this.value, 365);
        this.currentPoint.innerHTML = this.number;
        this.currentPoint.appendChild(this.coin);

        this.totalPoints = setCookie.getCookie("total_points");
        var notis = new Notis();
        notis.checkNotis(this.nmrOfpresentsDiv, this.totalPoints);

        this.paket.style.visibility = "hidden";
        this.priceArray = [1,2,3,4,5,6,7,8,9,10];
        
        var priceIndex = Math.floor(Math.random() * this.priceArray.length);
        var priceNumber = this.priceArray[priceIndex];


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

/**
 * Skapar en instans av bildkakor och hämtar ut arrayen med bilder som ska visas på prissidan och sätter ett klassnamn, 
 * Skapar en flagga som sätts till false.
 * En kontroll körs på om det finns några bilder i arrayen och om det är sant så läggs de till i kakorna och notis visas.
 * Om det inte finns några bilder i arrayen så körs en loop för att kolla om det finns några matchningar i arrayen.
 * Om det finns en matchning så sätts flaggan till true och loopen avslutas.
 * Om ingen matchning hittas så körs setCookie och den nya bilden läggs till i kakorna samt en notis körs 
 */
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

     
/** 
 * Sätter text på vilket pris användaren har vunnit och stylar dem så de visas och lägger till ett id för animering.
 * Lägger till eventhanterare för att kunna klicka på priset och få det att försvinna och få fram ett paket igen via en clickhanderare som nollstället allt. 
 */
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

