/**
Sätter igång startfilen när nedan kod körs.
 */
var Main = {
    init: function () {
        var start = new Start();
        start.renderMapAndButtons();
    }
};

/**
Skapar en laddningsicon som visas när applikationen laddas in i väntan på att alla dom element ska laddas in. När alla dom element 
laddats in körs en onload som väntar på att alla bilder laddats in och när det är klart tas laddningsiconen bort och Main.init() körs
vilket sätter igång star filen.
 */
var loadingApp = document.createElement("div");
loadingApp.className = "loadingApp";   
document.body.appendChild(loadingApp); 

document.addEventListener("DOMContentLoaded", function() {
  

    var img = new Image();
    img.src = './img/correktpaket-05.png', './img/errorfeedback-03.png', './img/litenlocker-09.png','./img/coin2-10.png','./img/mapAsset 27@2x.png','./img/bigline-07.png','./img/skuggat-06.png', './img/lockerImg.png', './img/felhanteringklar-04.png','./img/BBQ-12.png', './img/cake-12.png','./img/disco-12.png', './img/kompassen-12.png', './img/lasersabel-12.png', './img/lasersabellila-12.png', './img/redlasersabel-12.png', './img/mic-12.png', './img/munk-12-png', './img/star-12.png', './img/coin3-10.png';
    img.onload = function() {
     loadingApp.remove();
        Main.init();
    };

/**
 * Kontroll på om det finns en serice worker och om det finns så registreras den.
 */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>{
            navigator.serviceWorker.register('../service-worker.js')
        

        })
     
    }

});


