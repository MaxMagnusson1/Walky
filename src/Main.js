var Main = {
    init: function () {
        var start = new Start();
        start.renderMapAndButtons();
    }
};

document.addEventListener("DOMContentLoaded", function() {
    var loadingApp = document.createElement("div");
    loadingApp.className = "loadingApp";   
    document.body.appendChild(loadingApp); 

    var img = new Image();
    img.src = './img/correktpaket-05.png', './img/wifi-03.png', './img/litenlocker-09.png','./img/coin2-10.png','./img/mapAsset 27@2x.png','./img/bigline-07.png','./img/skuggat-06.png', './img/lockerImg.png', './img/felhanteringklar-04.png','./img/BBQ-12.png', './img/cake-12.png','./img/disco-12.png', './img/kompassen-12.png', './img/lasersabel-12.png', './img/lasersabellila-12.png', './img/redlasersabel-12.png', './img/mic-12.png', './img/munk-12-png', './img/star-12.png', './img/coin3-10.png';
    img.onload = function() {
     loadingApp.remove();
        Main.init();
    };


    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>{
            navigator.serviceWorker.register('../service-worker.js')
            .then(reg => console.log('service-worger registed'))
            .catch(err => console.log('serive worker err' + err)); 

        })
      /*  navigator.serviceWorker.register('../service-worker.js') // Ändra sökvägen till din service worker-fil
            .then(function(registration) {
                console.log('Service worker registered:', registration);
            })
            .catch(function(error) {
                console.log('Service worker registration failed:', error);
            });*/
    }

});

// Lyssna efter window.onload-händelsen

