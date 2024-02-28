function Locker() {

    this.renderLocker = function (score) {
        this.score = score; 
        //skpar div för locker-sidan
        this.locker = document.createElement("div");

        //sätta classnamn på element för locker-sidan
        this.locker.className = "locker";

        //lägger till elementen i domen för locker-sidan
        document.body.appendChild(this.locker);

        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");
        if (imageArray != null) {
            for (var i = 0; i < imageArray.length; i++) {
             
                var img = document.createElement('img');
                img.src = imageArray[i];
                this.locker.appendChild(img);
            
            }
        }
           
    
        var eventet = new Eventet();
        eventet.handleEvent(null, null, this.score, null, null, null, null, this.locker);
      
    }



}