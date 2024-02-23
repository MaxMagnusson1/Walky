Main = {

    init: function () {

        //skapar ett objekt av startsidan där knappar och kartan renderas ut 
        var start = new Start();
        start.renderMapAndButtons();


        //skapar knappar för övriga sidor
        /*  this.lockerBtn = document.createElement("div");
          this.priceBtn = document.createElement("div");
          this.mapBtn = document.createElement("div");
      
          //sätter klasser på knapparna
          this.priceBtn.className = "priceBtn";
          this.lockerBtn.className = "lockerBtn";
          this.mapBtn.className = "mapBtn";
      
          //lägger till knapparna i domen
          document.body.appendChild(this.lockerBtn);
          document.body.appendChild(this.priceBtn);
          document.body.appendChild(this.mapBtn);
      
       
         // var lockerBtns = document.querySelectorAll(".lockerBtn");
           //lägger till eventlyssnare på knapparna 
          this.mapBtn.addEventListener("click", Main.init)
          this.lockerBtn.addEventListener("click", Main.locker);
          this.priceBtn.addEventListener("click", function(){
             
              Main.price(start.totalMetersWalked, start.button, start.score, start.paketPoints);
          });*/



        /*}, 
            //metod för att se sina troffer
            locker: function(){
            var locker = new Locker(); 
            locker.renderLocker();
        
        }, 
        
        
            //metod för sidan där man hämtar ut sina priser
            price: function(totalMetersWalked, button , score, paketPoints){
                console.log("price-metod")
                this.paketPoints = paketPoints;
                this.totalMetersWalked = totalMetersWalked;
                this.button = button;
                this.score = score;
        
            var price = new Price();    
            price.renderPackage(this.totalMetersWalked, this.button, this.score, this.paketPoints);
            }*/
    }
}
window.addEventListener("load", Main.init); 