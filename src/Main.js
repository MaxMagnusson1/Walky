var Main = {
    init: function () {
        var start = new Start();
        start.createAllElements();
    }
};

document.addEventListener("DOMContentLoaded", function() {
    var img = new Image();

    img.src = './img/paket.png', './img/skuggpaket.png', './img/lockerImg.png', './img/treedone-03.png', './img/felhanteringklar-04.png';

    img.onload = function() {
        Main.init();
    };

});

// Lyssna efter window.onload-händelsen
window.onload = function() {
    // Hela sidan, inklusive bilder, har laddats helt
    console.log("Hela sidan har laddats helt.");
};
