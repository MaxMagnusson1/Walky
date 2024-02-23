function Score(){

    this.uppdatedScore = function(distanceInMeters){
        this.distanceInMeters = distanceInMeters;
        var setCookie = new Kakor();
        setCookie.getCookie("total_points", this.distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalPoints = setCookie.getCookie("total_points")

        setCookie.setCookie("total_points", this.distanceInMeters, 30);
        return this.totalPoints;

    }


    /*  setCookie.setCookie("total_dist", distanceInMeters, 30); //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
        this.totalDistance = setCookie.getCookie("total_dist");*/
        //skickar in hur långt användaren har gått till kakorna, skickar med namnet, värdet och hur länge det ska sparas
}