/**
 * Klass för att ansvara för notiserna för hur många paket man har att öppna. Inleds med att visa med vam som är med i klassen. 
 */
function Notis() {
    this.notis = null;
    this.nmrOfpresentsDiv = null;
    this.totalPoints = null;
    
/**
 * Metod för att kontrollera om en notis ska läggas till i domen eller inte. Tar in nmrOfpresentsDiv och totalPoints som parametrar.
 * Om man har mer än 1000 poäng så visas notisen och antalet, annars göms notisen.
 */
    this.checkNotis = function (nmrOfpresentsDiv, totalPoints) {
        this.nmrOfpresentsDiv = nmrOfpresentsDiv;
        this.totalPoints = totalPoints
     

        if (this.totalPoints >= 1000) {
            this.nmrOfpresentsDiv.style.visibility = "visible";
            this.notis = Math.floor(this.totalPoints / 1000);
            this.nmrOfpresentsDiv.innerHTML = this.notis;

        }

        else if (this.totalPoints < 1000)
        {
         this.nmrOfpresentsDiv.style.visibility = "hidden";
        }

    }
        
    }

