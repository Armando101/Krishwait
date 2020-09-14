import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.updatePWA();
  }

  updatePWA(): void {
    this.swUpdate.available.subscribe(value => {
      console.log(value);
      window.location.reload();
    });
  }
}
