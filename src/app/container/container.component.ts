import { Component, OnInit, NgZone } from '@angular/core';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private navPath = '';
  private ngZone:NgZone;
  
  constructor() {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  
}
