// import { Coord } from './create-place-coord-request';

export class CreatePlaceRequest {

    name: String;	
    description: String;	
    tripHref?: String;	
    tripId?: String;	
    pictureUrl?: String;
    location: Coord;	

    

}

export class Coord {

    type: String;
    coordinates: string;	
    
    constructor (){
        this.type = "Point";
    }


}
