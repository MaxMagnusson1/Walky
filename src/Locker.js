/**
 * Locker klassen som ansvar för troffeskåpet och ikonerna som en användare har vunnit. Inleds med att visa vad som är med i klassen. 
 */

function Locker() {
    this.lockerContainer = null;
    this.locker = null;
    this.currentValue = null;
    this.newValue = null;
    this.rowDiv = null;
    this.img = null;

/**
 * Render locker metoden ansvar för att skapa troffeskåpet och ikonerna som en användare har vunnit.
 * Sker via att ett div skapas där img bilder läggs till, trofeeskåpet som ikonerna. Sätter även klassnamn och lägger till det i domen. 
 * Skapar även en instans av bildkakor som håller koll på vilka ikoner som finns i troffeskåpet. 
 */
    this.renderLocker = function () {
        this.lockerContainer = document.createElement("div");
        this.locker = document.createElement("img");
        this.locker.src = './img/lockerImg.png';
    
        //klassnamn för lockersidan 
        this.locker.className = "locker";
        this.lockerContainer.className = "lockerContainer";
        
    
        //tillägg till domen på lockersidan
        document.body.appendChild(this.lockerContainer);
        this.lockerContainer.appendChild(this.locker);

        var setCookieIcon = new Kakor();

        this.currentValue = setCookieIcon.getCookie("notis");
        this.newValue = parseInt(this.currentValue);
        setCookieIcon.setCookie("notis", -this.newValue, 365);


        var setCookie = new BildKakor();
        var imageArray = setCookie.getCookie("images");//sätter image array till att hämta bilder från bildkakor

    /** 
     * Om det finns bilder i arrayen så skapas en div där bilderna läggs till och sätter klassnamn på dem.
     * Om i är delbart med 2 så skapas en ny rad. Vilket gör att ikonerna hamnar två per rad.
     * Sätter även klassnamn på bilderna och lägger till dem i domen.
     * Skapar sedan ett img element och sätter klassnamn på dem och lägger till dem i domen.
     * this.rowDiv.appendChild(this.img) lägger till img i rowDiv för att rendera ut bilderna två och två i row 
     */
        if (imageArray != null ) {
         
            for (var i = 0; i < imageArray.length; i++) {
                if (!document.querySelector(`img[src="${imageArray[i]}"]`)) {

                    if (i % 2 === 0) {
                    this.rowDiv = document.createElement("div");
                    this.rowDiv.className = "row";
                    this.lockerContainer.appendChild(this.rowDiv);
                }
                this.img = document.createElement('img');
                this.img.className = "iconInLocker";
                this.img.src = imageArray[i];

                this.rowDiv.appendChild(this.img);
            }
            }
        
        }
    }
}

