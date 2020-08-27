import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferMarkerCoordService {

  private messageSource: BehaviorSubject<any> = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(coord: any) {
    this.messageSource.next(coord);
    
  }
}
