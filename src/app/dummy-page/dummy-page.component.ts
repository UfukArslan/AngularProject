import { Component, OnInit } from "@angular/core";
import { UserService } from "../api/services/user.service";
import {FormControl} from '@angular/forms';
import { MatDialogActions, MatDialog } from '@angular/material/dialog';

  //@title

@Component({
  selector: "app-dummy-page",
  templateUrl: "./dummy-page.component.html",
  styleUrls: ["./dummy-page.component.scss"],
})
export class DummyPageComponent implements OnInit {
  
  opened: boolean;

  


  // Inject the UserService
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.userService.loadAllUsers().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
  }

  openDialog() {
    const dummyRef = this.dialog.open(DummyPageComponentDialog);

    dummyRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dummy-page-component-dialog',
  templateUrl: './dummy-page-component-dialog.html',
})
export class DummyPageComponentDialog {}