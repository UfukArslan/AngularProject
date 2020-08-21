import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTranferMapService {

  private messageSource: BehaviorSubject<any> = new BehaviorSubject<string>('coucou');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(e: any) {
    this.messageSource.next(e);
    
  }
}
