import { OnePlaceCoord } from 'src/app/models/one-place-coord-response';

export class OnePlaceResponse {
        id: String;	
        href: String;
        name: String;	
        description: String;	
        location = new OnePlaceCoord();
        tripId: String;
        tripHref: String;
        pictureUrl?: String;	
        createdAt: Date;	
        updatedAt: Date;
}
