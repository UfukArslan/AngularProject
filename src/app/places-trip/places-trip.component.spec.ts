import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesTripComponent } from './places-trip.component';

describe('PlacesTripComponent', () => {
  let component: PlacesTripComponent;
  let fixture: ComponentFixture<PlacesTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
