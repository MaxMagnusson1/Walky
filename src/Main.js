var Main = {
    init: function () {
    
                var start = new Start();
                start.renderMapAndButtons();
         }
            // Dölj laddningsikonen när DOM:en har laddats
  
        }
    

document.addEventListener("DOMContentLoaded", Main.init);
