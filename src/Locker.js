function Locker() {

    this.renderLocker = function () {
         
        //skpar div för locker-sidan
        this.locker = document.createElement("div");
        this.lockerContainer = document.createElement("div");   

        //sätta classnamn på element för locker-sidan
        this.locker.className = "locker";
        this.lockerContainer.className = "lockerContainer";

        //lägger till elementen i domen för locker-sidan
        document.body.appendChild(this.lockerContainer);
        this.lockerContainer.appendChild(this.locker);

        var setCookieIcon = new Kakor();
        this.currentValue = setCookieIcon.getCookie("notis");
        this.newValue = parseInt(this.currentValue); 
        setCookieIcon.setCookie("notis", -this.newValue, 365);

        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");
        if (imageArray != null) {
            for (var i = 0; i < imageArray.length; i++) {
             
                this.img = document.createElement('img');
                this.img.className = "iconInLocker";
                this.img.src = imageArray[i];
                this.locker.appendChild(this.img);
            
            }
        }
           
    
    /*    var eventet = new Eventet();
        eventet.handleEvent(null, null, this.score, null, null, null, null, this.locker);
      
    }*/



}}