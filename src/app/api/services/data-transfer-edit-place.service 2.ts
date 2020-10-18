import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferEditPlaceService {

  private messageSource: BehaviorSubject<any> = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(place: any) {
    this.messageSource.next(place);
    
  }
}
