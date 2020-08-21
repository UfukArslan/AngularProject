import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTranferMapService {

  private messageSource = new BehaviorSubject<string>('coucou');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {

    this.messageSource.next(message)
  }
}
