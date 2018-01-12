import { AppControllerModule } from './../app.controller';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor(private router:Router, private _controller:AppControllerModule, private globalData:DataService) { }

  ngOnInit() {
    /*this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
      this.isNextBtnActive = this._controller.isNextButtonDisabled;
      this.isBackBtnActive = this._controller.isPrevButtonDisabled;
    })*/
  }
  
  onNextHandler(event)
  {
    //console.log('footer '+event.currentTarget)
    this._controller.onNextBackHandler(event.currentTarget)
  }
  onBackHandler(event)
  {
    //console.log('footer '+event.currentTarget)
    this._controller.onNextBackHandler(event.currentTarget)    
  }
}
