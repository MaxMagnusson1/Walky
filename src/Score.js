/**
 * Klass för att uppdatera och hålla koll på poängen i appen. Börjar med att visa vad som är med i klassen.
 */
function Score(){
    this.distanceInMeters =null; 
    this.totalPoints = null;
    
/**
 * Metod för att uppdatera poängen i appen. Tar in distanceInMeters som parameter och sätter det till distanceInMeters.
 * Skapar en instans av kakor och skickar in total_points, distanceInMeters och 30 som parametrar.
 * Skapar en variabel totalPoints och sätter den till setCookie.getCookie("total_points").
 * Retunerar sedan totalPoints.
 */
    this.uppdatedScore = function(distanceInMeters){

        this.distanceInMeters = distanceInMeters;
        var setCookie = new Kakor();
        setCookie.getCookie("total_points", this.distanceInMeters, 30);
        this.totalPoints = setCookie.getCookie("total_points")

        return this.totalPoints;
    }
}