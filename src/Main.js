var Main = {
    init: function () {
        var start = new Start();
        start.createAllElements();
    }
};

document.addEventListener("DOMContentLoaded", function() {
    var loadingApp = document.createElement("div");
    loadingApp.className = "loadingApp";   
    document.body.appendChild(loadingApp); 

    var img = new Image();
    img.src = './img/correktpaket-05.png', './img/skuggat-06.png', './img/lockerImg.png', './img/treemedtext-03.png', './img/felhanteringklar-04.png', './img/bild0.png', './img/bild1.png', './img/bild2.png', './img/bild3.png', './img/bild4.png', './img/bild5.png', './img/bild6.png', './img/bild7.png','./img/bild8.png', './img/bild9.png';
    img.onload = function() {
     loadingApp.remove();
        Main.init();
    };

});

// Lyssna efter window.onload-händelsen

