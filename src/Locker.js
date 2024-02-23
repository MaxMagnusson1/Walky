function Locker() {

    this.renderLocker = function () {

        //div för locker-sidan  
        this.locker = document.createElement("div");
        //sätta classnamn på element för locker-sidan
        this.locker.className = "locker";

        //lägger till elementen i domen för locker-sidan
        document.body.appendChild(this.locker);

        var eventet = new Eventet();
        eventet.handleEvent(null, null, null, null, null, null, null, this.locker);
        // this.totalMetersWalked = totalMetersWalked;
        // this.button = button;
        // this.score = score;
        // this.totalPoints = totalPoints;
        // this.mapBtn = mapBtn;
        // this.score = score;
        //this.hideMap = document.getElementById("karta");

        // this.totalMetersWalked.style.visibility = "hidden";
        // this.button.style.visibility = "hidden";
        // this.score.style.visibility = "hidden";
        //this.hideMap.style.visibility = "hidden";
        // this.score.style.visibility = "hidden"


        // this.mapBtn.addEventListener("click", this.map.bind(this)); 
        //this.priceBtn.addEventListener("click", this.price.bind(this));
    }

    /* this.map = function(){
      
         this.locker.style.visibility = "hidden";
         this.hideMap.style.visibility = "visible";
 
         var start = new Start();
         start.renderMapAndButtons();
     }
 
     this.price = function(){
 
     }*/

}