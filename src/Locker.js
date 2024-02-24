function Locker() {

    this.renderLocker = function () {
        //skpar div för locker-sidan
        this.locker = document.createElement("div");

        //sätta classnamn på element för locker-sidan
        this.locker.className = "locker";

        //lägger till elementen i domen för locker-sidan
        document.body.appendChild(this.locker);

        //kak objekt
        var setCookie = new Kakor();

        //hämtar ut lagrade ikoner från kakor
        this.icons = setCookie.getCookie("iconName");
        console.log(setCookie.getCookie("iconName"));

        this.imgElement = document.createElement("img");
        this.imgElement.src = this.icons;
        this.locker.appendChild(this.imgElement);

        var eventet = new Eventet();
        eventet.handleEvent(null, null, null, null, null, null, null, this.locker);
      
    }



}