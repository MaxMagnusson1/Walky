function Eventet() {

    this.handleEvent = function (totalMetersWalked, button, score, totalPoints, paket, paketText, priceIcon, locker) {
        this.totalMetersWalked = totalMetersWalked;
        this.button = button;
        this.karta = document.getElementById("karta");
        this.score = score;
        this.totalPoints = totalPoints;
        this.paket = paket;
        this.paketText = paketText;
        this.priceIcon = priceIcon;
        this.locker = locker;

        //skapande av navigationsknappar
        this.lockerBtn = document.createElement("div");
        this.priceBtn = document.createElement("div");
        this.mapBtn = document.createElement("div");

        //sätta classnamn på knapparna
        this.priceBtn.className = "priceBtn";
        this.lockerBtn.className = "lockerBtn";
        this.mapBtn.className = "mapBtn";

        //lägga till knapparna i domen
        document.body.appendChild(this.lockerBtn);
        document.body.appendChild(this.priceBtn);
        document.body.appendChild(this.mapBtn);

        this.start = new Start();
        this.locker = new Locker();
        this.price = new Price();

        this.elementsWithScore = document.querySelectorAll(".totalMetersWalked, .newPositionBtn, .score, .paket, .paketText, .priceIcon, .locker");
        this.elementsWithoutScore = document.querySelectorAll(".totalMetersWalked, .newPositionBtn, .paket, .paketText, .priceIcon, .locker");


        this.mapBtn.addEventListener("click", function () {
            this.map();
        }.bind(this));

        this.priceBtn.addEventListener("click", function () {
            this.priceSide();
        }.bind(this));


        this.lockerBtn.addEventListener("click", function () {
            this.lockerSide();
        }.bind(this));
    }

    //map


    this.map = function () {

        this.elementsWithScore.forEach(function (element) {
            element.style.visibility = "hidden";
        });

        if (this.paket != null) {

            this.paket.style.visibility = "hidden";
            this.paketText.style.visibility = "hidden";
            this.priceIcon.style.visibility = "hidden";
        }

        this.karta.style.visibility = "visible";

        this.start.renderMapAndButtons();
    }

    //price
    this.priceSide = function () {
       
        this.elementsWithoutScore.forEach(function (element) {
            element.style.visibility = "hidden";
        });

        this.karta.style.visibility = "hidden";

        this.price.renderPackage(this.totalMetersWalked, this.button, this.score, this.totalPoints);

    }

    //locker
    this.lockerSide = function () {

        this.elementsWithScore.forEach(function (element) {
            element.style.visibility = "hidden";
        });
        
        this.karta.style.visibility = "hidden";
        this.locker.renderLocker();
    }
}