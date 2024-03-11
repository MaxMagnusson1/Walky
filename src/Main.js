var Main = {
    init: function () {
    
                var start = new Start();
                start.renderMapAndButtons();
         }
            // Dölj laddningsikonen när DOM:en har laddats
  
        }
    

        window.onload = function() {
          Main.init();
      };