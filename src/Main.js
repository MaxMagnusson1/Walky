var Main = {
    init: function () {
        // Visa laddningsikonen när sidan laddas
      //  var loadingIcon = document.getElementById("loading-icon");
      //  loadingIcon.style.display = "block";
       // var loadingControll = document.querySelectorAll("*"); 
        // Dölj laddningsikonen när allt innehåll är redo att visas
           // if (loadingControll.length === 22){
              //  loadingIcon.style.display = "none";
                var start = new Start();
                start.renderMapAndButtons();
       //     }
            // Dölj laddningsikonen när DOM:en har laddats
  
        }
    
};

document.addEventListener("DOMContentLoaded", Main.init);
