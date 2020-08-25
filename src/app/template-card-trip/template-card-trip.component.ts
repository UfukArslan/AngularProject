import { Component, OnInit, Input } from '@angular/core';
import { ListTripsResponse } from '../models/list-trips-response';
import { Router } from '@angular/router';
import { DataTransferService } from '../api/services/data-transfer.service';

@Component({
  selector: 'app-template-card-trip',
  templateUrl: './template-card-trip.component.html',
  styleUrls: ['./template-card-trip.component.scss']
})
export class TemplateCardTripComponent implements OnInit {
  

  @Input() listTrips: ListTripsResponse;


  constructor(private router: Router, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
  }

  createPlace(){
  this.dataTransferService.setData(this.listTrips);
  this.router.navigateByUrl("/places");
  }

}
