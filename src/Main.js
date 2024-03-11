var Main = {
    init: function () {
        var start = new Start();
        start.renderMapAndButtons();
    }
};

// Lyssna efter DOMContentLoaded-händelsen
document.addEventListener("DOMContentLoaded", function() {
    // Skapa en ny bild
    var img = new Image();

    // Ange källan till din bild
    img.src = './img/paket.png', './img/skuggpaket.png', './mapAsset 35@2x.png ';

    // Lägg till en onload-händelse för att kalla på Main.init() när bilden har laddats
    img.onload = function() {
        Main.init();
    };

    // Om du har fler bilder, upprepa processen för varje bild

    // Lägg till bilden till DOM:en om du vill att den ska visas på sidan
    // document.body.appendChild(img);
});

// Lyssna efter window.onload-händelsen
window.onload = function() {
    // Hela sidan, inklusive bilder, har laddats helt
    console.log("Hela sidan har laddats helt.");
};
