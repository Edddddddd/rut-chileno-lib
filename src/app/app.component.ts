import { Component, OnInit } from '@angular/core';
import { RutComponent } from 'projects/rut/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rut-lib';

  constructor() {}

  ngOnInit() {
  }
  
  getRut(rut: string): void {
    console.log(rut);
  }
}
