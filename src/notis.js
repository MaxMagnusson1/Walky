function Notis() {
   // var setCookie = new Kakor();
    this.notis = null;
   // this.priceBtn = priceBtn;

    this.checkNotis = function (nmrOfpresentsDiv, totalPoints) {
        this.nmrOfpresentsDiv = nmrOfpresentsDiv;
        this.totalPoints = totalPoints
     

        if (this.totalPoints >= 1000) {
            this.nmrOfpresentsDiv.style.visibility = "visible";
            this.notis = Math.floor(this.totalPoints / 1000);
            this.nmrOfpresentsDiv.innerHTML = this.notis;

        }

        else if (this.totalPoints < 1000)
        {
         this.nmrOfpresentsDiv.style.visibility = "hidden";
        }

    }

   // this.checkNotisLocker = function(){

        
    }

