import { Component, OnInit } from '@angular/core';

import { AircoService } from '../services/airco.service';
import { AircoStatus } from '../models/airco-status';

@Component({
  selector: 'daikin-control',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
    private __aircoService: AircoService
  ) { }

  ngOnInit(): void {
    this.__aircoService
      .getStatus()
      .then((aircoStatus: AircoStatus) => console.log(aircoStatus));
  }
}
