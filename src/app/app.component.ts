import { Component, OnInit } from '@angular/core';
import { UserService } from './api/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string ;
  
  constructor (private user: UserService) {

    this.title = 'travel-log';

  }
  ngOnInit(): void {
    this.user.loadAllUsers().subscribe({
      next: (messages) => console.log(messages),
      error: (error) => console.warn(error)
      
    });
  }




}
