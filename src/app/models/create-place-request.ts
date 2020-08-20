import { Coord } from './create-place-coord-request';

export class CreatePlaceRequest {

    name: String;	
    description: String;	
    location: Coord;	
    tripHref?: String;	
    tripId?: String;	
    pictureUrl?: String;

}
